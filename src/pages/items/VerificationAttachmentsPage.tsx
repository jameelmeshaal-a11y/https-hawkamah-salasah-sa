import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, RefreshCw, Info, ChevronLeft, ChevronRight } from "lucide-react";
import ExportDropdown from "@/components/shared/ExportDropdown";

interface AttachmentRecord {
  id: number;
  title: string;
  classification: string;
  publishedOnWebsite: string;
  attachmentsCount: string;
  attachments: string;
}

const attachmentsData: AttachmentRecord[] = [
  { id: 1, title: "اللائحة الأساسية", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 2, title: "اللائحة الأساسية السابقة", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 3, title: "نظام الرقابة الداخلي", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 4, title: "آلية للتأكد من استحقاق المستفيد", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 5, title: "آلية لإدارة المتطوعين", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 6, title: "لائحة الموارد البشرية", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 7, title: "لائحة صلاحيات المجلس", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 8, title: "قائمة بصلاحيات المجلس", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 9, title: "لائحة الصلاحيات المالية", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 10, title: "لائحة السياسات المالية", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 11, title: "لائحة للمشتريات", classification: "اللوائح والنموذج الشامل", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 12, title: "سياسة تعارض المصالح", classification: "السياسات", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 13, title: "سياسة للإبلاغ عن المخالفات", classification: "السياسات", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 14, title: "سياسة لخصوصية البيانات", classification: "السياسات", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 15, title: "سياسة للاحتفاظ بالوثائق", classification: "السياسات", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 16, title: "سياسة جمع التبرعات", classification: "السياسات", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 17, title: "سياسة تنظيم العلاقة مع المستفيدين", classification: "السياسات", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 18, title: "قائمة السياسات والإجراءات عند الاشتباه", classification: "السياسات", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 19, title: "سياسة الصرف للبرامج والأنشطة", classification: "السياسات", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
  { id: 20, title: "سياسة للاستثمار", classification: "السياسات", publishedOnWebsite: "لا", attachmentsCount: "غير متاح", attachments: "غير متاح" },
];

const VerificationAttachmentsPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState("20");
  const [currentPage, setCurrentPage] = useState(1);

  const totalRecords = 139;
  const totalPages = Math.ceil(totalRecords / parseInt(pageSize));

  const filteredData = attachmentsData.filter(item =>
    item.title.includes(searchTerm) || item.classification.includes(searchTerm)
  );

  if (!showTable) {
    return (
      <InnerPageLayout
        moduleId="excellence"
        title="إدارة مرفقات التحقق"
        sectionTitle="إدارة الحوكمة"
        moduleTitle="إدارة التميز المؤسسي"
      >
        <Card className="max-w-md mx-auto mt-8">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-right">
                العام: <span className="text-red-500">*</span>
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full text-right">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => setShowTable(true)}
            >
              استمرار
            </Button>
          </CardContent>
        </Card>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout
      moduleId="excellence"
      title="إدارة مرفقات التحقق"
      sectionTitle="إدارة الحوكمة"
      moduleTitle="إدارة التميز المؤسسي"
    >
      <div className="space-y-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-right">مرفقات آليات التحقق لعام {selectedYear}</h2>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2 text-right">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <span className="text-sm text-blue-700">
            قم بإعادة تحميل الصفحة لتظهر لك التحديثات على ملفات التحقق
          </span>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Select value={pageSize} onValueChange={setPageSize}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20 سجل</SelectItem>
                <SelectItem value="50">50 سجل</SelectItem>
                <SelectItem value="100">100 سجل</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <ExportDropdown 
              columns={[
                { key: "title", label: "عنوان المبادرة" },
                { key: "classification", label: "التصنيف" },
                { key: "publishedOnWebsite", label: "نشر على الموقع" },
                { key: "attachmentsCount", label: "عدد المرفقات" },
              ]}
            />
          </div>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9 w-64 text-right"
            />
          </div>
        </div>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-right">إدارة</TableHead>
                <TableHead className="text-right">عنوان المبادرة</TableHead>
                <TableHead className="text-right">التصنيف</TableHead>
                <TableHead className="text-right">نشر على الموقع</TableHead>
                <TableHead className="text-right">عدد المرفقات</TableHead>
                <TableHead className="text-right">المرفقات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <Button size="sm" className="bg-teal-700 hover:bg-teal-800 text-white text-xs">
                      تحديث
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {record.title}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{record.classification}</TableCell>
                  <TableCell className="text-right">{record.publishedOnWebsite}</TableCell>
                  <TableCell className="text-right">{record.attachmentsCount}</TableCell>
                  <TableCell className="text-right">{record.attachments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            إظهار 1-{Math.min(parseInt(pageSize), totalRecords)} من {totalRecords}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8"
              >
                {page}
              </Button>
            ))}
            <span className="px-2">...</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              className="w-8 h-8"
            >
              {totalPages}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default VerificationAttachmentsPage;
