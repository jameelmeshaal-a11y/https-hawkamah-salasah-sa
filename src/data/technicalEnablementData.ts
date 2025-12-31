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
      { title: "إدارة معلومات الجمعية", icon: Building2 },
      { title: "إعدادات مقدمي الخدمات", icon: Settings },
      { title: "إدارة أقسام لوحة التحكم", icon: LayoutDashboard },
      { title: "تسجيل حساب جووجل", icon: Chrome },
      { title: "إدارة المستودعات", icon: Warehouse },
      { title: "نماذج تقييم الموظفين", icon: ClipboardCheck },
      { title: "نماذج خطابات الموارد البشرية", icon: FileText },
      { title: "إدارة تصنيفات المستندات الثابتة", icon: FolderTree },
      { title: "إدارة معادلة الدخل", icon: Calculator },
      { title: "تحديث فئات الملفات", icon: FolderCog },
      { title: "إدارة شريط الأخبار", icon: Newspaper },
      { title: "إدارة متغيرات النظام", icon: Sliders },
      { title: "إدارة الطلبات الإدارية", icon: FileQuestion },
      { title: "إدارة المعاملات الداخلية", icon: ArrowRightLeft },
      { title: "إدارة مسارات الاعتمادات", icon: Route },
      { title: "إدارة حقول الحسابات", icon: FormInput },
      { title: "سجلات العمليات المجدولة", icon: Clock },
      { title: "تحديث ملفات الشروحات", icon: Video },
      { title: "تحديث صلاحيات الشروحات", icon: Shield },
    ],
  },
  {
    title: "إدارة الموقع الإلكتروني",
    items: [
      { title: "إعدادات الموقع الإلكتروني", icon: Globe },
      { title: "إعدادات المتجر الإلكتروني", icon: ShoppingCart },
      { title: "أدوات تحسين محركات البحث", icon: Search },
      { title: "ربط أدوات التواصل الإجتماعي", icon: Share2 },
    ],
  },
  {
    title: "إدارة الهيكل التنظيمي",
    items: [
      { title: "إدارة الهيكل الإداري", icon: Network },
      { title: "تعيينات المناصب الإشرافية", icon: UserCog },
      { title: "تعيينات اللجان", icon: Users },
      { title: "إدارة تواقيع المستندات", icon: PenTool },
      { title: "تسجيل دورة هيكل إداري", icon: RefreshCcw },
    ],
  },
  {
    title: "إدارة التصميمات البصرية",
    items: [
      { title: "إدارة لغة لوحة التحكم", icon: Languages },
      { title: "إدارة قوالب المطبوعات", icon: Printer },
      { title: "إدارة قوالب كروت الإهداء", icon: Gift },
      { title: "تصميم قالب المستندات", icon: FileCode },
      { title: "إدارة قوالب شهادات التبرع", icon: Award },
    ],
  },
  {
    title: "إدارة إعدادات التواصل الداخلية",
    items: [
      { title: "نماذج التواصل الداخلية", icon: MessageCircle },
      { title: "سجل المراسلات النصية", icon: MessageSquare },
      { title: "سجل المراسلات البريدية", icon: Mail },
      { title: "مشتركين التنبيهات اللحظية", icon: Bell },
      { title: "سجل مراسلات التنبيهات", icon: BellRing },
      { title: "سجل التنبيهات الداخلية", icon: Inbox },
    ],
  },
  {
    title: "إدارة الأمن السيبراني",
    items: [
      { title: "مستخدمو النظام", icon: Users },
      { title: "سجلات الدخول للنظام", icon: LogIn },
      { title: "صلاحيات المستخدمين", icon: Shield },
      { title: "تقرير الأمن السيبراني", icon: ShieldCheck },
    ],
  },
  {
    title: "إدارة تجهيز بيانات المركز الوطني",
    items: [
      { title: "مساعدات بحاجة للتحديث", icon: RefreshCw },
      { title: "تحديث تواقيع المساعدات", icon: PenTool },
      { title: "تحديث تكاليف المساعدات", icon: DollarSign },
      { title: "مساعدات جاهزة للإرسال", icon: Send },
      { title: "المساعدات المعلقة و المحذوفة", icon: Trash2 },
      { title: "إدارة أرشيف الدعوم السابقة", icon: Archive },
      { title: "المساعدات المسجلة بمنصة تبين", icon: CheckCircle },
      { title: "صلاحيات مشاركة البيانات", icon: Share },
    ],
  },
];
