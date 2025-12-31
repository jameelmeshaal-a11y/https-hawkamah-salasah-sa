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
      { title: "إدارة الإجتماعات العامة", icon: Users },
      { title: "اجتماعات الجمعية العمومية", icon: Building2 },
      { title: "الإجتماعات العامة المعتمدة", icon: CheckCircle },
      { title: "اجتماعات مجلس الإدارة المعتمدة", icon: BadgeCheck },
      { title: "اجتماعات الجمعية العمومية المعتمدة", icon: Shield },
      { title: "اعتمادات محاضر الإجتماعات", icon: FileCheck },
      { title: "إلغاء اعتمادات محاضر الإجتماعات", icon: FileX },
    ],
  },
  {
    title: "إدارة الأرشيف",
    items: [
      { title: "أرشيف الملفات العامة", icon: FolderOpen },
      { title: "أرشيف التقارير المالية", icon: FileText },
      { title: "أرشيف تقارير الميزانية", icon: PieChart },
      { title: "أرشيف طلبات الإدارة", icon: ClipboardList },
      { title: "أرشيف الملفات السرية", icon: Lock },
    ],
  },
  {
    title: "البريد الصادر و الوارد",
    items: [
      { title: "إضافة بريد صادر", icon: Send },
      { title: "إضافة بريد وارد", icon: Inbox },
      { title: "تحديث بريد صادر", icon: Mail },
      { title: "تحديث بريد وارد", icon: MailOpen },
      { title: "قاعدة بيانات الصادر و الوارد", icon: Database },
      { title: "رسائل تحتاج إلى رد", icon: MessageSquare },
      { title: "إنشاء معاملة إرسالة", icon: FilePlus },
      { title: "حذف صادر أو وارد", icon: Trash2 },
      { title: "تأكيد حذف صادر أو وارد", icon: XCircle },
      { title: "قارئ باركود الصادر و الوارد", icon: QrCode },
      { title: "قاعدة بيانات المعاملات الداخلية", icon: Database },
      { title: "المعاملات المتعلقة بالبريد", icon: Link },
      { title: "معاملات الرسائل المنتهية", icon: CheckSquare },
    ],
  },
];
