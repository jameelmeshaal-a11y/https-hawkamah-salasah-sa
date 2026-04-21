import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { List, Plus, Search, Download, Eye, Edit, Trash2, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  description: string;
  debitTotal: number;
  creditTotal: number;
  status: "draft" | "posted" | "reversed";
  createdBy: string;
  reference?: string;
}

const ManageJournalEntriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const entries: JournalEntry[] = [
    {
      id: "1",
      entryNumber: "JE-2024-0001",
      date: "2024-01-15",
      description: "تسجيل إيرادات تبرعات شهر يناير",
      debitTotal: 50000,
      creditTotal: 50000,
      status: "posted",
      createdBy: "أحمد محمد",
      reference: "DON-2024-001",
    },
    {
      id: "2",
      entryNumber: "JE-2024-0002",
      date: "2024-01-16",
      description: "صرف رواتب الموظفين - يناير",
      debitTotal: 120000,
      creditTotal: 120000,
      status: "posted",
      createdBy: "محمد علي",
      reference: "SAL-2024-001",
    },
    {
      id: "3",
      entryNumber: "JE-2024-0003",
      date: "2024-01-17",
      description: "قيد تسوية مصروفات إدارية",
      debitTotal: 15000,
      creditTotal: 15000,
      status: "draft",
      createdBy: "سعد العتيبي",
    },
    {
      id: "4",
      entryNumber: "JE-2024-0004",
      date: "2024-01-18",
      description: "تسجيل مصروفات مشروع رقم 25",
      debitTotal: 35000,
      creditTotal: 35000,
      status: "reversed",
      createdBy: "أحمد محمد",
      reference: "PRJ-025",
    },
    {
      id: "5",
      entryNumber: "JE-2024-0005",
      date: "2024-01-19",
      description: "تحصيل كفالات الأيتام",
      debitTotal: 80000,
      creditTotal: 80000,
      status: "posted",
      createdBy: "خالد الشمري",
      reference: "SPO-2024-015",
    },
  ];

  const getStatusBadge = (status: JournalEntry["status"]) => {
    switch (status) {
      case "posted":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 ml-1" />
            مرحّل
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 ml-1" />
            مسودة
          </Badge>
        );
      case "reversed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 ml-1" />
            ملغي
          </Badge>
        );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA").format(amount) + " ﷼";
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.entryNumber.includes(searchQuery) ||
      entry.description.includes(searchQuery) ||
      entry.reference?.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="إدارة قيود اليومية"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي القيود</div>
              <div className="text-2xl font-bold text-primary">{entries.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">القيود المرحّلة</div>
              <div className="text-2xl font-bold text-green-600">
                {entries.filter((e) => e.status === "posted").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المسودات</div>
              <div className="text-2xl font-bold text-yellow-600">
                {entries.filter((e) => e.status === "draft").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي الحركة</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(entries.reduce((sum, e) => sum + e.debitTotal, 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              قيود اليومية
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-9 w-48"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="posted">مرحّل</SelectItem>
                  <SelectItem value="draft">مسودة</SelectItem>
                  <SelectItem value="reversed">ملغي</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 ml-2" />
                قيد جديد
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم القيد</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">البيان</TableHead>
                  <TableHead className="text-right">المرجع</TableHead>
                  <TableHead className="text-right">مدين</TableHead>
                  <TableHead className="text-right">دائن</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">بواسطة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-mono font-medium">
                      {entry.entryNumber}
                    </TableCell>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {entry.description}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {entry.reference || "-"}
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(entry.debitTotal)}
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(entry.creditTotal)}
                    </TableCell>
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    <TableCell>{entry.createdBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("عرض تفاصيل القيد")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {entry.status === "draft" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toast.info("تعديل القيد")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {entry.status === "draft" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toast.error("حذف القيد")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageJournalEntriesPage;
