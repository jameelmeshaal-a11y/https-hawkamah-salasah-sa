import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3, Search } from "lucide-react";
import ReportExportButtons from "@/components/reports/ReportExportButtons";

const BudgetDeviationReportPage = () => {
  const [selectedBudget, setSelectedBudget] = useState("");
  const [reportType, setReportType] = useState("summary");
  const [periodType, setPeriodType] = useState("monthly");
  const [accountFilter, setAccountFilter] = useState("");
  const [showReport, setShowReport] = useState(false);

  const budgets = [
    "موازنة 2024",
    "موازنة 2025",
    "موازنة الإيرادات 2024",
    "موازنة المصروفات 2024",
  ];

  const handleViewReport = () => {
    setShowReport(true);
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      moduleTitle="إدارة الشؤون المالية"
      title="تقرير انحراف الموازنة"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">تقرير انحراف الموازنة</h1>
            <p className="text-muted-foreground">عرض تقارير انحراف الموازنة عن الفعلي</p>
          </div>
        </div>

        {/* Filters Card */}
        <Card>
          <CardHeader>
            <CardTitle>فلاتر التقرير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Budget Selection */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                الموازنة <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                <SelectTrigger className="w-full md:w-1/2">
                  <SelectValue placeholder="اختر الموازنة" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.map((budget) => (
                    <SelectItem key={budget} value={budget}>
                      {budget}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Report Type */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                نوع التقرير <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={reportType}
                onValueChange={setReportType}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="summary" id="summary" />
                  <Label htmlFor="summary" className="cursor-pointer">ملخص</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="detailed" id="detailed" />
                  <Label htmlFor="detailed" className="cursor-pointer">تفصيلي</Label>
                </div>
              </RadioGroup>
            </div>

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

            {/* Account Filter */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">تنقية الحسابات</Label>
              <Input
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value)}
                placeholder="اترك الحقل فارغاً لاختيار كافة الحسابات في الموازنة"
                className="w-full"
              />
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

export default BudgetDeviationReportPage;
