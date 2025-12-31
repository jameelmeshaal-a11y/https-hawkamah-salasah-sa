import {
  Laptop,
  Users,
  Heart,
  BookOpen,
  GraduationCap,
  FileEdit,
  Building2,
  Wrench,
  ClipboardList,
  UserCog,
  Award,
  Package,
  Radio,
  Shield,
  BarChart3,
  FileStack,
  MessageSquareWarning,
  Settings,
  Headphones,
  Building,
  FileQuestion,
  Briefcase,
  UserCheck,
  FolderKanban,
  Monitor,
} from "lucide-react";
import ModuleAccordion from "./ModuleAccordion";
import { Accordion } from "@/components/ui/accordion";

const modulesData = [
  {
    icon: Laptop,
    title: "المكتب الإلكتروني",
    description: "خدمات المتابعة، المكتب الإداري، التواصل الداخلي، إشعارات الإدارية، الصفحات الداخلية، التقارير، و البيانات",
    subItems: [
      { label: "خدمات المتابعة" },
      { label: "المكتب الإداري" },
      { label: "التواصل الداخلي" },
      { label: "إشعارات الإدارية" },
      { label: "الصفحات الداخلية" },
      { label: "التقارير" },
      { label: "البيانات" },
    ],
    value: "office",
  },
  {
    icon: Users,
    title: "الإدارة الإشرافية و التنفيذية",
    description: "إدارة للصلاحيات، إدارة للاتصالات، إدارة التقييم والإشراف، إدارة للاجتماعات، إدارة مظاهر الموظفين",
    subItems: [
      { label: "إدارة للصلاحيات" },
      { label: "إدارة للاتصالات" },
      { label: "إدارة التقييم والإشراف" },
      { label: "إدارة للاجتماعات" },
      { label: "إدارة مظاهر الموظفين" },
    ],
    value: "supervision",
  },
  {
    icon: Heart,
    title: "إدارة الاشراء المشتركين",
    description: "إدارة ملفات الأشراء المشتركين، إدارة جداول الشراء الموحدة",
    subItems: [
      { label: "إدارة ملفات الأشراء المشتركين" },
      { label: "إدارة جداول الشراء الموحدة" },
    ],
    value: "shared-procurement",
  },
  {
    icon: UserCheck,
    title: "إدارة التصنيف المؤسسي",
    description: "إدارة إدارة الهياكل المؤسسية",
    subItems: [
      { label: "إدارة الهياكل المؤسسية" },
    ],
    value: "institutional-classification",
  },
  {
    icon: BookOpen,
    title: "إدارة حسابات المستفيدين",
    description: "إدارة حقوق المستفيدين، إدارة حقوق الأهلية، إدارة الخدمات المستحقة",
    subItems: [
      { label: "إدارة حقوق المستفيدين" },
      { label: "إدارة حقوق الأهلية" },
      { label: "إدارة الخدمات المستحقة" },
    ],
    value: "beneficiary-accounts",
  },
  {
    icon: GraduationCap,
    title: "إدارة خدمات المستفيدين",
    description: "إدارة طلبات الخدمة، إدارة الإجراء التطويري، إدارة التحقق، إدارة الملفات، إدارة العقود الداخلية",
    subItems: [
      { label: "إدارة طلبات الخدمة" },
      { label: "إدارة الإجراء التطويري" },
      { label: "إدارة التحقق" },
      { label: "إدارة الملفات" },
      { label: "إدارة العقود الداخلية" },
    ],
    value: "beneficiary-services",
  },
  {
    icon: FileEdit,
    title: "إدارة التقييم و المتابعة",
    description: "إدارة متابعة الملفات، إدارة متابعة الملفات",
    subItems: [
      { label: "إدارة متابعة الملفات" },
      { label: "إدارة التقييم" },
    ],
    value: "evaluation",
  },
  {
    icon: Building2,
    title: "إدارة المشاريع",
    description: "مرحلة التخطيط، مكتبات مرحلة التنفيذ و التخطيط، مرحلة المتابعة، مرحلة الإغلاق و التقييم، مرحلة القبول، إدارة التقارير، إدارة الفواتير التنفيذية",
    subItems: [
      { label: "مرحلة التخطيط" },
      { label: "مكتبات مرحلة التنفيذ و التخطيط" },
      { label: "مرحلة المتابعة" },
      { label: "مرحلة الإغلاق و التقييم" },
      { label: "مرحلة القبول" },
      { label: "إدارة التقارير" },
      { label: "إدارة الفواتير التنفيذية" },
    ],
    value: "projects",
  },
  {
    icon: Wrench,
    title: "إدارة البرامج و التطوير",
    description: "إجراءات تطوير البرامج، تجهيز مسارين البرامج، تجهيز مشغلات البرامج، إجراءات البرامج التدريبية، قياس ومكافات البرامج",
    subItems: [
      { label: "إجراءات تطوير البرامج" },
      { label: "تجهيز مسارين البرامج" },
      { label: "تجهيز مشغلات البرامج" },
      { label: "إجراءات البرامج التدريبية" },
      { label: "قياس ومكافات البرامج" },
    ],
    value: "programs",
  },
  {
    icon: ClipboardList,
    title: "إدارة الشؤون التعليمية",
    description: "إجراءات إدارة التحليل الحسابية، إدارة الإشتراك والتقييم، إدارة المنافع، إدارة التحولات، إدارة الانتظار، إدارة التحقق، إدارة الفواتير، مساعد التحليل",
    subItems: [
      { label: "إجراءات إدارة التحليل الحسابية" },
      { label: "إدارة الإشتراك والتقييم" },
      { label: "إدارة المنافع" },
      { label: "إدارة التحولات" },
      { label: "إدارة الانتظار" },
      { label: "إدارة التحقق" },
      { label: "إدارة الفواتير" },
      { label: "مساعد التحليل" },
    ],
    value: "educational",
  },
  {
    icon: UserCog,
    title: "إدارة إكرام العاملي",
    description: "إدارة الموظفين، إدارة شؤون الموظفين، إدارة إجراءات ألإوامر الإدارية، إدارة الحق المالي، و صلاحيات إدارة العطل",
    subItems: [
      { label: "إدارة الموظفين" },
      { label: "إدارة شؤون الموظفين" },
      { label: "إدارة إجراءات ألإوامر الإدارية" },
      { label: "إدارة الحق المالي" },
      { label: "صلاحيات إدارة العطل" },
    ],
    value: "staff-honor",
  },
  {
    icon: Award,
    title: "إدارة الشؤون المالية",
    description: "إدارة الحسابات المؤسسية، إدارة الحوالات المالية، إدارة المعاملات المالية، صرف رواتب الموظفين، إدارة المواصفات المالية، التقارير، التقييم المالي، إدارة الجودة",
    subItems: [
      { label: "إدارة الحسابات المؤسسية" },
      { label: "إدارة الحوالات المالية" },
      { label: "إدارة المعاملات المالية" },
      { label: "صرف رواتب الموظفين" },
      { label: "إدارة المواصفات المالية" },
      { label: "التقارير" },
      { label: "التقييم المالي" },
      { label: "إدارة الجودة" },
    ],
    value: "financial",
  },
  {
    icon: Package,
    title: "إدارة الموارد المالية",
    description: "إدارة مسارات التامين، إدارة بلدة المواد المالية، إدارة التسجيل الإلكتروني، إدارة تقاليد الحوكمة، إدارة التوقيف",
    subItems: [
      { label: "إدارة مسارات التامين" },
      { label: "إدارة بلدة المواد المالية" },
      { label: "إدارة التسجيل الإلكتروني" },
      { label: "إدارة تقاليد الحوكمة" },
      { label: "إدارة التوقيف" },
    ],
    value: "financial-resources",
  },
  {
    icon: Users,
    title: "إدارة الموارد البشرية",
    description: "إدارة سجلات الموظفين، إدارة شؤون الموظفين، إدارة إجراءات التطوير و التعويض، إدارة السلامة و الصحة المهنية، إدارة التوظيف",
    subItems: [
      { label: "إدارة سجلات الموظفين" },
      { label: "إدارة شؤون الموظفين" },
      { label: "إدارة إجراءات التطوير و التعويض" },
      { label: "إدارة السلامة و الصحة المهنية" },
      { label: "إدارة التوظيف" },
    ],
    value: "hr",
  },
  {
    icon: FolderKanban,
    title: "إدارة المخازن و المستودعات",
    description: "إستلام، إدارة المستودعات، إدارة إدخلات المستودعات، إدارة مجموعات المستودعات، إدارة مرد المستودعات، نظام المخازن و المستودعات",
    subItems: [
      { label: "إستلام" },
      { label: "إدارة المستودعات" },
      { label: "إدارة إدخلات المستودعات" },
      { label: "إدارة مجموعات المستودعات" },
      { label: "إدارة مرد المستودعات" },
      { label: "نظام المخازن و المستودعات" },
    ],
    value: "warehouse",
  },
  {
    icon: Radio,
    title: "إدارة العلاقات العامة و الإعلام",
    description: "إدارة الإتصالات العامة، إدارة سجلات الموظفين، إدارة بطاقات التواصل الخارجية، إدارة تصميم الموقع الإلكتروني، إدارة مستودعات الموقع الإلكتروني",
    subItems: [
      { label: "إدارة الإتصالات العامة" },
      { label: "إدارة سجلات الموظفين" },
      { label: "إدارة بطاقات التواصل الخارجية" },
      { label: "إدارة تصميم الموقع الإلكتروني" },
      { label: "إدارة مستودعات الموقع الإلكتروني" },
    ],
    value: "public-relations",
  },
  {
    icon: Shield,
    title: "إدارة الحركة و الصيانة",
    description: "إدارة المركبات، إدارة الصيانة",
    subItems: [
      { label: "إدارة المركبات" },
      { label: "إدارة الصيانة" },
    ],
    value: "maintenance",
  },
  {
    icon: BarChart3,
    title: "إدارة التطوع",
    description: "إدارة بوابة التطوع، إدارة المرتب التطوعية",
    subItems: [
      { label: "إدارة بوابة التطوع" },
      { label: "إدارة المرتب التطوعية" },
    ],
    value: "volunteering",
  },
  {
    icon: FileStack,
    title: "إدارة التوثيق و المستندات",
    description: "إدارة الإجتماعات الموقعية، إدارة الأرشيف، البريد الصادر و الوارد",
    subItems: [
      { label: "إدارة الإجتماعات الموقعية" },
      { label: "إدارة الأرشيف" },
      { label: "البريد الصادر و الوارد" },
    ],
    value: "documentation",
  },
  {
    icon: MessageSquareWarning,
    title: "إدارة التقارير و الإحصائيات",
    description: "تقارير النظام، إحصائيات النظام",
    subItems: [
      { label: "تقارير النظام" },
      { label: "إحصائيات النظام" },
    ],
    value: "reports",
  },
  {
    icon: Monitor,
    title: "إدارة التمكين التقني",
    description: "إدارة النظام و قواعد المعلومات، إدارة الحوالات التقنية، إدارة الاتصالات، البنية إدارة البنية، التقنية، إدارة النظر بيئة العراق الوطني",
    subItems: [
      { label: "إدارة النظام و قواعد المعلومات" },
      { label: "إدارة الحوالات التقنية" },
      { label: "إدارة الاتصالات" },
      { label: "البنية إدارة البنية" },
      { label: "التقنية" },
      { label: "إدارة النظر بيئة العراق الوطني" },
    ],
    value: "tech-enablement",
  },
];

const ModulesSection = () => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <Accordion type="multiple" className="space-y-2">
        {modulesData.map((module) => (
          <ModuleAccordion key={module.value} {...module} />
        ))}
      </Accordion>
    </div>
  );
};

export default ModulesSection;
