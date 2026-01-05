import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardList, Search, Eye, Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";

const GroupUpdateTasksPage = () => {
  const [tasks] = useState([
    { id: "1", title: "تحديث بيانات الأيتام", assignedTo: "أحمد محمد", dueDate: "2024-01-31", filesCount: 50, completed: 35, status: "جارية" },
    { id: "2", title: "تحديث بيانات الأرامل", assignedTo: "سارة علي", dueDate: "2024-02-28", filesCount: 30, completed: 10, status: "جارية" },
  ]);

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="مهام التحديث الجماعي" sectionTitle="إدارة تحديث البيانات" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><ClipboardList className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">مهام التحديث الجماعي</h1>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>المهام المسندة</CardTitle>
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
                    <TableHead className="text-right">مسندة إلى</TableHead>
                    <TableHead className="text-right">تاريخ الانتهاء</TableHead>
                    <TableHead className="text-right">الملفات</TableHead>
                    <TableHead className="text-right">المكتمل</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>{task.filesCount}</TableCell>
                      <TableCell>{task.completed}/{task.filesCount}</TableCell>
                      <TableCell><Badge variant="secondary">{task.status}</Badge></TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                          <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد مهام" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GroupUpdateTasksPage;
