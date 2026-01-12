import { useState } from "react";
import { FileText } from "lucide-react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HijriGregorianDatePicker from "@/components/reports/HijriGregorianDatePicker";
import ReportExportButtons from "@/components/reports/ReportExportButtons";

interface AccountChartEntry {
  id: number;
  code: string;
  description: string;
  parentCode: string;
  level: number;
  accountType: string;
  nature: string;
  closing: string;
  budget: string;
  status: string;
  alternateCode: string;
  function: string;
}

const ChartOfAccountsReportPage = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    levels: "",
    method: "",
    accountStatus: "",
    code: "",
    description: "",
    parentAccount: "",
    equals: "",
    type: "",
    nature: "",
    total: "",
    balance: "",
    status: "",
    function: "",
  });

  const dummyData: AccountChartEntry[] = [
    {
      id: 1,
      code: "1",
      description: "الأصول",
      parentCode: "-",
      level: 1,
      accountType: "رئيسي",
      nature: "مدين",
      closing: "لا",
      budget: "نعم",
      status: "نشط",
      alternateCode: "100",
      function: "ميزانية",
    },
    {
      id: 2,
      code: "11",
      description: "الأصول المتداولة",
      parentCode: "1",
      level: 2,
      accountType: "رئيسي",
      nature: "مدين",
      closing: "لا",
      budget: "نعم",
      status: "نشط",
      alternateCode: "110",
      function: "ميزانية",
    },
    {
      id: 3,
      code: "111",
      description: "النقدية والبنوك",
      parentCode: "11",
      level: 3,
      accountType: "فرعي",
      nature: "مدين",
      closing: "نعم",
      budget: "نعم",
      status: "نشط",
      alternateCode: "111",
      function: "ميزانية",
    },
    {
      id: 4,
      code: "1111",
      description: "الصندوق",
      parentCode: "111",
      level: 4,
      accountType: "تفصيلي",
      nature: "مدين",
      closing: "نعم",
      budget: "نعم",
      status: "نشط",
      alternateCode: "1111",
      function: "ميزانية",
    },
    {
      id: 5,
      code: "1112",
      description: "البنك الأهلي",
      parentCode: "111",
      level: 4,
      accountType: "تفصيلي",
      nature: "مدين",
      closing: "نعم",
      budget: "نعم",
      status: "نشط",
      alternateCode: "1112",
      function: "ميزانية",
    },
    {
      id: 6,
      code: "2",
      description: "الالتزامات",
      parentCode: "-",
      level: 1,
      accountType: "رئيسي",
      nature: "دائن",
      closing: "لا",
      budget: "نعم",
      status: "نشط",
      alternateCode: "200",
      function: "ميزانية",
    },
    {
      id: 7,
      code: "3",
      description: "حقوق الملكية",
      parentCode: "-",
      level: 1,
      accountType: "رئيسي",
      nature: "دائن",
      closing: "لا",
      budget: "نعم",
      status: "نشط",
      alternateCode: "300",
      function: "ميزانية",
    },
    {
      id: 8,
      code: "4",
      description: "الإيرادات",
      parentCode: "-",
      level: 1,
      accountType: "رئيسي",
      nature: "دائن",
      closing: "نعم",
      budget: "نعم",
      status: "نشط",
      alternateCode: "400",
      function: "قائمة الدخل",
    },
    {
      id: 9,
      code: "5",
      description: "المصروفات",
      parentCode: "-",
      level: 1,
      accountType: "رئيسي",
      nature: "مدين",
      closing: "نعم",
      budget: "نعم",
      status: "نشط",
      alternateCode: "500",
      function: "قائمة الدخل",
    },
  ];

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
  };

  const handleExportExcel = () => {
    console.log("Exporting Excel...");
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <ReportExportButtons
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
          />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">تقرير الدليل المحاسبي</h1>
            <FileText className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
          {/* Row 1 */}
          <HijriGregorianDatePicker
            label="من تاريخ"
            hijriDate="الخميس 13 رجب 1447 هـ"
            gregorianDate="01 يناير 2026"
          />
          <HijriGregorianDatePicker
            label="الى تاريخ"
            hijriDate="الخميس 13 رجب 1447 هـ"
            gregorianDate="01 يناير 2026"
          />
          <div className="space-y-1">
            <Label className="text-right block">المستويات</Label>
            <Select value={filters.levels} onValueChange={(v) => setFilters({ ...filters, levels: v })}>
              <SelectTrigger>
                <SelectValue placeholder="الكل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="1">المستوى 1</SelectItem>
                <SelectItem value="2">المستوى 2</SelectItem>
                <SelectItem value="3">المستوى 3</SelectItem>
                <SelectItem value="4">المستوى 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-right block">الطريقة</Label>
            <Select value={filters.method} onValueChange={(v) => setFilters({ ...filters, method: v })}>
              <SelectTrigger>
                <SelectValue placeholder="الكل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="direct">مباشر</SelectItem>
                <SelectItem value="indirect">غير مباشر</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-right block">حالة الحساب</Label>
            <Select value={filters.accountStatus} onValueChange={(v) => setFilters({ ...filters, accountStatus: v })}>
              <SelectTrigger>
                <SelectValue placeholder="الكل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 2 */}
          <div className="space-y-1">
            <Label className="text-right block">الكود</Label>
            <Input
              placeholder="الكود"
              value={filters.code}
              onChange={(e) => setFilters({ ...filters, code: e.target.value })}
              className="text-right"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-right block">الوصف</Label>
            <Input
              placeholder="الوصف"
              value={filters.description}
              onChange={(e) => setFilters({ ...filters, description: e.target.value })}
              className="text-right"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-right block">حساب رئيسي</Label>
            <Input
              placeholder="حساب رئيسي"
              value={filters.parentAccount}
              onChange={(e) => setFilters({ ...filters, parentAccount: e.target.value })}
              className="text-right"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-right block">مساوي</Label>
            <Input
              placeholder="مساوي"
              value={filters.equals}
              onChange={(e) => setFilters({ ...filters, equals: e.target.value })}
              className="text-right"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-right block">النوع</Label>
            <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
              <SelectTrigger>
                <SelectValue placeholder="الكل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="main">رئيسي</SelectItem>
                <SelectItem value="sub">فرعي</SelectItem>
                <SelectItem value="detail">تفصيلي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 3 */}
          <div className="space-y-1">
            <Label className="text-right block">الطبيعة</Label>
            <Select value={filters.nature} onValueChange={(v) => setFilters({ ...filters, nature: v })}>
              <SelectTrigger>
                <SelectValue placeholder="الكل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="debit">مدين</SelectItem>
                <SelectItem value="credit">دائن</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-right block">الإجمالي</Label>
            <Select value={filters.total} onValueChange={(v) => setFilters({ ...filters, total: v })}>
              <SelectTrigger>
                <SelectValue placeholder="الكل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="yes">نعم</SelectItem>
                <SelectItem value="no">لا</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-right block">الرصيد</Label>
            <Select value={filters.balance} onValueChange={(v) => setFilters({ ...filters, balance: v })}>
              <SelectTrigger>
                <SelectValue placeholder="الكل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="with">مع رصيد</SelectItem>
                <SelectItem value="without">بدون رصيد</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-right block">الحالة</Label>
            <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
              <SelectTrigger>
                <SelectValue placeholder="الكل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-right block">الدالة</Label>
            <Select value={filters.function} onValueChange={(v) => setFilters({ ...filters, function: v })}>
              <SelectTrigger>
                <SelectValue placeholder="الكل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="balance">ميزانية</SelectItem>
                <SelectItem value="income">قائمة الدخل</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-right font-bold">الكود</TableHead>
                <TableHead className="text-right font-bold">الوصف</TableHead>
                <TableHead className="text-right font-bold">رئيسي</TableHead>
                <TableHead className="text-right font-bold">المستوى</TableHead>
                <TableHead className="text-right font-bold">نوع الحساب</TableHead>
                <TableHead className="text-right font-bold">الطبيعة</TableHead>
                <TableHead className="text-right font-bold">الاقفال</TableHead>
                <TableHead className="text-right font-bold">الميزانية</TableHead>
                <TableHead className="text-right font-bold">حالة الحساب</TableHead>
                <TableHead className="text-right font-bold">رقم بديل</TableHead>
                <TableHead className="text-right font-bold">الدالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-gray-50">
                  <TableCell className="text-right font-mono">{entry.code}</TableCell>
                  <TableCell className="text-right">{entry.description}</TableCell>
                  <TableCell className="text-right">{entry.parentCode}</TableCell>
                  <TableCell className="text-right">{entry.level}</TableCell>
                  <TableCell className="text-right">{entry.accountType}</TableCell>
                  <TableCell className="text-right">{entry.nature}</TableCell>
                  <TableCell className="text-right">{entry.closing}</TableCell>
                  <TableCell className="text-right">{entry.budget}</TableCell>
                  <TableCell className="text-right">{entry.status}</TableCell>
                  <TableCell className="text-right">{entry.alternateCode}</TableCell>
                  <TableCell className="text-right">{entry.function}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default ChartOfAccountsReportPage;
