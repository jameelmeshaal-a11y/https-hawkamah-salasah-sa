import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Search, Eye, Filter, RefreshCw, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import ExportDropdown from "@/components/shared/ExportDropdown";
import { useGuardians } from "@/hooks/useGuardians";
import ViewDetailsDialog from "@/components/dialogs/ViewDetailsDialog";
import MaskedPhone from "@/components/shared/MaskedPhone";

const exportColumns = [
  { key: "full_name", label: "الإسم" },
  { key: "phone", label: "رقم الجوال" },
  { key: "email", label: "البريد" },
  { key: "relationship", label: "صلة القرابة" },
  { key: "status", label: "الحالة" },
];

const GuardiansDatabasePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { guardians, loading, fetchGuardians } = useGuardians();
  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, string> | null>(null);

  const filtered = guardians.filter(g =>
    g.full_name.includes(searchValue) || (g.phone || "").includes(searchValue)
  );

  const handleView = (g: typeof guardians[0]) => {
    setSelected({ "الاسم": g.full_name, "الجوال": g.phone || "—", "البريد": g.email || "—", "صلة القرابة": g.relationship || "—", "الحالة": g.status, "ملاحظات": g.notes || "—" });
    setViewOpen(true);
  };

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="قاعدة بيانات الأوصياء" sectionTitle="إدارة ملفات الأوصياء" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><Database className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">قاعدة بيانات الأوصياء</h1>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث..." className="pr-10 h-9" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
              </div>
              <ExportDropdown columns={exportColumns} data={filtered as any} fileName="guardians" />
              <Button variant="outline" size="sm" className="gap-2" onClick={fetchGuardians}><RefreshCw className="h-4 w-4" />تحديث</Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right">الإسم</TableHead>
                      <TableHead className="text-right">معاينة</TableHead>
                      <TableHead className="text-right">رقم الجوال</TableHead>
                      <TableHead className="text-right">البريد</TableHead>
                      <TableHead className="text-right">صلة القرابة</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">لا توجد بيانات</TableCell></TableRow>
                    ) : filtered.map(g => (
                      <TableRow key={g.id}>
                        <TableCell className="font-medium">{g.full_name}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="gap-1 text-primary" onClick={() => handleView(g)}>
                            <Eye className="h-3 w-3" />معاينة
                          </Button>
                        </TableCell>
                        <TableCell><MaskedPhone value={g.phone} /></TableCell>
                        <TableCell>{g.email || "—"}</TableCell>
                        <TableCell>{g.relationship || "—"}</TableCell>
                        <TableCell>{g.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>إجمالي السجلات: {filtered.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {selected && <ViewDetailsDialog open={viewOpen} onOpenChange={setViewOpen} title="تفاصيل الوصي" data={selected} />}
    </InnerPageLayout>
  );
};

export default GuardiansDatabasePage;
