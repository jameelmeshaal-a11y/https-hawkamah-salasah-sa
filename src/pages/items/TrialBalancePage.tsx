import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Printer, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface TrialBalanceRow {
  accountCode: string;
  accountName: string;
  level: number;
  openingDebit: number;
  openingCredit: number;
  periodDebit: number;
  periodCredit: number;
  closingDebit: number;
  closingCredit: number;
}

const TrialBalancePage = () => {
  const [period, setPeriod] = useState("2024-01");
  const [level, setLevel] = useState("all");
  
  const data: TrialBalanceRow[] = [
    {
      accountCode: "1",
      accountName: "الأصول",
      level: 1,
      openingDebit: 1500000,
      openingCredit: 0,
      periodDebit: 250000,
      periodCredit: 150000,
      closingDebit: 1600000,
      closingCredit: 0,
    },
    {
      accountCode: "11",
      accountName: "الأصول المتداولة",
      level: 2,
      openingDebit: 800000,
      openingCredit: 0,
      periodDebit: 200000,
      periodCredit: 120000,
      closingDebit: 880000,
      closingCredit: 0,
    },
    {
      accountCode: "1101",
      accountName: "النقدية والبنوك",
      level: 3,
      openingDebit: 350000,
      openingCredit: 0,
      periodDebit: 180000,
      periodCredit: 100000,
      closingDebit: 430000,
      closingCredit: 0,
    },
    {
      accountCode: "1102",
      accountName: "المدينون",
      level: 3,
      openingDebit: 250000,
      openingCredit: 0,
      periodDebit: 20000,
      periodCredit: 20000,
      closingDebit: 250000,
      closingCredit: 0,
    },
    {
      accountCode: "2",
      accountName: "الخصوم",
      level: 1,
      openingDebit: 0,
      openingCredit: 500000,
      periodDebit: 50000,
      periodCredit: 100000,
      closingDebit: 0,
      closingCredit: 550000,
    },
    {
      accountCode: "21",
      accountName: "الخصوم المتداولة",
      level: 2,
      openingDebit: 0,
      openingCredit: 300000,
      periodDebit: 30000,
      periodCredit: 60000,
      closingDebit: 0,
      closingCredit: 330000,
    },
    {
      accountCode: "3",
      accountName: "حقوق الملكية",
      level: 1,
      openingDebit: 0,
      openingCredit: 1000000,
      periodDebit: 0,
      periodCredit: 50000,
      closingDebit: 0,
      closingCredit: 1050000,
    },
  ];

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "-";
    return new Intl.NumberFormat("ar-SA").format(amount);
  };

  const totals = data.reduce(
    (acc, row) => ({
      openingDebit: acc.openingDebit + row.openingDebit,
      openingCredit: acc.openingCredit + row.openingCredit,
      periodDebit: acc.periodDebit + row.periodDebit,
      periodCredit: acc.periodCredit + row.periodCredit,
      closingDebit: acc.closingDebit + row.closingDebit,
      closingCredit: acc.closingCredit + row.closingCredit,
    }),
    {
      openingDebit: 0,
      openingCredit: 0,
      periodDebit: 0,
      periodCredit: 0,
      closingDebit: 0,
      closingCredit: 0,
    }
  );

  const filteredData =
    level === "all" ? data : data.filter((row) => row.level === parseInt(level));

  return (
    <InnerPageLayout
      title="ميزان المراجعة"
      subtitle="إدارة الشؤون المالية"
      icon={BarChart3}
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">الفترة:</span>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-01">يناير 2024</SelectItem>
                      <SelectItem value="2024-02">فبراير 2024</SelectItem>
                      <SelectItem value="2024-03">مارس 2024</SelectItem>
                      <SelectItem value="2024-Q1">الربع الأول 2024</SelectItem>
                      <SelectItem value="2024">السنة المالية 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">المستوى:</span>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المستويات</SelectItem>
                      <SelectItem value="1">المستوى الأول</SelectItem>
                      <SelectItem value="2">المستوى الثاني</SelectItem>
                      <SelectItem value="3">المستوى الثالث</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 ml-2" />
                  تطبيق
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              ميزان المراجعة - {period}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right" rowSpan={2}>
                    رقم الحساب
                  </TableHead>
                  <TableHead className="text-right" rowSpan={2}>
                    اسم الحساب
                  </TableHead>
                  <TableHead className="text-center" colSpan={2}>
                    الرصيد الافتتاحي
                  </TableHead>
                  <TableHead className="text-center" colSpan={2}>
                    حركة الفترة
                  </TableHead>
                  <TableHead className="text-center" colSpan={2}>
                    الرصيد الختامي
                  </TableHead>
                </TableRow>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center">مدين</TableHead>
                  <TableHead className="text-center">دائن</TableHead>
                  <TableHead className="text-center">مدين</TableHead>
                  <TableHead className="text-center">دائن</TableHead>
                  <TableHead className="text-center">مدين</TableHead>
                  <TableHead className="text-center">دائن</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow
                    key={row.accountCode}
                    className={row.level === 1 ? "font-bold bg-muted/30" : ""}
                  >
                    <TableCell
                      className="font-mono"
                      style={{ paddingRight: `${row.level * 16}px` }}
                    >
                      {row.accountCode}
                    </TableCell>
                    <TableCell>{row.accountName}</TableCell>
                    <TableCell className="text-center font-mono">
                      {formatCurrency(row.openingDebit)}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {formatCurrency(row.openingCredit)}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {formatCurrency(row.periodDebit)}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {formatCurrency(row.periodCredit)}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {formatCurrency(row.closingDebit)}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {formatCurrency(row.closingCredit)}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Totals Row */}
                <TableRow className="font-bold bg-primary/10 border-t-2">
                  <TableCell colSpan={2} className="text-left">
                    المجموع
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {formatCurrency(totals.openingDebit)}
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {formatCurrency(totals.openingCredit)}
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {formatCurrency(totals.periodDebit)}
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {formatCurrency(totals.periodCredit)}
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {formatCurrency(totals.closingDebit)}
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {formatCurrency(totals.closingCredit)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Balance Check */}
            <div className="mt-4 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <span className="font-medium">التحقق من التوازن:</span>
                {totals.closingDebit === totals.closingCredit ? (
                  <span className="text-green-600 font-bold">✓ الميزان متوازن</span>
                ) : (
                  <span className="text-red-600 font-bold">
                    ✗ الميزان غير متوازن - الفرق:{" "}
                    {formatCurrency(Math.abs(totals.closingDebit - totals.closingCredit))}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default TrialBalancePage;
