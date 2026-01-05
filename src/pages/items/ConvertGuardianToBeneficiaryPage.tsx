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
  { id: "1", fileNumber: "150001277", name: "خالد مسفر العازمي", orphansCount: "3", fatherName: "مسفر العازمي", fatherIdNumber: "1087654321", deathDate: "1442/05/12", deathCause: "طبيعي" },
  { id: "2", fileNumber: "540001195", name: "فاطمة أحمد الشمري", orphansCount: "2", fatherName: "أحمد الشمري", fatherIdNumber: "1098765432", deathDate: "1443/08/20", deathCause: "مرض" },
  { id: "3", fileNumber: "580001047", name: "محمد سعد القحطاني", orphansCount: "4", fatherName: "سعد القحطاني", fatherIdNumber: "1076543210", deathDate: "1444/02/15", deathCause: "حادث" },
  { id: "4", fileNumber: "840000778", name: "نورة عبدالله العتيبي", orphansCount: "1", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
  { id: "5", fileNumber: "890000850", name: "سلمان فهد الدوسري", orphansCount: "5", fatherName: "فهد الدوسري", fatherIdNumber: "1065432109", deathDate: "1443/11/08", deathCause: "مرض" },
  { id: "6", fileNumber: "810000495", name: "هند سالم المطيري", orphansCount: "2", fatherName: "سالم المطيري", fatherIdNumber: "1054321098", deathDate: "1444/06/25", deathCause: "طبيعي" },
  { id: "7", fileNumber: "950000216", name: "عبدالرحمن ناصر الغامدي", orphansCount: "3", fatherName: "ناصر الغامدي", fatherIdNumber: "1043210987", deathDate: "1445/01/03", deathCause: "حادث" },
  { id: "8", fileNumber: "180000160", name: "سارة محمد الزهراني", orphansCount: "1", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
  { id: "9", fileNumber: "220000334", name: "يوسف علي البقمي", orphansCount: "2", fatherName: "علي البقمي", fatherIdNumber: "1032109876", deathDate: "1444/09/17", deathCause: "مرض" },
  { id: "10", fileNumber: "330000445", name: "منى حسن السبيعي", orphansCount: "4", fatherName: "حسن السبيعي", fatherIdNumber: "1021098765", deathDate: "1443/04/30", deathCause: "طبيعي" },
  { id: "11", fileNumber: "440000556", name: "تركي سعود العجمي", orphansCount: "غير متاح", fatherName: "غير متاح", fatherIdNumber: "غير متاح", deathDate: "غير متاح", deathCause: "غير متاح" },
  { id: "12", fileNumber: "550000667", name: "لمياء فيصل الرشيدي", orphansCount: "3", fatherName: "فيصل الرشيدي", fatherIdNumber: "1010987654", deathDate: "1445/03/22", deathCause: "حادث" },
];

const ConvertGuardianToBeneficiaryPage = () => {
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
      title="تحويل وصي إلى مستفيد"
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

export default ConvertGuardianToBeneficiaryPage;
