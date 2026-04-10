import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search, RefreshCw, Filter, SlidersHorizontal, Eye, Loader2 } from "lucide-react";
import ExportDropdown from "@/components/shared/ExportDropdown";
import { useBoardMembers } from "@/hooks/useBoardMembers";
import ViewDetailsDialog from "@/components/dialogs/ViewDetailsDialog";
import { useState } from "react";

const columns = [
  { key: "full_name", label: "الإسم", width: "160px" },
  { key: "preview", label: "معاينة", width: "100px" },
  { key: "position", label: "المنصب", width: "140px" },
  { key: "phone", label: "رقم الجوال", width: "120px" },
  { key: "email", label: "البريد الإلكتروني", width: "180px" },
  { key: "appointment_date", label: "تاريخ التعيين", width: "140px" },
  { key: "status", label: "الحالة", width: "100px" },
  { key: "notes", label: "ملاحظات", width: "200px" },
];

const BoardMembersDatabasePage = () => {
  const { members: boardMembers, loading } = useBoardMembers();
  const fetchBoardMembers = () => {};
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Record<string, string> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = boardMembers.filter(m =>
    m.full_name.includes(searchQuery) || (m.position || "").includes(searchQuery)
  );

  const handlePreview = (member: typeof boardMembers[0]) => {
    setSelectedMember({
      "الاسم": member.full_name,
      "المنصب": member.position,
      "الجوال": member.phone || "—",
      "البريد": member.email || "—",
      "تاريخ التعيين": member.appointment_date || "—",
      "الحالة": member.status,
      "ملاحظات": member.notes || "—",
    });
    setViewOpen(true);
  };

  return (
    <InnerPageLayout moduleId="members" title="قاعدة بيانات الأعضاء" moduleTitle="إدارة الأعضاء المشاركين" sectionTitle="أعضاء مجلس الإدارة">
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عام..." className="pr-10 w-64" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <Button variant="outline" size="icon" title="تحديث" onClick={fetchBoardMembers}><RefreshCw className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" title="فلتر"><Filter className="h-4 w-4" /></Button>
              <ExportDropdown columns={columns.filter(c => c.key !== "preview")} data={filtered as any} fileName="board_members" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">سجلات الصفحة:</span>
              <Select defaultValue="20">
                <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <ScrollArea className="w-full whitespace-nowrap border rounded-lg">
              <div className="min-w-max">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      {columns.map(col => (
                        <TableHead key={col.key} className="text-right" style={{ minWidth: col.width }}>{col.label}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow><TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">لا توجد بيانات</TableCell></TableRow>
                    ) : filtered.map(member => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.full_name}</TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white h-7 px-3" onClick={() => handlePreview(member)}>
                            <Eye className="h-3 w-3 ml-1" />معاينة
                          </Button>
                        </TableCell>
                        <TableCell>{member.position}</TableCell>
                        <TableCell dir="ltr">{member.phone || "—"}</TableCell>
                        <TableCell>{member.email || "—"}</TableCell>
                        <TableCell>{member.appointment_date || "—"}</TableCell>
                        <TableCell>{member.status}</TableCell>
                        <TableCell>{member.notes || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>إظهار السجلات {filtered.length} من {boardMembers.length}</span>
          </div>
        </CardContent>
      </Card>
      {selectedMember && <ViewDetailsDialog open={viewOpen} onOpenChange={setViewOpen} title="تفاصيل العضو" data={selectedMember} />}
    </InnerPageLayout>
  );
};

export default BoardMembersDatabasePage;
