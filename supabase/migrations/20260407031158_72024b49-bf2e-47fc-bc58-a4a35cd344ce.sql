
-- ============================================
-- 1. ATTENDANCE
-- ============================================
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in TIMESTAMP WITH TIME ZONE,
  check_out TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'present',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage attendance" ON public.attendance FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read attendance" ON public.attendance FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert own attendance" ON public.attendance FOR INSERT TO authenticated WITH CHECK (true);
CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON public.attendance FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 2. PERSONAL_NOTES
-- ============================================
CREATE TABLE public.personal_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  priority TEXT NOT NULL DEFAULT 'normal',
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.personal_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own notes" ON public.personal_notes FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all notes" ON public.personal_notes FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER update_personal_notes_updated_at BEFORE UPDATE ON public.personal_notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 3. TASKS
-- ============================================
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID,
  assigned_to_name TEXT,
  created_by UUID,
  department TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage tasks" ON public.tasks FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read tasks" ON public.tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create tasks" ON public.tasks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update assigned tasks" ON public.tasks FOR UPDATE TO authenticated USING (auth.uid() = assigned_to OR auth.uid() = created_by);
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 4. TRANSACTIONS (internal workflows)
-- ============================================
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  transaction_number TEXT NOT NULL DEFAULT ('TXN-' || to_char(now(), 'YYYYMMDD') || '-' || substr(gen_random_uuid()::text, 1, 4)),
  title TEXT NOT NULL,
  description TEXT,
  from_department TEXT,
  to_department TEXT,
  sender_id UUID,
  sender_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  attachments JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage transactions" ON public.transactions FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read transactions" ON public.transactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create transactions" ON public.transactions FOR INSERT TO authenticated WITH CHECK (true);
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 5. PROJECTS
-- ============================================
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  manager_id UUID,
  manager_name TEXT,
  budget NUMERIC DEFAULT 0,
  spent_amount NUMERIC DEFAULT 0,
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'planning',
  completion_percentage INTEGER DEFAULT 0,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage projects" ON public.projects FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read projects" ON public.projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 6. SUPPLIERS
