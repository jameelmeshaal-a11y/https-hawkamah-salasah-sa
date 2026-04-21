
ALTER TABLE public.permissions DROP CONSTRAINT IF EXISTS permissions_action_check;
ALTER TABLE public.permissions ADD CONSTRAINT permissions_action_check
  CHECK (action = ANY (ARRAY['view','create','edit','delete','approve','export','view_phone_numbers','view_email_addresses']));

DO $$
DECLARE
  _module_id uuid;
  _perm_id uuid;
BEGIN
  SELECT p.module_id INTO _module_id
  FROM public.permissions p
  WHERE p.action = 'view_phone_numbers'
  LIMIT 1;

  IF _module_id IS NULL THEN
    SELECT id INTO _module_id FROM public.modules ORDER BY sort_order LIMIT 1;
  END IF;

  IF _module_id IS NULL THEN
    RETURN;
  END IF;

  INSERT INTO public.permissions (module_id, action)
  VALUES (_module_id, 'view_email_addresses')
  ON CONFLICT DO NOTHING;

  SELECT id INTO _perm_id FROM public.permissions WHERE action = 'view_email_addresses' LIMIT 1;

  IF _perm_id IS NOT NULL THEN
    INSERT INTO public.role_permissions (role, permission_id)
    VALUES ('system_admin', _perm_id), ('admin', _perm_id)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
