import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  UserMinus,
  UserCog,
  FileText,
  FileSearch,
  FilePlus,
  FileEdit,
  FileCheck,
  FolderOpen,
  Search,
  RefreshCw,
  ClipboardList,
  ClipboardCheck,
  Database,
  Settings,
  Shield,
  Building2,
  Briefcase,
  BadgeCheck,
  AlertCircle,
  History,
  Upload,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Eye,
  Edit,
  Trash2,
  Archive,
  Link,
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

export const beneficiariesManagementSections: SubSection[] = [
  {
    title: "إدارة ملفات المستفيدين",
    items: [
      { title: "إضافة مستفيد جديد", icon: UserPlus },
      { title: "قائمة المستفيدين", icon: Users },
      { title: "البحث عن مستفيد", icon: Search },
      { title: "المستفيدين النشطين", icon: UserCheck },
      { title: "المستفيدين المتوقفين", icon: UserX },
      { title: "المستفيدين المعلقين", icon: UserMinus },
      { title: "أرشيف المستفيدين", icon: Archive },
      { title: "تصنيفات المستفيدين", icon: FolderOpen },
      { title: "مستندات المستفيدين", icon: FileText },
      { title: "تقارير المستفيدين", icon: ClipboardList },
      { title: "إعدادات ملفات المستفيدين", icon: Settings },
      { title: "صلاحيات إدارة المستفيدين", icon: Shield },
      { title: "استيراد بيانات المستفيدين", icon: Upload },
      { title: "تصدير بيانات المستفيدين", icon: Download },
    ],
  },
  {
    title: "إدارة ملفات الأوصياء",
    items: [
      { title: "إضافة وصي جديد", icon: UserPlus },
      { title: "قائمة الأوصياء", icon: Users },
      { title: "البحث عن وصي", icon: Search },
      { title: "ربط الوصي بالمستفيدين", icon: Link },
      { title: "مستندات الأوصياء", icon: FileText },
      { title: "تقارير الأوصياء", icon: ClipboardList },
    ],
  },
  {
    title: "إدارة تحديث البيانات",
    items: [
      { title: "طلبات تحديث البيانات", icon: RefreshCw },
      { title: "تحديث البيانات الشخصية", icon: UserCog },
      { title: "تحديث بيانات التواصل", icon: Phone },
      { title: "تحديث العناوين", icon: MapPin },
      { title: "تحديث المستندات", icon: FileEdit },
      { title: "مراجعة التحديثات", icon: FileCheck },
      { title: "اعتماد التحديثات", icon: ClipboardCheck },
      { title: "التحديثات المعلقة", icon: Clock },
      { title: "سجل التحديثات", icon: History },
      { title: "تنبيهات التحديث", icon: AlertCircle },
      { title: "التحقق من البيانات", icon: BadgeCheck },
      { title: "تقارير التحديثات", icon: FileSearch },
      { title: "إعدادات التحديث", icon: Settings },
    ],
  },
  {
    title: "إدارة الجهات المستفيدة",
    items: [
      { title: "إضافة جهة مستفيدة", icon: Building2 },
      { title: "قائمة الجهات المستفيدة", icon: Briefcase },
      { title: "البحث عن جهة", icon: Search },
      { title: "مستندات الجهات", icon: FileText },
      { title: "تقارير الجهات المستفيدة", icon: ClipboardList },
      { title: "أرشيف الجهات", icon: Archive },
      { title: "إعدادات الجهات المستفيدة", icon: Settings },
    ],
  },
];
