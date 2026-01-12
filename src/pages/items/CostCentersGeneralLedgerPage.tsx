import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { FileText, Search } from "lucide-react";
import HijriGregorianDatePicker from "@/components/reports/HijriGregorianDatePicker";
import ReportErrorAlert from "@/components/reports/ReportErrorAlert";
import ReportExportButtons from "@/components/reports/ReportExportButtons";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LedgerEntry {
  date: string;
  entryNumber: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

const CostCentersGeneralLedgerPage = () => {
  const [fromDate, setFromDate] = useState(new Date(2026, 0, 1));
  const [toDate, setToDate] = useState(new Date(2026, 0, 13));
  const [costCenter, setCostCenter] = useState("");
  const [showError, setShowError] = useState(true);

  const dummyData: LedgerEntry[] = [
    {
      date: "01/07/1447",
      entryNumber: "QID-001",
      description: "رصيد افتتاحي",
      debit: 50000,
      credit: 0,
      balance: 50000,
    },
    {
      date: "03/07/1447",
      entryNumber: "QID-002",
      description: "مصروفات تشغيلية",
      debit: 12000,
      credit: 0,
      balance: 62000,
    },
    {
      date: "07/07/1447",
      entryNumber: "QID-003",
      description: "تحويل إلى مركز آخر",
      debit: 0,
      credit: 20000,
      balance: 42000,
    },
    {
      date: "10/07/1447",
      entryNumber: "QID-004",
      description: "إيرادات خدمات",
      debit: 0,
      credit: 8000,
      balance: 34000,
    },
    {
      date: "13/07/1447",
      entryNumber: "QID-005",
      description: "مصروفات صيانة",
      debit: 6000,
      credit: 0,
      balance: 40000,
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

  const handleShowReport = () => {
    if (!costCenter) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <InnerPageLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">الأستاذ العام لمراكز التكلفة</h1>
          </div>
          <ReportExportButtons onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} />
        </div>

        {/* Error Alert */}
        {showError && (
          <ReportErrorAlert message="لم تقم بإدخال كافة البيانات المطلوبة" />
        )}

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2 lg:col-span-3">
              <Label>مركز التكلفة *</Label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={costCenter}
                  onChange={(e) => setCostCenter(e.target.value)}
                  placeholder="ابحث عن مركز تكلفة بالكود أو الوصف"
                  className="pr-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>من *</Label>
              <HijriGregorianDatePicker date={fromDate} onDateChange={setFromDate} />
            </div>
            <div className="space-y-2">
              <Label>إلى *</Label>
              <HijriGregorianDatePicker date={toDate} onDateChange={setToDate} />
            </div>
            <div className="flex items-end">
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white w-full"
                onClick={handleShowReport}
              >
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
                <TableHead className="text-right font-bold">التاريخ</TableHead>
                <TableHead className="text-right font-bold">رقم القيد</TableHead>
                <TableHead className="text-right font-bold">البيان</TableHead>
                <TableHead className="text-center font-bold">مدين</TableHead>
                <TableHead className="text-center font-bold">دائن</TableHead>
                <TableHead className="text-center font-bold">الرصيد</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    لا يوجد سجلات
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {dummyData.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell className="font-medium">{entry.entryNumber}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell className="text-center">{entry.debit > 0 ? formatCurrency(entry.debit) : "-"}</TableCell>
                      <TableCell className="text-center">{entry.credit > 0 ? formatCurrency(entry.credit) : "-"}</TableCell>
                      <TableCell className="text-center">{formatCurrency(entry.balance)}</TableCell>
                    </TableRow>
                  ))}
                  {/* Totals Row */}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell colSpan={3} className="text-center">المجموع</TableCell>
                    <TableCell className="text-center">{formatCurrency(totals.debit)}</TableCell>
                    <TableCell className="text-center">{formatCurrency(totals.credit)}</TableCell>
                    <TableCell className="text-center">{formatCurrency(totals.debit - totals.credit)}</TableCell>
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

export default CostCentersGeneralLedgerPage;
