import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ProjectsTable, ProjectData } from "@/components/projects/ProjectsTable";
import { FolderOpen } from "lucide-react";

const projectsData: ProjectData[] = [
  {
    id: "1",
    projectNumber: "PRJ-002",
    projectName: "مشروع الحقيبة المدرسية",
    balance: 75000,
    status: "مكتمل",
    sector: "جدة - مكة",
    village: "حي الصفا",
    targetCategory: "طلاب",
    supportType: "عيني",
    currency: "﷼",
  },
];

export default function OpenCompletedProjectPage() {
  const handleOpen = (id: string) => {
    console.log("Open project:", id);
  };

  const handlePreview = (id: string) => {
    console.log("Preview project:", id);
  };

  return (
    <InnerPageLayout
      title="فتح مشروع مكتمل"
      moduleId="financial-resources"
      moduleTitle="الموارد المالية"
      sectionTitle="مرحلة الإقفال و التقييم"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <FolderOpen className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-xl font-bold">فتح مشروع مكتمل</h1>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <ProjectsTable
            data={projectsData}
            actionType="open"
            actionLabel="فتح"
            actionColor="green"
            onAction={handleOpen}
            onPreview={handlePreview}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
}
