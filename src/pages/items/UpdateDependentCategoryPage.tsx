import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { FileEdit, Search, Filter, Download, RefreshCw, Eye, ChevronDown, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const dependentsData = [
  { id: 1, name: "سيف وليد بخيت", dataModel: "النموذج الافتراضي", guardianFileNumber: 1, guardianId: "1045678901", guardianPhone: "0512345678", guardianName: "هيفاء حاتم بركة", guardianIban: "SA1234567890123456789012", fileStatus: "معتمد", category: "أ" },
  { id: 2, name: "امجاد وليد بخيت", dataModel: "النموذج الافتراضي", guardianFileNumber: 1, guardianId: "1045678901", guardianPhone: "0512345678", guardianName: "هيفاء حاتم بركة", guardianIban: "SA1234567890123456789012", fileStatus: "معتمد", category: "أ" },
  { id: 3, name: "وسيم خالد محمود", dataModel: "النموذج الافتراضي", guardianFileNumber: 2, guardianId: "1056789012", guardianPhone: "0523456789", guardianName: "مريم مسفر احمد", guardianIban: "غير متاح", fileStatus: "معتمد", category: "ب" },
  { id: 4, name: "هديل خالد محمود", dataModel: "النموذج الافتراضي", guardianFileNumber: 2, guardianId: "1056789012", guardianPhone: "0523456789", guardianName: "مريم مسفر احمد", guardianIban: "غير متاح", fileStatus: "معتمد", category: "ب" },
  { id: 5, name: "مهدي عبدالله محمد", dataModel: "النموذج الافتراضي", guardianFileNumber: 3, guardianId: "1067890123", guardianPhone: "0534567890", guardianName: "عبدالله محمد فيصل", guardianIban: "SA9876543210987654321098", fileStatus: "معتمد", category: "أ" },
  { id: 6, name: "نسمة عبدالله محمد", dataModel: "النموذج الافتراضي", guardianFileNumber: 3, guardianId: "1067890123", guardianPhone: "0534567890", guardianName: "عبدالله محمد فيصل", guardianIban: "SA9876543210987654321098", fileStatus: "معتمد", category: "أ" },
  { id: 7, name: "عمر فرج مفلح", dataModel: "النموذج الافتراضي", guardianFileNumber: 4, guardianId: "1078901234", guardianPhone: "0545678901", guardianName: "فيحان فرج مفلح", guardianIban: "غير متاح", fileStatus: "معتمد", category: "ج" },
  { id: 8, name: "فريده لافي مسفر", dataModel: "النموذج الافتراضي", guardianFileNumber: 4, guardianId: "1078901234", guardianPhone: "0545678901", guardianName: "فيحان فرج مفلح", guardianIban: "غير متاح", fileStatus: "معتمد", category: "ج" },
  { id: 9, name: "سحر مجاهد محسن", dataModel: "النموذج الافتراضي", guardianFileNumber: 5, guardianId: "1089012345", guardianPhone: "0556789012", guardianName: "مجاهد احمد الصواف", guardianIban: "SA5678901234567890123456", fileStatus: "معتمد", category: "أ" },
  { id: 10, name: "احمد مجاهد محسن", dataModel: "النموذج الافتراضي", guardianFileNumber: 5, guardianId: "1089012345", guardianPhone: "0556789012", guardianName: "مجاهد احمد الصواف", guardianIban: "SA5678901234567890123456", fileStatus: "معتمد", category: "أ" },
  { id: 11, name: "ليلى سالم حسن", dataModel: "التأهيل", guardianFileNumber: 6, guardianId: "1090123456", guardianPhone: "0567890123", guardianName: "سالم عبدالله حسن", guardianIban: "غير متاح", fileStatus: "معتمد", category: "ب" },
  { id: 12, name: "فهد خالد العمري", dataModel: "التأهيل", guardianFileNumber: 8, guardianId: "1012345678", guardianPhone: "0589012345", guardianName: "خالد سعيد العمري", guardianIban: "SA3456789012345678901234", fileStatus: "معتمد", category: "ج" },
  { id: 13, name: "ريم محمد عبدالرحمن", dataModel: "النموذج الافتراضي", guardianFileNumber: 10, guardianId: "1023456789", guardianPhone: "0590123456", guardianName: "محمد عبدالرحمن", guardianIban: "غير متاح", fileStatus: "غير مستحق", category: "غير مستحق" },
];

const categoryColors: Record<string, string> = {
  "أ": "bg-green-100 text-green-700 border-green-300",
  "ب": "bg-blue-100 text-blue-700 border-blue-300",
  "ج": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "غير مستحق": "bg-red-100 text-red-700 border-red-300",
};

const UpdateDependentCategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateCategory = (dependentId: number, newCategory: string) => {
    toast.success(`تم تحديث فئة التابع إلى "${newCategory}" بنجاح`);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم النسخ");
  };

  const filteredData = dependentsData.filter(item =>
    item.name.includes(searchQuery) || 
    item.guardianName.includes(searchQuery) ||
    item.guardianFileNumber.toString().includes(searchQuery)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="تحديث فئة ملف تابع"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6 space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileEdit className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">تحديث فئة ملف تابع</h1>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث عام"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-1" />
              تصدير
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-1" />
              فلتر
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-right font-bold">تحديث الفئة</TableHead>
                <TableHead className="text-right font-bold">ملف الولي</TableHead>
                <TableHead className="text-right font-bold">الإسم</TableHead>
                <TableHead className="text-right font-bold">نموذج البيانات</TableHead>
                <TableHead className="text-right font-bold">رقم ملف الولي</TableHead>
                <TableHead className="text-right font-bold">رقم هوية الولي</TableHead>
                <TableHead className="text-right font-bold">رقم جوال الولي</TableHead>
                <TableHead className="text-right font-bold">رقم الأيبان لحساب الولي</TableHead>
                <TableHead className="text-right font-bold">حالة الملف</TableHead>
                <TableHead className="text-right font-bold">فئة الملف</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30">
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          تحديث الفئة
                          <ChevronDown className="h-4 w-4 mr-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdateCategory(row.id, "أ")}>
                          فئة أ
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateCategory(row.id, "ب")}>
                          فئة ب
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateCategory(row.id, "ج")}>
                          فئة ج
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateCategory(row.id, "غير مستحق")}>
                          غير مستحق
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="text-blue-600 border-blue-300">
                      <Eye className="h-4 w-4 ml-1" />
                      معاينة
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.dataModel}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{row.guardianFileNumber}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleCopy(row.guardianFileNumber.toString())}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{row.guardianId}</TableCell>
                  <TableCell>{row.guardianPhone}</TableCell>
                  <TableCell>
                    {row.guardianIban !== "غير متاح" ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs truncate max-w-[120px]">{row.guardianIban}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleCopy(row.guardianIban)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">غير متاح</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={row.fileStatus === "معتمد" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                      {row.fileStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={categoryColors[row.category] || "bg-gray-100 text-gray-700"}>
                      {row.category}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>عرض 1 إلى {filteredData.length} من {dependentsData.length} سجل</span>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default UpdateDependentCategoryPage;
