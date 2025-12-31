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
}

export interface SubSection {
  title: string;
  items: SubItem[];
}

export const membersManagementSections: SubSection[] = [
  {
    title: "أعضاء مجلس الإدارة",
    items: [
      { title: "قائمة أعضاء مجلس الإدارة", icon: Users },
      { title: "إضافة عضو جديد", icon: UserPlus },
      { title: "إدارة الصلاحيات", icon: UserCog },
    ],
  },
  {
    title: "أعضاء الجمعية العمومية",
    items: [
      { title: "قائمة الأعضاء", icon: Users },
      { title: "إضافة عضو", icon: UserPlus },
      { title: "تعديل بيانات عضو", icon: UserCog },
      { title: "حذف عضو", icon: UserMinus },
      { title: "استعراض العضويات", icon: FileSearch },
      { title: "طباعة بطاقة العضوية", icon: FileText },
      { title: "تجديد العضوية", icon: FileCheck },
      { title: "إيقاف العضوية", icon: UserX },
      { title: "تقارير الأعضاء", icon: ClipboardList },
    ],
  },
  {
    title: "إدارة المساهمين",
    items: [
      { title: "قائمة المساهمين", icon: Users },
      { title: "إضافة مساهم", icon: UserPlus },
      { title: "تعديل بيانات مساهم", icon: UserCog },
      { title: "سجل المساهمات", icon: Folder },
      { title: "تقارير المساهمات", icon: ClipboardList },
      { title: "إشعارات المساهمين", icon: Mail },
      { title: "بيانات التواصل", icon: Phone },
      { title: "إعدادات المساهمين", icon: Settings },
    ],
  },
];
