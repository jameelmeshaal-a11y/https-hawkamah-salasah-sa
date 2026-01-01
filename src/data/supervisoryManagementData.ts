import {
  Wallet,
  FileText,
  BadgeCheck,
  Shield,
  ClipboardCheck,
  Receipt,
  Briefcase,
  ShoppingCart,
  Wrench,
  Car,
  FileCheck,
  FileWarning,
  FileX,
  FolderOpen,
  Bell,
  BellOff,
  Database,
  BellMinus,
  FilePlus,
  Users,
  Trash2,
  CheckCircle,
  ArrowRightLeft,
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
  sectionSlug?: string;
  items: SubItem[];
}

export const supervisoryManagementSections: SubSection[] = [
  {
    title: "لجنة المساعدات",
    sectionSlug: "aid-committee",
    items: [
      { title: "إدارة رصيد لجنة المساعدات", icon: Wallet, slug: "aid-committee-balance" },
      { title: "نماذج قرارات لجنة المساعدات", icon: FileText, slug: "aid-committee-decisions" },
      { title: "اعتماد تعميدات الصرف", icon: BadgeCheck, slug: "approve-payment-confirmations" },
      { title: "اعتماد صرف الكفالات", icon: Shield, slug: "approve-sponsorship-payments" },
      { title: "اعتماد أوامر الصرف", icon: ClipboardCheck, slug: "payment-orders-approval" },
      { title: "اعتماد القسائم الشرائية", icon: Receipt, slug: "purchase-vouchers-approval" },
    ],
  },
  {
    title: "الطلبات قيد الاعتماد",
    sectionSlug: "pending-approval",
    items: [
      { title: "طلبات التوظيف", icon: Briefcase, slug: "employment-requests" },
      { title: "طلبات الشراء", icon: ShoppingCart, slug: "purchase-requests-approval" },
      { title: "طلبات الصيانة العامة", icon: Wrench, slug: "general-maintenance-requests" },
      { title: "طلبات صيانة السيارات", icon: Car, slug: "car-maintenance-requests" },
    ],
  },
  {
    title: "تعميدات الصرف",
    sectionSlug: "payment-confirmations",
    items: [
      { title: "إدارة تعميدات الصرف", icon: FileCheck, slug: "payment-confirmations-management" },
      { title: "التعميدات المرفوضة مع ملاحظة", icon: FileWarning, slug: "rejected-confirmations-with-note" },
      { title: "التعميدات المرفوضة نهائياً", icon: FileX, slug: "final-rejected-confirmations" },
      { title: "سجلات تعميدات الصرف", icon: FolderOpen, slug: "payment-confirmations-records" },
    ],
  },
  {
    title: "إدارة الإشعارات",
    sectionSlug: "notifications",
    items: [
      { title: "إدارة الإشعارات", icon: Bell, slug: "notifications-management" },
      { title: "إلغاء إشعار", icon: BellOff, slug: "cancel-notification" },
      { title: "قاعدة بيانات الإشعارات", icon: Database, slug: "notifications-database" },
      { title: "الإشعارات الملغاة", icon: BellMinus, slug: "cancelled-notifications" },
    ],
  },
  {
    title: "إدارة المهام",
    sectionSlug: "tasks-management",
    items: [
      { title: "إنشاء مهمة عامة", icon: FilePlus, slug: "create-general-task" },
      { title: "إدارة مهام الموظفين", icon: Users, slug: "manage-employee-tasks" },
      { title: "حذف مهمة", icon: Trash2, slug: "delete-task-supervision" },
      { title: "انجاز مهمة منتهية", icon: CheckCircle, slug: "complete-finished-task" },
      { title: "تحويل مهمة متعثرة", icon: ArrowRightLeft, slug: "transfer-stuck-task" },
      { title: "قواعد بيانات المهام", icon: Database, slug: "tasks-database" },
      { title: "استعادة مهمة محذوفة", icon: RotateCcw, slug: "restore-deleted-task" },
    ],
  },
];
