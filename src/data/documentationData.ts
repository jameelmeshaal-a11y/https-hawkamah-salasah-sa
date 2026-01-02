import { 
  Users, Building2, CheckCircle, BadgeCheck, Shield, FileCheck, FileX,
  FolderOpen, FileText, PieChart, ClipboardList, Lock,
  Send, Inbox, Mail, MailOpen, Database, MessageSquare, FilePlus, Trash2, XCircle, QrCode, Link, CheckSquare
} from "lucide-react";
import type { SubSection } from "./electronicOfficeData";

export const documentationSections: SubSection[] = [
  {
    title: "إدارة الإجتماعات المؤرشفة",
    items: [
      { title: "إدارة الإجتماعات العامة", icon: Users, slug: "manage-general-meetings" },
      { title: "اجتماعات الجمعية العمومية", icon: Building2, slug: "general-assembly-meetings" },
      { title: "الإجتماعات العامة المعتمدة", icon: CheckCircle, slug: "approved-general-meetings" },
      { title: "اجتماعات مجلس الإدارة المعتمدة", icon: BadgeCheck, slug: "approved-board-meetings" },
      { title: "اجتماعات الجمعية العمومية المعتمدة", icon: Shield, slug: "approved-assembly-meetings" },
      { title: "اعتمادات محاضر الإجتماعات", icon: FileCheck, slug: "meeting-minutes-approvals" },
      { title: "إلغاء اعتمادات محاضر الإجتماعات", icon: FileX, slug: "cancel-meeting-approvals" },
    ],
  },
  {
    title: "إدارة الأرشيف",
    items: [
      { title: "أرشيف الملفات العامة", icon: FolderOpen, slug: "general-files-archive" },
      { title: "أرشيف التقارير المالية", icon: FileText, slug: "financial-reports-archive" },
      { title: "أرشيف تقارير الميزانية", icon: PieChart, slug: "budget-reports-archive" },
      { title: "أرشيف طلبات الإدارة", icon: ClipboardList, slug: "management-requests-archive" },
      { title: "أرشيف الملفات السرية", icon: Lock, slug: "confidential-files-archive" },
    ],
  },
  {
    title: "البريد الصادر و الوارد",
    items: [
      { title: "إضافة بريد صادر", icon: Send, slug: "add-outgoing-mail" },
      { title: "إضافة بريد وارد", icon: Inbox, slug: "add-incoming-mail" },
      { title: "تحديث بريد صادر", icon: Mail, slug: "update-outgoing-mail" },
      { title: "تحديث بريد وارد", icon: MailOpen, slug: "update-incoming-mail" },
      { title: "قاعدة بيانات الصادر و الوارد", icon: Database, slug: "mail-database" },
      { title: "رسائل تحتاج إلى رد", icon: MessageSquare, slug: "messages-need-reply" },
      { title: "إنشاء معاملة إرسالة", icon: FilePlus, slug: "create-mail-transaction" },
      { title: "حذف صادر أو وارد", icon: Trash2, slug: "delete-mail" },
      { title: "تأكيد حذف صادر أو وارد", icon: XCircle, slug: "confirm-delete-mail" },
      { title: "قارئ باركود الصادر و الوارد", icon: QrCode, slug: "mail-barcode-reader" },
      { title: "قاعدة بيانات المعاملات الداخلية", icon: Database, slug: "internal-transactions-database" },
      { title: "المعاملات المتعلقة بالبريد", icon: Link, slug: "mail-related-transactions" },
      { title: "معاملات الرسائل المنتهية", icon: CheckSquare, slug: "completed-mail-transactions" },
    ],
  },
];
