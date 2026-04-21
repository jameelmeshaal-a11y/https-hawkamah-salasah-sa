
-- Relax check constraint to allow new action
ALTER TABLE public.permissions DROP CONSTRAINT IF EXISTS permissions_action_check;
ALTER TABLE public.permissions ADD CONSTRAINT permissions_action_check
  CHECK (action = ANY (ARRAY['view','create','edit','delete','approve','export','view_phone_numbers']));

-- Add view_phone_numbers permission under the system module
DO $$
DECLARE
  _module_id uuid;
  _permission_id uuid;
BEGIN
  SELECT id INTO _module_id FROM public.modules WHERE key = 'system' LIMIT 1;
  IF _module_id IS NULL THEN
    INSERT INTO public.modules (key, name, description, sort_order)
    VALUES ('system', 'النظام', 'إعدادات وصلاحيات النظام', 999)
    RETURNING id INTO _module_id;
  END IF;

  SELECT id INTO _permission_id
  FROM public.permissions
  WHERE module_id = _module_id AND action = 'view_phone_numbers'
  LIMIT 1;

  IF _permission_id IS NULL THEN
    INSERT INTO public.permissions (module_id, action)
    VALUES (_module_id, 'view_phone_numbers')
    RETURNING id INTO _permission_id;
  END IF;

  INSERT INTO public.role_permissions (role, permission_id)
  SELECT 'system_admin'::app_role, _permission_id
  WHERE NOT EXISTS (
    SELECT 1 FROM public.role_permissions
    WHERE role = 'system_admin'::app_role AND permission_id = _permission_id
  );
END $$;
