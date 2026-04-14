
-- Create the CEO admin user in auth.users
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, aud, role, created_at, updated_at,
  confirmation_token, recovery_token
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'ceo@salasah.sa',
  crypt('Admin@2026!', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"المدير التنفيذي"}',
  'authenticated',
  'authenticated',
  now(),
  now(),
  '',
  ''
);

-- Update the auto-created profile with admin details
UPDATE public.profiles
SET full_name = 'المدير التنفيذي',
    department = 'الإدارة العليا',
    job_title = 'المدير التنفيذي',
    is_protected = true,
    must_change_password = false
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'ceo@salasah.sa');

-- Assign system_admin role
INSERT INTO public.user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'ceo@salasah.sa'),
  'system_admin'
);

-- Grant all permissions to system_admin role (if not already done)
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'system_admin', p.id FROM public.permissions p
WHERE NOT EXISTS (
  SELECT 1 FROM public.role_permissions rp
  WHERE rp.role = 'system_admin' AND rp.permission_id = p.id
);
