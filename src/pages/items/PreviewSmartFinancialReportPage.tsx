import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText } from "lucide-react";
import ReportExportButtons from "@/components/reports/ReportExportButtons";

const PreviewSmartFinancialReportPage = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [periodType, setPeriodType] = useState("monthly");
  const [startYear, setStartYear] = useState("2026");
  const [startMonth, setStartMonth] = useState("1");
  const [endYear, setEndYear] = useState("2026");
  const [endMonth, setEndMonth] = useState("12");
  const [additionalProducts, setAdditionalProducts] = useState("");
  const [movementType, setMovementType] = useState("movement");

  const reports = [
    "تقرير مقارنة 2023",
    "تقرير حسابات مجمعة حسب التصنيف الوظيفي 2023",
    "تقرير حركة بند الزكاة 2023",
    "تقرير بالالتزامات ومتبقي الأصول 2023",
    "تقرير صافيات مجمعة حسب التصنيف الوظيفي 2023",
    "تقرير التبرعات والإيرادات 2022",
  ];

  const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"];
  const months = [
    { value: "1", label: "يناير" },
    { value: "2", label: "فبراير" },
    { value: "3", label: "مارس" },
    { value: "4", label: "أبريل" },
    { value: "5", label: "مايو" },
    { value: "6", label: "يونيو" },
    { value: "7", label: "يوليو" },
    { value: "8", label: "أغسطس" },
    { value: "9", label: "سبتمبر" },
    { value: "10", label: "أكتوبر" },
    { value: "11", label: "نوفمبر" },
    { value: "12", label: "ديسمبر" },
  ];

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
  };

  const handleExportExcel = () => {
    console.log("Exporting Excel...");
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
            <h1 className="text-xl font-bold">معاينة تقرير مالي ذكي</h1>
          </div>
          <ReportExportButtons onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} />
        </div>

        {/* Filters */}
        <div className="bg-card border rounded-lg p-4 space-y-6">
          {/* Report Selection */}
          <div className="space-y-2">
            <Label>التقرير *</Label>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger>
                <SelectValue placeholder="اختر التقرير" />
              </SelectTrigger>
              <SelectContent>
                {reports.map((report, index) => (
                  <SelectItem key={index} value={report}>{report}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Period Type */}
          <div className="space-y-3">
            <Label>نوع الفترة</Label>
            <RadioGroup value={periodType} onValueChange={setPeriodType} className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="cursor-pointer">شهري</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="quarterly" id="quarterly" />
                <Label htmlFor="quarterly" className="cursor-pointer">ربع سنوي</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="cursor-pointer">سنوي</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="cursor-pointer">بدوي</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Period */}
            <div className="space-y-2">
              <Label>بداية الفترة *</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select value={startYear} onValueChange={setStartYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={startMonth} onValueChange={setStartMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* End Period */}
            <div className="space-y-2">
              <Label>نهاية الفترة *</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select value={endYear} onValueChange={setEndYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={endMonth} onValueChange={setEndMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>منتجات إضافية</Label>
              <Input
                value={additionalProducts}
                onChange={(e) => setAdditionalProducts(e.target.value)}
                placeholder="أدخل منتجات إضافية"
              />
            </div>
            <div className="space-y-2">
              <Label>النوع</Label>
              <Select value={movementType} onValueChange={setMovementType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="movement">حركة</SelectItem>
                  <SelectItem value="balance">رصيد</SelectItem>
                  <SelectItem value="both">الكل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-12">
              عرض التقرير
            </Button>
          </div>
        </div>

        {/* Report Preview Area */}
        <div className="bg-card border rounded-lg p-8 min-h-[300px] flex items-center justify-center text-muted-foreground">
          <p>اختر التقرير والفترة ثم اضغط على "عرض التقرير" لعرض البيانات</p>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default PreviewSmartFinancialReportPage;
