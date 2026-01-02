import { 
  Users, Wallet, UserPlus, Briefcase, FileText, ClipboardList, Heart, HandHeart, Building2,
  FolderKanban, Calendar, Handshake, MapPin, HeartHandshake, Megaphone, Mail, Globe, Receipt,
  Activity, LayoutList, GraduationCap, ArrowDownCircle, ArrowUpCircle, BookOpen, UserX,
  FileBarChart, BarChart3, PieChart, ClipboardCheck, DollarSign
} from "lucide-react";
import type { SubSection } from "./electronicOfficeData";

export const reportsStatisticsSections: SubSection[] = [
  {
    title: "تقارير النظام",
    items: [
      { title: "تقارير المستفيدين", icon: Users, slug: "beneficiaries-reports" },
      { title: "تقارير مصادر دخل المستفيدين", icon: Wallet, slug: "beneficiaries-income-reports" },
      { title: "تقارير التابعين", icon: UserPlus, slug: "dependents-reports" },
      { title: "تقارير الموظفين", icon: Briefcase, slug: "employees-reports" },
      { title: "تقارير طلبات الإعانة", icon: FileText, slug: "aid-requests-reports" },
      { title: "تقارير المهام", icon: ClipboardList, slug: "tasks-reports" },
      { title: "تقارير الكفالتين", icon: Heart, slug: "sponsors-reports" },
      { title: "تقارير الداعمين", icon: HandHeart, slug: "supporters-reports" },
      { title: "تقارير الجمعية العمومية", icon: Building2, slug: "general-assembly-reports" },
      { title: "تقارير المشاريع", icon: FolderKanban, slug: "projects-reports" },
      { title: "تقارير الفعاليات", icon: Calendar, slug: "events-reports" },
      { title: "تقارير الشراكات", icon: Handshake, slug: "partnerships-reports" },
      { title: "تقارير الزيارات", icon: MapPin, slug: "visits-reports" },
      { title: "تقارير الكفالات", icon: HeartHandshake, slug: "sponsorships-reports" },
      { title: "تقارير التسويق", icon: Megaphone, slug: "marketing-reports" },
      { title: "تقارير الصادر و الوارد", icon: Mail, slug: "mail-reports" },
      { title: "تقارير حسابات الموقع", icon: Globe, slug: "website-accounts-reports" },
      { title: "تقارير أوامر الصرف", icon: Receipt, slug: "disbursement-orders-reports" },
      { title: "تقارير متابعة الحالات", icon: Activity, slug: "case-followup-reports" },
      { title: "تقارير البرامج", icon: LayoutList, slug: "programs-reports" },
      { title: "تقارير المشاريع التأهيلية", icon: GraduationCap, slug: "rehabilitation-projects-reports" },
      { title: "تقارير المقبوضات", icon: ArrowDownCircle, slug: "receipts-reports" },
      { title: "تقارير المصروفات", icon: ArrowUpCircle, slug: "expenses-reports" },
      { title: "تقارير طلاب التحفيظ", icon: BookOpen, slug: "quran-students-reports" },
      { title: "تقارير الطلاب المتعثرين", icon: UserX, slug: "struggling-students-reports" },
      { title: "تقارير حلقات التحفيظ", icon: Users, slug: "quran-circles-reports" },
      { title: "التقارير المالية للمشاريع", icon: FileBarChart, slug: "projects-financial-reports" },
      { title: "تقارير إحصائيات جووجل", icon: BarChart3, slug: "google-analytics-reports" },
    ],
  },
  {
    title: "إحصائيات النظام",
    items: [
      { title: "إحصائيات المستفيدين", icon: PieChart, slug: "beneficiaries-statistics" },
      { title: "إحصائيات التابعين", icon: Users, slug: "dependents-statistics" },
      { title: "إحصائيات الأيتام و الكفالات", icon: Heart, slug: "orphans-sponsorships-statistics" },
      { title: "إحصائيات طلبات الإعانة", icon: FileText, slug: "aid-requests-statistics" },
      { title: "إحصائيات المشاريع", icon: BarChart3, slug: "projects-statistics" },
      { title: "إحصائيات المهام", icon: ClipboardCheck, slug: "tasks-statistics" },
      { title: "الإحصائيات المالية", icon: DollarSign, slug: "financial-statistics" },
      { title: "إحصائيات الفرى - الأحياء", icon: MapPin, slug: "neighborhoods-statistics" },
    ],
  },
];
