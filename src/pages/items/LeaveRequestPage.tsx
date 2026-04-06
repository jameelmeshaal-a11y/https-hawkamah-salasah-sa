import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Check, X } from "lucide-react";
import { useState } from "react";
import { useLeaves } from "@/hooks/useLeaves";
import { AddLeaveDialog } from "@/components/dialogs/AddLeaveDialog";
import StatCard from "@/components/shared/StatCard";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";

const leaveTypeLabels: Record<string, string> = {
  annual: 'سنوية', sick: 'مرضية', emergency: 'طارئة', unpaid: 'بدون راتب', maternity: 'أمومة', hajj: 'حج',
};
const statusLabels: Record<string, string> = {
  pending: 'قيد الاعتماد', approved: 'معتمدة', rejected: 'مرفوضة', cancelled: 'ملغاة',
};

const LeaveRequestPage = () => {
  const { leaves, loading, addLeave, approveLeave, rejectLeave } = useLeaves();
  const [showAdd, setShowAdd] = useState(false);

  const pending = leaves.filter(l => l.status === 'pending').length;
  const approved = leaves.filter(l => l.status === 'approved').length;

  return (
    <InnerPageLayout moduleId="office" moduleTitle="المكتب الإلكتروني" sectionTitle="الطلبات الإدارية" title="إدارة الإجازات">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="إجمالي الطلبات" value={leaves.length} icon={Calendar} variant="info" />
          <StatCard title="قيد الاعتماد" value={pending} icon={Clock} variant="warning" />
          <StatCard title="معتمدة" value={approved} icon={CheckCircle} variant="success" />
          <StatCard title="مرفوضة" value={leaves.filter(l => l.status === 'rejected').length} icon={XCircle} variant="default" />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>سجل الإجازات</CardTitle>
            <Button onClick={() => setShowAdd(true)} className="gap-2 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4" /> تقديم طلب إجازة
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">جارٍ التحميل...</div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right">الإجراءات</TableHead>
                      <TableHead className="text-right">الموظف</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">من</TableHead>
                      <TableHead className="text-right">إلى</TableHead>
                      <TableHead className="text-right">الأيام</TableHead>
                      <TableHead className="text-right">السبب</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaves.length === 0 ? (
                      <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">لا توجد طلبات إجازة</TableCell></TableRow>
                    ) : leaves.map(l => (
                      <TableRow key={l.id}>
                        <TableCell>
                          {l.status === 'pending' && (
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="text-green-600" onClick={() => approveLeave(l.id)}><Check className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => rejectLeave(l.id)}><X className="h-4 w-4" /></Button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{(l as any).employees?.full_name || '-'}</TableCell>
                        <TableCell>{leaveTypeLabels[l.leave_type] || l.leave_type}</TableCell>
                        <TableCell>{l.start_date}</TableCell>
                        <TableCell>{l.end_date}</TableCell>
                        <TableCell>{l.days_count || '-'}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{l.reason || '-'}</TableCell>
                        <TableCell>
                          <Badge variant={l.status === 'approved' ? 'default' : l.status === 'rejected' ? 'destructive' : 'secondary'}>
                            {statusLabels[l.status] || l.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AddLeaveDialog open={showAdd} onClose={() => setShowAdd(false)} onSubmit={addLeave} />
    </InnerPageLayout>
  );
};

export default LeaveRequestPage;
