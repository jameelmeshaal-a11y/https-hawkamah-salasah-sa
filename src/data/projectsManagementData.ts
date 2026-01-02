import {
  FolderPlus,
  FileEdit,
  Database,
  ListTodo,
  Activity,
  FileSignature,
  Receipt,
  CreditCard,
  UserPlus,
  FileBarChart,
  LayoutDashboard,
  Eye,
  GitBranch,
  Kanban,
  TrendingUp,
  PieChart,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  FolderOpen,
  Trash2,
  RotateCcw,
  Building2,
  Search,
  UserX,
  UserCheck,
  Users,
  MessageSquare,
  FolderKanban,
  CalendarClock,
  AlertTriangle,
  Wallet,
  ClipboardList,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SubItem {
  title: string;
  icon: LucideIcon;
  slug?: string;
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const projectsManagementSections: SubSection[] = [
  {
    title: "مرحلة التجهيز واللجه",
    items: [
      { title: "إضافة مشروع جديد", icon: FolderPlus, slug: "add-new-project" },
      { title: "تحديد بيانات مشروع", icon: FileEdit, slug: "define-project-data" },
      { title: "قواعد بيانات المشاريع", icon: Database, slug: "projects-database" },
    ],
  },
  {
    title: "مرحلة الإعداد و التخطيط",
    items: [
      { title: "إدارة مهام المشروع", icon: ListTodo, slug: "manage-project-tasks" },
      { title: "إدارة أنشطة المشروع", icon: Activity, slug: "manage-project-activities" },
      { title: "إدارة العقود و الدفعات", icon: FileSignature, slug: "manage-contracts-payments" },
      { title: "إدارة ميزانية المشروع", icon: Wallet, slug: "manage-project-budget" },
    ],
  },
  {
    title: "مرحلة التنفيذ",
    items: [
      { title: "تسجيل إيراد مشروع", icon: Receipt, slug: "register-project-revenue" },
      { title: "تسجيل صرف مشروع", icon: CreditCard, slug: "register-project-expense" },
      { title: "إلحاق مستفيدين بمشروع", icon: UserPlus, slug: "assign-beneficiaries-project" },
      { title: "إدارة تقارير المشاريع", icon: FileBarChart, slug: "manage-project-reports" },
    ],
  },
  {
    title: "مرحلة المتابعة و التحكم",
    items: [
      { title: "لوحة مديرين المشروعات", icon: LayoutDashboard, slug: "project-managers-dashboard" },
      { title: "لوحة المتابعة", icon: Eye, slug: "project-monitoring-board" },
      { title: "إدارة مخطط المشروع", icon: GitBranch, slug: "manage-project-plan" },
      { title: "لوحة كانبان", icon: Kanban, slug: "project-kanban-board" },
      { title: "تقرير مؤشرات الأداء", icon: TrendingUp, slug: "project-kpis-report" },
      { title: "إحصائيات المشروع", icon: PieChart, slug: "project-statistics" },
      { title: "قواعد بيانات المشروع", icon: Layers, slug: "project-databases" },
    ],
  },
  {
    title: "مرحلة الإغلاق و التقييم",
    items: [
      { title: "تحويل رصيد مشروع", icon: ArrowRightLeft, slug: "transfer-project-balance" },
      { title: "إكمال مشروع", icon: CheckCircle2, slug: "complete-project" },
      { title: "فتح مشروع مكتمل", icon: FolderOpen, slug: "reopen-completed-project" },
      { title: "حذف مشروع", icon: Trash2, slug: "delete-project" },
      { title: "استعادة مشروع محذوف", icon: RotateCcw, slug: "restore-deleted-project" },
    ],
  },
  {
    title: "إدارة الموردين",
    items: [
      { title: "إدارة حسابات الموردين", icon: Building2, slug: "manage-suppliers-accounts" },
      { title: "قاعدة بيانات الموردين", icon: Search, slug: "suppliers-database" },
      { title: "حذف حساب مورد", icon: UserX, slug: "delete-supplier-account" },
      { title: "استعادة حساب مورد", icon: UserCheck, slug: "restore-supplier-account" },
    ],
  },
  {
    title: "إدارة المشاريع التأهيلية",
    items: [
      { title: "مستفيدين بحاجة للتأهيل", icon: Users, slug: "beneficiaries-need-rehabilitation" },
      { title: "رأي إدارة التأهيل", icon: MessageSquare, slug: "rehabilitation-management-opinion" },
      { title: "تسجيل مشروع مستفيد", icon: FolderKanban, slug: "register-beneficiary-project" },
      { title: "قاعدة بيانات المشاريع", icon: Database, slug: "rehabilitation-projects-database" },
      { title: "قاعدة بيانات الأقساط", icon: CalendarClock, slug: "installments-database" },
      { title: "المتأخرين عن السداد", icon: AlertTriangle, slug: "late-payers" },
      { title: "قاعدة بيانات المسددين", icon: Wallet, slug: "payers-database" },
      { title: "تقارير المشاريع التأهيلية", icon: ClipboardList, slug: "rehabilitation-projects-reports" },
      { title: "قاعدة بيانات المؤهلين", icon: GraduationCap, slug: "qualified-database" },
    ],
  },
];
