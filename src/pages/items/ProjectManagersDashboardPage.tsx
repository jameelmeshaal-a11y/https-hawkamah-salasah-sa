import InnerPageLayout from "@/components/layout/InnerPageLayout";
import ProjectCard from "@/components/projects/ProjectCard";

const projectsData = [
  {
    projectNumber: "19000788",
    projectName: "مشروع افراص المقبلين ع الزواج",
    description: "مشاريع دعم مستفيدة",
    status: "جاري" as const,
    sector: "منطقة الرياض",
    province: "محافظة الرياض",
    category: "أخرى",
    district: "أخرى",
    targetCategory: "أخرى",
    supportType: "نوع احدائي (أخرى + أخرى)",
    daysOverdue: 464,
    remainingBudget: 49700,
  },
  {
    projectNumber: "19000789",
    projectName: "مشروع دعم الأيتام",
    description: "مشاريع رعاية الأيتام",
    status: "جاري" as const,
    sector: "منطقة الرياض",
    province: "محافظة الخرج",
    category: "تعليمية",
    district: "حي النسيم",
    targetCategory: "أيتام",
    supportType: "دعم مالي",
    daysOverdue: 120,
    remainingBudget: 85000,
  },
  {
    projectNumber: "19000790",
    projectName: "مشروع الحقيبة المدرسية",
    description: "مشاريع تعليمية",
    status: "مكتمل" as const,
    sector: "منطقة الرياض",
    province: "محافظة الرياض",
    category: "تعليمية",
    district: "حي الملز",
    targetCategory: "طلاب",
    supportType: "دعم عيني",
    daysOverdue: 0,
    remainingBudget: 0,
  },
  {
    projectNumber: "19000791",
    projectName: "مشروع كسوة الشتاء",
    description: "مشاريع موسمية",
    status: "جاري" as const,
    sector: "منطقة مكة",
    province: "محافظة جدة",
    category: "موسمية",
    district: "حي الصفا",
    targetCategory: "أسر محتاجة",
    supportType: "دعم عيني",
    daysOverdue: 45,
    remainingBudget: 125000,
  },
  {
    projectNumber: "19000792",
    projectName: "مشروع إفطار صائم",
    description: "مشاريع رمضانية",
    status: "جديد" as const,
    sector: "منطقة الرياض",
    province: "محافظة الرياض",
    category: "موسمية",
    district: "حي العليا",
    targetCategory: "عموم المسلمين",
    supportType: "دعم عيني",
    daysOverdue: 0,
    remainingBudget: 200000,
  },
  {
    projectNumber: "19000793",
    projectName: "مشروع بناء مسجد",
    description: "مشاريع وقفية",
    status: "جاري" as const,
    sector: "منطقة القصيم",
    province: "محافظة بريدة",
    category: "وقفية",
    district: "حي الخليج",
    targetCategory: "عموم المسلمين",
    supportType: "بناء",
    daysOverdue: 200,
    remainingBudget: 350000,
  },
];

const ProjectManagersDashboardPage = () => {
  return (
    <InnerPageLayout
      moduleId="projects-management"
      title="لوحة مديرين المشروعات"
      moduleTitle="إدارة المشاريع"
      sectionTitle="مرحلة المتابعة و التحكم"
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.projectNumber}
              {...project}
              onPreview={() => console.log("Preview project:", project.projectNumber)}
            />
          ))}
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default ProjectManagersDashboardPage;
