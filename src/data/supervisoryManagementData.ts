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
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const supervisoryManagementSections: SubSection[] = [
  {
    title: "لجنة المساعدات",
    items: [
      { title: "إدارة رصيد لجنة المساعدات", icon: Wallet },
      { title: "نماذج قرارات لجنة المساعدات", icon: FileText },
      { title: "اعتماد تعميدات الصرف", icon: BadgeCheck },
      { title: "اعتماد صرف الكفالات", icon: Shield },
      { title: "اعتماد أوامر الصرف", icon: ClipboardCheck },
      { title: "اعتماد القسائم الشرائية", icon: Receipt },
    ],
  },
  {
    title: "الطلبات قيد الاعتماد",
    items: [
      { title: "طلبات التوظيف", icon: Briefcase },
      { title: "طلبات الشراء", icon: ShoppingCart },
      { title: "طلبات الصيانة العامة", icon: Wrench },
      { title: "طلبات صيانة السيارات", icon: Car },
    ],
  },
  {
    title: "تعميدات الصرف",
    items: [
      { title: "إدارة تعميدات الصرف", icon: FileCheck },
      { title: "التعميدات المرفوضة مع ملاحظة", icon: FileWarning },
      { title: "التعميدات المرفوضة نهائياً", icon: FileX },
      { title: "سجلات تعميدات الصرف", icon: FolderOpen },
    ],
  },
  {
    title: "إدارة الإشعارات",
    items: [
      { title: "إدارة الإشعارات", icon: Bell },
      { title: "إلغاء إشعار", icon: BellOff },
      { title: "قاعدة بيانات الإشعارات", icon: Database },
      { title: "الإشعارات الملغاة", icon: BellMinus },
    ],
  },
  {
    title: "إدارة المهام",
    items: [
      { title: "إنشاء مهمة عامة", icon: FilePlus },
      { title: "إدارة مهام الموظفين", icon: Users },
      { title: "حذف مهمة", icon: Trash2 },
      { title: "انجاز مهمة منتهية", icon: CheckCircle },
      { title: "تحويل مهمة متعثرة", icon: ArrowRightLeft },
      { title: "قواعد بيانات المهام", icon: Database },
      { title: "استعادة مهمة محذوفة", icon: RotateCcw },
    ],
  },
];
