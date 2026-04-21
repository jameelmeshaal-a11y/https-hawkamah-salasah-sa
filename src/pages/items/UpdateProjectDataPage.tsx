import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ProjectsTable, ProjectData } from "@/components/projects/ProjectsTable";

const projectsData: ProjectData[] = [
  {
    id: "1",
    projectNumber: "19000788",
    projectName: "مشروع افراص المقبلين ع الزواج",
    balance: 49700,
    status: "جاري" as const,
    sector: "منطقة الرياض",
    village: "أخرى",
    targetCategory: "أخرى",
    supportType: "أخرى",
    currency: "﷼",
  },
  {
    id: "2",
    projectNumber: "19000654",
    projectName: "مشروع الإسكان التنموي",
    balance: 125000,
    status: "مكتمل" as const,
    sector: "منطقة الرياض",
    village: "الرياض",
    targetCategory: "أسر",
    supportType: "تمليك سكن",
    currency: "﷼",
  },
  {
    id: "3",
    projectNumber: "19000432",
    projectName: "مشروع دعم الأيتام",
    balance: 85000,
    status: "جاري" as const,
    sector: "منطقة مكة",
    village: "جدة",
    targetCategory: "أيتام",
    supportType: "دعم مالي",
    currency: "﷼",
  },
  {
    id: "4",
    projectNumber: "19000321",
    projectName: "مشروع التأهيل المهني",
    balance: 0,
    status: "مكتمل" as const,
    sector: "المنطقة الشرقية",
    village: "الدمام",
    targetCategory: "شباب",
    supportType: "تدريب",
    currency: "﷼",
  },
  {
    id: "5",
    projectNumber: "19000890",
    projectName: "مشروع سلة رمضان",
    balance: 35000,
    status: "جديد" as const,
    sector: "منطقة الرياض",
    village: "الخرج",
    targetCategory: "أسر محتاجة",
    supportType: "عيني",
    currency: "﷼",
  },
  {
    id: "6",
    projectNumber: "19000567",
    projectName: "مشروع كسوة الشتاء",
    balance: 22000,
    status: "جاري" as const,
    sector: "منطقة القصيم",
    village: "بريدة",
    targetCategory: "أسر",
    supportType: "عيني",
    currency: "﷼",
  },
  {
    id: "7",
    projectNumber: "19000234",
    projectName: "مشروع دعم طلاب العلم",
    balance: 75000,
    status: "جاري" as const,
    sector: "منطقة الرياض",
    village: "الرياض",
    targetCategory: "طلاب",
    supportType: "دعم مالي",
    currency: "﷼",
  },
];

export default function UpdateProjectDataPage() {
  const handleManage = (id: string) => {
    console.log("Updating project data:", id);
  };

  const handlePreview = (id: string) => {
    console.log("Previewing project:", id);
  };

  return (
    <InnerPageLayout
      moduleId="projects-management"
      title="تحديث بيانات مشروع"
      moduleTitle="إدارة المشاريع"
      sectionTitle="مرحلة التخطيط"
    >
      <ProjectsTable
        data={projectsData}
        actionType="manage"
        actionLabel="تحديث"
        actionColor="blue"
        onAction={handleManage}
        onPreview={handlePreview}
      />
    </InnerPageLayout>
  );
}
