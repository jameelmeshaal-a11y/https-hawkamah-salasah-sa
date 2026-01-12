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

interface CostCenterBalanceEntry {
  costCenterCode: string;
  costCenterName: string;
  previousDebit: number;
  previousCredit: number;
  periodDebit: number;
  periodCredit: number;
  endingDebit: number;
  endingCredit: number;
}

const CostCentersTrialBalancePage = () => {
  const [fromDate, setFromDate] = useState(new Date(2026, 0, 1));
  const [toDate, setToDate] = useState(new Date(2026, 0, 13));
  const [allCenters, setAllCenters] = useState("all");
  const [filterCenters, setFilterCenters] = useState("all");
  const [balanceType, setBalanceType] = useState("all");
  const [balances, setBalances] = useState("all");
  const [showCenters, setShowCenters] = useState(true);
  const [compareCenters, setCompareCenters] = useState(false);
  const [balancedCenters, setBalancedCenters] = useState(false);

  const dummyData: CostCenterBalanceEntry[] = [
    {
      costCenterCode: "CC-001",
      costCenterName: "الإدارة العامة",
      previousDebit: 100000,
      previousCredit: 0,
      periodDebit: 45000,
      periodCredit: 20000,
      endingDebit: 125000,
      endingCredit: 0,
    },
    {
      costCenterCode: "CC-002",
      costCenterName: "إدارة الموارد البشرية",
      previousDebit: 75000,
      previousCredit: 0,
      periodDebit: 35000,
      periodCredit: 10000,
      endingDebit: 100000,
      endingCredit: 0,
    },
    {
      costCenterCode: "CC-003",
      costCenterName: "إدارة التبرعات",
      previousDebit: 0,
      previousCredit: 200000,
      periodDebit: 50000,
      periodCredit: 150000,
      endingDebit: 0,
      endingCredit: 300000,
    },
    {
      costCenterCode: "CC-004",
      costCenterName: "إدارة المشاريع",
      previousDebit: 80000,
      previousCredit: 0,
      periodDebit: 60000,
      periodCredit: 40000,
      endingDebit: 100000,
      endingCredit: 0,
    },
    {
      costCenterCode: "CC-005",
      costCenterName: "الشؤون المالية",
      previousDebit: 50000,
      previousCredit: 0,
      periodDebit: 25000,
      periodCredit: 15000,
      endingDebit: 60000,
      endingCredit: 0,
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
    <InnerPageLayout moduleId="financial-affairs" moduleTitle="إدارة الشؤون المالية" title="ميزان مراجعة مراكز التكلفة">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">ميزان مراجعة مراكز التكلفة</h1>
          </div>
          <ReportExportButtons onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} />
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="space-y-2">
              <Label>كافة المراكز</Label>
              <Select value={allCenters} onValueChange={setAllCenters}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كافة المراكز</SelectItem>
                  <SelectItem value="main">المراكز الرئيسية</SelectItem>
                  <SelectItem value="sub">المراكز الفرعية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>تنقية المراكز</Label>
              <Select value={filterCenters} onValueChange={setFilterCenters}>
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
              <Switch id="showCenters" checked={showCenters} onCheckedChange={setShowCenters} />
              <Label htmlFor="showCenters">إظهار المراكز</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="compareCenters" checked={compareCenters} onCheckedChange={setCompareCenters} />
              <Label htmlFor="compareCenters">المراكز المقارنة</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="balancedCenters" checked={balancedCenters} onCheckedChange={setBalancedCenters} />
              <Label htmlFor="balancedCenters">المراكز المرصدة</Label>
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
                <TableHead className="text-right font-bold" rowSpan={2}>رمز المركز</TableHead>
                <TableHead className="text-right font-bold" rowSpan={2}>اسم المركز</TableHead>
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
                  <TableCell className="font-medium">{entry.costCenterCode}</TableCell>
                  <TableCell>{entry.costCenterName}</TableCell>
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

export default CostCentersTrialBalancePage;
