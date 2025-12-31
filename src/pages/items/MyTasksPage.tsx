import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListTodo } from "lucide-react";

const statusSummary = [
  { label: "جديدة", count: 0, color: "bg-blue-600" },
  { label: "جارية", count: 0, color: "bg-sky-500" },
  { label: "متعثرة", count: 0, color: "bg-red-500" },
  { label: "منتهية", count: 0, color: "bg-emerald-500" },
  { label: "منجزة", count: 10, color: "bg-green-700" },
];

const tableColumns = [
  "#",
  "عنوان المهمة",
  "المشروع",
  "الأولوية",
  "تاريخ الاستحقاق",
  "الحالة",
  "الإجراءات",
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
      <div className="space-y-6">
        {/* Status Summary Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-end gap-3">
              {statusSummary.map((status, index) => (
                <Badge 
                  key={index} 
                  className={`${status.color} text-white px-4 py-2 text-sm`}
                >
                  {status.label} ({status.count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTodo className="h-5 w-5" />
              سجل المهام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {tableColumns.map((column, index) => (
                      <TableHead key={index} className="text-center whitespace-nowrap">
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={tableColumns.length} className="text-center py-12 text-muted-foreground">
                      <ListTodo className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      لا توجد بيانات متوفرة في الجدول
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default MyTasksPage;
