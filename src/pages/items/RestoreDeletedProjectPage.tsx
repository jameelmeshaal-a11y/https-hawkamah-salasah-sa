import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ProjectsTable, ProjectData } from "@/components/projects/ProjectsTable";
import { RotateCcw } from "lucide-react";

export default function RestoreDeletedProjectPage() {
  const emptyData: ProjectData[] = [];

  return (
    <InnerPageLayout
      title="استعادة مشروع محذوف"
      moduleId="financial-resources"
      moduleTitle="الموارد المالية"
      sectionTitle="مرحلة الإقفال و التقييم"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <RotateCcw className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-xl font-bold">استعادة مشروع محذوف</h1>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <ProjectsTable
            data={emptyData}
            actionType="open"
            actionLabel="استعادة"
            actionColor="green"
          />
        </div>
      </div>
    </InnerPageLayout>
  );
}
