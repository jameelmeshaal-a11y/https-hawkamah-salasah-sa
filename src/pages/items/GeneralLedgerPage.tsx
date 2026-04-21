import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Download, Printer, Search, Filter } from "lucide-react";
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

interface LedgerEntry {
  date: string;
  entryNumber: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

interface AccountLedger {
  accountCode: string;
  accountName: string;
  openingBalance: number;
  entries: LedgerEntry[];
  closingBalance: number;
}

const GeneralLedgerPage = () => {
  const [selectedAccount, setSelectedAccount] = useState("1101");
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2024-01-31");

  const accounts = [
    { code: "1101", name: "النقدية في الصندوق" },
    { code: "1102", name: "البنك الأهلي" },
    { code: "1103", name: "مصرف الراجحي" },
    { code: "2101", name: "الدائنون" },
    { code: "4101", name: "إيرادات التبرعات" },
    { code: "5101", name: "مصروفات الرواتب" },
  ];

  const ledgerData: AccountLedger = {
    accountCode: "1101",
    accountName: "النقدية في الصندوق",
    openingBalance: 150000,
    entries: [
      {
        date: "2024-01-05",
        entryNumber: "JE-2024-0001",
        description: "تحصيل تبرع نقدي",
        debit: 5000,
        credit: 0,
        balance: 155000,
      },
      {
        date: "2024-01-08",
        entryNumber: "JE-2024-0002",
        description: "صرف مصروفات إدارية",
        debit: 0,
        credit: 2500,
        balance: 152500,
      },
      {
        date: "2024-01-10",
        entryNumber: "JE-2024-0003",
        description: "تحصيل اشتراكات أعضاء",
        debit: 12000,
        credit: 0,
        balance: 164500,
      },
      {
        date: "2024-01-12",
        entryNumber: "JE-2024-0004",
        description: "إيداع في البنك الأهلي",
        debit: 0,
        credit: 50000,
        balance: 114500,
      },
      {
        date: "2024-01-15",
        entryNumber: "JE-2024-0005",
        description: "تحصيل تبرع لمشروع",
        debit: 25000,
        credit: 0,
        balance: 139500,
      },
      {
        date: "2024-01-18",
        entryNumber: "JE-2024-0006",
        description: "صرف سلفة موظف",
        debit: 0,
        credit: 3000,
        balance: 136500,
      },
      {
        date: "2024-01-22",
        entryNumber: "JE-2024-0007",
        description: "تحصيل كفالة شهرية",
        debit: 8000,
        credit: 0,
        balance: 144500,
      },
    ],
    closingBalance: 144500,
  };

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "-";
    return new Intl.NumberFormat("ar-SA").format(amount);
  };

  const totalDebit = ledgerData.entries.reduce((sum, e) => sum + e.debit, 0);
  const totalCredit = ledgerData.entries.reduce((sum, e) => sum + e.credit, 0);

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="الأستاذ العام"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="space-y-2">
                <Label>الحساب</Label>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((acc) => (
                      <SelectItem key={acc.code} value={acc.code}>
                        {acc.code} - {acc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>من تاريخ</Label>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>إلى تاريخ</Label>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <Button className="bg-primary">
                <Search className="h-4 w-4 ml-2" />
                عرض
              </Button>
              <div className="flex gap-2">
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

        {/* Ledger Report */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                كشف حساب: {ledgerData.accountCode} - {ledgerData.accountName}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                من {fromDate} إلى {toDate}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Opening Balance */}
            <div className="mb-4 p-3 bg-muted/50 rounded-lg flex justify-between items-center">
              <span className="font-medium">الرصيد الافتتاحي</span>
              <span className="font-mono font-bold text-lg">
                {formatCurrency(ledgerData.openingBalance)} ﷼
              </span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right w-28">التاريخ</TableHead>
                  <TableHead className="text-right w-36">رقم القيد</TableHead>
                  <TableHead className="text-right">البيان</TableHead>
                  <TableHead className="text-right w-32">مدين</TableHead>
                  <TableHead className="text-right w-32">دائن</TableHead>
                  <TableHead className="text-right w-36">الرصيد</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledgerData.entries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell className="font-mono text-primary">
                      {entry.entryNumber}
                    </TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell className="font-mono text-green-600">
                      {entry.debit > 0 ? formatCurrency(entry.debit) : "-"}
                    </TableCell>
                    <TableCell className="font-mono text-red-600">
                      {entry.credit > 0 ? formatCurrency(entry.credit) : "-"}
                    </TableCell>
                    <TableCell className="font-mono font-medium">
                      {formatCurrency(entry.balance)}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Totals Row */}
                <TableRow className="font-bold bg-muted/50 border-t-2">
                  <TableCell colSpan={3} className="text-left">
                    مجموع الحركة
                  </TableCell>
                  <TableCell className="font-mono text-green-600">
                    {formatCurrency(totalDebit)}
                  </TableCell>
                  <TableCell className="font-mono text-red-600">
                    {formatCurrency(totalCredit)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Closing Balance */}
            <div className="mt-4 p-3 bg-primary/10 rounded-lg flex justify-between items-center">
              <span className="font-medium">الرصيد الختامي</span>
              <span className="font-mono font-bold text-lg text-primary">
                {formatCurrency(ledgerData.closingBalance)} ﷼
              </span>
            </div>

            {/* Summary */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <div className="text-sm text-muted-foreground">إجمالي المدين</div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(totalDebit)} ﷼
                </div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-sm text-muted-foreground">إجمالي الدائن</div>
                <div className="text-lg font-bold text-red-600">
                  {formatCurrency(totalCredit)} ﷼
                </div>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <div className="text-sm text-muted-foreground">صافي الحركة</div>
                <div className="text-lg font-bold">
                  {formatCurrency(totalDebit - totalCredit)} ﷼
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GeneralLedgerPage;
