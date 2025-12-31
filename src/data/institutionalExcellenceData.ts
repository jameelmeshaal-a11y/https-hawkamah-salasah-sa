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
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const institutionalExcellenceSections: SubSection[] = [
  {
    title: "إدارة الحوكمة",
    items: [
      { title: "اللوائح و السياسات", icon: FileText },
      { title: "الإجراءات و التعليمات", icon: ClipboardCheck },
      { title: "النماذج و القوالب", icon: FileSearch },
      { title: "الصلاحيات", icon: Shield },
      { title: "لجان الجمعية", icon: Users },
      { title: "المخاطر و الإلتزام", icon: Scale },
      { title: "الهيكل التنظيمي", icon: Building2 },
    ],
  },
  {
    title: "إدارة الخطة الإستراتيجية",
    items: [
      { title: "الرؤية", icon: Compass },
      { title: "الرسالة", icon: Target },
      { title: "القيم", icon: Flag },
      { title: "الأهداف الإستراتيجية", icon: TrendingUp },
      { title: "المؤشرات الإستراتيجية", icon: BarChart3 },
      { title: "المبادرات الإستراتيجية", icon: Lightbulb },
      { title: "المشاريع الإستراتيجية", icon: Milestone },
      { title: "الخطط التشغيلية", icon: CalendarCheck },
      { title: "متابعة الأهداف", icon: CheckCircle2 },
      { title: "متابعة المؤشرات", icon: Gauge },
      { title: "متابعة المبادرات", icon: ListChecks },
      { title: "متابعة المشاريع", icon: Activity },
      { title: "التقارير الإستراتيجية", icon: FileBarChart },
      { title: "لوحة المؤشرات", icon: PieChart },
      { title: "إعدادات الخطة", icon: Target },
    ],
  },
];
