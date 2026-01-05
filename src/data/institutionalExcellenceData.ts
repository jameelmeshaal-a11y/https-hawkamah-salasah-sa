import {
  ClipboardCheck,
  FileSearch,
  Building2,
  FileBarChart,
  Calculator,
  ListChecks,
  BarChart3,
  FileText,
  Settings,
  RefreshCw,
  Layers,
  Target,
  Gauge,
  CircleDot,
  UserCheck,
  Activity,
  BarChart2,
  Map,
  Network,
  TrendingUp,
  Globe,
  type LucideIcon,
} from "lucide-react";

export interface SubItem {
  title: string;
  icon: LucideIcon;
  slug?: string;
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const institutionalExcellenceSections: SubSection[] = [
  {
    title: "إدارة الحوكمة",
    items: [
      { title: "تسجيل إجابات المعايير", icon: ClipboardCheck, slug: "standards-answers" },
      { title: "إدارة مرفقات التحقق", icon: FileSearch, slug: "verification-attachments" },
      { title: "نموذج تقييم الحوكمة", icon: Building2, slug: "governance-evaluation-form" },
      { title: "تقرير تقييم الحوكمة", icon: FileBarChart, slug: "governance-evaluation-report" },
      { title: "حساب مؤشرات الأداء المالي", icon: Calculator, slug: "financial-performance-indicators" },
      { title: "إدارة مهام الحوكمة", icon: ListChecks, slug: "governance-tasks" },
      { title: "إحصائيات مهام الحوكمة", icon: BarChart3, slug: "governance-tasks-stats" },
    ],
  },
  {
    title: "إدارة الخطة الإستراتيجية",
    items: [
      { title: "إدارة الخطط الإستراتيجية", icon: FileText, slug: "strategic-plans-management" },
      { title: "متغيرات الخطة الإستراتيجية", icon: Settings, slug: "strategic-plan-variables" },
      { title: "تحديث قيم التحقق المؤتمتة", icon: RefreshCw, slug: "automated-verification-values" },
      { title: "إدارة مناظير الخطة", icon: Layers, slug: "plan-perspectives" },
      { title: "إدارة الأهداف الإستراتيجية", icon: Target, slug: "strategic-goals-management" },
      { title: "إدارة المؤشرات الرئيسية", icon: Gauge, slug: "main-indicators-management" },
      { title: "إدارة المؤشرات الفرعية", icon: CircleDot, slug: "sub-indicators-management" },
      { title: "إدارة المؤشرات المملوكة", icon: UserCheck, slug: "owned-indicators-management" },
      { title: "إدارة مؤشرات البرامج", icon: Activity, slug: "programs-indicators" },
      { title: "إدارة مؤشرات المشاريع", icon: BarChart2, slug: "projects-indicators" },
      { title: "خارطة الخطة الإستراتيجية", icon: Map, slug: "strategic-plan-map" },
      { title: "شجرة الخطة الإستراتيجية", icon: Network, slug: "strategic-plan-tree" },
      { title: "بناء تقرير للخطة", icon: FileBarChart, slug: "plan-report-builder" },
      { title: "تناغم أهداف رؤية 2030", icon: TrendingUp, slug: "vision-2030-alignment" },
      { title: "تناغم أهداف التنمية المستدامة", icon: Globe, slug: "sustainable-development-goals" },
    ],
  },
];
