
-- Board Members
CREATE TABLE public.board_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  full_name TEXT NOT NULL,
  position TEXT NOT NULL DEFAULT 'عضو',
  phone TEXT,
  email TEXT,
  national_id_hash TEXT,
  appointment_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.board_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read board_members" ON public.board_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage board_members" ON public.board_members FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Meetings
CREATE TABLE public.meetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  title TEXT NOT NULL,
  meeting_type TEXT NOT NULL DEFAULT 'board',
  meeting_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  agenda TEXT,
  minutes TEXT,
  attendees_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'scheduled',
  hijri_date TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read meetings" ON public.meetings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage meetings" ON public.meetings FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Decisions
CREATE TABLE public.decisions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  meeting_id UUID REFERENCES public.meetings(id),
  decision_number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  responsible_person TEXT,
  execution_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.decisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read decisions" ON public.decisions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage decisions" ON public.decisions FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Volunteers
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  city TEXT,
  skills TEXT,
  volunteer_hours NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  join_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read volunteers" ON public.volunteers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage volunteers" ON public.volunteers FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Donors
CREATE TABLE public.donors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  full_name TEXT NOT NULL,
  donor_type TEXT NOT NULL DEFAULT 'individual',
  phone TEXT,
  email TEXT,
  city TEXT,
  total_donations NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read donors" ON public.donors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage donors" ON public.donors FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Donations
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  donor_id UUID REFERENCES public.donors(id),
  amount NUMERIC NOT NULL DEFAULT 0,
  donation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  hijri_date TEXT,
  payment_method TEXT DEFAULT 'cash',
  purpose TEXT,
  receipt_number TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read donations" ON public.donations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage donations" ON public.donations FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Grants
CREATE TABLE public.grants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  program_name TEXT NOT NULL,
  grantor TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active',
  description TEXT,
  conditions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.grants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read grants" ON public.grants FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage grants" ON public.grants FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Requests
CREATE TABLE public.requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  request_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  submitter_id UUID,
  submitter_name TEXT,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'pending',
  assigned_to TEXT,
  notes TEXT,
  attachments JSONB DEFAULT '[]'::jsonb,
  hijri_date TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read requests" ON public.requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage requests" ON public.requests FOR ALL TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Users can create own requests" ON public.requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = submitter_id);

-- Add update triggers for all new tables
CREATE TRIGGER update_board_members_updated_at BEFORE UPDATE ON public.board_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_meetings_updated_at BEFORE UPDATE ON public.meetings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_decisions_updated_at BEFORE UPDATE ON public.decisions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_volunteers_updated_at BEFORE UPDATE ON public.volunteers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_donors_updated_at BEFORE UPDATE ON public.donors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON public.donations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_grants_updated_at BEFORE UPDATE ON public.grants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON public.requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
