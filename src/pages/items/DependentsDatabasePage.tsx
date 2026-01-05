import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RefreshCw, FileDown, Eye, Copy } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DependentRecord {
  id: string;
  name: string;
  dataModel: "النموذج الافتراضي" | "التأهيل";
  guardianFileNumber: string;
  guardianIdNumber: string;
  guardianMobile: string;
  guardianName: string;
  guardianIban: string | null;
  status: "معتمد" | "قيد المراجعة" | "مرفوض" | "غير مستحق" | "مؤرشف";
}

const dependentsData: DependentRecord[] = [
  { id: "1", name: "سيف وليد بخيت", dataModel: "النموذج الافتراضي", guardianFileNumber: "840000778", guardianIdNumber: "1098765432", guardianMobile: "0551234567", guardianName: "هيفاء حاتم بركة", guardianIban: "SA1234567890123456789012", status: "معتمد" },
  { id: "2", name: "امجاد وليد بخيت", dataModel: "النموذج الافتراضي", guardianFileNumber: "840000778", guardianIdNumber: "1098765432", guardianMobile: "0551234567", guardianName: "هيفاء حاتم بركة", guardianIban: "SA1234567890123456789012", status: "معتمد" },
  { id: "3", name: "وسيم خالد محمود", dataModel: "النموذج الافتراضي", guardianFileNumber: "810000495", guardianIdNumber: "1087654321", guardianMobile: "0559876543", guardianName: "مريم مسفر احمد", guardianIban: null, status: "معتمد" },
  { id: "4", name: "هديل خالد محمود", dataModel: "النموذج الافتراضي", guardianFileNumber: "810000495", guardianIdNumber: "1087654321", guardianMobile: "0559876543", guardianName: "مريم مسفر احمد", guardianIban: null, status: "معتمد" },
  { id: "5", name: "مهدي عبدالله محمد", dataModel: "النموذج الافتراضي", guardianFileNumber: "950000216", guardianIdNumber: "1076543210", guardianMobile: "0556789012", guardianName: "عبدالله محمد فيصل", guardianIban: "SA9876543210987654321098", status: "معتمد" },
  { id: "6", name: "نسمة عبدالله محمد", dataModel: "النموذج الافتراضي", guardianFileNumber: "950000216", guardianIdNumber: "1076543210", guardianMobile: "0556789012", guardianName: "عبدالله محمد فيصل", guardianIban: "SA9876543210987654321098", status: "معتمد" },
  { id: "7", name: "عمر فرج مفلح", dataModel: "التأهيل", guardianFileNumber: "580001047", guardianIdNumber: "1065432109", guardianMobile: "0554321098", guardianName: "فيحان فرج مفلح", guardianIban: null, status: "معتمد" },
  { id: "8", name: "فريده لافي مسفر", dataModel: "التأهيل", guardianFileNumber: "580001047", guardianIdNumber: "1065432109", guardianMobile: "0554321098", guardianName: "فيحان فرج مفلح", guardianIban: null, status: "معتمد" },
  { id: "9", name: "سحر مجاهد محسن", dataModel: "النموذج الافتراضي", guardianFileNumber: "180000160", guardianIdNumber: "1054321098", guardianMobile: "0553210987", guardianName: "مجاهد احمد الصواف", guardianIban: "SA5432109876543210987654", status: "معتمد" },
  { id: "10", name: "احمد مجاهد محسن", dataModel: "النموذج الافتراضي", guardianFileNumber: "180000160", guardianIdNumber: "1054321098", guardianMobile: "0553210987", guardianName: "مجاهد احمد الصواف", guardianIban: "SA5432109876543210987654", status: "معتمد" },
  { id: "11", name: "سارة نوير ملفي", dataModel: "النموذج الافتراضي", guardianFileNumber: "890000850", guardianIdNumber: "1043210987", guardianMobile: "0552109876", guardianName: "نوير ملفي مبارك", guardianIban: null, status: "غير مستحق" },
  { id: "12", name: "علي تهاني خالد", dataModel: "النموذج الافتراضي", guardianFileNumber: "540001195", guardianIdNumber: "1032109876", guardianMobile: "0551098765", guardianName: "تهاني خالد جبران", guardianIban: "SA3210987654321098765432", status: "معتمد" },
];

