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

    const { email, password, full_name, role, department } = await req.json();

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
      let authorized = false;
      
      // Check Authorization header first
      const authHeader = req.headers.get('Authorization');
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabase.auth.getUser(token);
        if (user) {
          const { data: callerRoles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .in('role', ['system_admin', 'admin']);
          if (callerRoles && callerRoles.length > 0) {
            authorized = true;
          }
        }
      }

      // Fallback: check bootstrap_key header
      if (!authorized) {
        const bootstrapKey = req.headers.get('x-bootstrap-key');
        if (bootstrapKey && bootstrapKey === serviceRoleKey) {
          authorized = true;
        }
      }

      if (!authorized) {
        return new Response(JSON.stringify({ error: 'Admin already exists, auth required' }), {
          status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Determine final role
    const finalRole = role || 'system_admin';
    const finalName = full_name || 'مدير النظام';

    // Create user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: finalName },
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = authData.user.id;

    // Update profile
    await supabase.from('profiles').update({
      full_name: finalName,
      department: department || 'تقنية المعلومات',
      job_title: finalRole === 'system_admin' ? 'مدير النظام' : 'موظف',
      must_change_password: true,
    }).eq('user_id', userId);

    // Assign role
    await supabase.from('user_roles').insert({
      user_id: userId,
      role: finalRole,
    });

    // If system_admin, grant all permissions and mark as protected
    if (finalRole === 'system_admin') {
      const { data: allPerms } = await supabase.from('permissions').select('id');
      if (allPerms && allPerms.length > 0) {
        const rolePerms = allPerms.map((p: any) => ({
          role: 'system_admin' as const,
          permission_id: p.id,
        }));
        await supabase.from('role_permissions').upsert(rolePerms, { onConflict: 'role,permission_id' });
      }

      // Mark first system_admin as protected
      if (!existingAdmins || existingAdmins.length === 0) {
        await supabase.from('profiles').update({ is_protected: true }).eq('user_id', userId);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'User created successfully',
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
