import { useState } from "react";
import { FileText, Search } from "lucide-react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import ReportErrorAlert from "@/components/reports/ReportErrorAlert";
import ReportExportButtons from "@/components/reports/ReportExportButtons";

interface MonthlyLedgerEntry {
  id: number;
  month: string;
  openingBalance: number;
  totalDebit: number;
  totalCredit: number;
  closingBalance: number;
}

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const MonthlyGeneralLedgerPage = () => {
  const [account, setAccount] = useState("");
  const [year, setYear] = useState("2026");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [showError, setShowError] = useState(true);
  const [showReport, setShowReport] = useState(false);

  const dummyData: MonthlyLedgerEntry[] = [
    {
      id: 1,
      month: "يناير",
      openingBalance: 0,
      totalDebit: 100000,
      totalCredit: 50000,
      closingBalance: 50000,
    },
    {
      id: 2,
      month: "فبراير",
      openingBalance: 50000,
      totalDebit: 80000,
      totalCredit: 30000,
      closingBalance: 100000,
    },
    {
      id: 3,
      month: "مارس",
      openingBalance: 100000,
      totalDebit: 120000,
      totalCredit: 70000,
      closingBalance: 150000,
    },
    {
      id: 4,
      month: "أبريل",
      openingBalance: 150000,
      totalDebit: 90000,
      totalCredit: 40000,
      closingBalance: 200000,
    },
    {
      id: 5,
      month: "مايو",
      openingBalance: 200000,
      totalDebit: 110000,
      totalCredit: 60000,
      closingBalance: 250000,
    },
    {
      id: 6,
      month: "يونيو",
      openingBalance: 250000,
      totalDebit: 75000,
      totalCredit: 25000,
      closingBalance: 300000,
    },
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("ar-SA");
  };

  const handleSelectAll = () => {
    if (selectedMonths.length === months.length) {
      setSelectedMonths([]);
    } else {
      setSelectedMonths([...months]);
    }
  };

  const handleMonthToggle = (month: string) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter((m) => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  const handleGenerateReport = () => {
    if (!account || selectedMonths.length === 0) {
      setShowError(true);
      setShowReport(false);
    } else {
      setShowError(false);
      setShowReport(true);
    }
  };

  const filteredData = dummyData.filter((entry) =>
    selectedMonths.includes(entry.month)
  );

  const totalDebit = filteredData.reduce((sum, entry) => sum + entry.totalDebit, 0);
  const totalCredit = filteredData.reduce((sum, entry) => sum + entry.totalCredit, 0);

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-end gap-2">
          <h1 className="text-xl font-bold">الأستاذ العام الشهري</h1>
          <FileText className="h-6 w-6 text-primary" />
        </div>

        {/* Error Alert */}
        {showError && (
          <ReportErrorAlert
            message="لم تقم بإدخال كافة البيانات المطلوبة"
          />
        )}

        {/* Filters */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Account Search */}
            <div className="space-y-1">
              <Label className="text-right block">
                الحسابات<span className="text-red-500 mr-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  placeholder="ابحث عن حساب بالكود أو الوصف"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="text-right pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Year Dropdown */}
            <div className="space-y-1">
              <Label className="text-right block">
                العام<span className="text-red-500 mr-1">*</span>
              </Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر السنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Empty space for alignment */}
            <div></div>
          </div>

          {/* Months Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedMonths.length === months.length ? "إلغاء تحديد الكل" : "تحديد الكل"}
              </Button>
              <Label className="text-right">
                الأشهر<span className="text-red-500 mr-1">*</span>
              </Label>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {months.map((month) => (
                <div
                  key={month}
                  className="flex items-center gap-2 justify-end"
                >
                  <label
                    htmlFor={month}
                    className="text-sm cursor-pointer"
                  >
                    {month}
                  </label>
                  <Checkbox
                    id={month}
                    checked={selectedMonths.includes(month)}
                    onCheckedChange={() => handleMonthToggle(month)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Generate Report Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleGenerateReport}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 text-lg"
            >
              عرض التقرير
            </Button>
          </div>
        </div>

        {/* Report Table */}
        {showReport && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <ReportExportButtons />
              <div className="text-right">
                <h2 className="font-bold">الأستاذ العام الشهري: الصندوق (1111)</h2>
                <p className="text-sm text-muted-foreground">
                  السنة: {year}
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-right font-bold">الشهر</TableHead>
                    <TableHead className="text-right font-bold">الرصيد الافتتاحي</TableHead>
                    <TableHead className="text-right font-bold">مجموع المدين</TableHead>
                    <TableHead className="text-right font-bold">مجموع الدائن</TableHead>
                    <TableHead className="text-right font-bold">الرصيد الختامي</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    <>
                      {filteredData.map((entry) => (
                        <TableRow key={entry.id} className="hover:bg-gray-50">
                          <TableCell className="text-right">{entry.month}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(entry.openingBalance)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(entry.totalDebit)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(entry.totalCredit)}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {formatCurrency(entry.closingBalance)}
                          </TableCell>
                        </TableRow>
                      ))}
                      {/* Totals Row */}
                      <TableRow className="bg-gray-100 font-bold">
                        <TableCell className="text-right">الإجمالي</TableCell>
                        <TableCell className="text-right">-</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(totalDebit)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(totalCredit)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(filteredData[filteredData.length - 1]?.closingBalance || 0)}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        لا يوجد سجلات
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!showReport && !showError && (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>لا يوجد سجلات</p>
          </div>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default MonthlyGeneralLedgerPage;
