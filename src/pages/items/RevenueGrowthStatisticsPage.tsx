import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowUpRight, Search, ChevronDown, Settings } from "lucide-react";
import ReportExportButtons from "@/components/reports/ReportExportButtons";

const RevenueGrowthStatisticsPage = () => {
  const [periodType, setPeriodType] = useState("monthly");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [horizontalData, setHorizontalData] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [dataCollection, setDataCollection] = useState("sum");
  const [defaultChart, setDefaultChart] = useState("bar");
  const [saveTemplate, setSaveTemplate] = useState(false);
  const [showHorizontalTotal, setShowHorizontalTotal] = useState(true);
  const [showVerticalTotal, setShowVerticalTotal] = useState(true);
  const [showReport, setShowReport] = useState(false);

  const months = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const years = ["2023", "2024", "2025", "2026"];

  const toggleHorizontalData = (value: string) => {
    setHorizontalData(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleViewReport = () => {
    setShowReport(true);
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      moduleTitle="إدارة الشؤون المالية"
      title="إحصائيات نمو الإيرادات"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <ArrowUpRight className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">إحصائيات نمو الإيرادات</h1>
            <p className="text-muted-foreground">تحليل وعرض معدلات نمو الإيرادات</p>
          </div>
        </div>

        {/* Filters Card */}
        <Card>
          <CardHeader>
            <CardTitle>فلاتر التقرير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Period Type */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                نوع الفترة <span className="text-red-500">*</span>
              </Label>
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

            {/* Horizontal Data */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                البيانات الأفقية <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="h-type"
                    checked={horizontalData.includes("type")}
                    onCheckedChange={() => toggleHorizontalData("type")}
                  />
                  <Label htmlFor="h-type" className="cursor-pointer">النوع</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="h-payment"
                    checked={horizontalData.includes("payment")}
                    onCheckedChange={() => toggleHorizontalData("payment")}
                  />
                  <Label htmlFor="h-payment" className="cursor-pointer">وسيلة الدفع</Label>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">تنقية النوع</Label>
                <Input
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  placeholder="ابحث عن النوع..."
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-medium">تنقية وسيلة الدفع</Label>
                <Input
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  placeholder="ابحث عن وسيلة الدفع..."
                />
              </div>
            </div>

            {/* Report Settings */}
            <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    إعدادات التقرير
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${settingsOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Show Chart */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="show-chart"
                      checked={showChart}
                      onCheckedChange={(checked) => setShowChart(!!checked)}
                    />
                    <Label htmlFor="show-chart" className="cursor-pointer">عرض الرسم البياني</Label>
                  </div>

                  {/* Show Table */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="show-table"
                      checked={showTable}
                      onCheckedChange={(checked) => setShowTable(!!checked)}
                    />
                    <Label htmlFor="show-table" className="cursor-pointer">عرض الجدول</Label>
                  </div>

                  {/* Data Collection */}
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">جمع البيانات</Label>
                    <Select value={dataCollection} onValueChange={setDataCollection}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sum">المجموع</SelectItem>
                        <SelectItem value="average">المتوسط</SelectItem>
                        <SelectItem value="count">العدد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Default Chart */}
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">الرسم البياني الافتراضي</Label>
                    <Select value={defaultChart} onValueChange={setDefaultChart}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">عمودي</SelectItem>
                        <SelectItem value="pie">دائري</SelectItem>
                        <SelectItem value="line">خطي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Save Template */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="save-template" className="cursor-pointer">حفظ النموذج</Label>
                    <Switch
                      id="save-template"
                      checked={saveTemplate}
                      onCheckedChange={setSaveTemplate}
                    />
                  </div>

                  {/* Horizontal Total */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="h-total"
                      checked={showHorizontalTotal}
                      onCheckedChange={(checked) => setShowHorizontalTotal(!!checked)}
                    />
                    <Label htmlFor="h-total" className="cursor-pointer">إظهار المجموع الأفقي</Label>
                  </div>

                  {/* Vertical Total */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="v-total"
                      checked={showVerticalTotal}
                      onCheckedChange={(checked) => setShowVerticalTotal(!!checked)}
                    />
                    <Label htmlFor="v-total" className="cursor-pointer">إظهار المجموع الرأسي</Label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

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

export default RevenueGrowthStatisticsPage;
