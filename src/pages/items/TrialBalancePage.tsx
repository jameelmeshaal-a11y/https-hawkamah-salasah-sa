import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import HijriGregorianDatePicker from "@/components/reports/HijriGregorianDatePicker";
import ReportExportButtons from "@/components/reports/ReportExportButtons";

interface TrialBalanceEntry {
  accountCode: string;
  accountName: string;
  previousDebit: number;
  previousCredit: number;
  periodDebit: number;
  periodCredit: number;
  endingDebit: number;
  endingCredit: number;
}

const TrialBalancePage = () => {
  const [allAccounts, setAllAccounts] = useState("all");
  const [filterAccounts, setFilterAccounts] = useState("all");
  const [balanceType, setBalanceType] = useState("all");
  const [balances, setBalances] = useState("all");
  const [showAccounts, setShowAccounts] = useState(true);
  const [compareAccounts, setCompareAccounts] = useState(false);
  const [balancedAccounts, setBalancedAccounts] = useState(false);

  const dummyData: TrialBalanceEntry[] = [
    {
      accountCode: "1",
      accountName: "الأصول",
      previousDebit: 1500000,
      previousCredit: 0,
      periodDebit: 250000,
      periodCredit: 150000,
      endingDebit: 1600000,
      endingCredit: 0,
    },
    {
      accountCode: "11",
      accountName: "الأصول المتداولة",
      previousDebit: 800000,
      previousCredit: 0,
      periodDebit: 200000,
      periodCredit: 120000,
      endingDebit: 880000,
      endingCredit: 0,
    },
    {
      accountCode: "1101",
      accountName: "النقدية والبنوك",
      previousDebit: 350000,
      previousCredit: 0,
      periodDebit: 180000,
      periodCredit: 100000,
      endingDebit: 430000,
      endingCredit: 0,
    },
    {
      accountCode: "1102",
      accountName: "المدينون",
      previousDebit: 250000,
      previousCredit: 0,
      periodDebit: 20000,
      periodCredit: 20000,
      endingDebit: 250000,
      endingCredit: 0,
    },
    {
      accountCode: "2",
      accountName: "الخصوم",
      previousDebit: 0,
      previousCredit: 500000,
      periodDebit: 50000,
      periodCredit: 100000,
      endingDebit: 0,
      endingCredit: 550000,
    },
    {
      accountCode: "21",
      accountName: "الخصوم المتداولة",
      previousDebit: 0,
      previousCredit: 300000,
      periodDebit: 30000,
      periodCredit: 60000,
      endingDebit: 0,
      endingCredit: 330000,
    },
    {
      accountCode: "3",
      accountName: "حقوق الملكية",
      previousDebit: 0,
      previousCredit: 1000000,
      periodDebit: 0,
      periodCredit: 50000,
      endingDebit: 0,
      endingCredit: 1050000,
    },
  ];

  const totals = dummyData.reduce(
    (acc, entry) => ({
      previousDebit: acc.previousDebit + entry.previousDebit,
      previousCredit: acc.previousCredit + entry.previousCredit,
      periodDebit: acc.periodDebit + entry.periodDebit,
      periodCredit: acc.periodCredit + entry.periodCredit,
      endingDebit: acc.endingDebit + entry.endingDebit,
      endingCredit: acc.endingCredit + entry.endingCredit,
    }),
    { previousDebit: 0, previousCredit: 0, periodDebit: 0, periodCredit: 0, endingDebit: 0, endingCredit: 0 }
  );

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
  };

  const handleExportExcel = () => {
    console.log("Exporting Excel...");
  };

  return (
    <InnerPageLayout moduleId="financial-affairs" moduleTitle="إدارة الشؤون المالية" title="ميزان المراجعة">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">ميزان المراجعة</h1>
          </div>
          <ReportExportButtons onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} />
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="space-y-2">
              <Label>كافة الحسابات</Label>
              <Select value={allAccounts} onValueChange={setAllAccounts}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كافة الحسابات</SelectItem>
                  <SelectItem value="main">الحسابات الرئيسية</SelectItem>
                  <SelectItem value="sub">الحسابات الفرعية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>تنقية الحسابات</Label>
              <Select value={filterAccounts} onValueChange={setFilterAccounts}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="active">النشطة فقط</SelectItem>
                  <SelectItem value="inactive">غير النشطة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>نوع الميزان</Label>
              <Select value={balanceType} onValueChange={setBalanceType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="opening">افتتاحي</SelectItem>
                  <SelectItem value="closing">ختامي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>الأرصدة</Label>
              <Select value={balances} onValueChange={setBalances}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="debit">مدينة فقط</SelectItem>
                  <SelectItem value="credit">دائنة فقط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2 - Toggles */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Switch id="showAccounts" checked={showAccounts} onCheckedChange={setShowAccounts} />
              <Label htmlFor="showAccounts">إظهار الحسابات</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="compareAccounts" checked={compareAccounts} onCheckedChange={setCompareAccounts} />
              <Label htmlFor="compareAccounts">الحسابات المقارنة</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="balancedAccounts" checked={balancedAccounts} onCheckedChange={setBalancedAccounts} />
              <Label htmlFor="balancedAccounts">الحسابات المرصدة</Label>
            </div>
          </div>

          {/* Row 3 - Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <HijriGregorianDatePicker label="من" hijriDate="01/07/1447" gregorianDate="2026/01/01" />
            <HijriGregorianDatePicker label="إلى" hijriDate="13/07/1447" gregorianDate="2026/01/13" />
            <div className="flex items-end">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full">
                عرض التقرير
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-right font-bold" rowSpan={2}>رمز الحساب</TableHead>
                <TableHead className="text-right font-bold" rowSpan={2}>اسم الحساب</TableHead>
                <TableHead className="text-center font-bold border-x" colSpan={2}>الرصيد السابق</TableHead>
                <TableHead className="text-center font-bold border-x" colSpan={2}>الفترة</TableHead>
                <TableHead className="text-center font-bold" colSpan={2}>رصيد آخر الفترة</TableHead>
              </TableRow>
              <TableRow className="bg-muted/30">
                <TableHead className="text-center border-x">مدين</TableHead>
                <TableHead className="text-center border-x">دائن</TableHead>
                <TableHead className="text-center border-x">مدين</TableHead>
                <TableHead className="text-center border-x">دائن</TableHead>
                <TableHead className="text-center border-x">مدين</TableHead>
                <TableHead className="text-center">دائن</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.accountCode}</TableCell>
                  <TableCell>{entry.accountName}</TableCell>
                  <TableCell className="text-center border-x">{formatCurrency(entry.previousDebit)}</TableCell>
                  <TableCell className="text-center border-x">{formatCurrency(entry.previousCredit)}</TableCell>
                  <TableCell className="text-center border-x">{formatCurrency(entry.periodDebit)}</TableCell>
                  <TableCell className="text-center border-x">{formatCurrency(entry.periodCredit)}</TableCell>
                  <TableCell className="text-center border-x">{formatCurrency(entry.endingDebit)}</TableCell>
                  <TableCell className="text-center">{formatCurrency(entry.endingCredit)}</TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell colSpan={2} className="text-center">المجموع</TableCell>
                <TableCell className="text-center border-x">{formatCurrency(totals.previousDebit)}</TableCell>
                <TableCell className="text-center border-x">{formatCurrency(totals.previousCredit)}</TableCell>
                <TableCell className="text-center border-x">{formatCurrency(totals.periodDebit)}</TableCell>
                <TableCell className="text-center border-x">{formatCurrency(totals.periodCredit)}</TableCell>
                <TableCell className="text-center border-x">{formatCurrency(totals.endingDebit)}</TableCell>
                <TableCell className="text-center">{formatCurrency(totals.endingCredit)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default TrialBalancePage;
