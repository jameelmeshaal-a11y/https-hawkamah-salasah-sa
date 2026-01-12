import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Search } from "lucide-react";
import ReportExportButtons from "@/components/reports/ReportExportButtons";

const PreviewDynamicListFormPage = () => {
  const [selectedList, setSelectedList] = useState("");
  const [periodType, setPeriodType] = useState("monthly");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [showReport, setShowReport] = useState(false);

  const lists = [
    "قائمة الأنشطة بالفترة",
    "قائمة المركز المالي الفصلي",
    "قائمة التدفقات النقدية",
    "قائمة الدخل الشامل",
  ];

  const months = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const years = ["2023", "2024", "2025", "2026"];

  const handleViewReport = () => {
    setShowReport(true);
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      moduleTitle="إدارة الشؤون المالية"
      title="معاينة نموذج قائمة ديناميكية"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">معاينة نموذج قائمة ديناميكية</h1>
            <p className="text-muted-foreground">عرض ومعاينة نماذج القوائم الديناميكية</p>
          </div>
        </div>

        {/* Filters Card */}
        <Card>
          <CardHeader>
            <CardTitle>فلاتر التقرير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* List Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  القائمة <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedList} onValueChange={setSelectedList}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القائمة" />
                  </SelectTrigger>
                  <SelectContent>
                    {lists.map((list) => (
                      <SelectItem key={list} value={list}>
                        {list}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Period Type */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">نوع الفترة</Label>
              <RadioGroup
                value={periodType}
                onValueChange={setPeriodType}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">شهري</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="quarterly" id="quarterly" />
                  <Label htmlFor="quarterly" className="cursor-pointer">ربع سنوي</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="semi-annual" id="semi-annual" />
                  <Label htmlFor="semi-annual" className="cursor-pointer">نصف سنوي</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="annual" id="annual" />
                  <Label htmlFor="annual" className="cursor-pointer">سنوي</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="badawi" id="badawi" />
                  <Label htmlFor="badawi" className="cursor-pointer">بدوي</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Date Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Period */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  بداية الفترة <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Select value={startMonth} onValueChange={setStartMonth}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="الشهر" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={month} value={String(index + 1)}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={startYear} onValueChange={setStartYear}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="السنة" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* End Period */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  نهاية الفترة <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Select value={endMonth} onValueChange={setEndMonth}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="الشهر" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={month} value={String(index + 1)}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={endYear} onValueChange={setEndYear}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="السنة" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* View Report Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleViewReport}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
              >
                <Search className="h-5 w-5 ml-2" />
                عرض التقرير
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Result */}
        {showReport && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>نتيجة التقرير</CardTitle>
              <ReportExportButtons
                onExportPDF={() => console.log("Export PDF")}
                onExportExcel={() => console.log("Export Excel")}
              />
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                لا توجد بيانات متوفرة في الجدول
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default PreviewDynamicListFormPage;
