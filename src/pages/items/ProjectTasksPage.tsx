import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RecordsTable from "@/components/records/RecordsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderKanban } from "lucide-react";

const columns = [
  { key: "projectName", label: "اسم المشروع" },
  { key: "taskTitle", label: "عنوان المهمة" },
  { key: "assignee", label: "المكلف" },
  { key: "deadline", label: "الموعد النهائي" },
  { key: "progress", label: "نسبة الإنجاز" },
  { 
    key: "status", 
    label: "الحالة",
    render: (value: unknown) => {
      const status = value as string;
      const variants: Record<string, "default" | "secondary" | "destructive"> = {
        "قيد التنفيذ": "secondary",
        "مكتملة": "default",
        "متأخرة": "destructive",
      };
      return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
    }
  },
];

const ProjectTasksPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="project-tasks"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="سجل مهام المشاريع"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5" />
            سجل مهام المشاريع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecordsTable
            columns={columns}
            records={[]}
            emptyMessage="لا توجد مهام مشاريع"
            emptyIcon={FolderKanban}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default ProjectTasksPage;
