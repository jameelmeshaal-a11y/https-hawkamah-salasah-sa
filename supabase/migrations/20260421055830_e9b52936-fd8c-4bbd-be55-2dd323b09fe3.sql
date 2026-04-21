CREATE OR REPLACE FUNCTION public.ensure_employee_for_current_user()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _employee_id uuid;
  _profile public.profiles%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT *
  INTO _profile
  FROM public.profiles
  WHERE user_id = auth.uid()
  LIMIT 1;

  IF _profile.user_id IS NULL THEN
    RAISE EXCEPTION 'Profile not found';
  END IF;

  SELECT id
  INTO _employee_id
  FROM public.employees
  WHERE user_id = auth.uid()
  LIMIT 1;

  IF _employee_id IS NOT NULL THEN
    RETURN _employee_id;
  END IF;

  IF _profile.email IS NOT NULL THEN
    SELECT id
    INTO _employee_id
    FROM public.employees
    WHERE lower(email) = lower(_profile.email)
    ORDER BY created_at ASC
    LIMIT 1;

    IF _employee_id IS NOT NULL THEN
      UPDATE public.employees
      SET user_id = auth.uid(),
          full_name = COALESCE(NULLIF(full_name, ''), _profile.full_name),
          department = COALESCE(department, _profile.department),
          position = COALESCE(position, _profile.job_title),
          phone = COALESCE(phone, _profile.phone),
          org_id = COALESCE(org_id, _profile.org_id),
          updated_at = now()
      WHERE id = _employee_id;

      RETURN _employee_id;
    END IF;
  END IF;

  INSERT INTO public.employees (
    user_id,
    full_name,
    email,
    phone,
    department,
    position,
    status,
    org_id
  )
  VALUES (
    auth.uid(),
    COALESCE(NULLIF(_profile.full_name, ''), 'موظف'),
    _profile.email,
    _profile.phone,
    _profile.department,
    _profile.job_title,
    'active',
    _profile.org_id
  )
  RETURNING id INTO _employee_id;

  RETURN _employee_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.ensure_employee_for_current_user() TO authenticated;