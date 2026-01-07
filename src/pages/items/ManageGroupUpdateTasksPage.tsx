import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListChecks, Search, Eye, Edit, Pause, Play, Filter, RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";
import ExportDropdown from "@/components/shared/ExportDropdown";

interface UpdateTask {
  id: string;
  title: string;
  taskType: string;
  startDate: string;
  endDate: string;
  filesCount: number;
  completedCount: number;
  status: string;
  assignedTo: string;
}

const ManageGroupUpdateTasksPage = () => {
  const [tasks] = useState<UpdateTask[]>([
    { 
      id: "1", 
      title: "تحديث بيانات الأيتام 2026", 
      taskType: "تحديث بيانات مستفيدين",
      startDate: "07/01/2026", 
      endDate: "08/01/2026", 
      filesCount: 50, 
      completedCount: 35, 
      status: "جارية",
      assignedTo: "مدير النظام التقني"
    },
    { 
      id: "2", 
      title: "تحديث بيانات الأرامل", 
      taskType: "تحديث بيانات مستفيدين",
      startDate: "01/01/2026", 
      endDate: "15/01/2026", 
      filesCount: 30, 
      completedCount: 10, 
      status: "جارية",
      assignedTo: "مدير الإدارة"
    },
    { 
      id: "3", 
      title: "تحديث بيانات ذوي الإعاقة", 
      taskType: "تحديث ميداني",
      startDate: "01/12/2025", 
      endDate: "31/12/2025", 
      filesCount: 25, 
      completedCount: 25, 
      status: "مكتملة",
      assignedTo: "أحمد محمد"
    },
  ]);

  const columns = [
    { key: "title", label: "عنوان المهمة" },
    { key: "taskType", label: "نوع المهمة" },
    { key: "startDate", label: "تاريخ البدء" },
    { key: "endDate", label: "تاريخ الانتهاء" },
    { key: "filesCount", label: "عدد الملفات" },
    { key: "completedCount", label: "المكتمل" },
    { key: "status", label: "الحالة" },
    { key: "assignedTo", label: "مسند إلى" },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "مكتملة") {
      return <Badge className="bg-green-600 hover:bg-green-700 text-white">{status}</Badge>;
    }
    if (status === "جارية") {
      return <Badge className="bg-blue-600 hover:bg-blue-700 text-white">{status}</Badge>;
    }
    if (status === "متوقفة") {
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">{status}</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="إدارة مهام التحديث الجماعي"
      sectionTitle="إدارة تحديث البيانات"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        {/* شريط الأدوات */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* الجانب الأيمن */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
                <Select defaultValue="20">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* الجانب الأيسر */}
              <div className="flex items-center gap-2">
                <Input placeholder="بحث عام" className="w-48" />
                <ExportDropdown columns={columns} />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* الجدول */}
        <Card>
          <CardContent className="pt-6">
            {tasks.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right">عنوان المهمة</TableHead>
                      <TableHead className="text-right">نوع المهمة</TableHead>
                      <TableHead className="text-right">تاريخ البدء</TableHead>
                      <TableHead className="text-right">تاريخ الانتهاء</TableHead>
                      <TableHead className="text-right">التقدم</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">مسند إلى</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.taskType}</TableCell>
                        <TableCell>{task.startDate}</TableCell>
                        <TableCell>{task.endDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${(task.completedCount / task.filesCount) * 100}%` }} 
                              />
                            </div>
                            <span className="text-sm">{task.completedCount}/{task.filesCount}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>{task.assignedTo}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {task.status === "جارية" && (
                              <Button variant="outline" size="sm">
                                <Pause className="h-4 w-4" />
                              </Button>
                            )}
                            {task.status === "متوقفة" && (
                              <Button variant="outline" size="sm">
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* ترقيم الصفحات */}
                <div className="flex justify-end mt-4 text-sm text-muted-foreground">
                  إظهار السجلات 1 الى {tasks.length} من {tasks.length}
                </div>
              </>
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
