import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Home, ChevronLeft } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SubSectionGrid from "@/components/dashboard/SubSectionGrid";
import { electronicOfficeSections } from "@/data/electronicOfficeData";
import { supervisoryManagementSections } from "@/data/supervisoryManagementData";
import { membersManagementSections } from "@/data/membersManagementData";
import { institutionalExcellenceSections } from "@/data/institutionalExcellenceData";
import { beneficiariesManagementSections } from "@/data/beneficiariesManagementData";
import { beneficiaryServicesSections } from "@/data/beneficiaryServicesData";
import { evaluationFollowupSections } from "@/data/evaluationFollowupData";
import { projectsManagementSections } from "@/data/projectsManagementData";
import { programsDevelopmentSections } from "@/data/programsDevelopmentData";
import { educationalAffairsSections } from "@/data/educationalAffairsData";
import { deceasedCareSections } from "@/data/deceasedCareData";
import { financialAffairsSections } from "@/data/financialAffairsData";
import { financialResourcesSections } from "@/data/financialResourcesData";
import { humanResourcesSections } from "@/data/humanResourcesData";
import { warehousesSections } from "@/data/warehousesData";
import { publicRelationsSections } from "@/data/publicRelationsData";
import { movementMaintenanceSections } from "@/data/movementMaintenanceData";
import { volunteeringSections } from "@/data/volunteeringData";
import { documentationSections } from "@/data/documentationData";
import { reportsStatisticsSections } from "@/data/reportsStatisticsData";
import { technicalEnablementSections } from "@/data/technicalEnablementData";

const MODULE_REGISTRY: Record<string, { title: string; sections: any[] }> = {
  office: { title: "المكتب الإلكتروني", sections: electronicOfficeSections },
  supervision: { title: "الإدارة الإشرافية و التنفيذية", sections: supervisoryManagementSections },
  members: { title: "إدارة الأعضاء المشاركين", sections: membersManagementSections },
  excellence: { title: "إدارة التميز المؤسسي", sections: institutionalExcellenceSections },
  "beneficiary-accounts": { title: "إدارة حسابات المستفيدين", sections: beneficiariesManagementSections },
  "beneficiary-services": { title: "إدارة خدمات المستفيدين", sections: beneficiaryServicesSections },
  evaluation: { title: "إدارة التقييم و المتابعة", sections: evaluationFollowupSections },
  projects: { title: "إدارة المشاريع", sections: projectsManagementSections },
  programs: { title: "إدارة البرامج و التطوير", sections: programsDevelopmentSections },
  educational: { title: "إدارة الشؤون التعليمية", sections: educationalAffairsSections },
  "deceased-honor": { title: "إدارة إكرام الموتى", sections: deceasedCareSections },
  financial: { title: "إدارة الشؤون المالية", sections: financialAffairsSections },
  "financial-resources": { title: "إدارة الموارد المالية", sections: financialResourcesSections },
  hr: { title: "إدارة الموارد البشرية", sections: humanResourcesSections },
  warehouse: { title: "إدارة المخازن و المستودعات", sections: warehousesSections },
  "public-relations": { title: "إدارة العلاقات العامة و الإعلام", sections: publicRelationsSections },
  maintenance: { title: "إدارة الحركة و الصيانة", sections: movementMaintenanceSections },
  volunteering: { title: "إدارة التطوع", sections: volunteeringSections },
  documentation: { title: "إدارة التوثيق و المستندات", sections: documentationSections },
  reports: { title: "إدارة التقارير و الإحصائيات", sections: reportsStatisticsSections },
  "tech-enablement": { title: "إدارة التمكين التقني", sections: technicalEnablementSections },
};

const ModuleOverviewPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams] = useSearchParams();
  const sectionSlug = searchParams.get("section");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const moduleData = moduleId ? MODULE_REGISTRY[moduleId] : null;

  const sectionsToShow = useMemo(() => {
    if (!moduleData) return [];
    if (sectionSlug) {
      const filtered = moduleData.sections.filter((s: any) => s.sectionSlug === sectionSlug);
      if (filtered.length > 0) return filtered;
    }
    return moduleData.sections;
  }, [moduleData, sectionSlug]);

  // Smooth scroll to selected section anchor on mount/change
  useEffect(() => {
    if (sectionSlug) {
      const el = document.getElementById(`section-${sectionSlug}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [sectionSlug]);

  if (!moduleData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center space-y-3">
          <p className="text-lg text-muted-foreground">الوحدة غير موجودة</p>
          <Link to="/" className="text-primary hover:underline">العودة إلى الرئيسية</Link>
        </div>
      </div>
    );
  }

  const activeSection = sectionSlug
    ? moduleData.sections.find((s: any) => s.sectionSlug === sectionSlug)
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />
      <div className="flex flex-1 w-full">
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="bg-muted/30 border-b border-border px-4 py-2">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
                <Home className="h-4 w-4" /><span>الرئيسية</span>
              </Link>
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              {activeSection ? (
                <>
                  <Link to={`/module/${moduleId}`} className="text-primary hover:text-primary/80 transition-colors">
                    {moduleData.title}
                  </Link>
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{activeSection.title}</span>
                </>
              ) : (
                <span className="text-foreground font-medium">{moduleData.title}</span>
              )}
            </nav>
          </div>
          <main className="flex-1 p-4">
            <h1 className="text-2xl font-bold text-foreground mb-4">{moduleData.title}</h1>
            <div className="space-y-2">
              {sectionsToShow.map((section: any, idx: number) => (
                <div key={idx} id={section.sectionSlug ? `section-${section.sectionSlug}` : undefined}>
                  <SubSectionGrid section={section} moduleId={moduleId!} />
                </div>
              ))}
            </div>
          </main>
          <footer className="bg-muted/30 border-t border-border py-3 px-4 text-center text-sm text-muted-foreground">
            جميع الحقوق محفوظة © {new Date().getFullYear()} - نظام حوكمة
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ModuleOverviewPage;
