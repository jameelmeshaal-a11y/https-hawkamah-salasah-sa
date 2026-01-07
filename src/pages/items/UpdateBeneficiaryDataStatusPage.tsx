import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Search, Filter, RotateCcw, Eye, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";
import ExportDropdown from "@/components/shared/ExportDropdown";

interface Beneficiary {
  id: string;
  fileNumber: string;
  name: string;
  fileStatus: string;
  dataStatus: string;
  category: string;
}

const UpdateBeneficiaryDataStatusPage = () => {
  const [beneficiaries] = useState<Beneficiary[]>([
    { id: "1", fileNumber: "150001277", name: "خالد مسفر العازمي", fileStatus: "قيد المراجعة", dataStatus: "محدثة سليمة", category: "أ" },
    { id: "2", fileNumber: "540001195", name: "تهاني خالد جبران", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "أ" },
    { id: "3", fileNumber: "580001047", name: "فيحان فرج مفلح", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "ج" },
    { id: "4", fileNumber: "830000919", name: "فيحان عتيق ضاري", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "أ" },
    { id: "5", fileNumber: "890000850", name: "نوير ملفي مبارك", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "غير مستحق" },
    { id: "6", fileNumber: "840000778", name: "هيفاء حاتم بركة", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "ب" },
    { id: "7", fileNumber: "620000681", name: "إسماعيل حسني لاحق", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "أ" },
    { id: "8", fileNumber: "970000537", name: "مسند صالح لاحق", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "أ" },
    { id: "9", fileNumber: "810000495", name: "مريم مسفر احمد", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "أ" },
    { id: "10", fileNumber: "350000315", name: "محمد عيسى الاحمد", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "أ" },
    { id: "11", fileNumber: "950000216", name: "عبدالله محمد فيصل", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "أ" },
    { id: "12", fileNumber: "180000160", name: "مجاهد احمد الصواف", fileStatus: "معتمد", dataStatus: "محدثة سليمة", category: "ب" },
  ]);

  const columns = [
    { key: "updateStatus", label: "تحديث الحالة" },
    { key: "filePreview", label: "ملف المستفيد" },
    { key: "name", label: "الإسم" },
    { key: "fileStatus", label: "حالة الملف" },
    { key: "dataStatus", label: "حالة البيانات" },
    { key: "category", label: "فئة الملف" },
    { key: "fileNumber", label: "رقم الملف" },
  ];

  const getFileStatusBadge = (status: string) => {
    if (status === "قيد المراجعة") {
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">{status}</Badge>;
    }
    return <Badge className="bg-green-600 hover:bg-green-700 text-white">{status}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    if (category === "غير مستحق") {
      return <Badge variant="destructive">{category}</Badge>;
    }
    return <span>{category}</span>;
  };

  return (
    <InnerPageLayout 
      moduleId="beneficiary-accounts" 
      title="تحديث حالة بيانات مستفيد" 
      sectionTitle="إدارة تحديث البيانات" 
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        {/* شريط الأدوات */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* الجانب الأيمن */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
                <Select defaultValue="20">
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

              {/* الجانب الأيسر */}
              <div className="flex items-center gap-2">
                <Input placeholder="بحث عام" className="w-48" />
                <ExportDropdown columns={columns} />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* الجدول */}
        <Card>
          <CardContent className="pt-6">
            {beneficiaries.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right">تحديث الحالة</TableHead>
                      <TableHead className="text-right">ملف المستفيد</TableHead>
                      <TableHead className="text-right">الإسم</TableHead>
                      <TableHead className="text-right flex items-center gap-1">
                        حالة الملف <Filter className="h-3 w-3" />
                      </TableHead>
                      <TableHead className="text-right flex items-center gap-1">
                        حالة البيانات <Filter className="h-3 w-3" />
                      </TableHead>
                      <TableHead className="text-right flex items-center gap-1">
                        فئة الملف <Filter className="h-3 w-3" />
                      </TableHead>
                      <TableHead className="text-right">رقم الملف</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {beneficiaries.map((beneficiary) => (
                      <TableRow key={beneficiary.id}>
                        <TableCell>
                          <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">
                            <ChevronDown className="h-4 w-4 ml-1" />
                            تحديث الحالة
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button className="bg-primary hover:bg-primary/90 text-white text-sm">
                            <Eye className="h-4 w-4 ml-1" />
                            معاينة
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{beneficiary.name}</TableCell>
                        <TableCell>{getFileStatusBadge(beneficiary.fileStatus)}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-600 hover:bg-green-700 text-white">
                            {beneficiary.dataStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{getCategoryBadge(beneficiary.category)}</TableCell>
                        <TableCell>{beneficiary.fileNumber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* ترقيم الصفحات */}
                <div className="flex justify-end mt-4 text-sm text-muted-foreground">
                  إظهار السجلات 1 الى 12 من 12
                </div>
              </>
            ) : (
              <EmptyState message="لا توجد بيانات متوفرة في الجدول" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default UpdateBeneficiaryDataStatusPage;
