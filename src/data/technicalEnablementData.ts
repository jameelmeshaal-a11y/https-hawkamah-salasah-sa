import { 
  Building2, Settings, LayoutDashboard, Chrome, Warehouse, ClipboardCheck, FileText, FolderTree,
  Calculator, FolderCog, Newspaper, Sliders, FileQuestion, ArrowRightLeft, Route, FormInput,
  Clock, Video, Shield, Globe, ShoppingCart, Search, Share2, Network, UserCog, Users, PenTool,
  RefreshCcw, Languages, Printer, Gift, FileCode, Award, MessageCircle, MessageSquare, Mail,
  Bell, BellRing, Inbox, LogIn, ShieldCheck, RefreshCw, DollarSign, Send, Trash2, Archive, CheckCircle, Share
} from "lucide-react";
import type { SubSection } from "./electronicOfficeData";

export const technicalEnablementSections: SubSection[] = [
  {
    title: "إدارة النظام و نظم المعلومات",
    items: [
      { title: "إدارة معلومات الجمعية", icon: Building2, slug: "manage-organization-info" },
      { title: "إعدادات مقدمي الخدمات", icon: Settings, slug: "service-providers-settings" },
      { title: "إدارة أقسام لوحة التحكم", icon: LayoutDashboard, slug: "manage-dashboard-sections" },
      { title: "تسجيل حساب جووجل", icon: Chrome, slug: "register-google-account" },
      { title: "إدارة المستودعات", icon: Warehouse, slug: "manage-repositories" },
      { title: "نماذج تقييم الموظفين", icon: ClipboardCheck, slug: "employee-evaluation-forms" },
      { title: "نماذج خطابات الموارد البشرية", icon: FileText, slug: "hr-letter-templates" },
      { title: "إدارة تصنيفات المستندات الثابتة", icon: FolderTree, slug: "manage-document-categories" },
      { title: "إدارة معادلة الدخل", icon: Calculator, slug: "manage-income-formula" },
      { title: "تحديث فئات الملفات", icon: FolderCog, slug: "update-file-categories" },
      { title: "إدارة شريط الأخبار", icon: Newspaper, slug: "manage-news-ticker" },
      { title: "إدارة متغيرات النظام", icon: Sliders, slug: "manage-system-variables" },
      { title: "إدارة الطلبات الإدارية", icon: FileQuestion, slug: "manage-admin-requests" },
      { title: "إدارة المعاملات الداخلية", icon: ArrowRightLeft, slug: "manage-internal-transactions" },
      { title: "إدارة مسارات الاعتمادات", icon: Route, slug: "manage-approval-paths" },
      { title: "إدارة حقول الحسابات", icon: FormInput, slug: "manage-account-fields" },
      { title: "سجلات العمليات المجدولة", icon: Clock, slug: "scheduled-operations-log" },
      { title: "تحديث ملفات الشروحات", icon: Video, slug: "update-tutorial-files" },
      { title: "تحديث صلاحيات الشروحات", icon: Shield, slug: "update-tutorial-permissions" },
    ],
  },
  {
    title: "إدارة الموقع الإلكتروني",
    items: [
      { title: "إعدادات الموقع الإلكتروني", icon: Globe, slug: "website-settings" },
      { title: "إعدادات المتجر الإلكتروني", icon: ShoppingCart, slug: "e-store-settings" },
      { title: "أدوات تحسين محركات البحث", icon: Search, slug: "seo-tools" },
      { title: "ربط أدوات التواصل الإجتماعي", icon: Share2, slug: "social-media-integration" },
    ],
  },
  {
    title: "إدارة الهيكل التنظيمي",
    items: [
      { title: "إدارة الهيكل الإداري", icon: Network, slug: "manage-org-structure" },
      { title: "تعيينات المناصب الإشرافية", icon: UserCog, slug: "supervisory-appointments" },
      { title: "تعيينات اللجان", icon: Users, slug: "committee-appointments" },
      { title: "إدارة تواقيع المستندات", icon: PenTool, slug: "manage-document-signatures" },
      { title: "تسجيل دورة هيكل إداري", icon: RefreshCcw, slug: "register-org-cycle" },
    ],
  },
  {
    title: "إدارة التصميمات البصرية",
    items: [
      { title: "إدارة لغة لوحة التحكم", icon: Languages, slug: "manage-dashboard-language" },
      { title: "إدارة قوالب المطبوعات", icon: Printer, slug: "manage-print-templates" },
      { title: "إدارة قوالب كروت الإهداء", icon: Gift, slug: "manage-gift-card-templates" },
      { title: "تصميم قالب المستندات", icon: FileCode, slug: "design-document-template" },
      { title: "إدارة قوالب شهادات التبرع", icon: Award, slug: "manage-donation-certificates" },
    ],
  },
  {
    title: "إدارة إعدادات التواصل الداخلية",
    items: [
      { title: "نماذج التواصل الداخلية", icon: MessageCircle, slug: "internal-contact-forms" },
      { title: "سجل المراسلات النصية", icon: MessageSquare, slug: "internal-sms-log" },
      { title: "سجل المراسلات البريدية", icon: Mail, slug: "internal-email-log" },
      { title: "مشتركين التنبيهات اللحظية", icon: Bell, slug: "internal-push-subscribers" },
      { title: "سجل مراسلات التنبيهات", icon: BellRing, slug: "internal-push-log" },
      { title: "سجل التنبيهات الداخلية", icon: Inbox, slug: "internal-alerts-log" },
    ],
  },
  {
    title: "إدارة الأمن السيبراني",
    items: [
      { title: "مستخدمو النظام", icon: Users, slug: "system-users" },
      { title: "سجلات الدخول للنظام", icon: LogIn, slug: "login-logs" },
      { title: "صلاحيات المستخدمين", icon: Shield, slug: "user-permissions" },
      { title: "تقرير الأمن السيبراني", icon: ShieldCheck, slug: "cybersecurity-report" },
    ],
  },
  {
    title: "إدارة تجهيز بيانات المركز الوطني",
    items: [
      { title: "مساعدات بحاجة للتحديث", icon: RefreshCw, slug: "aids-need-update" },
      { title: "تحديث تواقيع المساعدات", icon: PenTool, slug: "update-aids-signatures" },
      { title: "تحديث تكاليف المساعدات", icon: DollarSign, slug: "update-aids-costs" },
      { title: "مساعدات جاهزة للإرسال", icon: Send, slug: "aids-ready-to-send" },
      { title: "المساعدات المعلقة و المحذوفة", icon: Trash2, slug: "suspended-deleted-aids" },
      { title: "إدارة أرشيف الدعوم السابقة", icon: Archive, slug: "previous-support-archive" },
      { title: "المساعدات المسجلة بمنصة تبين", icon: CheckCircle, slug: "aids-registered-tabein" },
      { title: "صلاحيات مشاركة البيانات", icon: Share, slug: "data-sharing-permissions" },
    ],
  },
];
