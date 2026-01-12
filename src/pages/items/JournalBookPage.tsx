import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookMarked, Download, Printer, Search, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface JournalBookEntry {
  id: string;
  entryNumber: string;
  date: string;
  description: string;
  lines: {
    accountCode: string;
    accountName: string;
    debit: number;
    credit: number;
  }[];
}

const JournalBookPage = () => {
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2024-01-31");

  const entries: JournalBookEntry[] = [
    {
      id: "1",
      entryNumber: "JE-2024-0001",
      date: "2024-01-05",
      description: "تحصيل تبرع نقدي من متبرع",
      lines: [
        { accountCode: "1101", accountName: "النقدية في الصندوق", debit: 5000, credit: 0 },
        { accountCode: "4101", accountName: "إيرادات التبرعات", debit: 0, credit: 5000 },
      ],
    },
    {
      id: "2",
      entryNumber: "JE-2024-0002",
      date: "2024-01-08",
      description: "صرف مصروفات إدارية",
      lines: [
        { accountCode: "5102", accountName: "مصروفات إدارية", debit: 2500, credit: 0 },
        { accountCode: "1101", accountName: "النقدية في الصندوق", debit: 0, credit: 2500 },
      ],
    },
    {
      id: "3",
      entryNumber: "JE-2024-0003",
      date: "2024-01-10",
      description: "تحصيل اشتراكات الأعضاء",
      lines: [
        { accountCode: "1102", accountName: "البنك الأهلي", debit: 12000, credit: 0 },
        { accountCode: "4102", accountName: "إيرادات الاشتراكات", debit: 0, credit: 12000 },
      ],
    },
    {
      id: "4",
      entryNumber: "JE-2024-0004",
      date: "2024-01-12",
      description: "إيداع نقدية في البنك",
      lines: [
        { accountCode: "1102", accountName: "البنك الأهلي", debit: 50000, credit: 0 },
        { accountCode: "1101", accountName: "النقدية في الصندوق", debit: 0, credit: 50000 },
      ],
    },
    {
      id: "5",
      entryNumber: "JE-2024-0005",
      date: "2024-01-15",
      description: "صرف رواتب الموظفين",
      lines: [
        { accountCode: "5101", accountName: "مصروفات الرواتب", debit: 120000, credit: 0 },
        { accountCode: "1102", accountName: "البنك الأهلي", debit: 0, credit: 120000 },
      ],
    },
  ];

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "-";
    return new Intl.NumberFormat("ar-SA").format(amount);
  };

  const totalDebit = entries.reduce(
    (sum, entry) => sum + entry.lines.reduce((s, l) => s + l.debit, 0),
    0
  );
  const totalCredit = entries.reduce(
    (sum, entry) => sum + entry.lines.reduce((s, l) => s + l.credit, 0),
    0
  );

  return (
    <InnerPageLayout
      title="دفتر اليومية"
      subtitle="إدارة الشؤون المالية"
      icon={BookMarked}
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label>من تاريخ:</Label>
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-40"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label>إلى تاريخ:</Label>
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-40"
                  />
                </div>
                <Button>
                  <Search className="h-4 w-4 ml-2" />
                  عرض
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

        {/* Journal Book */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookMarked className="h-5 w-5" />
              دفتر اليومية العامة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              {entries.map((entry, entryIndex) => (
                <div
                  key={entry.id}
                  className={`${entryIndex > 0 ? "border-t-2 border-primary/20" : ""}`}
                >
                  {/* Entry Header */}
                  <div className="bg-muted/50 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-primary">
                        {entry.entryNumber}
                      </span>
                      <span className="text-muted-foreground">{entry.date}</span>
                      <span>{entry.description}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toast.info("عرض تفاصيل القيد")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Entry Lines */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right w-32">رقم الحساب</TableHead>
                        <TableHead className="text-right">اسم الحساب</TableHead>
                        <TableHead className="text-right w-36">مدين</TableHead>
                        <TableHead className="text-right w-36">دائن</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entry.lines.map((line, lineIndex) => (
                        <TableRow key={lineIndex}>
                          <TableCell className="font-mono">{line.accountCode}</TableCell>
                          <TableCell
                            className={line.credit > 0 ? "pr-8" : ""}
                          >
                            {line.credit > 0 ? "إلى حـ/ " : "من حـ/ "}
                            {line.accountName}
                          </TableCell>
                          <TableCell className="font-mono text-green-600">
                            {line.debit > 0 ? formatCurrency(line.debit) : "-"}
                          </TableCell>
                          <TableCell className="font-mono text-red-600">
                            {line.credit > 0 ? formatCurrency(line.credit) : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold">إجمالي القيود</span>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">إجمالي المدين</div>
                    <div className="font-mono font-bold text-lg text-green-600">
                      {formatCurrency(totalDebit)} ر.س
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">إجمالي الدائن</div>
                    <div className="font-mono font-bold text-lg text-red-600">
                      {formatCurrency(totalCredit)} ر.س
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">الفرق</div>
                    <div
                      className={`font-mono font-bold text-lg ${
                        totalDebit === totalCredit ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {totalDebit === totalCredit ? "✓ متوازن" : formatCurrency(Math.abs(totalDebit - totalCredit))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 text-sm text-muted-foreground text-center">
              عدد القيود: {entries.length} | الفترة: {fromDate} إلى {toDate}
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default JournalBookPage;
