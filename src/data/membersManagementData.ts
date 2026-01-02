import {
  Users,
  UserCheck,
  UserPlus,
  UserCog,
  UserMinus,
  UserX,
  FileText,
  ClipboardList,
  FileCheck,
  FilePlus,
  FileEdit,
  FileSearch,
  Folder,
  FolderOpen,
  ListChecks,
  Settings,
  Mail,
  Phone,
  Building,
  Briefcase,
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
      { title: "قائمة أعضاء مجلس الإدارة", icon: Users, slug: "board-members-list" },
      { title: "إضافة عضو جديد", icon: UserPlus, slug: "add-board-member" },
      { title: "إدارة الصلاحيات", icon: UserCog, slug: "manage-board-permissions" },
    ],
  },
  {
    title: "أعضاء الجمعية العمومية",
    items: [
      { title: "قائمة الأعضاء", icon: Users, slug: "assembly-members-list" },
      { title: "إضافة عضو", icon: UserPlus, slug: "add-assembly-member" },
      { title: "تعديل بيانات عضو", icon: UserCog, slug: "edit-assembly-member" },
      { title: "حذف عضو", icon: UserMinus, slug: "delete-assembly-member" },
      { title: "استعراض العضويات", icon: FileSearch, slug: "view-memberships" },
      { title: "طباعة بطاقة العضوية", icon: FileText, slug: "print-membership-card" },
      { title: "تجديد العضوية", icon: FileCheck, slug: "renew-membership" },
      { title: "إيقاف العضوية", icon: UserX, slug: "suspend-membership" },
      { title: "تقارير الأعضاء", icon: ClipboardList, slug: "members-reports" },
    ],
  },
  {
    title: "إدارة المساهمين",
    items: [
      { title: "قائمة المساهمين", icon: Users, slug: "shareholders-list" },
      { title: "إضافة مساهم", icon: UserPlus, slug: "add-shareholder" },
      { title: "تعديل بيانات مساهم", icon: UserCog, slug: "edit-shareholder" },
      { title: "سجل المساهمات", icon: Folder, slug: "contributions-record" },
      { title: "تقارير المساهمات", icon: ClipboardList, slug: "contributions-reports" },
      { title: "إشعارات المساهمين", icon: Mail, slug: "shareholders-notifications" },
      { title: "بيانات التواصل", icon: Phone, slug: "shareholders-contacts" },
      { title: "إعدادات المساهمين", icon: Settings, slug: "shareholders-settings" },
    ],
  },
];
