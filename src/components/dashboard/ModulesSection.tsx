import { useState, useRef, useEffect } from "react";
import {
  Laptop,
  Users,
  Heart,
  GraduationCap,
  FileEdit,
  Wrench,
  Award,
  Radio,
  Shield,
  BarChart3,
  FileStack,
  Settings,
  Monitor,
  UserCheck,
  FolderKanban,
  Hand,
  ChevronDown,
  UsersRound,
  Star,
  Wallet,
  Coins,
} from "lucide-react";
import ElectronicOfficeContent from "./ElectronicOfficeContent";
import SupervisoryManagementContent from "./SupervisoryManagementContent";
import MembersManagementContent from "./MembersManagementContent";
import InstitutionalExcellenceContent from "./InstitutionalExcellenceContent";
import BeneficiariesManagementContent from "./BeneficiariesManagementContent";
import BeneficiaryServicesContent from "./BeneficiaryServicesContent";
import EvaluationFollowupContent from "./EvaluationFollowupContent";
import ProjectsManagementContent from "./ProjectsManagementContent";
import ProgramsDevelopmentContent from "./ProgramsDevelopmentContent";
import EducationalAffairsContent from "./EducationalAffairsContent";
import DeceasedCareContent from "./DeceasedCareContent";
import FinancialAffairsContent from "./FinancialAffairsContent";
import FinancialResourcesContent from "./FinancialResourcesContent";
import HumanResourcesContent from "./HumanResourcesContent";
import WarehousesContent from "./WarehousesContent";
import PublicRelationsContent from "./PublicRelationsContent";
import MovementMaintenanceContent from "./MovementMaintenanceContent";
import VolunteeringContent from "./VolunteeringContent";
import DocumentationContent from "./DocumentationContent";
import ReportsStatisticsContent from "./ReportsStatisticsContent";
import TechnicalEnablementContent from "./TechnicalEnablementContent";

interface ModuleData {
  icon: React.ElementType;
  title: string;
  description: string;
  subItems: string[];
  value: string;
}

const modulesData: ModuleData[] = [
  {
    icon: Laptop,
    title: "المكتب الإلكتروني",
    description: "الخدمات المكتبية، المكتب الإداري، التواصل الداخلي، الطلبات الإدارية، المعاملات الداخلية، التقارير و السجلات",
    subItems: ["الخدمات المكتبية", "المكتب الإداري", "التواصل الداخلي", "الطلبات الإدارية", "المعاملات الداخلية", "التقارير و السجلات"],
    value: "office",
  },
  {
    icon: Users,
    title: "الإدارة الإشرافية و التنفيذية",
    description: "لجنة المساعدات، إدارة الاعتمادات، إدارة التعميد بالصرف، إدارة الإشعارات، إدارة مهام الموظفين",
    subItems: ["لجنة المساعدات", "إدارة الاعتمادات", "إدارة التعميد بالصرف", "إدارة الإشعارات", "إدارة مهام الموظفين"],
    value: "supervision",
  },
  {
    icon: UsersRound,
    title: "إدارة الأعضاء المشاركين",
    description: "أعضاء مجلس الإدارة، أعضاء الجمعية العمومية، إدارة المساهمين",
    subItems: ["أعضاء مجلس الإدارة", "أعضاء الجمعية العمومية", "إدارة المساهمين"],
    value: "members",
  },
  {
    icon: Star,
    title: "إدارة التميز المؤسسي",
    description: "إدارة الحوكمة، إدارة الخطة الإستراتيجية",
    subItems: ["إدارة الحوكمة", "إدارة الخطة الإستراتيجية"],
    value: "excellence",
  },
  {
    icon: UserCheck,
    title: "إدارة حسابات المستفيدين",
    description: "إدارة ملفات المستفيدين، إدارة ملفات الأوصياء، إدارة تحديث البيانات، إدارة الجهات المستفيدة",
    subItems: ["إدارة ملفات المستفيدين", "إدارة ملفات الأوصياء", "إدارة تحديث البيانات", "إدارة الجهات المستفيدة"],
    value: "beneficiary-accounts",
  },
  {
    icon: Heart,
    title: "إدارة خدمات المستفيدين",
    description: "إدارة طلبات الإعانة، إدارة أوامر الصرف، إدارة الكفالات، إدارة طلبات الجهات، إدارة القسائم الشرائية",
    subItems: ["إدارة طلبات الإعانة", "إدارة أوامر الصرف", "إدارة الكفالات", "إدارة طلبات الجهات", "إدارة القسائم الشرائية"],
    value: "beneficiary-services",
  },
  {
    icon: FileEdit,
    title: "إدارة التقييم و المتابعة",
    description: "إدارة متابعة الحالات، إدارة متابعة النشاطات",
    subItems: ["إدارة متابعة الحالات", "إدارة متابعة النشاطات"],
    value: "evaluation",
  },
  {
    icon: Settings,
    title: "إدارة المشاريع",
    description: "مرحلة التجهيز والبدء، مرحلة الإعداد و التخطيط، مرحلة التنفيذ، مرحلة المتابعة و التحكم، مرحلة الإغلاق و التقييم، إدارة الموردين، إدارة المشاريع التأهيلية",
    subItems: ["مرحلة التجهيز والبدء", "مرحلة الإعداد و التخطيط", "مرحلة التنفيذ", "مرحلة المتابعة و التحكم", "مرحلة الإغلاق و التقييم", "إدارة الموردين", "إدارة المشاريع التأهيلية"],
    value: "projects",
  },
  {
    icon: Wrench,
    title: "إدارة البرامج و التطوير",
    description: "إدارة مقترحات البرامج، اعتمادات مقترحات البرامج، لوحة مديرين البرامج، لوحة عمليات البرامج، إجراءات البرامج الإدارية، تقارير و إحصائيات البرامج",
    subItems: ["إدارة مقترحات البرامج", "اعتمادات مقترحات البرامج", "لوحة مديرين البرامج", "لوحة عمليات البرامج", "إجراءات البرامج الإدارية", "تقارير و إحصائيات البرامج"],
    value: "programs",
  },
  {
    icon: GraduationCap,
    title: "إدارة الشؤون التعليمية",
    description: "إعدادت إدارة الشؤون التعليمية، إدارة الإشراف والتعليم، إدارة المناهج، إدارة الحلقات، إدارة الحصص، إدارة الطلاب، إدارة اللجان، إدارة الإختبارات، إدارة الإشراف، منصة المعلمين",
    subItems: ["إعدادت إدارة الشؤون التعليمية", "إدارة الإشراف والتعليم", "إدارة المناهج", "إدارة الحلقات", "إدارة الحصص", "إدارة الطلاب", "إدارة اللجان", "إدارة الإختبارات", "إدارة الإشراف", "منصة المعلمين"],
    value: "educational",
  },
  {
    icon: Award,
    title: "إدارة إكرام الموتى",
    description: "إعدادات إدارة إكرام الموتى، إدارة البلاغات، إدارة إجراءات إكرام الموتى، إدارة النعي، تقارير و إحصائيات إكرام الموتى",
    subItems: ["إعدادات إدارة إكرام الموتى", "إدارة البلاغات", "إدارة إجراءات إكرام الموتى", "إدارة النعي", "تقارير و إحصائيات إكرام الموتى"],
    value: "deceased-honor",
  },
  {
    icon: Wallet,
    title: "إدارة الشؤون المالية",
    description: "إدارة النظام المحاسبي، إدارة التبرعات النقدية، إدارة المقبوضات النقدية، إدارة المصروفات النقدية، صرف رواتب الموظفين، إدارة المراجعة المالية، التقارير المحاسبية، أرشيف التقارير المالية، إدارة الموازنة",
    subItems: ["إدارة النظام المحاسبي", "إدارة التبرعات النقدية", "إدارة المقبوضات النقدية", "إدارة المصروفات النقدية", "صرف رواتب الموظفين", "إدارة المراجعة المالية", "التقارير المحاسبية", "أرشيف التقارير المالية", "إدارة الموازنة"],
    value: "financial",
  },
  {
    icon: Coins,
    title: "إدارة الموارد المالية",
    description: "إدارة حسابات الداعمين، إدارة تنمية الموارد المالية، إدارة التسويق الإلكتروني، إدارة تقارير التبرعات، إدارة الأوقاف",
    subItems: ["إدارة حسابات الداعمين", "إدارة تنمية الموارد المالية", "إدارة التسويق الإلكتروني", "إدارة تقارير التبرعات", "إدارة الأوقاف"],
    value: "financial-resources",
  },
  {
    icon: Users,
    title: "إدارة الموارد البشرية",
    description: "إدارة حسابات الموظفين، إدارة شؤون الموظفين، إدارة إعدادات الحضور و الانصراف، إدارة السلامة و الصحة المهنية، إدارة التوظيف",
    subItems: ["إدارة حسابات الموظفين", "إدارة شؤون الموظفين", "إدارة إعدادات الحضور و الانصراف", "إدارة السلامة و الصحة المهنية", "إدارة التوظيف"],
    value: "hr",
  },
  {
    icon: FolderKanban,
    title: "إدارة المخازن و المستودعات",
    description: "إعدادات إدارة المستودعات، إدارة إدخالات المستودعات، إدارة مصروفات المستودعات، إدارة جرد المستودعات، تقارير المخازن و المستودعات",
    subItems: ["إعدادات إدارة المستودعات", "إدارة إدخالات المستودعات", "إدارة مصروفات المستودعات", "إدارة جرد المستودعات", "تقارير المخازن و المستودعات"],
    value: "warehouse",
  },
  {
    icon: Radio,
    title: "إدارة العلاقات العامة و الإعلام",
    description: "إدارة العلاقات العامة، إدارة حسابات الموقع، إدارة جهات التواصل الخارجية، إدارة تصميم الموقع الإلكتروني، إدارة محتويات الموقع الإلكتروني",
    subItems: ["إدارة العلاقات العامة", "إدارة حسابات الموقع", "إدارة جهات التواصل الخارجية", "إدارة تصميم الموقع الإلكتروني", "إدارة محتويات الموقع الإلكتروني"],
    value: "public-relations",
  },
  {
    icon: Shield,
    title: "إدارة الحركة و الصيانة",
    description: "إدارة الحركة، إدارة الصيانة",
    subItems: ["إدارة الحركة", "إدارة الصيانة"],
    value: "maintenance",
  },
  {
    icon: Hand,
    title: "إدارة التطوع",
    description: "إدارة بوابة التطوع، إدارة الفرص التطوعية",
    subItems: ["إدارة بوابة التطوع", "إدارة الفرص التطوعية"],
    value: "volunteering",
  },
  {
    icon: FileStack,
    title: "إدارة التوثيق و المستندات",
    description: "إدارة الإجتماعات المؤرشفة، إدارة الأرشيف، البريد الصادر و الوارد",
    subItems: ["إدارة الإجتماعات المؤرشفة", "إدارة الأرشيف", "البريد الصادر و الوارد"],
    value: "documentation",
  },
  {
    icon: BarChart3,
    title: "إدارة التقارير و الإحصائيات",
    description: "تقارير النظام، إحصائيات النظام",
    subItems: ["تقارير النظام", "إحصائيات النظام"],
    value: "reports",
  },
  {
    icon: Monitor,
    title: "إدارة التمكين التقني",
    description: "إدارة النظام و نظم المعلومات، إدارة الموقع الإلكتروني، إدارة الهيكل التنظيمي، إدارة التصميمات البصرية، إدارة إعدادات التواصل الداخلية، إدارة الأمن السيبراني، إدارة تجهيز بيانات المركز الوطني",
    subItems: ["إدارة النظام و نظم المعلومات", "إدارة الموقع الإلكتروني", "إدارة الهيكل التنظيمي", "إدارة التصميمات البصرية", "إدارة إعدادات التواصل الداخلية", "إدارة الأمن السيبراني", "إدارة تجهيز بيانات المركز الوطني"],
    value: "tech-enablement",
  },
];

