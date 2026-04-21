import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { Users, Heart, Banknote, TrendingUp, Plus } from "lucide-react";
import { useDonors } from "@/hooks/useDonors";
import { AddDonorDialog } from "@/components/dialogs/AddDonorDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const donorTypeLabels: Record<string, string> = { individual: 'فرد', company: 'شركة', government: 'حكومي', international: 'دولي' };

const SponsorsListPage = () => {
  const { donors, loading, addDonor, deleteDonor } = useDonors();
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: TableColumn[] = [
    { key: "full_name", label: "اسم المتبرع" },
    { key: "donor_type", label: "النوع" },
    { key: "phone", label: "الجوال" },
    { key: "email", label: "البريد الإلكتروني" },
    { key: "city", label: "المدينة" },
    { key: "total_donations", label: "إجمالي التبرعات", type: "number" },
    { key: "status", label: "الحالة", type: "status" },
  ];

  const mappedData = donors.map(d => ({
    ...d,
    donor_type: donorTypeLabels[d.donor_type] || d.donor_type,
  }));

  const actions: TableAction[] = [
    { icon: "view", onClick: () => {} },
    { icon: "edit", onClick: () => {} },
    { icon: "delete", onClick: (row) => setDeleteId(row.id as string) },
  ];

  const totalDonations = donors.reduce((sum, d) => sum + (d.total_donations || 0), 0);

  return (
    <InnerPageLayout moduleId="financial-resources" title="قائمة المتبرعين" sectionTitle="إدارة المتبرعين" moduleTitle="إدارة الموارد المالية">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="إجمالي المتبرعين" value={donors.length} icon={Users} variant="info" />
          <StatCard title="متبرعون نشطون" value={donors.filter(d => d.status === 'active').length} icon={Heart} variant="success" />
          <StatCard title="إجمالي التبرعات" value={`${totalDonations.toLocaleString()} ﷼`} icon={Banknote} variant="warning" />
          <StatCard title="المدن" value={new Set(donors.map(d => d.city).filter(Boolean)).size} icon={TrendingUp} variant="default" />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">سجل المتبرعين</CardTitle>
            <Button onClick={() => setShowAdd(true)} className="gap-2 bg-green-600 hover:bg-green-700"><Plus className="h-4 w-4" /> إضافة متبرع</Button>
          </CardHeader>
          <CardContent>
            {loading ? <div className="text-center py-8 text-muted-foreground">جارٍ التحميل...</div> : <AdvancedTable columns={columns} data={mappedData} actions={actions} />}
          </CardContent>
        </Card>
      </div>

      <AddDonorDialog open={showAdd} onClose={() => setShowAdd(false)} onSubmit={addDonor} />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader><AlertDialogTitle>تأكيد الحذف</AlertDialogTitle><AlertDialogDescription>هل أنت متأكد من حذف هذا المتبرع؟</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) { deleteDonor(deleteId); setDeleteId(null); } }} className="bg-destructive text-destructive-foreground">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </InnerPageLayout>
  );
};

export default SponsorsListPage;
