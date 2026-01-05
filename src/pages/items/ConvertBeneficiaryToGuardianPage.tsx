import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, RefreshCw, Eye, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ExportDropdown from "@/components/shared/ExportDropdown";

interface ConversionRecord {
  id: string;
  fileNumber: string;
  name: string;
  orphansCount: string;
  fatherName: string;
  fatherIdNumber: string;
  deathDate: string;
  deathCause: string;
}

const mockRecords: ConversionRecord[] = [
  { id: "1", fileNumber: "150001277", name: "خالد مسفر العازمي", orphansCount: "غير متاح", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
  { id: "2", fileNumber: "540001195", name: "تهاني خالد جبران", orphansCount: "1", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
  { id: "3", fileNumber: "580001047", name: "فيحان فرج مفلح", orphansCount: "غير متاح", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
  { id: "4", fileNumber: "840000778", name: "هيفاء حاتم بركة", orphansCount: "2", fatherName: "حاتم بركة", fatherIdNumber: "1087654321", deathDate: "1445/03/15", deathCause: "مرض" },
  { id: "5", fileNumber: "890000850", name: "نوير ملفي مبارك", orphansCount: "1", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
  { id: "6", fileNumber: "810000495", name: "مريم مسفر احمد", orphansCount: "2", fatherName: "مسفر احمد", fatherIdNumber: "1098765432", deathDate: "1444/08/22", deathCause: "حادث" },
  { id: "7", fileNumber: "950000216", name: "عبدالله محمد فيصل", orphansCount: "1", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
  { id: "8", fileNumber: "180000160", name: "مجاهد احمد الصواف", orphansCount: "1", fatherName: "احمد الصواف", fatherIdNumber: "1076543210", deathDate: "1443/11/05", deathCause: "طبيعي" },
  { id: "9", fileNumber: "220000334", name: "سارة عبدالرحمن المالكي", orphansCount: "3", fatherName: "عبدالرحمن المالكي", fatherIdNumber: "1065432109", deathDate: "1445/01/18", deathCause: "مرض" },
  { id: "10", fileNumber: "330000445", name: "أحمد سليمان العنزي", orphansCount: "غير متاح", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
  { id: "11", fileNumber: "440000556", name: "منيرة فهد الشمري", orphansCount: "2", fatherName: "فهد الشمري", fatherIdNumber: "1054321098", deathDate: "1444/06/10", deathCause: "حادث" },
  { id: "12", fileNumber: "550000667", name: "يوسف خالد الحربي", orphansCount: "1", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
];

const ConvertBeneficiaryToGuardianPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [records] = useState<ConversionRecord[]>(mockRecords);

  const filteredRecords = records.filter(r =>
    r.name.includes(searchValue) || r.fileNumber.includes(searchValue)
  );

  const columns = [
    { key: "fileNumber", label: "رقم الملف" },
    { key: "name", label: "الإسم" },
    { key: "orphansCount", label: "عدد الأيتام" },
    { key: "fatherName", label: "إسم الأب" },
    { key: "fatherIdNumber", label: "رقم هوية الأب" },
    { key: "deathDate", label: "تاريخ الوفاة" },
    { key: "deathCause", label: "سبب الوفاة" }
  ];

  return (
    <InnerPageLayout
      moduleId="beneficiaries-management"
      title="تحويل مستفيد إلى وصي"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <Card>
        <CardContent className="p-4">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Select defaultValue="20">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
            <div className="flex-1" />
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pr-9 w-48"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  عمليات
                  <ChevronDown className="h-4 w-4 mr-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>تحويل المحدد</DropdownMenuItem>
                <DropdownMenuItem>تحويل الكل</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ExportDropdown columns={columns} />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
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
                  <TableHead className="text-right">عدد الأيتام</TableHead>
                  <TableHead className="text-right">إسم الأب</TableHead>
                  <TableHead className="text-right">رقم هوية الأب</TableHead>
                  <TableHead className="text-right">تاريخ الوفاة</TableHead>
                  <TableHead className="text-right">سبب الوفاة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.fileNumber}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                        <Eye className="h-4 w-4 ml-1" />
                        معاينة
                      </Button>
                    </TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.orphansCount}</TableCell>
                    <TableCell>{record.fatherName}</TableCell>
                    <TableCell>{record.fatherIdNumber}</TableCell>
                    <TableCell>{record.deathDate}</TableCell>
                    <TableCell>{record.deathCause}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="mt-4 text-sm text-muted-foreground">
            إجمالي السجلات: {filteredRecords.length}
          </div>
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default ConvertBeneficiaryToGuardianPage;
