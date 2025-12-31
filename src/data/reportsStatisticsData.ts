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
      { title: "تقارير المستفيدين", icon: Users },
      { title: "تقارير مصادر دخل المستفيدين", icon: Wallet },
      { title: "تقارير التابعين", icon: UserPlus },
      { title: "تقارير الموظفين", icon: Briefcase },
      { title: "تقارير طلبات الإعانة", icon: FileText },
      { title: "تقارير المهام", icon: ClipboardList },
      { title: "تقارير الكفالتين", icon: Heart },
      { title: "تقارير الداعمين", icon: HandHeart },
      { title: "تقارير الجمعية العمومية", icon: Building2 },
      { title: "تقارير المشاريع", icon: FolderKanban },
      { title: "تقارير الفعاليات", icon: Calendar },
      { title: "تقارير الشراكات", icon: Handshake },
      { title: "تقارير الزيارات", icon: MapPin },
      { title: "تقارير الكفالات", icon: HeartHandshake },
      { title: "تقارير التسويق", icon: Megaphone },
      { title: "تقارير الصادر و الوارد", icon: Mail },
      { title: "تقارير حسابات الموقع", icon: Globe },
      { title: "تقارير أوامر الصرف", icon: Receipt },
      { title: "تقارير متابعة الحالات", icon: Activity },
      { title: "تقارير البرامج", icon: LayoutList },
      { title: "تقارير المشاريع التأهيلية", icon: GraduationCap },
      { title: "تقارير المقبوضات", icon: ArrowDownCircle },
      { title: "تقارير المصروفات", icon: ArrowUpCircle },
      { title: "تقارير طلاب التحفيظ", icon: BookOpen },
      { title: "تقارير الطلاب المتعثرين", icon: UserX },
      { title: "تقارير حلقات التحفيظ", icon: Users },
      { title: "التقارير المالية للمشاريع", icon: FileBarChart },
      { title: "تقارير إحصائيات جووجل", icon: BarChart3 },
    ],
  },
  {
    title: "إحصائيات النظام",
    items: [
      { title: "إحصائيات المستفيدين", icon: PieChart },
      { title: "إحصائيات التابعين", icon: Users },
      { title: "إحصائيات الأيتام و الكفالات", icon: Heart },
      { title: "إحصائيات طلبات الإعانة", icon: FileText },
      { title: "إحصائيات المشاريع", icon: BarChart3 },
      { title: "إحصائيات المهام", icon: ClipboardCheck },
      { title: "الإحصائيات المالية", icon: DollarSign },
      { title: "إحصائيات الفرى - الأحياء", icon: MapPin },
    ],
  },
];
