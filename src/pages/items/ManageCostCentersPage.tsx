import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderTree, Plus, Search, Download, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCostCenters } from "@/hooks/useCostCenters";
import ViewDetailsDialog from "@/components/dialogs/ViewDetailsDialog";
import ConfirmDeleteDialog from "@/components/dialogs/ConfirmDeleteDialog";

const ManageCostCentersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { costCenters, loading, deleteCostCenter, fetchCostCenters } = useCostCenters();
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<Record<string, string> | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => new Intl.NumberFormat("ar-SA").format(amount) + " ر.س";

  const filteredCenters = costCenters.filter(c => c.name.includes(searchQuery) || c.code.includes(searchQuery));

  const handleView = (center: typeof costCenters[0]) => {
    setSelectedCenter({ "الكود": center.code, "الاسم": center.name, "الموازنة": formatCurrency(center.budget || 0), "المصروف": formatCurrency(center.spent_amount || 0), "الحالة": center.is_active ? "نشط" : "غير نشط" });
    setViewOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteCostCenter(deleteId);
    setDeleteOpen(false);
    setDeleteId(null);
  };

  return (
    <InnerPageLayout moduleId="financial-affairs" title="إدارة مراكز التكلفة" moduleTitle="إدارة الشؤون المالية">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">إجمالي المراكز</div><div className="text-2xl font-bold text-primary">{costCenters.length}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">المراكز النشطة</div><div className="text-2xl font-bold text-green-600">{costCenters.filter(c => c.is_active).length}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">إجمالي الموازنات</div><div className="text-2xl font-bold text-primary">{formatCurrency(costCenters.reduce((s, c) => s + (c.budget || 0), 0))}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">إجمالي المصروفات</div><div className="text-2xl font-bold text-destructive">{formatCurrency(costCenters.reduce((s, c) => s + (c.spent_amount || 0), 0))}</div></CardContent></Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><FolderTree className="h-5 w-5" />مراكز التكلفة</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative"><Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="بحث..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pr-9 w-48" /></div>
              <Button variant="outline" size="icon" onClick={fetchCostCenters}><Download className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <Table>
                <TableHeader><TableRow>
                  <TableHead className="text-right">الكود</TableHead>
                  <TableHead className="text-right">اسم المركز</TableHead>
                  <TableHead className="text-right">الموازنة</TableHead>
                  <TableHead className="text-right">المصروف</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {filteredCenters.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">لا توجد مراكز تكلفة</TableCell></TableRow>
                  ) : filteredCenters.map(center => (
                    <TableRow key={center.id}>
                      <TableCell className="font-mono font-medium">{center.code}</TableCell>
                      <TableCell className="font-medium">{center.name}</TableCell>
                      <TableCell className="font-mono">{formatCurrency(center.budget || 0)}</TableCell>
                      <TableCell className="font-mono">{formatCurrency(center.spent_amount || 0)}</TableCell>
                      <TableCell><Badge className={center.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>{center.is_active ? "نشط" : "غير نشط"}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleView(center)}><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => { setDeleteId(center.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      {selectedCenter && <ViewDetailsDialog open={viewOpen} onOpenChange={setViewOpen} title="تفاصيل مركز التكلفة" data={selectedCenter} />}
      <ConfirmDeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} title="حذف مركز التكلفة" description="هل أنت متأكد من حذف مركز التكلفة هذا؟" />
    </InnerPageLayout>
  );
};

export default ManageCostCentersPage;
