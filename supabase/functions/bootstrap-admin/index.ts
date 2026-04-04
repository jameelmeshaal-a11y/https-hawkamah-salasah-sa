const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { email, password, full_name } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if any admin exists
    const { data: existingAdmins } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role', 'system_admin')
      .limit(1);

    if (existingAdmins && existingAdmins.length > 0) {
      // Verify caller is admin
      const authHeader = req.headers.get('Authorization');
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabase.auth.getUser(token);
        if (!user) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        const { data: callerRoles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .in('role', ['system_admin', 'admin']);
        if (!callerRoles || callerRoles.length === 0) {
          return new Response(JSON.stringify({ error: 'Only admins can create users' }), {
            status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } else {
        return new Response(JSON.stringify({ error: 'Admin already exists, auth required' }), {
          status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Create user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name || 'مدير النظام' },
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = authData.user.id;

    // Update profile
    await supabase.from('profiles').update({
      full_name: full_name || 'مدير النظام',
      department: 'تقنية المعلومات',
      job_title: 'مدير النظام',
      must_change_password: true,
    }).eq('user_id', userId);

    // Assign system_admin role
    await supabase.from('user_roles').insert({
      user_id: userId,
      role: 'system_admin',
    });

    // Grant all permissions to system_admin
    const { data: allPerms } = await supabase.from('permissions').select('id');
    if (allPerms && allPerms.length > 0) {
      const rolePerms = allPerms.map(p => ({
        role: 'system_admin' as const,
        permission_id: p.id,
      }));
      await supabase.from('role_permissions').upsert(rolePerms, { onConflict: 'role,permission_id' });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Admin user created successfully',
      user_id: userId,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
