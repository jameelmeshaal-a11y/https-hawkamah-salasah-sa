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
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const projectsManagementSections: SubSection[] = [
  {
    title: "مرحلة التجهيز واللجه",
    items: [
      { title: "إضافة مشروع جديد", icon: FolderPlus },
      { title: "تحديد بيانات مشروع", icon: FileEdit },
      { title: "قواعد بيانات المشاريع", icon: Database },
    ],
  },
  {
    title: "مرحلة الإعداد و التخطيط",
    items: [
      { title: "إدارة مهام المشروع", icon: ListTodo },
      { title: "إدارة أنشطة المشروع", icon: Activity },
      { title: "إدارة العقود و الدفعات", icon: FileSignature },
      { title: "إدارة ميزانية المشروع", icon: Wallet },
    ],
  },
  {
    title: "مرحلة التنفيذ",
    items: [
      { title: "تسجيل إيراد مشروع", icon: Receipt },
      { title: "تسجيل صرف مشروع", icon: CreditCard },
      { title: "إلحاق مستفيدين بمشروع", icon: UserPlus },
      { title: "إدارة تقارير المشاريع", icon: FileBarChart },
    ],
  },
  {
    title: "مرحلة المتابعة و التحكم",
    items: [
      { title: "لوحة مديرين المشروعات", icon: LayoutDashboard },
      { title: "لوحة المتابعة", icon: Eye },
      { title: "إدارة مخطط المشروع", icon: GitBranch },
      { title: "لوحة كانبان", icon: Kanban },
      { title: "تقرير مؤشرات الأداء", icon: TrendingUp },
      { title: "إحصائيات المشروع", icon: PieChart },
      { title: "قواعد بيانات المشروع", icon: Layers },
    ],
  },
  {
    title: "مرحلة الإغلاق و التقييم",
    items: [
      { title: "تحويل رصيد مشروع", icon: ArrowRightLeft },
      { title: "إكمال مشروع", icon: CheckCircle2 },
      { title: "فتح مشروع مكتمل", icon: FolderOpen },
      { title: "حذف مشروع", icon: Trash2 },
      { title: "استعادة مشروع محذوف", icon: RotateCcw },
    ],
  },
  {
    title: "إدارة الموردين",
    items: [
      { title: "إدارة حسابات الموردين", icon: Building2 },
      { title: "قاعدة بيانات الموردين", icon: Search },
      { title: "حذف حساب مورد", icon: UserX },
      { title: "استعادة حساب مورد", icon: UserCheck },
    ],
  },
  {
    title: "إدارة المشاريع التأهيلية",
    items: [
      { title: "مستفيدين بحاجة للتأهيل", icon: Users },
      { title: "رأي إدارة التأهيل", icon: MessageSquare },
      { title: "تسجيل مشروع مستفيد", icon: FolderKanban },
      { title: "قاعدة بيانات المشاريع", icon: Database },
      { title: "قاعدة بيانات الأقساط", icon: CalendarClock },
      { title: "المتأخرين عن السداد", icon: AlertTriangle },
      { title: "قاعدة بيانات المسددين", icon: Wallet },
      { title: "تقارير المشاريع التأهيلية", icon: ClipboardList },
      { title: "قاعدة بيانات المؤهلين", icon: GraduationCap },
    ],
  },
];
