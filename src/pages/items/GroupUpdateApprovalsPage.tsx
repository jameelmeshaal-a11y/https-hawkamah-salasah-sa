import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Search, Eye, Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";

const GroupUpdateApprovalsPage = () => {
  const [approvals, setApprovals] = useState([
    { id: "1", beneficiaryName: "أحمد محمد", taskTitle: "تحديث بيانات الأيتام", updatedBy: "سارة علي", updatedAt: "2024-01-15", status: "pending" },
    { id: "2", beneficiaryName: "فاطمة سالم", taskTitle: "تحديث بيانات الأيتام", updatedBy: "محمد أحمد", updatedAt: "2024-01-14", status: "pending" },
  ]);

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: "approved" } : a));
    toast.success("تم اعتماد التحديث");
  };

  const handleReject = (id: string) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: "rejected" } : a));
    toast.success("تم رفض التحديث");
  };

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="اعتمادات التحديث الجماعي" sectionTitle="إدارة تحديث البيانات" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><CheckCircle className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">اعتمادات التحديث الجماعي</h1>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>طلبات الاعتماد</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="بحث..." className="w-64" />
                <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {approvals.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم المستفيد</TableHead>
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
                      <TableCell>{approval.taskTitle}</TableCell>
                      <TableCell>{approval.updatedBy}</TableCell>
                      <TableCell>{approval.updatedAt}</TableCell>
                      <TableCell>
                        <Badge variant={approval.status === "approved" ? "default" : approval.status === "rejected" ? "destructive" : "secondary"}>
                          {approval.status === "pending" ? "قيد الانتظار" : approval.status === "approved" ? "معتمد" : "مرفوض"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                          {approval.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(approval.id)}><Check className="h-4 w-4" /></Button>
                              <Button variant="destructive" size="sm" onClick={() => handleReject(approval.id)}><X className="h-4 w-4" /></Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
