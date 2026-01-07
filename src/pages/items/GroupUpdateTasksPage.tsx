import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GroupTask {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  filesCount: number;
  completed: number;
  status: string;
}

const GroupUpdateTasksPage = () => {
  const [tasks] = useState<GroupTask[]>([]);

  return (
    <InnerPageLayout 
      moduleId="beneficiary-accounts" 
      title="مهام التحديث الجماعي" 
      sectionTitle="إدارة تحديث البيانات" 
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        {/* تنبيه أصفر */}
        <Alert className="mb-6 border-amber-300 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 mr-2">
            يظهر فقط المهام الصادرة لحسابك
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="pt-6">
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
                      <TableCell>{task.status}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد بيانات متوفرة في الجدول" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GroupUpdateTasksPage;
