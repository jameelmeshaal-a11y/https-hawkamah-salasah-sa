import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ProjectsTable } from "@/components/projects/ProjectsTable";

const projectsData = [
  {
    id: "1",
    projectNumber: "19000788",
    projectName: "مشروع افراص المقبلين ع الزواج",
    balance: 49700,
    status: "جاري" as const,
    sector: "منطقة الرياض",
    village: "محافظة الرياض",
    targetCategory: "أخرى",
    supportType: "نوع احدائي",
    currency: "﷼",
  },
  {
    id: "2",
    projectNumber: "19000789",
    projectName: "مشروع دعم الأيتام",
    balance: 85000,
    status: "جاري" as const,
    sector: "منطقة الرياض",
    village: "محافظة الخرج",
    targetCategory: "أيتام",
    supportType: "دعم مالي",
    currency: "﷼",
  },
  {
    id: "3",
    projectNumber: "19000790",
    projectName: "مشروع الحقيبة المدرسية",
    balance: 0,
    status: "مكتمل" as const,
    sector: "منطقة الرياض",
    village: "محافظة الرياض",
    targetCategory: "طلاب",
    supportType: "دعم عيني",
    currency: "﷼",
  },
  {
    id: "4",
    projectNumber: "19000791",
    projectName: "مشروع كسوة الشتاء",
    balance: 125000,
    status: "جاري" as const,
    sector: "منطقة مكة",
    village: "محافظة جدة",
    targetCategory: "أسر محتاجة",
    supportType: "دعم عيني",
    currency: "﷼",
  },
  {
    id: "5",
    projectNumber: "19000792",
    projectName: "مشروع إفطار صائم",
    balance: 200000,
    status: "جديد" as const,
    sector: "منطقة الرياض",
    village: "محافظة الرياض",
    targetCategory: "عموم المسلمين",
    supportType: "دعم عيني",
    currency: "﷼",
  },
];

const AssignBeneficiariesProjectPage = () => {
  return (
    <InnerPageLayout
      moduleId="projects-management"
      title="إلحاق مستفيدين بمشروع"
      moduleTitle="إدارة المشاريع"
      sectionTitle="مرحلة التنفيذ"
    >
      <div className="p-6">
        <ProjectsTable
          data={projectsData}
          actionType="manage"
          actionLabel="إدارة"
          actionColor="blue"
        />
      </div>
    </InnerPageLayout>
  );
};

export default AssignBeneficiariesProjectPage;
