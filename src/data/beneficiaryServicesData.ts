import {
  FileText,
  FilePlus,
  FileSearch,
  FileCheck,
  FileX,
  FileClock,
  FileOutput,
  FileInput,
  Printer,
  CreditCard,
  Wallet,
  Receipt,
  HandCoins,
  Users,
  UserPlus,
  UserCheck,
  UserX,
  UserCog,
  Heart,
  HeartHandshake,
  Gift,
  Package,
  ShoppingCart,
  ShoppingBag,
  ClipboardList,
  ClipboardCheck,
  ListChecks,
  Settings,
  RefreshCw,
  Building,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  type LucideIcon,
} from "lucide-react";

interface SubItem {
  title: string;
  icon: LucideIcon;
  slug?: string;
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const beneficiaryServicesSections: SubSection[] = [
  {
    title: "إدارة طلبات الإعانة",
    items: [
      { title: "إعدادات طلبات الإعانة", icon: Settings, slug: "aid-requests-settings" },
      { title: "إضافة طلب إعانة جديد", icon: FilePlus, slug: "add-aid-request" },
      { title: "مشاركة الطلبات", icon: Send, slug: "share-aid-requests" },
      { title: "سجل طلبات الإعانة", icon: FileText, slug: "aid-requests-records" },
      { title: "طلبات الإعانة المعلقة", icon: Clock, slug: "pending-aid-requests" },
      { title: "طلبات الإعانة المعتمدة", icon: CheckCircle, slug: "approved-aid-requests" },
      { title: "طلبات الإعانة المرفوضة", icon: XCircle, slug: "rejected-aid-requests" },
      { title: "طلبات الإعانة المفوترة", icon: Receipt, slug: "invoiced-aid-requests" },
      { title: "طلبات الإعانة المنتهية", icon: FileCheck, slug: "completed-aid-requests" },
      { title: "طلبات الإعانة الملغية", icon: FileX, slug: "cancelled-aid-requests" },
      { title: "أرشيف طلبات الإعانة", icon: FileClock, slug: "aid-requests-archive" },
    ],
  },
  {
    title: "إدارة أوامر الصرف",
    items: [
      { title: "إعدادات أوامر الصرف", icon: Settings, slug: "disbursement-orders-settings" },
      { title: "إضافة أمر صرف جديد", icon: FilePlus, slug: "add-disbursement-order" },
      { title: "سجل أوامر الصرف", icon: FileText, slug: "disbursement-orders-records" },
      { title: "أوامر الصرف المعلقة", icon: Clock, slug: "pending-disbursement-orders" },
      { title: "أوامر الصرف المعتمدة", icon: CheckCircle, slug: "approved-disbursement-orders" },
      { title: "أوامر الصرف المرفوضة", icon: XCircle, slug: "rejected-disbursement-orders" },
      { title: "أوامر الصرف المنتهية", icon: FileCheck, slug: "completed-disbursement-orders" },
      { title: "أرشيف أوامر الصرف", icon: FileClock, slug: "disbursement-orders-archive" },
    ],
  },
  {
    title: "إدارة الكفالات",
    items: [
      { title: "إعدادات الكفالات", icon: Settings, slug: "sponsorships-settings" },
      { title: "إضافة طلب كفالة جديد", icon: FilePlus, slug: "add-sponsorship-request" },
      { title: "سجل طلبات الكفالات", icon: FileText, slug: "sponsorship-requests-records" },
      { title: "طلبات الكفالات المعلقة", icon: Clock, slug: "pending-sponsorship-requests" },
      { title: "طلبات الكفالات المعتمدة", icon: CheckCircle, slug: "approved-sponsorship-requests" },
      { title: "طلبات الكفالات المرفوضة", icon: XCircle, slug: "rejected-sponsorship-requests" },
      { title: "طلبات الكفالات المنتهية", icon: FileCheck, slug: "completed-sponsorship-requests" },
      { title: "أرشيف طلبات الكفالات", icon: FileClock, slug: "sponsorship-requests-archive" },
      { title: "إضافة كفالة جديدة", icon: HeartHandshake, slug: "add-sponsorship" },
      { title: "سجل الكفالات", icon: ClipboardList, slug: "sponsorships-records" },
      { title: "الكفالات النشطة", icon: Heart, slug: "active-sponsorships" },
      { title: "الكفالات المعلقة", icon: Clock, slug: "pending-sponsorships" },
      { title: "الكفالات المنتهية", icon: FileCheck, slug: "ended-sponsorships" },
      { title: "الكفالات الملغية", icon: FileX, slug: "cancelled-sponsorships" },
      { title: "أرشيف الكفالات", icon: FileClock, slug: "sponsorships-archive" },
      { title: "سجل تجديد الكفالات", icon: RefreshCw, slug: "sponsorship-renewals-records" },
      { title: "تجديدات الكفالات المعلقة", icon: Clock, slug: "pending-sponsorship-renewals" },
      { title: "تجديدات الكفالات المعتمدة", icon: CheckCircle, slug: "approved-sponsorship-renewals" },
      { title: "تجديدات الكفالات المرفوضة", icon: XCircle, slug: "rejected-sponsorship-renewals" },
      { title: "تجديدات الكفالات المنتهية", icon: FileCheck, slug: "completed-sponsorship-renewals" },
      { title: "أرشيف تجديد الكفالات", icon: FileClock, slug: "sponsorship-renewals-archive" },
      { title: "تقارير الكفالات", icon: FileSearch, slug: "sponsorships-reports" },
    ],
  },
  {
    title: "إدارة طلبات الجهات",
    items: [
      { title: "طلبات الجهات", icon: Building, slug: "entity-requests" },
      { title: "أرشيف طلبات الجهات", icon: FileClock, slug: "entity-requests-archive" },
    ],
  },
  {
    title: "إدارة السلل الشرائية",
    items: [
      { title: "إضافة سلة شرائية جديدة", icon: ShoppingCart, slug: "add-shopping-basket" },
      { title: "سجل السلل الشرائية", icon: ClipboardList, slug: "shopping-baskets-records" },
      { title: "السلل الشرائية النشطة", icon: ShoppingBag, slug: "active-shopping-baskets" },
      { title: "أرشيف السلل الشرائية", icon: Package, slug: "shopping-baskets-archive" },
    ],
  },
];
