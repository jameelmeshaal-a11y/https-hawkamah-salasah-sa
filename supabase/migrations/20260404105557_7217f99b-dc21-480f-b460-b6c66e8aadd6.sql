
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('system_admin', 'admin', 'supervisor', 'user', 'auditor');

-- Create organizations table
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  registration_no TEXT,
  city TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  org_id UUID REFERENCES public.organizations(id),
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  department TEXT,
  job_title TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  last_login_at TIMESTAMPTZ,
  must_change_password BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create modules table
CREATE TABLE public.modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create permissions table
CREATE TABLE public.permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('view', 'create', 'edit', 'delete', 'approve', 'export')),
  UNIQUE (module_id, action)
);

-- Create role_permissions table
CREATE TABLE public.role_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role app_role NOT NULL,
  permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE NOT NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (role, permission_id)
);

-- Create audit_events table
CREATE TABLE public.audit_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  actor_user_id UUID REFERENCES auth.users(id),
  module_key TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create report_definitions table
CREATE TABLE public.report_definitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  key TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  module_key TEXT,
  filters_schema JSONB DEFAULT '{}',
  output_format_default TEXT DEFAULT 'pdf',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create report_runs table
CREATE TABLE public.report_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_definition_id UUID REFERENCES public.report_definitions(id),
  requested_by UUID REFERENCES auth.users(id),
  filters_used JSONB DEFAULT '{}',
  output_format TEXT NOT NULL DEFAULT 'pdf',
  storage_path TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create financial_accounts table
CREATE TABLE public.financial_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
  parent_id UUID REFERENCES public.financial_accounts(id),
  balance DECIMAL(15,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create journal_entries table
CREATE TABLE public.journal_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  entry_number SERIAL,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  hijri_date TEXT,
  reference TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'posted', 'cancelled')),
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create journal_lines table
CREATE TABLE public.journal_lines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  journal_entry_id UUID REFERENCES public.journal_entries(id) ON DELETE CASCADE NOT NULL,
  account_id UUID REFERENCES public.financial_accounts(id) NOT NULL,
  description TEXT,
  debit DECIMAL(15,2) DEFAULT 0,
  credit DECIMAL(15,2) DEFAULT 0,
  cost_center TEXT,
  sort_order INT DEFAULT 0
);

-- Create beneficiaries table
CREATE TABLE public.beneficiaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  full_name TEXT NOT NULL,
  national_id_hash TEXT,
  phone TEXT,
  city TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'graduated')),
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create sponsorships table
CREATE TABLE public.sponsorships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  beneficiary_id UUID REFERENCES public.beneficiaries(id) ON DELETE CASCADE NOT NULL,
  program_name TEXT NOT NULL,
  sponsor_name TEXT,
  monthly_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_financial_accounts_updated_at BEFORE UPDATE ON public.financial_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON public.journal_entries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_beneficiaries_updated_at BEFORE UPDATE ON public.beneficiaries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sponsorships_updated_at BEFORE UPDATE ON public.sponsorships FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create auto-profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create has_role security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Check if user has any admin-level role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('system_admin', 'admin')
  )
$$;

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert profiles" ON public.profiles FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));

-- RLS for user_roles
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- RLS for modules, permissions, role_permissions (read for all authenticated)
CREATE POLICY "Authenticated can read modules" ON public.modules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage modules" ON public.modules FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Authenticated can read permissions" ON public.permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage permissions" ON public.permissions FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Authenticated can read role_permissions" ON public.role_permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage role_permissions" ON public.role_permissions FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- RLS for audit_events (read-only for admins)
CREATE POLICY "Admins can view audit events" ON public.audit_events FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "System can insert audit events" ON public.audit_events FOR INSERT TO authenticated WITH CHECK (true);

-- RLS for organizations
CREATE POLICY "Authenticated can read organizations" ON public.organizations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage organizations" ON public.organizations FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- RLS for report_definitions and report_runs
CREATE POLICY "Authenticated can read report_definitions" ON public.report_definitions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage report_definitions" ON public.report_definitions FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can view own report_runs" ON public.report_runs FOR SELECT TO authenticated USING (auth.uid() = requested_by);
CREATE POLICY "Admins can view all report_runs" ON public.report_runs FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can create report_runs" ON public.report_runs FOR INSERT TO authenticated WITH CHECK (auth.uid() = requested_by);

-- RLS for financial tables
CREATE POLICY "Authenticated can read financial_accounts" ON public.financial_accounts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage financial_accounts" ON public.financial_accounts FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Authenticated can read journal_entries" ON public.journal_entries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage journal_entries" ON public.journal_entries FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can insert journal_entries" ON public.journal_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated can read journal_lines" ON public.journal_lines FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage journal_lines" ON public.journal_lines FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- RLS for beneficiaries and sponsorships
CREATE POLICY "Authenticated can read beneficiaries" ON public.beneficiaries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage beneficiaries" ON public.beneficiaries FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Authenticated can read sponsorships" ON public.sponsorships FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage sponsorships" ON public.sponsorships FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Seed modules data
INSERT INTO public.modules (key, name, sort_order) VALUES
  ('office', 'المكتب الإلكتروني', 1),
  ('supervision', 'الإدارة الإشرافية و التنفيذية', 2),
  ('members', 'إدارة الأعضاء المشاركين', 3),
  ('excellence', 'إدارة التميز المؤسسي', 4),
  ('beneficiary-accounts', 'إدارة حسابات المستفيدين', 5),
  ('beneficiary-services', 'إدارة خدمات المستفيدين', 6),
  ('evaluation', 'إدارة التقييم و المتابعة', 7),
  ('projects', 'إدارة المشاريع', 8),
  ('programs', 'إدارة البرامج و التطوير', 9),
  ('educational', 'إدارة الشؤون التعليمية', 10),
  ('deceased-honor', 'إدارة إكرام الموتى', 11),
  ('financial', 'إدارة الشؤون المالية', 12),
  ('financial-resources', 'إدارة الموارد المالية', 13),
  ('hr', 'إدارة الموارد البشرية', 14),
  ('warehouse', 'إدارة المخازن و المستودعات', 15),
  ('public-relations', 'إدارة العلاقات العامة و الإعلام', 16),
  ('maintenance', 'إدارة الحركة و الصيانة', 17),
  ('volunteering', 'إدارة التطوع', 18),
  ('documentation', 'إدارة التوثيق و المستندات', 19),
  ('reports', 'إدارة التقارير و الإحصائيات', 20),
  ('tech-enablement', 'إدارة التمكين التقني', 21);

-- Seed permissions for all modules (6 actions each)
INSERT INTO public.permissions (module_id, action)
SELECT m.id, a.action
FROM public.modules m
CROSS JOIN (VALUES ('view'), ('create'), ('edit'), ('delete'), ('approve'), ('export')) AS a(action);

-- Create indexes
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_audit_events_occurred_at ON public.audit_events(occurred_at DESC);
CREATE INDEX idx_audit_events_actor ON public.audit_events(actor_user_id);
CREATE INDEX idx_journal_entries_date ON public.journal_entries(entry_date);
CREATE INDEX idx_journal_lines_entry ON public.journal_lines(journal_entry_id);
CREATE INDEX idx_beneficiaries_status ON public.beneficiaries(status);
CREATE INDEX idx_sponsorships_beneficiary ON public.sponsorships(beneficiary_id);
