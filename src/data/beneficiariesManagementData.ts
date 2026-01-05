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
  CreditCard,
  ScanLine,
  Globe,
  ArrowLeftRight,
  ListChecks,
  CheckCircle,
  XCircle,
  FileWarning,
  FileInput,
  RotateCcw,
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
      { title: "إضافة ملف مستفيد", icon: UserPlus, slug: "add-beneficiary-file" },
      { title: "تحديث ملف مستفيد", icon: UserCog, slug: "update-beneficiary-file" },
      { title: "حذف ملف مستفيد", icon: Trash2, slug: "delete-beneficiary-file" },
      { title: "قاعدة بيانات المستفيدين", icon: Database, slug: "beneficiaries-database" },
      { title: "قاعدة بيانات التابعين", icon: Users, slug: "dependents-database" },
      { title: "تحديث حالة ملف مستفيد", icon: RefreshCw, slug: "update-beneficiary-status" },
      { title: "تحديث فئة ملف مستفيد", icon: FolderOpen, slug: "update-beneficiary-category" },
      { title: "تحديث فئة ملف تابع", icon: FileEdit, slug: "update-dependent-category" },
      { title: "سجل الملفات المحذوفة", icon: Archive, slug: "deleted-files-log" },
      { title: "ملفات التابعين المحذوفين", icon: UserX, slug: "deleted-dependents-files" },
      { title: "تصدير بطاقات المستفيدين", icon: CreditCard, slug: "export-beneficiary-cards" },
      { title: "قارئ باركود الملفات", icon: ScanLine, slug: "files-barcode-reader" },
      { title: "طلبات الانضمام من الموقع", icon: Globe, slug: "website-join-requests" },
      { title: "البحث في الجمعيات", icon: Search, slug: "associations-search" },
    ],
  },
  {
    title: "إدارة ملفات الأوصياء",
    items: [
      { title: "إدارة حسابات الأوصياء", icon: UserCog, slug: "manage-guardians-accounts" },
      { title: "قاعدة بيانات الأوصياء", icon: Database, slug: "guardians-database" },
      { title: "تحويل مستفيد إلى وصي", icon: UserCheck, slug: "convert-beneficiary-to-guardian" },
      { title: "تحويل وصي إلى مستفيد", icon: UserMinus, slug: "convert-guardian-to-beneficiary" },
      { title: "حذف ملف وصي", icon: Trash2, slug: "delete-guardian-file" },
      { title: "سجل الأوصياء المحذوفين", icon: History, slug: "deleted-guardians-log" },
    ],
  },
  {
    title: "إدارة تحديث البيانات",
    items: [
      { title: "إنشاء مهمة تحديث جماعي", icon: FilePlus, slug: "create-group-update-task" },
      { title: "إدارة مهام التحديث الجماعي", icon: ListChecks, slug: "manage-group-update-tasks" },
      { title: "اعتمادات التحديث الجماعي", icon: CheckCircle, slug: "group-update-approvals" },
      { title: "مهام التحديث الجماعي", icon: ClipboardList, slug: "group-update-tasks" },
      { title: "إدارة طلبات التحديث الذاتي", icon: FileSearch, slug: "manage-self-update-requests" },
      { title: "طلبات التحديث الذاتي المستلمة", icon: FileInput, slug: "received-self-update-requests" },
      { title: "مهام اعتمادات التحديث الذاتي", icon: ClipboardCheck, slug: "self-update-approval-tasks" },
      { title: "تحديث ملف لطلب إعانة", icon: FileEdit, slug: "update-file-for-aid-request" },
      { title: "تحديث حالة بيانات مستفيد", icon: RefreshCw, slug: "update-beneficiary-data-status" },
      { title: "ملفات غير محدثة", icon: XCircle, slug: "not-updated-files" },
      { title: "ملفات محدثة خاطئة", icon: FileWarning, slug: "wrongly-updated-files" },
      { title: "ملفات تحديث ذاتي", icon: UserCheck, slug: "self-update-files" },
      { title: "ملفات تحديث ميداني", icon: MapPin, slug: "field-update-files" },
    ],
  },
  {
    title: "إدارة الجهات المستفيدة",
    items: [
      { title: "إدارة حسابات الجهات", icon: Building2, slug: "manage-entities-accounts" },
      { title: "إدارة حسابات الممثلين", icon: UserCog, slug: "manage-representatives-accounts" },
      { title: "حذف ملف جهة", icon: Trash2, slug: "delete-entity-file" },
      { title: "استعادة ملف جهة", icon: RotateCcw, slug: "restore-entity-file" },
      { title: "قاعدة بيانات الممثلين", icon: Users, slug: "representatives-database" },
      { title: "قاعدة بيانات الجهات", icon: Database, slug: "entities-database" },
      { title: "طلبات تسجيل الجهات", icon: FileText, slug: "entities-registration-requests" },
    ],
  },
];
