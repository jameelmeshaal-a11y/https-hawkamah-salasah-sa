import { UserCog, Database, Heart, HeartHandshake, Sparkles, ClipboardList, FileText, Inbox, Users, Settings, CalendarCheck } from "lucide-react";
import type { SubSection } from "./electronicOfficeData";

export const volunteeringSections: SubSection[] = [
  {
    title: "إدارة بوابة التطوع",
    items: [
      { title: "إدارة حسابات المتطوعين", icon: UserCog },
      { title: "قاعدة بيانات المتطوعين", icon: Database },
      { title: "طلبات التطوع الداخلية", icon: Heart },
      { title: "طلبات التطوع الخارجية", icon: HeartHandshake },
      { title: "إدارة الفرص التطوعية", icon: Sparkles },
    ],
  },
  {
    title: "إدارة الفرص التطوعية",
    items: [
      { title: "إدارة إجراءات الفرص", icon: ClipboardList },
      { title: "إرفاق تقارير فرصة", icon: FileText },
      { title: "إدارة طلبات التطوع", icon: Inbox },
      { title: "إدارة المتطوعين", icon: Users },
      { title: "إدارة مقام الفرص", icon: Settings },
      { title: "إدارة سجلات الحضور", icon: CalendarCheck },
    ],
  },
];