const statusTabs = [
  { key: "all", label: "قاعدة البيانات التابعين", color: "bg-emerald-700", count: 12 },
  { key: "approved", label: "التابعين المعتمدين", color: "bg-green-500", count: 11 },
  { key: "pending", label: "التابعين قيد المراجعة", color: "bg-yellow-500", count: 0 },
  { key: "rejected", label: "التابعين المرفوضين", color: "bg-gray-400", count: 0 },
  { key: "ineligible", label: "التابعين غير مستحقين", color: "bg-red-500", count: 1 },
  { key: "archived", label: "التابعين المؤرشفين", color: "bg-blue-500", count: 0 },
];

const dataModelFilters = [
  { key: "default", label: "النموذج الافتراضي", count: 10 },
  { key: "rehabilitation", label: "التأهيل", count: 2 },
];

const DependentsDatabasePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [pageSize, setPageSize] = useState("20");

  const filteredData = dependentsData.filter((record) => {
    const matchesSearch = 
      record.name.includes(searchValue) || 
      record.guardianName.includes(searchValue) ||
      record.guardianFileNumber.includes(searchValue);
    
    let matchesTab = true;
    if (activeTab === "approved") matchesTab = record.status === "معتمد";
    else if (activeTab === "pending") matchesTab = record.status === "قيد المراجعة";
    else if (activeTab === "rejected") matchesTab = record.status === "مرفوض";
    else if (activeTab === "ineligible") matchesTab = record.status === "غير مستحق";
    else if (activeTab === "archived") matchesTab = record.status === "مؤرشف";

    let matchesFilter = true;
    if (activeFilter === "default") matchesFilter = record.dataModel === "النموذج الافتراضي";
    else if (activeFilter === "rehabilitation") matchesFilter = record.dataModel === "التأهيل";

    return matchesSearch && matchesTab && matchesFilter;
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`تم نسخ ${label}`);
  };

  return (
    <InnerPageLayout
      title="قاعدة بيانات التابعين"
      moduleId="beneficiaries"
      sectionTitle="إدارة حسابات المستفيدين"
      moduleTitle="إدارة ملفات المستفيدين"
    >
      <div className="space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "outline"}
              className={cn(
                "gap-2",
                activeTab === tab.key && tab.color
              )}
              onClick={() => setActiveTab(tab.key)}
            >
              <span>{tab.label}</span>
              <Badge variant="secondary" className="bg-white/20 text-inherit">
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="flex gap-4">
          {/* Side Filter */}
          <Card className="w-48 shrink-0">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-sm">نموذج البيانات</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={cn(
                    "w-full text-right px-3 py-2 rounded-md text-sm flex justify-between items-center",
                    activeFilter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  )}
                >
                  <span>الكل</span>
                  <Badge variant="secondary">{dependentsData.length}</Badge>
                </button>
                {dataModelFilters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={cn(
                      "w-full text-right px-3 py-2 rounded-md text-sm flex justify-between items-center",
                      activeFilter === filter.key ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    <span>{filter.label}</span>
                    <Badge variant="secondary">{filter.count}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="flex-1">
            <CardContent className="p-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
                  <Select value={pageSize} onValueChange={setPageSize}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="pr-9"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <FileDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right">الإسم</TableHead>
                      <TableHead className="text-right">نموذج البيانات</TableHead>
                      <TableHead className="text-right">رقم ملف الولي</TableHead>
                      <TableHead className="text-right">ملف الولي</TableHead>
                      <TableHead className="text-right">رقم هوية الولي</TableHead>
                      <TableHead className="text-right">رقم جوال الولي</TableHead>
                      <TableHead className="text-right">اسم ولي الأمر</TableHead>
                      <TableHead className="text-right">رقم الأيبان لحساب الولي</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell>{record.dataModel}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{record.guardianFileNumber}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(record.guardianFileNumber, "رقم الملف")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <Eye className="h-4 w-4 ml-1" />
                            معاينة
                          </Button>
                        </TableCell>
                        <TableCell>{record.guardianIdNumber}</TableCell>
                        <TableCell dir="ltr" className="text-right">{record.guardianMobile}</TableCell>
                        <TableCell>{record.guardianName}</TableCell>
                        <TableCell>
                          {record.guardianIban ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs">{record.guardianIban}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(record.guardianIban!, "رقم الآيبان")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">غير متاح</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Info */}
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span>عرض {filteredData.length} من {dependentsData.length} سجل</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default DependentsDatabasePage;
