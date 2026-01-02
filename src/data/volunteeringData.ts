import { UserCog, Database, Heart, HeartHandshake, Sparkles, ClipboardList, FileText, Inbox, Users, Settings, CalendarCheck } from "lucide-react";
import type { SubSection } from "./electronicOfficeData";

export const volunteeringSections: SubSection[] = [
  {
    title: "إدارة بوابة التطوع",
    items: [
      { title: "إدارة حسابات المتطوعين", icon: UserCog, slug: "manage-volunteer-accounts" },
      { title: "قاعدة بيانات المتطوعين", icon: Database, slug: "volunteers-database" },
      { title: "طلبات التطوع الداخلية", icon: Heart, slug: "internal-volunteer-requests" },
      { title: "طلبات التطوع الخارجية", icon: HeartHandshake, slug: "external-volunteer-requests" },
      { title: "إدارة الفرص التطوعية", icon: Sparkles, slug: "manage-opportunities" },
    ],
  },
  {
    title: "إدارة الفرص التطوعية",
    items: [
      { title: "إدارة إجراءات الفرص", icon: ClipboardList, slug: "manage-opportunity-procedures" },
      { title: "إرفاق تقارير فرصة", icon: FileText, slug: "attach-opportunity-reports" },
      { title: "إدارة طلبات التطوع", icon: Inbox, slug: "manage-volunteer-applications" },
      { title: "إدارة المتطوعين", icon: Users, slug: "manage-volunteers" },
      { title: "إدارة مقام الفرص", icon: Settings, slug: "manage-opportunity-status" },
      { title: "إدارة سجلات الحضور", icon: CalendarCheck, slug: "manage-attendance-records" },
    ],
  },
];
