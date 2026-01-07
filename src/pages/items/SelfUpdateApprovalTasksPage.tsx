import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, Eye, Check, X, Filter, RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";
import ExportDropdown from "@/components/shared/ExportDropdown";

interface ApprovalTask {
  id: string;
  beneficiaryName: string;
  fileNumber: string;
  updateType: string;
  submittedAt: string;
  requestedBy: string;
  status: string;
}

const SelfUpdateApprovalTasksPage = () => {
  const [tasks, setTasks] = useState<ApprovalTask[]>([
    { id: "1", beneficiaryName: "خالد مسفر العازمي", fileNumber: "150001277", updateType: "بيانات شخصية", submittedAt: "07/01/2026", requestedBy: "المستفيد", status: "pending" },
    { id: "2", beneficiaryName: "تهاني خالد جبران", fileNumber: "540001195", updateType: "بيانات التواصل", submittedAt: "06/01/2026", requestedBy: "المستفيد", status: "pending" },
    { id: "3", beneficiaryName: "فيحان فرج مفلح", fileNumber: "580001047", updateType: "بيانات مالية", submittedAt: "05/01/2026", requestedBy: "المستفيد", status: "approved" },
    { id: "4", beneficiaryName: "هيفاء حاتم بركة", fileNumber: "840000778", updateType: "بيانات السكن", submittedAt: "04/01/2026", requestedBy: "المستفيد", status: "rejected" },
  ]);

  const columns = [
    { key: "beneficiaryName", label: "اسم المستفيد" },
    { key: "fileNumber", label: "رقم الملف" },
    { key: "updateType", label: "نوع التحديث" },
    { key: "submittedAt", label: "تاريخ التقديم" },
    { key: "requestedBy", label: "مقدم الطلب" },
    { key: "status", label: "الحالة" },
  ];

  const handleApprove = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: "approved" } : t));
    toast.success("تم اعتماد الطلب");
  };

  const handleReject = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: "rejected" } : t));
    toast.success("تم رفض الطلب");
  };

  const getStatusBadge = (status: string) => {
    if (status === "approved") {
      return <Badge className="bg-green-600 hover:bg-green-700 text-white">معتمد</Badge>;
    }
    if (status === "rejected") {
      return <Badge variant="destructive">مرفوض</Badge>;
    }
    return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">قيد الانتظار</Badge>;
  };

  return (
    <InnerPageLayout 
      moduleId="beneficiary-accounts" 
      title="مهام اعتمادات التحديث الذاتي" 
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
                      <TableHead className="text-right">اسم المستفيد</TableHead>
                      <TableHead className="text-right">رقم الملف</TableHead>
                      <TableHead className="text-right">نوع التحديث</TableHead>
                      <TableHead className="text-right">تاريخ التقديم</TableHead>
                      <TableHead className="text-right">مقدم الطلب</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.beneficiaryName}</TableCell>
                        <TableCell>{task.fileNumber}</TableCell>
                        <TableCell>{task.updateType}</TableCell>
                        <TableCell>{task.submittedAt}</TableCell>
                        <TableCell>{task.requestedBy}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button className="bg-primary hover:bg-primary/90 text-white" size="sm">
                              <Eye className="h-4 w-4 ml-1" />
                              معاينة
                            </Button>
                            {task.status === "pending" && (
                              <>
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700" 
                                  onClick={() => handleApprove(task.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleReject(task.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
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
              <EmptyState message="لا توجد مهام اعتماد" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default SelfUpdateApprovalTasksPage;
