import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search, Eye, AlertTriangle, Filter, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import ExportDropdown from "@/components/shared/ExportDropdown";

interface Guardian {
  id: string;
  fileNumber: string;
  name: string;
  dataModel: string;
  orphansCount: string;
  gender: string;
  idNumber: string;
  phone: string;
}

const initialGuardians: Guardian[] = [
  { id: "1", fileNumber: "150001277", name: "خالد مسفر العازمي", dataModel: "النموذج الافتراضي", orphansCount: "غير متاح", gender: "ذكر", idNumber: "1087654321", phone: "0551234567" },
  { id: "2", fileNumber: "540001195", name: "تهاني خالد جبران", dataModel: "النموذج الافتراضي", orphansCount: "1", gender: "أنثى", idNumber: "1098765432", phone: "0559876543" },
  { id: "3", fileNumber: "580001047", name: "فيحان فرج مفلح", dataModel: "التأهيل", orphansCount: "غير متاح", gender: "ذكر", idNumber: "1076543210", phone: "0553456789" },
  { id: "4", fileNumber: "830000919", name: "فيحان عتيق ضاري", dataModel: "النموذج الافتراضي", orphansCount: "غير متاح", gender: "ذكر", idNumber: "1065432109", phone: "0552345678" },
  { id: "5", fileNumber: "890000850", name: "نوير ملفي مبارك", dataModel: "التأهيل", orphansCount: "1", gender: "أنثى", idNumber: "1054321098", phone: "0558765432" },
  { id: "6", fileNumber: "840000778", name: "هيفاء حاتم بركة", dataModel: "النموذج الافتراضي", orphansCount: "2", gender: "أنثى", idNumber: "1043210987", phone: "0556543210" },
  { id: "7", fileNumber: "620000681", name: "إسماعيل حسني لاحق", dataModel: "النموذج الافتراضي", orphansCount: "غير متاح", gender: "ذكر", idNumber: "1032109876", phone: "0554321098" },
  { id: "8", fileNumber: "810000495", name: "مريم مسفر احمد", dataModel: "النموذج الافتراضي", orphansCount: "2", gender: "أنثى", idNumber: "1021098765", phone: "0557654321" },
  { id: "9", fileNumber: "950000216", name: "عبدالله محمد فيصل", dataModel: "النموذج الافتراضي", orphansCount: "1", gender: "ذكر", idNumber: "1010987654", phone: "0550987654" },
  { id: "10", fileNumber: "180000160", name: "مجاهد احمد الصواف", dataModel: "النموذج الافتراضي", orphansCount: "1", gender: "ذكر", idNumber: "1009876543", phone: "0551098765" },
  { id: "11", fileNumber: "230000054", name: "راشد سليمان العنزي", dataModel: "النموذج الافتراضي", orphansCount: "غير متاح", gender: "ذكر", idNumber: "1098765410", phone: "0552109876" },
  { id: "12", fileNumber: "170000052", name: "سعود فهد المطيري", dataModel: "النموذج الافتراضي", orphansCount: "غير متاح", gender: "ذكر", idNumber: "1087654310", phone: "0553210987" },
];

const exportColumns = [
  { key: "fileNumber", label: "رقم الملف" },
  { key: "name", label: "الإسم" },
  { key: "dataModel", label: "نموذج البيانات" },
  { key: "orphansCount", label: "عدد الأيتام" },
  { key: "gender", label: "النوع" },
  { key: "idNumber", label: "رقم الهوية" },
  { key: "phone", label: "رقم الجوال" },
];

const DeleteGuardianFilePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [guardians, setGuardians] = useState<Guardian[]>(initialGuardians);

  const hasOrphans = (orphansCount: string) => {
    return orphansCount !== "غير متاح" && parseInt(orphansCount) > 0;
  };

  const handleDelete = (guardian: Guardian) => {
    if (hasOrphans(guardian.orphansCount)) {
      toast.error("لا يمكن حذف وصي لديه أيتام. يجب نقل الأيتام أولاً");
      return;
    }
    setGuardians(guardians.filter(g => g.id !== guardian.id));
    toast.success("تم حذف ملف الوصي بنجاح");
  };

  const filteredGuardians = guardians.filter(g => 
    g.name.includes(searchValue) || 
    g.fileNumber.includes(searchValue) || 
    g.idNumber.includes(searchValue) ||
    g.phone.includes(searchValue)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="حذف ملف وصي"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <Trash2 className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">حذف ملف وصي</h1>
        </div>

        {/* Warning Alert */}
        <Card className="mb-4 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">لا يمكن حذف وصي لديه أيتام مسجلين. يجب نقل الأيتام إلى وصي آخر أولاً</span>
            </div>
          </CardContent>
        </Card>

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
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right w-[100px]">حذف</TableHead>
                    <TableHead className="text-right">ملف الوصي</TableHead>
                    <TableHead className="text-right">رقم الملف</TableHead>
                    <TableHead className="text-right">الإسم</TableHead>
                    <TableHead className="text-right">نموذج البيانات</TableHead>
                    <TableHead className="text-right">عدد الأيتام</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">رقم الهوية</TableHead>
                    <TableHead className="text-right">رقم الجوال</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuardians.map((guardian) => (
                    <TableRow key={guardian.id}>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(guardian)}
                          disabled={hasOrphans(guardian.orphansCount)}
                          className="gap-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          حذف
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
                      <TableCell>{guardian.dataModel}</TableCell>
                      <TableCell>{guardian.orphansCount}</TableCell>
                      <TableCell>{guardian.gender}</TableCell>
                      <TableCell>{guardian.idNumber}</TableCell>
                      <TableCell>{guardian.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

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

export default DeleteGuardianFilePage;
