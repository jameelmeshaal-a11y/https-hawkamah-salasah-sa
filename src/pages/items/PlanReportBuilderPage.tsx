import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Printer, FileSpreadsheet, FileDown, BarChart3, Target, TrendingUp, AlertTriangle } from "lucide-react";

const plansData = [
  { id: "1", title: "الخطة الإستراتيجية 2024-2028" },
  { id: "2", title: "الخطة الإستراتيجية 2019-2023" },
  { id: "3", title: "الخطة الإفتراضية" },
];

const reportTypes = [
  { id: "comprehensive", title: "تقرير شامل" },
  { id: "perspectives", title: "تقرير المناظير" },
  { id: "goals", title: "تقرير الأهداف" },
  { id: "indicators", title: "تقرير المؤشرات" },
];

const months = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const years = ["2024", "2025", "2026", "2027", "2028"];

const reportData = [
  {
    id: 1,
    name: "منظور التعلم والنمو",
    type: "منظور",
    formula: "-",
    polarity: "-",
    cumulative: "-",
    periodTarget: 100,
    periodAchieved: 85,
    periodPercentage: 85,
    strategicTarget: 100,
    achievedTotal: 85,
    avgAchievements: 85,
    indicatorPerformance: 85,
  },
  {
    id: 2,
    name: "تطوير الكفاءات البشرية",
    type: "هدف",
    formula: "-",
    polarity: "-",
    cumulative: "-",
    periodTarget: 50,
    periodAchieved: 45,
    periodPercentage: 90,
    strategicTarget: 50,
    achievedTotal: 45,
    avgAchievements: 90,
    indicatorPerformance: 90,
  },
  {
    id: 3,
    name: "نسبة الموظفين المدربين",
    type: "مؤشر رئيسي",
    formula: "عدد / نسبة",
    polarity: "موجب",
    cumulative: "نعم",
    periodTarget: 80,
    periodAchieved: 75,
    periodPercentage: 94,
    strategicTarget: 80,
    achievedTotal: 75,
    avgAchievements: 94,
    indicatorPerformance: 94,
  },
  {
    id: 4,
    name: "منظور العمليات الداخلية",
    type: "منظور",
    formula: "-",
    polarity: "-",
    cumulative: "-",
    periodTarget: 100,
    periodAchieved: 70,
    periodPercentage: 70,
    strategicTarget: 100,
    achievedTotal: 70,
    avgAchievements: 70,
    indicatorPerformance: 70,
  },
  {
    id: 5,
    name: "تحسين جودة الخدمات",
    type: "هدف",
    formula: "-",
    polarity: "-",
    cumulative: "-",
    periodTarget: 90,
    periodAchieved: 40,
    periodPercentage: 44,
    strategicTarget: 90,
    achievedTotal: 40,
    avgAchievements: 44,
    indicatorPerformance: 44,
  },
];

const getRowColor = (type: string) => {
  switch (type) {
    case "منظور":
      return "bg-blue-50";
    case "هدف":
      return "bg-green-50";
    case "مؤشر رئيسي":
      return "bg-yellow-50";
    case "مؤشر فرعي":
      return "bg-gray-50";
    default:
      return "";
  }
};

const getPercentageColor = (percentage: number) => {
  if (percentage === 0) return "text-red-600 bg-red-100";
  if (percentage <= 50) return "text-blue-600 bg-blue-100";
  if (percentage < 100) return "text-yellow-600 bg-yellow-100";
  return "text-green-600 bg-green-100";
};

const PlanReportBuilderPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [reportType, setReportType] = useState<string>("");
  const [fromMonth, setFromMonth] = useState<string>("");
  const [fromYear, setFromYear] = useState<string>("");
  const [toMonth, setToMonth] = useState<string>("");
  const [toYear, setToYear] = useState<string>("");
  const [showReport, setShowReport] = useState(false);
  const [includes, setIncludes] = useState({
    perspectives: true,
    goals: true,
    mainIndicators: true,
    subIndicators: false,
    programs: false,
    projects: false,
  });

  const handleBuildReport = () => {
    if (selectedPlan && reportType) {
      setShowReport(true);
    }
  };

  const filteredData = reportData.filter((item) => {
    if (item.type === "منظور" && !includes.perspectives) return false;
    if (item.type === "هدف" && !includes.goals) return false;
    if (item.type === "مؤشر رئيسي" && !includes.mainIndicators) return false;
    if (item.type === "مؤشر فرعي" && !includes.subIndicators) return false;
    return true;
  });

  // Calculate statistics
  const stats = {
    total: filteredData.length,
    achieved: filteredData.filter((d) => d.periodPercentage >= 100).length,
    inProgress: filteredData.filter((d) => d.periodPercentage > 0 && d.periodPercentage < 100).length,
    delayed: filteredData.filter((d) => d.periodPercentage === 0).length,
    avgPerformance: Math.round(filteredData.reduce((acc, d) => acc + d.indicatorPerformance, 0) / filteredData.length),
  };

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="plan-report-builder"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="بناء تقرير للخطة"
    >
      {!showReport ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              بناء تقرير للخطة الإستراتيجية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Plan Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  الخطة الإستراتيجية <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger>
                    <SelectValue placeholder="-- اختر الخطة --" />
                  </SelectTrigger>
                  <SelectContent>
                    {plansData.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  نوع التقرير <span className="text-red-500">*</span>
                </Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="-- اختر نوع التقرير --" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Period Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">الفترة من</Label>
                <div className="flex gap-2">
                  <Select value={fromMonth} onValueChange={setFromMonth}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="الشهر" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index} value={String(index + 1)}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={fromYear} onValueChange={setFromYear}>
                    <SelectTrigger className="w-[100px]">
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

              <div className="space-y-2">
                <Label className="text-sm font-medium">الفترة إلى</Label>
                <div className="flex gap-2">
                  <Select value={toMonth} onValueChange={setToMonth}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="الشهر" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index} value={String(index + 1)}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={toYear} onValueChange={setToYear}>
                    <SelectTrigger className="w-[100px]">
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

            {/* Include Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">تضمين في التقرير:</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="inc-perspectives"
                    checked={includes.perspectives}
                    onCheckedChange={(checked) =>
                      setIncludes((prev) => ({ ...prev, perspectives: !!checked }))
                    }
                  />
                  <Label htmlFor="inc-perspectives" className="cursor-pointer text-sm">المناظير</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="inc-goals"
                    checked={includes.goals}
                    onCheckedChange={(checked) =>
                      setIncludes((prev) => ({ ...prev, goals: !!checked }))
                    }
                  />
                  <Label htmlFor="inc-goals" className="cursor-pointer text-sm">الأهداف</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="inc-mainIndicators"
                    checked={includes.mainIndicators}
                    onCheckedChange={(checked) =>
                      setIncludes((prev) => ({ ...prev, mainIndicators: !!checked }))
                    }
                  />
                  <Label htmlFor="inc-mainIndicators" className="cursor-pointer text-sm">المؤشرات الرئيسية</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="inc-subIndicators"
                    checked={includes.subIndicators}
                    onCheckedChange={(checked) =>
                      setIncludes((prev) => ({ ...prev, subIndicators: !!checked }))
                    }
                  />
                  <Label htmlFor="inc-subIndicators" className="cursor-pointer text-sm">المؤشرات الفرعية</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="inc-programs"
                    checked={includes.programs}
                    onCheckedChange={(checked) =>
                      setIncludes((prev) => ({ ...prev, programs: !!checked }))
                    }
                  />
                  <Label htmlFor="inc-programs" className="cursor-pointer text-sm">البرامج</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="inc-projects"
                    checked={includes.projects}
                    onCheckedChange={(checked) =>
                      setIncludes((prev) => ({ ...prev, projects: !!checked }))
                    }
                  />
                  <Label htmlFor="inc-projects" className="cursor-pointer text-sm">المشاريع</Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleBuildReport}
              className="bg-green-600 hover:bg-green-700"
              disabled={!selectedPlan || !reportType}
            >
              <FileText className="h-4 w-4 ml-2" />
              بناء التقرير
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Header with actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReport(false)}
                  >
                    رجوع
                  </Button>
                  <h2 className="text-lg font-semibold">
                    {reportTypes.find((r) => r.id === reportType)?.title} - {plansData.find((p) => p.id === selectedPlan)?.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                    <FileDown className="h-4 w-4 ml-2" />
                    تصدير PDF
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-300 hover:bg-green-50">
                    <FileSpreadsheet className="h-4 w-4 ml-2" />
                    تصدير Excel
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 ml-2" />
                    طباعة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
                <div className="text-sm text-blue-600">إجمالي المؤشرات</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-700">{stats.achieved}</div>
                <div className="text-sm text-green-600">منجز</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold text-yellow-700">{stats.inProgress}</div>
                <div className="text-sm text-yellow-600">قيد التنفيذ</div>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold text-red-700">{stats.delayed}</div>
                <div className="text-sm text-red-600">متعثر</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-700">{stats.avgPerformance}%</div>
                <div className="text-sm text-purple-600">متوسط الأداء</div>
              </CardContent>
            </Card>
          </div>

          {/* Data Table */}
          <Card>
            <CardContent className="p-4">
              <div className="border rounded-lg overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right font-semibold text-xs">م</TableHead>
                      <TableHead className="text-right font-semibold text-xs min-w-[200px]">إسم البند</TableHead>
                      <TableHead className="text-right font-semibold text-xs">النوع</TableHead>
                      <TableHead className="text-right font-semibold text-xs">صيغة القياس</TableHead>
                      <TableHead className="text-right font-semibold text-xs">قطبية المؤشر</TableHead>
                      <TableHead className="text-right font-semibold text-xs">تراكمية المؤشر</TableHead>
                      <TableHead className="text-center font-semibold text-xs">المستهدف</TableHead>
                      <TableHead className="text-center font-semibold text-xs">المتحقق</TableHead>
                      <TableHead className="text-center font-semibold text-xs">نسبة التحقق</TableHead>
                      <TableHead className="text-center font-semibold text-xs">المستهدف الإستراتيجي</TableHead>
                      <TableHead className="text-center font-semibold text-xs">الإجمالي المتحقق</TableHead>
                      <TableHead className="text-center font-semibold text-xs">آداء المؤشر</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item, index) => (
                      <TableRow key={item.id} className={getRowColor(item.type)}>
                        <TableCell className="text-sm">{index + 1}</TableCell>
                        <TableCell className="font-medium text-sm">{item.name}</TableCell>
                        <TableCell className="text-sm">{item.type}</TableCell>
                        <TableCell className="text-sm">{item.formula}</TableCell>
                        <TableCell className="text-sm">{item.polarity}</TableCell>
                        <TableCell className="text-sm">{item.cumulative}</TableCell>
                        <TableCell className="text-center text-sm">{item.periodTarget}</TableCell>
                        <TableCell className="text-center text-sm">{item.periodAchieved}</TableCell>
                        <TableCell className="text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPercentageColor(item.periodPercentage)}`}>
                            {item.periodPercentage}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-sm">{item.strategicTarget}</TableCell>
                        <TableCell className="text-center text-sm">{item.achievedTotal}</TableCell>
                        <TableCell className="text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPercentageColor(item.indicatorPerformance)}`}>
                            {item.indicatorPerformance}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </InnerPageLayout>
  );
};

export default PlanReportBuilderPage;
