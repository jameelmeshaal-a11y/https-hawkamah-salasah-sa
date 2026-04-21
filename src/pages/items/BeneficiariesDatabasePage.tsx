import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Trash2, RefreshCw } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import { Users, Heart, Banknote, TrendingUp } from "lucide-react";
import { useBeneficiaries } from "@/hooks/useBeneficiaries";
import { AddBeneficiaryDialog } from "@/components/dialogs/AddBeneficiaryDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import MaskedPhone from "@/components/shared/MaskedPhone";

const BeneficiariesDatabasePage = () => {
  const { beneficiaries, loading, addBeneficiary, deleteBeneficiary, refetch } = useBeneficiaries();
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const filtered = beneficiaries.filter(b =>
    b.full_name.includes(searchValue) || (b.phone || '').includes(searchValue)
  );

  const total = beneficiaries.length;
  const active = beneficiaries.filter(b => b.status === 'active').length;

  return (
    <InnerPageLayout title="قاعدة بيانات المستفيدين" moduleId="beneficiaries" sectionTitle="إدارة حسابات المستفيدين" moduleTitle="إدارة ملفات المستفيدين">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="إجمالي المستفيدين" value={total} icon={Users} variant="info" />
          <StatCard title="مستفيدون نشطون" value={active} icon={Heart} variant="success" />
          <StatCard title="قيد المراجعة" value={beneficiaries.filter(b => b.status === 'pending').length} icon={Banknote} variant="warning" />
          <StatCard title="المدن" value={new Set(beneficiaries.map(b => b.city).filter(Boolean)).size} icon={TrendingUp} variant="default" />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>سجل المستفيدين</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={refetch}><RefreshCw className="h-4 w-4" /></Button>
              <Button onClick={() => setShowAdd(true)} className="gap-2 bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4" /> إضافة مستفيد
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث..." value={searchValue} onChange={e => setSearchValue(e.target.value)} className="pr-9" />
            </div>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">جارٍ التحميل...</div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right">الإجراءات</TableHead>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">الجوال</TableHead>
                      <TableHead className="text-right">المدينة</TableHead>
                      <TableHead className="text-right">الفئة</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">لا توجد بيانات</TableCell></TableRow>
                    ) : filtered.map(b => (
                      <TableRow key={b.id}>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteId(b.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{b.full_name}</TableCell>
                        <TableCell><MaskedPhone value={b.phone} /></TableCell>
                        <TableCell>{b.city || '-'}</TableCell>
                        <TableCell>{b.category || '-'}</TableCell>
                        <TableCell><Badge variant={b.status === 'active' ? 'default' : 'secondary'}>{b.status === 'active' ? 'نشط' : b.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AddBeneficiaryDialog open={showAdd} onClose={() => setShowAdd(false)} onSubmit={addBeneficiary} />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>هل أنت متأكد من حذف هذا المستفيد؟</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) { deleteBeneficiary(deleteId); setDeleteId(null); } }} className="bg-destructive text-destructive-foreground">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </InnerPageLayout>
  );
};

export default BeneficiariesDatabasePage;
