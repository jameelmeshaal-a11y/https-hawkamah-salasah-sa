
-- ===== جدول الموظفين =====
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_number TEXT UNIQUE,
  full_name TEXT NOT NULL,
  national_id TEXT,
  email TEXT,
  phone TEXT,
  department TEXT,
  position TEXT,
  hire_date DATE,
  salary NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  user_id UUID,
  org_id UUID REFERENCES public.organizations(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage employees" ON public.employees FOR ALL TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Authenticated can read employees" ON public.employees FOR SELECT TO authenticated USING (true);

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===== جدول الإجازات =====
CREATE TABLE IF NOT EXISTS public.leaves (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  leave_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_count INTEGER,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  approved_by UUID,
  approved_at TIMESTAMPTZ,
  notes TEXT,
  org_id UUID REFERENCES public.organizations(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leaves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage leaves" ON public.leaves FOR ALL TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Authenticated can read leaves" ON public.leaves FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create leaves" ON public.leaves FOR INSERT TO authenticated WITH CHECK (true);

CREATE TRIGGER update_leaves_updated_at BEFORE UPDATE ON public.leaves
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===== جدول الإشعارات =====
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  related_id UUID,
  related_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage notifications" ON public.notifications FOR ALL TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ===== جدول حضور الاجتماعات =====
CREATE TABLE IF NOT EXISTS public.meeting_attendees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  attendee_name TEXT NOT NULL,
  attended BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.meeting_attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage meeting_attendees" ON public.meeting_attendees FOR ALL TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Authenticated can read meeting_attendees" ON public.meeting_attendees FOR SELECT TO authenticated USING (true);

-- Add delete policy for requests table (missing)
CREATE POLICY "Admins can delete requests" ON public.requests FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Add update policy for requests table (missing)
CREATE POLICY "Admins can update requests" ON public.requests FOR UPDATE TO authenticated USING (is_admin(auth.uid()));
