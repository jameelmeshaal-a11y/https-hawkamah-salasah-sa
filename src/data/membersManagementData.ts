import {
  Users,
  UserCheck,
  UserPlus,
  UserCog,
  UserMinus,
  UserX,
  FileText,
  ClipboardList,
  CreditCard,
  Settings,
  Clock,
  Share2,
  Database,
  BadgeCheck,
  Tags,
  Wallet,
  TrendingUp,
  BarChart3,
  PieChart,
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

export const membersManagementSections: SubSection[] = [
  {
    title: "أعضاء مجلس الإدارة",
    items: [
      { title: "إضافة عضو مجلس إدارة", icon: UserPlus, slug: "add-board-member" },
      { title: "تحديث بيانات عضو", icon: UserCog, slug: "update-board-member" },
      { title: "قاعدة بيانات الأعضاء", icon: Database, slug: "board-members-database" },
    ],
  },
  {
    title: "أعضاء الجمعية العمومية",
    items: [
      { title: "إدارة حسابات الأعضاء", icon: UserCog, slug: "manage-members-accounts" },
      { title: "قاعدة بيانات الأعضاء", icon: Database, slug: "assembly-members-database" },
      { title: "إلغاء اشتراك عضو", icon: UserX, slug: "cancel-member-subscription" },
      { title: "الأعضاء الملغاة عضوياتهم", icon: UserMinus, slug: "cancelled-members" },
      { title: "سجل سداد الإشتراكات", icon: ClipboardList, slug: "subscriptions-payment-record" },
      { title: "المتأخرين عن السداد", icon: Clock, slug: "late-members-payment" },
      { title: "مشاركة تقرير مع الأعضاء", icon: Share2, slug: "share-report-with-members" },
      { title: "إصدار بطاقات الأعضاء", icon: CreditCard, slug: "issue-members-cards" },
      { title: "إدارة فئات العضويات", icon: Tags, slug: "manage-membership-categories" },
      { title: "سداد اشتراكات خارج النظام", icon: Wallet, slug: "external-subscriptions-payment" },
    ],
  },
  {
    title: "إدارة المساهمين",
    items: [
      { title: "إعدادات المساهمين", icon: Settings, slug: "shareholders-settings" },
      { title: "إدارة حسابات المساهمين", icon: UserCog, slug: "manage-shareholders-accounts" },
      { title: "إدارة أسهم المساهمين", icon: TrendingUp, slug: "manage-shareholders-stocks" },
      { title: "إلغاء حساب مساهم", icon: UserX, slug: "cancel-shareholder-account" },
      { title: "إستعادة حساب مساهم", icon: RotateCcw, slug: "restore-shareholder-account" },
      { title: "إدارة تعاملات المساهمين", icon: ClipboardList, slug: "manage-shareholders-transactions" },
      { title: "مساهمين تعدوا نسبة الملكية", icon: TrendingUp, slug: "shareholders-exceeded-ownership" },
      { title: "تقرير توزيع الأرباح", icon: PieChart, slug: "profits-distribution-report" },
      { title: "إحصائيات إدارة المساهمين", icon: BarChart3, slug: "shareholders-management-statistics" },
    ],
  },
];
