import { useState } from "react";
import { FileText, Search } from "lucide-react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HijriGregorianDatePicker from "@/components/reports/HijriGregorianDatePicker";
import ReportErrorAlert from "@/components/reports/ReportErrorAlert";
import ReportExportButtons from "@/components/reports/ReportExportButtons";

interface StatementEntry {
  id: number;
  date: string;
  entryNumber: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

const AccountStatementReportPage = () => {
  const [account, setAccount] = useState("");
  const [showError, setShowError] = useState(true);
  const [showReport, setShowReport] = useState(false);

  const dummyData: StatementEntry[] = [
    {
      id: 1,
      date: "01/01/2026",
      entryNumber: "JV-001",
      description: "رصيد افتتاحي",
      debit: 100000,
      credit: 0,
      balance: 100000,
    },
    {
      id: 2,
      date: "05/01/2026",
      entryNumber: "JV-002",
      description: "إيداع نقدي",
      debit: 50000,
      credit: 0,
      balance: 150000,
    },
    {
      id: 3,
      date: "10/01/2026",
      entryNumber: "JV-003",
      description: "صرف مستحقات موردين",
      debit: 0,
      credit: 25000,
      balance: 125000,
    },
    {
      id: 4,
      date: "15/01/2026",
      entryNumber: "JV-004",
      description: "تحصيل مستحقات عملاء",
      debit: 35000,
      credit: 0,
      balance: 160000,
    },
    {
      id: 5,
      date: "20/01/2026",
      entryNumber: "JV-005",
      description: "مصروفات إدارية",
      debit: 0,
      credit: 10000,
      balance: 150000,
    },
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("ar-SA");
  };

  const handleGenerateReport = () => {
    if (!account) {
      setShowError(true);
      setShowReport(false);
    } else {
      setShowError(false);
      setShowReport(true);
    }
  };

  const totalDebit = dummyData.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = dummyData.reduce((sum, entry) => sum + entry.credit, 0);

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-end gap-2">
          <h1 className="text-xl font-bold">تقرير كشف حساب</h1>
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

            {/* From Date */}
            <HijriGregorianDatePicker
              label="من"
              hijriDate="الخميس 13 رجب 1447 هـ"
              gregorianDate="01 يناير 2026"
              required
            />

            {/* To Date */}
            <HijriGregorianDatePicker
              label="إلى"
              hijriDate="الخميس 13 رجب 1447 هـ"
              gregorianDate="01 يناير 2026"
              required
            />
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
                <h2 className="font-bold">كشف حساب: الصندوق (1111)</h2>
                <p className="text-sm text-muted-foreground">
                  من 01/01/2026 إلى 31/01/2026
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-right font-bold">التاريخ</TableHead>
                    <TableHead className="text-right font-bold">رقم القيد</TableHead>
                    <TableHead className="text-right font-bold">البيان</TableHead>
                    <TableHead className="text-right font-bold">مدين</TableHead>
                    <TableHead className="text-right font-bold">دائن</TableHead>
                    <TableHead className="text-right font-bold">الرصيد</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyData.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-gray-50">
                      <TableCell className="text-right">{entry.date}</TableCell>
                      <TableCell className="text-right">{entry.entryNumber}</TableCell>
                      <TableCell className="text-right">{entry.description}</TableCell>
                      <TableCell className="text-right">
                        {entry.debit > 0 ? formatCurrency(entry.debit) : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.credit > 0 ? formatCurrency(entry.credit) : "-"}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(entry.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Totals Row */}
                  <TableRow className="bg-gray-100 font-bold">
                    <TableCell className="text-right" colSpan={3}>
                      الإجمالي
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(totalDebit)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(totalCredit)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(dummyData[dummyData.length - 1]?.balance || 0)}
                    </TableCell>
                  </TableRow>
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

export default AccountStatementReportPage;
