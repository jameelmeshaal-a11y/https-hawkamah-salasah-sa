import {
  Scale,
  FileText,
  Users,
  Building2,
  Shield,
  ClipboardCheck,
  FileSearch,
  Target,
  Compass,
  Flag,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  ListChecks,
  FileBarChart,
  PieChart,
  Activity,
  Gauge,
  Lightbulb,
  Milestone,
  CalendarCheck,
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
      { title: "اللوائح و السياسات", icon: FileText, slug: "regulations-policies" },
      { title: "الإجراءات و التعليمات", icon: ClipboardCheck, slug: "procedures-instructions" },
      { title: "النماذج و القوالب", icon: FileSearch, slug: "forms-templates" },
      { title: "الصلاحيات", icon: Shield, slug: "permissions" },
      { title: "لجان الجمعية", icon: Users, slug: "association-committees" },
      { title: "المخاطر و الإلتزام", icon: Scale, slug: "risks-compliance" },
      { title: "الهيكل التنظيمي", icon: Building2, slug: "org-structure" },
    ],
  },
  {
    title: "إدارة الخطة الإستراتيجية",
    items: [
      { title: "الرؤية", icon: Compass, slug: "vision" },
      { title: "الرسالة", icon: Target, slug: "mission" },
      { title: "القيم", icon: Flag, slug: "values" },
      { title: "الأهداف الإستراتيجية", icon: TrendingUp, slug: "strategic-goals" },
      { title: "المؤشرات الإستراتيجية", icon: BarChart3, slug: "strategic-indicators" },
      { title: "المبادرات الإستراتيجية", icon: Lightbulb, slug: "strategic-initiatives" },
      { title: "المشاريع الإستراتيجية", icon: Milestone, slug: "strategic-projects" },
      { title: "الخطط التشغيلية", icon: CalendarCheck, slug: "operational-plans" },
      { title: "متابعة الأهداف", icon: CheckCircle2, slug: "goals-tracking" },
      { title: "متابعة المؤشرات", icon: Gauge, slug: "indicators-tracking" },
      { title: "متابعة المبادرات", icon: ListChecks, slug: "initiatives-tracking" },
      { title: "متابعة المشاريع", icon: Activity, slug: "projects-tracking" },
      { title: "التقارير الإستراتيجية", icon: FileBarChart, slug: "strategic-reports" },
      { title: "لوحة المؤشرات", icon: PieChart, slug: "indicators-dashboard" },
      { title: "إعدادات الخطة", icon: Target, slug: "plan-settings" },
    ],
  },
];
