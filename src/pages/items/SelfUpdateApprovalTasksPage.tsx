import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, Search, Eye, Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";

const SelfUpdateApprovalTasksPage = () => {
  const [tasks] = useState([
    { id: "1", beneficiaryName: "أحمد محمد", updateType: "بيانات شخصية", submittedAt: "2024-01-20", status: "pending" },
    { id: "2", beneficiaryName: "فاطمة سالم", updateType: "بيانات مالية", submittedAt: "2024-01-19", status: "pending" },
  ]);

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="مهام اعتمادات التحديث الذاتي" sectionTitle="إدارة تحديث البيانات" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><ClipboardCheck className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">مهام اعتمادات التحديث الذاتي</h1>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>مهام الاعتماد</CardTitle>
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
                    <TableHead className="text-right">اسم المستفيد</TableHead>
                    <TableHead className="text-right">نوع التحديث</TableHead>
                    <TableHead className="text-right">تاريخ التقديم</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.beneficiaryName}</TableCell>
                      <TableCell>{task.updateType}</TableCell>
                      <TableCell>{task.submittedAt}</TableCell>
                      <TableCell><Badge variant="secondary">قيد الانتظار</Badge></TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700"><Check className="h-4 w-4" /></Button>
                          <Button variant="destructive" size="sm"><X className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
