import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";
import HijriGregorianDatePicker from "@/components/reports/HijriGregorianDatePicker";
import ReportExportButtons from "@/components/reports/ReportExportButtons";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface JournalEntry {
  entryNumber: string;
  account: string;
  description: string;
  costCenter: string;
  debit: number;
  credit: number;
  balance: number;
  date: string;
  documentNumber: string;
}

const JournalBookPage = () => {
  const [bookType, setBookType] = useState("banks");

  const dummyData: JournalEntry[] = [
    {
      entryNumber: "QID-001",
      account: "1102 - البنك الأهلي",
      description: "تحويل من حساب التبرعات",
      costCenter: "مركز التكلفة الرئيسي",
      debit: 100000,
      credit: 0,
      balance: 100000,
      date: "01/07/1447",
      documentNumber: "TRN-2026-001",
    },
    {
      entryNumber: "QID-002",
      account: "1102 - البنك الأهلي",
      description: "صرف رواتب الموظفين",
      costCenter: "إدارة الموارد البشرية",
      debit: 0,
      credit: 45000,
      balance: 55000,
      date: "05/07/1447",
      documentNumber: "SAL-2026-001",
    },
    {
      entryNumber: "QID-003",
      account: "1103 - بنك الراجحي",
      description: "إيداع تبرعات رمضان",
      costCenter: "إدارة التبرعات",
      debit: 75000,
      credit: 0,
      balance: 75000,
      date: "08/07/1447",
      documentNumber: "DON-2026-001",
    },
    {
      entryNumber: "QID-004",
      account: "1103 - بنك الراجحي",
      description: "دفع فواتير الكهرباء",
      costCenter: "الإدارة العامة",
      debit: 0,
      credit: 8500,
      balance: 66500,
      date: "12/07/1447",
      documentNumber: "BIL-2026-001",
    },
  ];

  const totals = dummyData.reduce(
    (acc, entry) => ({
      debit: acc.debit + entry.debit,
      credit: acc.credit + entry.credit,
    }),
    { debit: 0, credit: 0 }
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
    <InnerPageLayout moduleId="financial-affairs" moduleTitle="إدارة الشؤون المالية" title="دفتر اليومية">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">دفتر اليومية</h1>
          </div>
          <ReportExportButtons onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} />
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>نوع الدفتر</Label>
              <Select value={bookType} onValueChange={setBookType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banks">دفتر البنوك</SelectItem>
                  <SelectItem value="cash">دفتر النقدية</SelectItem>
                  <SelectItem value="purchases">دفتر المشتريات</SelectItem>
                  <SelectItem value="sales">دفتر المبيعات</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                <TableHead className="text-right font-bold">رقم القيد</TableHead>
                <TableHead className="text-right font-bold">الحساب / بيان العملية</TableHead>
                <TableHead className="text-right font-bold">مركز التكلفة</TableHead>
                <TableHead className="text-center font-bold">مدين</TableHead>
                <TableHead className="text-center font-bold">دائن</TableHead>
                <TableHead className="text-center font-bold">الرصيد لكل حركة</TableHead>
                <TableHead className="text-center font-bold">تاريخ القيد</TableHead>
                <TableHead className="text-center font-bold">رقم المستند</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    لا يوجد سجلات
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {dummyData.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{entry.entryNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{entry.account}</div>
                          <div className="text-sm text-muted-foreground">{entry.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{entry.costCenter}</TableCell>
                      <TableCell className="text-center">{entry.debit > 0 ? formatCurrency(entry.debit) : "-"}</TableCell>
                      <TableCell className="text-center">{entry.credit > 0 ? formatCurrency(entry.credit) : "-"}</TableCell>
                      <TableCell className="text-center">{formatCurrency(entry.balance)}</TableCell>
                      <TableCell className="text-center">{entry.date}</TableCell>
                      <TableCell className="text-center">{entry.documentNumber}</TableCell>
                    </TableRow>
                  ))}
                  {/* Totals Row */}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell colSpan={3} className="text-center">المجموع</TableCell>
                    <TableCell className="text-center">{formatCurrency(totals.debit)}</TableCell>
                    <TableCell className="text-center">{formatCurrency(totals.credit)}</TableCell>
                    <TableCell colSpan={3}></TableCell>
                  </TableRow>
                  {/* Final Balance Row */}
                  <TableRow className="bg-primary/10 font-bold">
                    <TableCell colSpan={3} className="text-center">الرصيد النهائي</TableCell>
                    <TableCell className="text-center">{formatCurrency(totals.debit)}</TableCell>
                    <TableCell className="text-center">{formatCurrency(totals.credit)}</TableCell>
                    <TableCell className="text-center">{formatCurrency(totals.debit - totals.credit)}</TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default JournalBookPage;
