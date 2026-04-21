-- Helper: is the given employee_id linked to the current auth user?
CREATE OR REPLACE FUNCTION public.is_my_employee_id(_employee_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.employees e
    WHERE e.id = _employee_id
      AND e.user_id = auth.uid()
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_my_employee_id(uuid) TO authenticated;

-- Helper: can current user manage attendance for others (admin / system_admin)
CREATE OR REPLACE FUNCTION public.can_manage_attendance(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('system_admin', 'admin')
  );
$$;

GRANT EXECUTE ON FUNCTION public.can_manage_attendance(uuid) TO authenticated;

-- Drop old permissive policies
DROP POLICY IF EXISTS "Admins can manage attendance" ON public.attendance;
DROP POLICY IF EXISTS "Authenticated can read attendance" ON public.attendance;
DROP POLICY IF EXISTS "Users can insert own attendance" ON public.attendance;

-- SELECT: own records OR managers see all
CREATE POLICY "attendance_select_own_or_manager"
ON public.attendance
FOR SELECT
TO authenticated
USING (
  public.is_my_employee_id(employee_id)
  OR public.can_manage_attendance(auth.uid())
);

-- INSERT: own check-in OR manager check-in for any employee
CREATE POLICY "attendance_insert_self_or_manager"
ON public.attendance
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_my_employee_id(employee_id)
  OR public.can_manage_attendance(auth.uid())
);

-- UPDATE: own record (e.g. check-out) OR manager update
CREATE POLICY "attendance_update_self_or_manager"
ON public.attendance
FOR UPDATE
TO authenticated
USING (
  public.is_my_employee_id(employee_id)
  OR public.can_manage_attendance(auth.uid())
)
WITH CHECK (
  public.is_my_employee_id(employee_id)
  OR public.can_manage_attendance(auth.uid())
);

-- DELETE: managers only
CREATE POLICY "attendance_delete_manager_only"
ON public.attendance
FOR DELETE
TO authenticated
USING (public.can_manage_attendance(auth.uid()));

-- Ensure 1 record per employee per day for clean check-in/check-out semantics
CREATE UNIQUE INDEX IF NOT EXISTS attendance_employee_date_uniq
ON public.attendance (employee_id, date);