// Animated content wrapper component
const AnimatedContent = ({ 
  isOpen, 
  children 
}: { 
  isOpen: boolean; 
  children: React.ReactNode;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, shouldRender]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      style={{ height: isOpen ? height : 0 }}
      className="overflow-hidden transition-all duration-300 ease-out"
      onTransitionEnd={handleTransitionEnd}
    >
      <div 
        ref={contentRef}
        className={`transform transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const getModuleContent = (moduleValue: string, subItems: string[]) => {
  switch (moduleValue) {
    case "office":
      return <ElectronicOfficeContent />;
    case "supervision":
      return <SupervisoryManagementContent />;
    case "members":
      return <MembersManagementContent />;
    case "excellence":
      return <InstitutionalExcellenceContent />;
    case "beneficiary-accounts":
      return <BeneficiariesManagementContent />;
    case "beneficiary-services":
      return <BeneficiaryServicesContent />;
    case "evaluation":
      return <EvaluationFollowupContent />;
    case "projects":
      return <ProjectsManagementContent />;
    case "programs":
      return <ProgramsDevelopmentContent />;
    case "educational":
      return <EducationalAffairsContent />;
    case "deceased-honor":
      return <DeceasedCareContent />;
    case "financial":
      return <FinancialAffairsContent />;
    case "financial-resources":
      return <FinancialResourcesContent />;
    case "hr":
      return <HumanResourcesContent />;
    case "warehouse":
      return <WarehousesContent />;
    case "public-relations":
      return <PublicRelationsContent />;
    case "maintenance":
      return <MovementMaintenanceContent />;
    case "volunteering":
      return <VolunteeringContent />;
    case "documentation":
      return <DocumentationContent />;
    case "reports":
      return <ReportsStatisticsContent />;
    case "tech-enablement":
      return <TechnicalEnablementContent />;
    default:
      return (
        <div className="px-4 pb-4 pt-0" dir="rtl">
          <div className="flex flex-wrap gap-2 pr-14 text-right">
            {subItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-sm text-primary hover:text-primary/80 hover:underline"
              >
                {item}
                {index < subItems.length - 1 && (
                  <span className="text-muted-foreground">،</span>
                )}
              </a>
            ))}
          </div>
        </div>
      );
  }
};

const ModulesSection = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border divide-y divide-border">
      {modulesData.map((module) => {
        const Icon = module.icon;
        const isOpen = openItems.includes(module.value);

        return (
          <div key={module.value} className="overflow-hidden">
            {/* Module Row: Arrow LEFT | Text CENTER | Icon RIGHT */}
            <button
              dir="ltr"
              onClick={() => toggleItem(module.value)}
              className={`w-full grid grid-cols-[24px_1fr_48px] items-center gap-4 px-4 py-4 transition-all duration-200 ${
                isOpen ? "bg-muted/40" : "hover:bg-muted/30"
              }`}
            >
              {/* Arrow on LEFT */}
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ease-out ${
                  isOpen ? "rotate-180" : ""
                }`}
              />

              {/* Text (Arabic RTL) */}
              <div dir="rtl" className="text-right">
                <div className={`font-bold text-base transition-colors duration-200 ${
                  isOpen ? "text-primary" : "text-foreground"
                }`}>
                  {module.title}
                </div>
                <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {module.description}
                </div>
              </div>

              {/* Icon on RIGHT */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center justify-self-end transition-all duration-300 ${
                isOpen ? "bg-primary text-primary-foreground scale-110" : "bg-primary/10 text-primary"
              }`}>
                <Icon className="h-5 w-5" />
              </div>
            </button>

            {/* Expanded Content with Animation */}
            <AnimatedContent isOpen={isOpen}>
              {getModuleContent(module.value, module.subItems)}
            </AnimatedContent>
          </div>
        );
      })}
    </div>
  );
};

export default ModulesSection;