-- ============================================
CREATE TABLE public.suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  category TEXT DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage suppliers" ON public.suppliers FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read suppliers" ON public.suppliers FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 7. GUARDIANS
-- ============================================
CREATE TABLE public.guardians (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  full_name TEXT NOT NULL,
  national_id_hash TEXT,
  phone TEXT,
  email TEXT,
  beneficiary_id UUID REFERENCES public.beneficiaries(id),
  relationship TEXT DEFAULT 'parent',
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.guardians ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage guardians" ON public.guardians FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read guardians" ON public.guardians FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_guardians_updated_at BEFORE UPDATE ON public.guardians FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 8. DEPENDENTS
-- ============================================
CREATE TABLE public.dependents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  full_name TEXT NOT NULL,
  beneficiary_id UUID REFERENCES public.beneficiaries(id),
  relationship TEXT DEFAULT 'child',
  birth_date DATE,
  gender TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.dependents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage dependents" ON public.dependents FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read dependents" ON public.dependents FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_dependents_updated_at BEFORE UPDATE ON public.dependents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 9. STRATEGIC_PLANS
-- ============================================
CREATE TABLE public.strategic_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL,
  vision TEXT,
  mission TEXT,
  start_year INTEGER NOT NULL,
  end_year INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.strategic_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage strategic_plans" ON public.strategic_plans FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read strategic_plans" ON public.strategic_plans FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_strategic_plans_updated_at BEFORE UPDATE ON public.strategic_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 10. INDICATORS
-- ============================================
CREATE TABLE public.indicators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  plan_id UUID REFERENCES public.strategic_plans(id),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'main',
  target_value NUMERIC DEFAULT 0,
  actual_value NUMERIC DEFAULT 0,
  unit TEXT DEFAULT '%',
  owner_department TEXT,
  measurement_frequency TEXT DEFAULT 'quarterly',
  status TEXT NOT NULL DEFAULT 'active',
  parent_id UUID REFERENCES public.indicators(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.indicators ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage indicators" ON public.indicators FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read indicators" ON public.indicators FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_indicators_updated_at BEFORE UPDATE ON public.indicators FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 11. ASSEMBLY_MEMBERS
-- ============================================
CREATE TABLE public.assembly_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  full_name TEXT NOT NULL,
  membership_number TEXT,
  phone TEXT,
  email TEXT,
  national_id_hash TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  join_date DATE DEFAULT CURRENT_DATE,
  membership_type TEXT DEFAULT 'regular',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.assembly_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage assembly_members" ON public.assembly_members FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read assembly_members" ON public.assembly_members FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_assembly_members_updated_at BEFORE UPDATE ON public.assembly_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 12. SHAREHOLDERS
-- ============================================
CREATE TABLE public.shareholders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  national_id_hash TEXT,
  shares_count INTEGER DEFAULT 0,
  share_value NUMERIC DEFAULT 0,
  total_value NUMERIC GENERATED ALWAYS AS (shares_count * share_value) STORED,
  status TEXT NOT NULL DEFAULT 'active',
  join_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.shareholders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage shareholders" ON public.shareholders FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read shareholders" ON public.shareholders FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_shareholders_updated_at BEFORE UPDATE ON public.shareholders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 13. COST_CENTERS
-- ============================================
CREATE TABLE public.cost_centers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  parent_id UUID REFERENCES public.cost_centers(id),
  budget NUMERIC DEFAULT 0,
  spent_amount NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.cost_centers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage cost_centers" ON public.cost_centers FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read cost_centers" ON public.cost_centers FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_cost_centers_updated_at BEFORE UPDATE ON public.cost_centers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 14. BANK_ACCOUNTS
-- ============================================
CREATE TABLE public.bank_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  iban TEXT,
  currency TEXT DEFAULT 'SAR',
  balance NUMERIC DEFAULT 0,
  account_type TEXT DEFAULT 'current',
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage bank_accounts" ON public.bank_accounts FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read bank_accounts" ON public.bank_accounts FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_bank_accounts_updated_at BEFORE UPDATE ON public.bank_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 15. BUDGETS
-- ============================================
CREATE TABLE public.budgets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL,
  fiscal_year INTEGER NOT NULL,
  total_amount NUMERIC DEFAULT 0,
  spent_amount NUMERIC DEFAULT 0,
  remaining_amount NUMERIC GENERATED ALWAYS AS (total_amount - spent_amount) STORED,
  status TEXT NOT NULL DEFAULT 'draft',
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage budgets" ON public.budgets FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read budgets" ON public.budgets FOR SELECT TO authenticated USING (true);
CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON public.budgets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 16. MAIL_MESSAGES
-- ============================================
CREATE TABLE public.mail_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  sender_id UUID NOT NULL,
  sender_name TEXT,
  recipient_id UUID,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  body TEXT,
  is_read BOOLEAN DEFAULT false,
  is_draft BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  is_starred BOOLEAN DEFAULT false,
  parent_id UUID REFERENCES public.mail_messages(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.mail_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own mail" ON public.mail_messages FOR SELECT TO authenticated USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send mail" ON public.mail_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update own mail" ON public.mail_messages FOR UPDATE TO authenticated USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Admins can manage all mail" ON public.mail_messages FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER update_mail_messages_updated_at BEFORE UPDATE ON public.mail_messages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 17. ACTIVITIES
-- ============================================
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  assigned_to UUID,
  assigned_to_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  start_date DATE,
  end_date DATE,
  completion_percentage INTEGER DEFAULT 0,
  budget NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage activities" ON public.activities FOR ALL TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Authenticated can read activities" ON public.activities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create activities" ON public.activities FOR INSERT TO authenticated WITH CHECK (true);
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- ENABLE REALTIME for key tables
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mail_messages;
