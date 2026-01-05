import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListChecks, Search, Eye, Edit, Play, Pause } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";

interface UpdateTask {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
}

const ManageGroupUpdateTasksPage = () => {
  const [tasks] = useState<UpdateTask[]>([
    { id: "1", title: "تحديث بيانات الأيتام 2024", category: "أيتام", startDate: "2024-01-01", endDate: "2024-01-31", progress: 75, status: "جارية" },
    { id: "2", title: "تحديث بيانات الأرامل", category: "أرامل", startDate: "2024-02-01", endDate: "2024-02-28", progress: 30, status: "جارية" },
    { id: "3", title: "تحديث بيانات ذوي الإعاقة", category: "ذوي إعاقة", startDate: "2023-12-01", endDate: "2023-12-31", progress: 100, status: "مكتملة" },
  ]);

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="إدارة مهام التحديث الجماعي"
      sectionTitle="إدارة تحديث البيانات"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ListChecks className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">إدارة مهام التحديث الجماعي</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>المهام ({tasks.length})</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="بحث..." className="w-64" />
                <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {tasks.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">عنوان المهمة</TableHead>
                    <TableHead className="text-right">الفئة</TableHead>
                    <TableHead className="text-right">تاريخ البدء</TableHead>
                    <TableHead className="text-right">تاريخ الانتهاء</TableHead>
                    <TableHead className="text-right">التقدم</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.category}</TableCell>
                      <TableCell>{task.startDate}</TableCell>
                      <TableCell>{task.endDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${task.progress}%` }} />
                          </div>
                          <span className="text-sm">{task.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={task.status === "مكتملة" ? "default" : "secondary"}>{task.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                          <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                          {task.status === "جارية" && (
                            <Button variant="outline" size="sm"><Pause className="h-4 w-4" /></Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد مهام تحديث جماعي" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageGroupUpdateTasksPage;
