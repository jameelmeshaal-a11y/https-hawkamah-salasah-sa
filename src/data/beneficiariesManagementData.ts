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
  slug?: string;
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const beneficiariesManagementSections: SubSection[] = [
  {
    title: "إدارة ملفات المستفيدين",
    items: [
      { title: "إضافة مستفيد جديد", icon: UserPlus, slug: "add-beneficiary" },
      { title: "قائمة المستفيدين", icon: Users, slug: "beneficiaries-list" },
      { title: "البحث عن مستفيد", icon: Search, slug: "search-beneficiary" },
      { title: "المستفيدين النشطين", icon: UserCheck, slug: "active-beneficiaries" },
      { title: "المستفيدين المتوقفين", icon: UserX, slug: "stopped-beneficiaries" },
      { title: "المستفيدين المعلقين", icon: UserMinus, slug: "suspended-beneficiaries" },
      { title: "أرشيف المستفيدين", icon: Archive, slug: "beneficiaries-archive" },
      { title: "تصنيفات المستفيدين", icon: FolderOpen, slug: "beneficiaries-categories" },
      { title: "مستندات المستفيدين", icon: FileText, slug: "beneficiaries-documents" },
      { title: "تقارير المستفيدين", icon: ClipboardList, slug: "beneficiaries-reports" },
      { title: "إعدادات ملفات المستفيدين", icon: Settings, slug: "beneficiaries-files-settings" },
      { title: "صلاحيات إدارة المستفيدين", icon: Shield, slug: "beneficiaries-permissions" },
      { title: "استيراد بيانات المستفيدين", icon: Upload, slug: "import-beneficiaries" },
      { title: "تصدير بيانات المستفيدين", icon: Download, slug: "export-beneficiaries" },
    ],
  },
  {
    title: "إدارة ملفات الأوصياء",
    items: [
      { title: "إضافة وصي جديد", icon: UserPlus, slug: "add-guardian" },
      { title: "قائمة الأوصياء", icon: Users, slug: "guardians-list" },
      { title: "البحث عن وصي", icon: Search, slug: "search-guardian" },
      { title: "ربط الوصي بالمستفيدين", icon: Link, slug: "link-guardian-beneficiaries" },
      { title: "مستندات الأوصياء", icon: FileText, slug: "guardians-documents" },
      { title: "تقارير الأوصياء", icon: ClipboardList, slug: "guardians-reports" },
    ],
  },
  {
    title: "إدارة تحديث البيانات",
    items: [
      { title: "طلبات تحديث البيانات", icon: RefreshCw, slug: "data-update-requests" },
      { title: "تحديث البيانات الشخصية", icon: UserCog, slug: "update-personal-data" },
      { title: "تحديث بيانات التواصل", icon: Phone, slug: "update-contact-data" },
      { title: "تحديث العناوين", icon: MapPin, slug: "update-addresses" },
      { title: "تحديث المستندات", icon: FileEdit, slug: "update-documents" },
      { title: "مراجعة التحديثات", icon: FileCheck, slug: "review-updates" },
      { title: "اعتماد التحديثات", icon: ClipboardCheck, slug: "approve-updates" },
      { title: "التحديثات المعلقة", icon: Clock, slug: "pending-updates" },
      { title: "سجل التحديثات", icon: History, slug: "updates-history" },
      { title: "تنبيهات التحديث", icon: AlertCircle, slug: "update-alerts" },
      { title: "التحقق من البيانات", icon: BadgeCheck, slug: "verify-data" },
      { title: "تقارير التحديثات", icon: FileSearch, slug: "updates-reports" },
      { title: "إعدادات التحديث", icon: Settings, slug: "updates-settings" },
    ],
  },
  {
    title: "إدارة الجهات المستفيدة",
    items: [
      { title: "إضافة جهة مستفيدة", icon: Building2, slug: "add-beneficiary-entity" },
      { title: "قائمة الجهات المستفيدة", icon: Briefcase, slug: "beneficiary-entities-list" },
      { title: "البحث عن جهة", icon: Search, slug: "search-entity" },
      { title: "مستندات الجهات", icon: FileText, slug: "entities-documents" },
      { title: "تقارير الجهات المستفيدة", icon: ClipboardList, slug: "entities-reports" },
      { title: "أرشيف الجهات", icon: Archive, slug: "entities-archive" },
      { title: "إعدادات الجهات المستفيدة", icon: Settings, slug: "entities-settings" },
    ],
  },
];
