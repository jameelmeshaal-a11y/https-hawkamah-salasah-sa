import {
  ClipboardList,
  FileSearch,
  UserCheck,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Activity,
  Target,
  BarChart3,
  TrendingUp,
  ListChecks,
  Eye,
  FileEdit,
  Settings,
  Layers,
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

export const evaluationFollowupSections: SubSection[] = [
  {
    title: "إدارة متابعة الحالات",
    items: [
      { title: "إعدادات المتابعة", icon: Settings },
      { title: "أنواع زيارات المتابعة", icon: Layers },
      { title: "حالات المتابعة", icon: ClipboardList },
      { title: "خطط المتابعة", icon: Target },
      { title: "جدولة الزيارات", icon: Calendar },
      { title: "تنفيذ الزيارات", icon: CheckCircle },
      { title: "تقييم الحالات", icon: FileSearch },
      { title: "نتائج التقييم", icon: BarChart3 },
      { title: "توصيات المتابعة", icon: FileText },
      { title: "تقارير متابعة الحالات", icon: TrendingUp },
    ],
  },
  {
    title: "إدارة متابعة النشاطات",
    items: [
      { title: "إعدادات متابعة النشاطات", icon: Settings },
      { title: "خطط النشاطات", icon: Target },
      { title: "جدولة النشاطات", icon: Calendar },
      { title: "تنفيذ النشاطات", icon: Activity },
      { title: "متابعة التنفيذ", icon: Eye },
      { title: "تقييم النشاطات", icon: ListChecks },
      { title: "مؤشرات الأداء", icon: BarChart3 },
      { title: "تقارير النشاطات", icon: FileEdit },
    ],
  },
];
