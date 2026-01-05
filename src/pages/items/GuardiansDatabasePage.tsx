import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Search, Eye, Filter, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import ExportDropdown from "@/components/shared/ExportDropdown";

interface Guardian {
  id: string;
  fileNumber: string;
  name: string;
  dataModel: string;
  gender: string;
  orphansCount: string;
  idNumber: string;
  phone: string;
  maritalStatus: string;
  housingType: string;
  housingOwnership: string;
}

const mockGuardians: Guardian[] = [
  { id: "1", fileNumber: "150001277", name: "خالد مسفر العازمي", dataModel: "النموذج الافتراضي", gender: "ذكر", orphansCount: "غير متاح", idNumber: "1087654321", phone: "0551234567", maritalStatus: "متزوج", housingType: "بيت شعبي", housingOwnership: "ملك" },
  { id: "2", fileNumber: "540001195", name: "تهاني خالد جبران", dataModel: "النموذج الافتراضي", gender: "أنثى", orphansCount: "1", idNumber: "1098765432", phone: "0559876543", maritalStatus: "أرملة", housingType: "فيلا", housingOwnership: "إيجار" },
  { id: "3", fileNumber: "580001047", name: "فيحان فرج مفلح", dataModel: "التأهيل", gender: "ذكر", orphansCount: "غير متاح", idNumber: "1076543210", phone: "0553456789", maritalStatus: "متزوج", housingType: "بيت مسلح", housingOwnership: "ملك" },
  { id: "4", fileNumber: "830000919", name: "فيحان عتيق ضاري", dataModel: "النموذج الافتراضي", gender: "ذكر", orphansCount: "غير متاح", idNumber: "1065432109", phone: "0552345678", maritalStatus: "أعزب", housingType: "شقة", housingOwnership: "إيجار" },
  { id: "5", fileNumber: "890000850", name: "نوير ملفي مبارك", dataModel: "التأهيل", gender: "أنثى", orphansCount: "1", idNumber: "1054321098", phone: "0558765432", maritalStatus: "أرملة", housingType: "بيت شعبي", housingOwnership: "ملك" },
  { id: "6", fileNumber: "840000778", name: "هيفاء حاتم بركة", dataModel: "النموذج الافتراضي", gender: "أنثى", orphansCount: "2", idNumber: "1043210987", phone: "0556543210", maritalStatus: "أرملة", housingType: "فيلا", housingOwnership: "ملك" },
  { id: "7", fileNumber: "620000681", name: "إسماعيل حسني لاحق", dataModel: "النموذج الافتراضي", gender: "ذكر", orphansCount: "غير متاح", idNumber: "1032109876", phone: "0554321098", maritalStatus: "متزوج", housingType: "بيت مسلح", housingOwnership: "إيجار" },
  { id: "8", fileNumber: "810000495", name: "مريم مسفر احمد", dataModel: "النموذج الافتراضي", gender: "أنثى", orphansCount: "2", idNumber: "1021098765", phone: "0557654321", maritalStatus: "أرملة", housingType: "بيت شعبي", housingOwnership: "ملك" },
  { id: "9", fileNumber: "950000216", name: "عبدالله محمد فيصل", dataModel: "النموذج الافتراضي", gender: "ذكر", orphansCount: "1", idNumber: "1010987654", phone: "0550987654", maritalStatus: "متزوج", housingType: "فيلا", housingOwnership: "ملك" },
  { id: "10", fileNumber: "180000160", name: "مجاهد احمد الصواف", dataModel: "النموذج الافتراضي", gender: "ذكر", orphansCount: "1", idNumber: "1009876543", phone: "0551098765", maritalStatus: "متزوج", housingType: "شقة", housingOwnership: "إيجار" },
  { id: "11", fileNumber: "230000054", name: "راشد سليمان العنزي", dataModel: "النموذج الافتراضي", gender: "ذكر", orphansCount: "غير متاح", idNumber: "1098765410", phone: "0552109876", maritalStatus: "أعزب", housingType: "بيت مسلح", housingOwnership: "ملك" },
  { id: "12", fileNumber: "170000052", name: "سعود فهد المطيري", dataModel: "النموذج الافتراضي", gender: "ذكر", orphansCount: "غير متاح", idNumber: "1087654310", phone: "0553210987", maritalStatus: "متزوج", housingType: "بيت شعبي", housingOwnership: "ملك" },
];

const exportColumns = [
  { key: "fileNumber", label: "رقم الملف" },
  { key: "name", label: "الإسم" },
  { key: "dataModel", label: "نموذج البيانات" },
  { key: "gender", label: "النوع" },
  { key: "orphansCount", label: "عدد الأيتام" },
  { key: "idNumber", label: "رقم الهوية" },
  { key: "phone", label: "رقم الجوال" },
  { key: "maritalStatus", label: "الحالة الاجتماعية" },
  { key: "housingType", label: "نوع السكن" },
  { key: "housingOwnership", label: "ملكية السكن" },
];

const GuardiansDatabasePage = () => {
  const [searchValue, setSearchValue] = useState("");

  const filteredGuardians = mockGuardians.filter(g => 
    g.name.includes(searchValue) || 
    g.fileNumber.includes(searchValue) || 
    g.idNumber.includes(searchValue) ||
    g.phone.includes(searchValue)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="قاعدة بيانات الأوصياء"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Database className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">قاعدة بيانات الأوصياء</h1>
        </div>

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
                    <TableHead className="text-right">رقم الملف</TableHead>
                    <TableHead className="text-right">ملف الوصي</TableHead>
                    <TableHead className="text-right">الإسم</TableHead>
                    <TableHead className="text-right">نموذج البيانات</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">عدد الأيتام</TableHead>
                    <TableHead className="text-right">رقم الهوية</TableHead>
                    <TableHead className="text-right">رقم الجوال</TableHead>
                    <TableHead className="text-right">الحالة الاجتماعية</TableHead>
                    <TableHead className="text-right">نوع السكن</TableHead>
                    <TableHead className="text-right">ملكية السكن</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuardians.map((guardian) => (
                    <TableRow key={guardian.id}>
                      <TableCell className="font-medium">{guardian.fileNumber}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="gap-1 text-primary">
                          <Eye className="h-3 w-3" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell>{guardian.name}</TableCell>
                      <TableCell>{guardian.dataModel}</TableCell>
                      <TableCell>{guardian.gender}</TableCell>
                      <TableCell>{guardian.orphansCount}</TableCell>
                      <TableCell>{guardian.idNumber}</TableCell>
                      <TableCell>{guardian.phone}</TableCell>
                      <TableCell>{guardian.maritalStatus}</TableCell>
                      <TableCell>{guardian.housingType}</TableCell>
                      <TableCell>{guardian.housingOwnership}</TableCell>
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

export default GuardiansDatabasePage;
