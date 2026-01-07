import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Search, Eye, Check, X, Filter, RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";
import ExportDropdown from "@/components/shared/ExportDropdown";

interface Approval {
  id: string;
  beneficiaryName: string;
  fileNumber: string;
  taskTitle: string;
  updatedBy: string;
  updatedAt: string;
  status: string;
}

const GroupUpdateApprovalsPage = () => {
  const [approvals, setApprovals] = useState<Approval[]>([
    { id: "1", beneficiaryName: "خالد مسفر العازمي", fileNumber: "150001277", taskTitle: "تحديث بيانات الأيتام", updatedBy: "مدير النظام التقني", updatedAt: "07/01/2026", status: "pending" },
    { id: "2", beneficiaryName: "تهاني خالد جبران", fileNumber: "540001195", taskTitle: "تحديث بيانات الأيتام", updatedBy: "مدير النظام التقني", updatedAt: "07/01/2026", status: "pending" },
    { id: "3", beneficiaryName: "فيحان فرج مفلح", fileNumber: "580001047", taskTitle: "تحديث بيانات الأرامل", updatedBy: "مدير الإدارة", updatedAt: "06/01/2026", status: "approved" },
    { id: "4", beneficiaryName: "هيفاء حاتم بركة", fileNumber: "840000778", taskTitle: "تحديث بيانات الأرامل", updatedBy: "مدير الإدارة", updatedAt: "06/01/2026", status: "rejected" },
  ]);

  const columns = [
    { key: "beneficiaryName", label: "اسم المستفيد" },
    { key: "fileNumber", label: "رقم الملف" },
    { key: "taskTitle", label: "المهمة" },
    { key: "updatedBy", label: "تحديث بواسطة" },
    { key: "updatedAt", label: "التاريخ" },
    { key: "status", label: "الحالة" },
  ];

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: "approved" } : a));
    toast.success("تم اعتماد التحديث");
  };

  const handleReject = (id: string) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: "rejected" } : a));
    toast.success("تم رفض التحديث");
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
      title="اعتمادات التحديث الجماعي" 
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
            {approvals.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right">اسم المستفيد</TableHead>
                      <TableHead className="text-right">رقم الملف</TableHead>
                      <TableHead className="text-right">المهمة</TableHead>
                      <TableHead className="text-right">تحديث بواسطة</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvals.map((approval) => (
                      <TableRow key={approval.id}>
                        <TableCell className="font-medium">{approval.beneficiaryName}</TableCell>
                        <TableCell>{approval.fileNumber}</TableCell>
                        <TableCell>{approval.taskTitle}</TableCell>
                        <TableCell>{approval.updatedBy}</TableCell>
                        <TableCell>{approval.updatedAt}</TableCell>
                        <TableCell>{getStatusBadge(approval.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button className="bg-primary hover:bg-primary/90 text-white" size="sm">
                              <Eye className="h-4 w-4 ml-1" />
                              معاينة
                            </Button>
                            {approval.status === "pending" && (
                              <>
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700" 
                                  onClick={() => handleApprove(approval.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleReject(approval.id)}
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
                  إظهار السجلات 1 الى {approvals.length} من {approvals.length}
                </div>
              </>
            ) : (
              <EmptyState message="لا توجد طلبات اعتماد" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GroupUpdateApprovalsPage;
