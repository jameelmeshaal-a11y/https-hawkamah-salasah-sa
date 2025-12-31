import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RecordsTable from "@/components/records/RecordsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListTodo } from "lucide-react";

const columns = [
  { key: "title", label: "عنوان المهمة" },
  { key: "project", label: "المشروع" },
  { key: "priority", label: "الأولوية" },
  { key: "dueDate", label: "تاريخ الاستحقاق" },
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

const MyTasksPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="my-tasks"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="سجل مهامي"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo className="h-5 w-5" />
            سجل مهامي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecordsTable
            columns={columns}
            records={[]}
            emptyMessage="لا توجد مهام مسندة إليك"
            emptyIcon={ListTodo}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default MyTasksPage;
