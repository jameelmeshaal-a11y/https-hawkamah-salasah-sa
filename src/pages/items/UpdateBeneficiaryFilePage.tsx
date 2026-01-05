import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RefreshCw, Eye, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyState from "@/components/shared/EmptyState";
import ExportDropdown from "@/components/shared/ExportDropdown";

interface Beneficiary {
  id: string;
  name: string;
  fileStatus: "معتمد" | "قيد المراجعة";
  dataStatus: "محدثة سليمة" | "غير محدثة";
  fileCategory: "أ" | "ب" | "ج" | "غير مستحق";
  fileNumber: string;
  dataModel: string;
  gender: "ذكر" | "أنثى";
  dependents: number;
  wives: number | null;
  children: number | null;
  orphans: number | null;
}

const mockBeneficiaries: Beneficiary[] = [
  { id: "1", name: "خالد مسفر العازمي", fileStatus: "قيد المراجعة", dataStatus: "غير محدثة", fileCategory: "أ", fileNumber: "150001277", dataModel: "النموذج الافتراضي", gender: "ذكر", dependents: 0, wives: null, children: null, orphans: null },
  { id: "2", name: "تهاني خالد جبران", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "540001195", dataModel: "النموذج الافتراضي", gender: "أنثى", dependents: 2, wives: null, children: 2, orphans: null },
  { id: "3", name: "فيحان فرج مفلح", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "ج", fileNumber: "580001047", dataModel: "النموذج الافتراضي", gender: "ذكر", dependents: 2, wives: 1, children: 1, orphans: null },
  { id: "4", name: "فيحان عتيق ضاري", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "830000919", dataModel: "النموذج الافتراضي", gender: "ذكر", dependents: 0, wives: null, children: null, orphans: null },
  { id: "5", name: "نوير ملفي مبارك", fileStatus: "معتمد", dataStatus: "غير محدثة", fileCategory: "غير مستحق", fileNumber: "890000850", dataModel: "النموذج الافتراضي", gender: "أنثى", dependents: 1, wives: null, children: 1, orphans: null },
  { id: "6", name: "هيفاء حاتم بركة", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "ب", fileNumber: "840000778", dataModel: "النموذج الافتراضي", gender: "أنثى", dependents: 2, wives: null, children: 2, orphans: null },
  { id: "7", name: "إسماعيل حسني لاحق", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "620000681", dataModel: "النموذج الافتراضي", gender: "ذكر", dependents: 0, wives: null, children: null, orphans: null },
  { id: "8", name: "مسند صالح لاحق", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "970000537", dataModel: "النموذج الافتراضي", gender: "ذكر", dependents: 0, wives: null, children: null, orphans: null },
  { id: "9", name: "مريم مسفر احمد", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "810000495", dataModel: "النموذج الافتراضي", gender: "أنثى", dependents: 2, wives: null, children: 2, orphans: null },
  { id: "10", name: "محمد عيسى اللاحم", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "850000315", dataModel: "النموذج الافتراضي", gender: "ذكر", dependents: 0, wives: null, children: null, orphans: null },
  { id: "11", name: "عبدالله محمد فيصل", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "950000216", dataModel: "النموذج الافتراضي", gender: "ذكر", dependents: 2, wives: 1, children: 1, orphans: null },
  { id: "12", name: "مجاهد احمد الصواف", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "ب", fileNumber: "180000160", dataModel: "النموذج الافتراضي", gender: "ذكر", dependents: 2, wives: 1, children: 1, orphans: null },
];

const UpdateBeneficiaryFilePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const filteredBeneficiaries = mockBeneficiaries.filter(b =>
    b.name.includes(searchValue) || b.fileNumber.includes(searchValue)
  );

  const getFileStatusBadge = (status: Beneficiary["fileStatus"]) => {
    return status === "معتمد" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">معتمد</Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">قيد المراجعة</Badge>
    );
  };

  const getDataStatusBadge = (status: Beneficiary["dataStatus"]) => {
    return status === "محدثة سليمة" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">محدثة سليمة</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">غير محدثة</Badge>
    );
  };

  const getCategoryBadge = (category: Beneficiary["fileCategory"]) => {
    const styles: Record<string, string> = {
      "أ": "bg-blue-100 text-blue-800",
      "ب": "bg-purple-100 text-purple-800",
      "ج": "bg-orange-100 text-orange-800",
      "غير مستحق": "bg-gray-100 text-gray-800",
    };
    return (
      <Badge className={cn(styles[category], "hover:opacity-90")}>
        {category}
      </Badge>
    );
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="تحديث ملف مستفيد"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <Card>
        <CardContent className="p-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pr-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <ExportDropdown columns={[
                { key: "name", label: "الاسم" },
                { key: "fileStatus", label: "حالة الملف" },
                { key: "dataStatus", label: "حالة البيانات" },
                { key: "fileCategory", label: "فئة الملف" },
                { key: "fileNumber", label: "رقم الملف" },
              ]} />
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          {filteredBeneficiaries.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">ملف المستفيد</TableHead>
                    <TableHead className="text-right">الإسم</TableHead>
                    <TableHead className="text-right">حالة الملف</TableHead>
                    <TableHead className="text-right">حالة البيانات</TableHead>
                    <TableHead className="text-right">فئة الملف</TableHead>
                    <TableHead className="text-right">رقم الملف</TableHead>
                    <TableHead className="text-right">نموذج البيانات</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">عدد التابعين</TableHead>
                    <TableHead className="text-right">عدد الزوجات</TableHead>
                    <TableHead className="text-right">عدد الأطفال</TableHead>
                    <TableHead className="text-right">عدد الأيتام</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBeneficiaries.map((beneficiary) => (
                    <TableRow key={beneficiary.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                            معاينة
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{beneficiary.name}</TableCell>
                      <TableCell>{getFileStatusBadge(beneficiary.fileStatus)}</TableCell>
                      <TableCell>{getDataStatusBadge(beneficiary.dataStatus)}</TableCell>
                      <TableCell>{getCategoryBadge(beneficiary.fileCategory)}</TableCell>
                      <TableCell className="font-mono">{beneficiary.fileNumber}</TableCell>
                      <TableCell>{beneficiary.dataModel}</TableCell>
                      <TableCell>{beneficiary.gender}</TableCell>
                      <TableCell>{beneficiary.dependents || "-"}</TableCell>
                      <TableCell>{beneficiary.wives ?? "غير متاح"}</TableCell>
                      <TableCell>{beneficiary.children ?? "غير متاح"}</TableCell>
                      <TableCell>{beneficiary.orphans ?? "غير متاح"}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 ml-1" />
                          معاينة
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              message="لم يتم العثور على أي مستفيدين مطابقين للبحث"
            />
          )}

          {/* Pagination Info */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>عرض 1 إلى {filteredBeneficiaries.length} من {mockBeneficiaries.length} سجل</span>
          </div>
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default UpdateBeneficiaryFilePage;
