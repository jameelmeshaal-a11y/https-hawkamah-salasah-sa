import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, Filter, Eye, SlidersHorizontal, Loader2 } from "lucide-react";
import ExportDropdown from "@/components/shared/ExportDropdown";
import { useAssemblyMembers } from "@/hooks/useAssemblyMembers";
import ViewDetailsDialog from "@/components/dialogs/ViewDetailsDialog";

const columns = [
  { key: "full_name", label: "الإسم" },
  { key: "preview", label: "معاينة" },
  { key: "membership_number", label: "رقم العضوية" },
  { key: "membership_type", label: "نوع العضوية" },
  { key: "phone", label: "رقم الجوال" },
  { key: "email", label: "البريد الإلكتروني" },
  { key: "join_date", label: "تاريخ الانضمام" },
  { key: "status", label: "الحالة" },
];

const AssemblyMembersDatabasePage = () => {
  const { members: assemblyMembers, loading, fetchMembers: fetchAssemblyMembers } = useAssemblyMembers();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, string> | null>(null);

  const filtered = assemblyMembers.filter(m =>
    m.full_name.includes(searchQuery) || (m.membership_number || "").includes(searchQuery)
  );

  const handlePreview = (member: typeof assemblyMembers[0]) => {
    setSelected({
      "الاسم": member.full_name,
      "رقم العضوية": member.membership_number || "—",
      "نوع العضوية": member.membership_type || "—",
      "الجوال": member.phone || "—",
      "البريد": member.email || "—",
      "تاريخ الانضمام": member.join_date || "—",
      "الحالة": member.status,
      "ملاحظات": member.notes || "—",
    });
    setViewOpen(true);
  };

  return (
    <InnerPageLayout moduleId="members" title="قاعدة بيانات الأعضاء" moduleTitle="إدارة الأعضاء المشاركين" sectionTitle="أعضاء الجمعية العمومية">
      <div className="p-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث عام..." className="pr-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <Button variant="outline" size="icon" onClick={fetchAssemblyMembers}><RefreshCw className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                <ExportDropdown columns={columns.filter(c => c.key !== "preview")} data={filtered as any} fileName="assembly_members" />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="overflow-x-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      {columns.map(col => <TableHead key={col.key} className="text-right whitespace-nowrap">{col.label}</TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow><TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">لا توجد بيانات</TableCell></TableRow>
                    ) : filtered.map(member => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.full_name}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="text-primary" onClick={() => handlePreview(member)}>
                            <Eye className="h-4 w-4 ml-1" />معاينة
                          </Button>
                        </TableCell>
                        <TableCell>{member.membership_number || "—"}</TableCell>
                        <TableCell>{member.membership_type || "—"}</TableCell>
                        <TableCell dir="ltr">{member.phone || "—"}</TableCell>
                        <TableCell>{member.email || "—"}</TableCell>
                        <TableCell>{member.join_date || "—"}</TableCell>
                        <TableCell>
                          <Badge className={member.status === "active" ? "bg-emerald-600" : ""}>{member.status === "active" ? "مفعل" : member.status}</Badge>
                        </TableCell>
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
      {selected && <ViewDetailsDialog open={viewOpen} onOpenChange={setViewOpen} title="تفاصيل العضو" data={selected} />}
    </InnerPageLayout>
  );
};

export default AssemblyMembersDatabasePage;
