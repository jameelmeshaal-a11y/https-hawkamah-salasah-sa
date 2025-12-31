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
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const beneficiaryServicesSections: SubSection[] = [
  {
    title: "إدارة طلبات الإعانة",
    items: [
      { title: "إعدادات طلبات الإعانة", icon: Settings },
      { title: "إضافة طلب إعانة جديد", icon: FilePlus },
      { title: "مشاركة الطلبات", icon: Send },
      { title: "سجل طلبات الإعانة", icon: FileText },
      { title: "طلبات الإعانة المعلقة", icon: Clock },
      { title: "طلبات الإعانة المعتمدة", icon: CheckCircle },
      { title: "طلبات الإعانة المرفوضة", icon: XCircle },
      { title: "طلبات الإعانة المفوترة", icon: Receipt },
      { title: "طلبات الإعانة المنتهية", icon: FileCheck },
      { title: "طلبات الإعانة الملغية", icon: FileX },
      { title: "أرشيف طلبات الإعانة", icon: FileClock },
    ],
  },
  {
    title: "إدارة أوامر الصرف",
    items: [
      { title: "إعدادات أوامر الصرف", icon: Settings },
      { title: "إضافة أمر صرف جديد", icon: FilePlus },
      { title: "سجل أوامر الصرف", icon: FileText },
      { title: "أوامر الصرف المعلقة", icon: Clock },
      { title: "أوامر الصرف المعتمدة", icon: CheckCircle },
      { title: "أوامر الصرف المرفوضة", icon: XCircle },
      { title: "أوامر الصرف المنتهية", icon: FileCheck },
      { title: "أرشيف أوامر الصرف", icon: FileClock },
    ],
  },
  {
    title: "إدارة الكفالات",
    items: [
      { title: "إعدادات الكفالات", icon: Settings },
      { title: "إضافة طلب كفالة جديد", icon: FilePlus },
      { title: "سجل طلبات الكفالات", icon: FileText },
      { title: "طلبات الكفالات المعلقة", icon: Clock },
      { title: "طلبات الكفالات المعتمدة", icon: CheckCircle },
      { title: "طلبات الكفالات المرفوضة", icon: XCircle },
      { title: "طلبات الكفالات المنتهية", icon: FileCheck },
      { title: "أرشيف طلبات الكفالات", icon: FileClock },
      { title: "إضافة كفالة جديدة", icon: HeartHandshake },
      { title: "سجل الكفالات", icon: ClipboardList },
      { title: "الكفالات النشطة", icon: Heart },
      { title: "الكفالات المعلقة", icon: Clock },
      { title: "الكفالات المنتهية", icon: FileCheck },
      { title: "الكفالات الملغية", icon: FileX },
      { title: "أرشيف الكفالات", icon: FileClock },
      { title: "سجل تجديد الكفالات", icon: RefreshCw },
      { title: "تجديدات الكفالات المعلقة", icon: Clock },
      { title: "تجديدات الكفالات المعتمدة", icon: CheckCircle },
      { title: "تجديدات الكفالات المرفوضة", icon: XCircle },
      { title: "تجديدات الكفالات المنتهية", icon: FileCheck },
      { title: "أرشيف تجديد الكفالات", icon: FileClock },
      { title: "تقارير الكفالات", icon: FileSearch },
    ],
  },
  {
    title: "إدارة طلبات الجهات",
    items: [
      { title: "طلبات الجهات", icon: Building },
      { title: "أرشيف طلبات الجهات", icon: FileClock },
    ],
  },
  {
    title: "إدارة السلل الشرائية",
    items: [
      { title: "إضافة سلة شرائية جديدة", icon: ShoppingCart },
      { title: "سجل السلل الشرائية", icon: ClipboardList },
      { title: "السلل الشرائية النشطة", icon: ShoppingBag },
      { title: "أرشيف السلل الشرائية", icon: Package },
    ],
  },
];
