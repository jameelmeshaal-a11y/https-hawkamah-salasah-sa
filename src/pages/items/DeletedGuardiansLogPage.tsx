import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History, Search, RotateCcw, Eye, Filter, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import ExportDropdown from "@/components/shared/ExportDropdown";
import EmptyState from "@/components/shared/EmptyState";

interface DeletedGuardian {
  id: string;
  fileNumber: string;
  name: string;
  idNumber: string;
  deletedBy: string;
  deletedAt: string;
  reason: string;
}

const initialDeletedGuardians: DeletedGuardian[] = [
  { id: "1", fileNumber: "120000891", name: "محمد سالم الحربي", idNumber: "1056789012", deletedBy: "أحمد علي", deletedAt: "1446/06/15", reason: "طلب شخصي من الوصي" },
  { id: "2", fileNumber: "350000432", name: "عبدالله فهد العنزي", idNumber: "1045678901", deletedBy: "سارة محمد", deletedAt: "1446/06/10", reason: "انتهاء فترة الوصاية" },
  { id: "3", fileNumber: "480000765", name: "نايف سعد القحطاني", idNumber: "1034567890", deletedBy: "خالد أحمد", deletedAt: "1446/05/22", reason: "وفاة الوصي" },
  { id: "4", fileNumber: "670000123", name: "فهد محمد الدوسري", idNumber: "1023456789", deletedBy: "منى سالم", deletedAt: "1446/05/08", reason: "نقل الملف لجهة أخرى" },
  { id: "5", fileNumber: "910000456", name: "سلطان عبدالرحمن", idNumber: "1012345678", deletedBy: "عمر فيصل", deletedAt: "1446/04/29", reason: "طلب الإلغاء من المستفيد" },
];

const exportColumns = [
  { key: "fileNumber", label: "رقم الملف" },
  { key: "name", label: "الإسم" },
  { key: "idNumber", label: "رقم الهوية" },
  { key: "deletedBy", label: "حذف بواسطة" },
  { key: "deletedAt", label: "تاريخ الحذف" },
  { key: "reason", label: "سبب الحذف" },
];

const DeletedGuardiansLogPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [deletedGuardians, setDeletedGuardians] = useState<DeletedGuardian[]>(initialDeletedGuardians);

  const handleRestore = (id: string) => {
    setDeletedGuardians(deletedGuardians.filter(g => g.id !== id));
    toast.success("تم استعادة ملف الوصي بنجاح");
  };

  const filteredGuardians = deletedGuardians.filter(g => 
    g.name.includes(searchValue) || 
    g.fileNumber.includes(searchValue) || 
    g.idNumber.includes(searchValue)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="سجل الأوصياء المحذوفين"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <History className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold">سجل الأوصياء المحذوفين</h1>
        </div>

        <Card>
          <CardContent className="p-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
                <Select defaultValue="20">
                  <SelectTrigger className="w-20 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  className="pr-10 h-9"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>

              <ExportDropdown columns={exportColumns} />

              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                فلتر
              </Button>

              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                تحديث
              </Button>
            </div>

            {/* Table */}
            {filteredGuardians.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right w-[120px]">استعادة</TableHead>
                      <TableHead className="text-right">ملف الوصي</TableHead>
                      <TableHead className="text-right">رقم الملف</TableHead>
                      <TableHead className="text-right">الإسم</TableHead>
                      <TableHead className="text-right">رقم الهوية</TableHead>
                      <TableHead className="text-right">حذف بواسطة</TableHead>
                      <TableHead className="text-right">تاريخ الحذف</TableHead>
                      <TableHead className="text-right">سبب الحذف</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuardians.map((guardian) => (
                      <TableRow key={guardian.id}>
                        <TableCell>
                          <Button 
                            size="sm"
                            onClick={() => handleRestore(guardian.id)}
                            className="gap-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <RotateCcw className="h-3 w-3" />
                            استعادة
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="gap-1 text-primary">
                            <Eye className="h-3 w-3" />
                            معاينة
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{guardian.fileNumber}</TableCell>
                        <TableCell>{guardian.name}</TableCell>
                        <TableCell>{guardian.idNumber}</TableCell>
                        <TableCell>{guardian.deletedBy}</TableCell>
                        <TableCell>{guardian.deletedAt}</TableCell>
                        <TableCell>{guardian.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState message="لا توجد سجلات أوصياء محذوفين" icon={History} />
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>إجمالي السجلات: {filteredGuardians.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default DeletedGuardiansLogPage;
