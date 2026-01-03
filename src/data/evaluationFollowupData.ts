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
  slug?: string;
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const evaluationFollowupSections: SubSection[] = [
  {
    title: "إدارة متابعة الحالات",
    items: [
      { title: "إعدادات المتابعة", icon: Settings, slug: "followup-settings" },
      { title: "أنواع زيارات المتابعة", icon: Layers, slug: "visit-types" },
      { title: "حالات المتابعة", icon: ClipboardList, slug: "followup-cases" },
      { title: "خطط المتابعة", icon: Target, slug: "followup-plans" },
      { title: "جدولة الزيارات", icon: Calendar, slug: "schedule-visits" },
      { title: "تنفيذ الزيارات", icon: CheckCircle, slug: "execute-visits" },
      { title: "تقييم الحالات", icon: FileSearch, slug: "evaluate-cases" },
      { title: "نتائج التقييم", icon: BarChart3, slug: "evaluation-results" },
      { title: "توصيات المتابعة", icon: FileText, slug: "followup-recommendations" },
      { title: "تقارير متابعة الحالات", icon: TrendingUp, slug: "case-followup-reports-page" },
    ],
  },
  {
    title: "إدارة متابعة النشاطات",
    items: [
      { title: "إعدادات متابعة النشاطات", icon: Settings, slug: "activity-followup-settings" },
      { title: "خطط النشاطات", icon: Target, slug: "activity-plans" },
      { title: "جدولة النشاطات", icon: Calendar, slug: "schedule-activities" },
      { title: "تنفيذ النشاطات", icon: Activity, slug: "execute-activities" },
      { title: "متابعة التنفيذ", icon: Eye, slug: "execution-followup" },
      { title: "تقييم النشاطات", icon: ListChecks, slug: "evaluate-activities" },
      { title: "مؤشرات الأداء", icon: BarChart3, slug: "performance-indicators" },
      { title: "تقارير النشاطات", icon: FileEdit, slug: "activity-reports" },
    ],
  },
  {
    title: "إدارة متابعة النشاطات",
    items: [
      { title: "إضافة نشاط داعم", icon: UserCheck, slug: "add-support-activity" },
      { title: "إضافة نشاط كفالة", icon: FileText, slug: "add-sponsorship-activity" },
      { title: "إضافة نشاط كافل", icon: Users, slug: "add-sponsor-activity" },
      { title: "إضافة نشاط طلب إعانة", icon: ClipboardList, slug: "add-assistance-request-activity" },
      { title: "إضافة نشاط تابع", icon: Activity, slug: "add-dependent-activity" },
    ],
  },
];
