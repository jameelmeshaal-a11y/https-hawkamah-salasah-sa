import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useRequests } from "@/hooks/useRequests";
import { AddRequestDialog } from "@/components/dialogs/AddRequestDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const statusLabels: Record<string, string> = {
  pending: 'قيد الاعتماد', approved: 'معتمد', rejected: 'مرفوض', completed: 'مكتمل',
};

const PurchaseRequestPage = () => {
  const { requests, loading, addRequest, deleteRequest } = useRequests('شراء');
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <InnerPageLayout moduleId="office" moduleTitle="المكتب الإلكتروني" sectionTitle="الطلبات الإدارية" title="طلبات الشراء">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-primary" /> طلبات الشراء</CardTitle>
            <Button onClick={() => setShowAdd(true)} className="gap-2 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4" /> تقديم طلب شراء
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
                      <TableHead className="text-right">العنوان</TableHead>
                      <TableHead className="text-right">مقدم الطلب</TableHead>
                      <TableHead className="text-right">الأولوية</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">لا توجد طلبات شراء</TableCell></TableRow>
                    ) : requests.map(r => (
                      <TableRow key={r.id}>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteId(r.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{r.title}</TableCell>
                        <TableCell>{r.submitter_name || '-'}</TableCell>
                        <TableCell><Badge variant="outline">{r.priority}</Badge></TableCell>
                        <TableCell><Badge>{statusLabels[r.status] || r.status}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{new Date(r.created_at).toLocaleDateString('ar-SA')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AddRequestDialog open={showAdd} onClose={() => setShowAdd(false)} onSubmit={addRequest} requestType="شراء" dialogTitle="تقديم طلب شراء" />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>هل أنت متأكد من حذف هذا الطلب؟</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) { deleteRequest(deleteId); setDeleteId(null); } }} className="bg-destructive text-destructive-foreground">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </InnerPageLayout>
  );
};

export default PurchaseRequestPage;
