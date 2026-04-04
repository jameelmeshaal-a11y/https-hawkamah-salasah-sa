const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    
    // Verify JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { reportType, filters, format } = body;

    if (!reportType || !format) {
      return new Response(JSON.stringify({ error: 'Missing reportType or format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create report run record
    const { data: reportRun, error: insertError } = await supabase
      .from('report_runs')
      .insert({
        requested_by: user.id,
        filters_used: filters || {},
        output_format: format,
        status: 'running',
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      return new Response(JSON.stringify({ error: 'Failed to create report run' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch data based on report type
    let data: any[] = [];
    let columns: string[] = [];

    switch (reportType) {
      case 'beneficiaries': {
        const { data: rows } = await supabase.from('beneficiaries').select('*');
        data = rows || [];
        columns = ['full_name', 'phone', 'city', 'status', 'category', 'created_at'];
        break;
      }
      case 'financial_accounts': {
        const { data: rows } = await supabase.from('financial_accounts').select('*');
        data = rows || [];
        columns = ['code', 'name', 'type', 'balance', 'is_active'];
        break;
      }
      case 'journal_entries': {
        const { data: rows } = await supabase.from('journal_entries').select('*');
        data = rows || [];
        columns = ['entry_number', 'entry_date', 'hijri_date', 'reference', 'description', 'status'];
        break;
      }
      case 'sponsorships': {
        const { data: rows } = await supabase.from('sponsorships').select('*, beneficiaries(full_name)');
        data = rows || [];
        columns = ['program_name', 'sponsor_name', 'monthly_amount', 'status', 'start_date', 'end_date'];
        break;
      }
      case 'audit_events': {
        const { data: rows } = await supabase.from('audit_events').select('*').order('occurred_at', { ascending: false }).limit(1000);
        data = rows || [];
        columns = ['action', 'module_key', 'entity_type', 'occurred_at', 'user_agent'];
        break;
      }
      case 'users': {
        const { data: rows } = await supabase.from('profiles').select('*');
        data = rows || [];
        columns = ['full_name', 'email', 'department', 'job_title', 'status', 'last_login_at'];
        break;
      }
      default: {
        return new Response(JSON.stringify({ error: 'Unknown report type' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Generate CSV (for Excel) or simple HTML table (for PDF rendering client-side)
    let content: string;
    let contentType: string;

    if (format === 'excel' || format === 'csv') {
      // Generate CSV with BOM for Arabic support
      const bom = '\uFEFF';
      const header = columns.join(',');
      const rows = data.map(row => 
        columns.map(col => {
          const val = row[col];
          if (val === null || val === undefined) return '';
          const str = String(val);
          return str.includes(',') || str.includes('"') || str.includes('\n') 
            ? `"${str.replace(/"/g, '""')}"` 
            : str;
        }).join(',')
      );
      content = bom + header + '\n' + rows.join('\n');
      contentType = 'text/csv; charset=utf-8';
    } else {
      // Return JSON data for client-side PDF generation
      content = JSON.stringify({ data, columns, reportType, generatedAt: new Date().toISOString() });
      contentType = 'application/json';
    }

    // Update report run status
    await supabase
      .from('report_runs')
      .update({ status: 'completed', finished_at: new Date().toISOString() })
      .eq('id', reportRun.id);

    // Log audit event
    await supabase.from('audit_events').insert({
      actor_user_id: user.id,
      action: 'export_report',
      module_key: reportType,
      entity_type: 'report',
      entity_id: reportRun.id,
      metadata: { format, filters, rows_count: data.length },
    });

    return new Response(content, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${reportType}_report.${format === 'excel' ? 'csv' : 'json'}"`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
