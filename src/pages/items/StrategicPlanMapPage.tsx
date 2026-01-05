import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Map, Printer, FileSpreadsheet } from "lucide-react";

const plansData = [
  { id: "1", title: "الخطة الإستراتيجية 2024-2028" },
  { id: "2", title: "الخطة الإستراتيجية 2019-2023" },
  { id: "3", title: "الخطة الإفتراضية" },
];

const mapData = [
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
    strategicTotal: 100,
    achievedTotal: 85,
    avgAchievements: 85,
    projectPerformance: 90,
    programPerformance: 80,
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
    strategicTotal: 50,
    achievedTotal: 45,
    avgAchievements: 90,
    projectPerformance: 92,
    programPerformance: 88,
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
    strategicTotal: 80,
    achievedTotal: 75,
    avgAchievements: 94,
    projectPerformance: 95,
    programPerformance: 93,
    indicatorPerformance: 94,
  },
  {
    id: 4,
    name: "معدل ساعات التدريب",
    type: "مؤشر فرعي",
    formula: "متوسط",
    polarity: "موجب",
    cumulative: "لا",
    periodTarget: 40,
    periodAchieved: 38,
    periodPercentage: 95,
    strategicTarget: 40,
    strategicTotal: 40,
    achievedTotal: 38,
    avgAchievements: 95,
    projectPerformance: 96,
    programPerformance: 94,
    indicatorPerformance: 95,
  },
  {
    id: 5,
    name: "منظور العمليات الداخلية",
    type: "منظور",
    formula: "-",
    polarity: "-",
    cumulative: "-",
    periodTarget: 100,
    periodAchieved: 70,
    periodPercentage: 70,
    strategicTarget: 100,
    strategicTotal: 100,
    achievedTotal: 70,
    avgAchievements: 70,
    projectPerformance: 72,
    programPerformance: 68,
    indicatorPerformance: 70,
  },
  {
    id: 6,
    name: "تحسين جودة الخدمات",
    type: "هدف",
    formula: "-",
    polarity: "-",
    cumulative: "-",
    periodTarget: 90,
    periodAchieved: 40,
    periodPercentage: 44,
    strategicTarget: 90,
    strategicTotal: 90,
    achievedTotal: 40,
    avgAchievements: 44,
    projectPerformance: 45,
    programPerformance: 43,
    indicatorPerformance: 44,
  },
  {
    id: 7,
    name: "نسبة رضا المستفيدين",
    type: "مؤشر رئيسي",
    formula: "نسبة",
    polarity: "موجب",
    cumulative: "نعم",
    periodTarget: 95,
    periodAchieved: 0,
    periodPercentage: 0,
    strategicTarget: 95,
    strategicTotal: 95,
    achievedTotal: 0,
    avgAchievements: 0,
    projectPerformance: 0,
    programPerformance: 0,
    indicatorPerformance: 0,
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

const StrategicPlanMapPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [periodicity, setPeriodicity] = useState<string>("");
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState({
    perspectives: true,
    goals: true,
    mainIndicators: true,
    subIndicators: true,
  });

  const handleShowMap = () => {
    if (selectedPlan && periodicity) {
      setShowMap(true);
    }
  };

  const filteredData = mapData.filter((item) => {
    if (item.type === "منظور" && !filters.perspectives) return false;
    if (item.type === "هدف" && !filters.goals) return false;
    if (item.type === "مؤشر رئيسي" && !filters.mainIndicators) return false;
    if (item.type === "مؤشر فرعي" && !filters.subIndicators) return false;
    return true;
  });

  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="strategic-plan-map"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="خارطة مهام الخطة الإستراتيجية"
    >
      {!showMap ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              خارطة مهام الخطة الإستراتيجية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Plan Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                الخطة الإستراتيجية <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="-- اختر --" />
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

            {/* Periodicity Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                دورية القياس <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={periodicity}
                onValueChange={setPeriodicity}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly" className="cursor-pointer">سنوية</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="semi-annual" id="semi-annual" />
                  <Label htmlFor="semi-annual" className="cursor-pointer">نصف سنوية</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="quarterly" id="quarterly" />
                  <Label htmlFor="quarterly" className="cursor-pointer">ربع سنوية</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">شهرية</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleShowMap}
              className="bg-green-600 hover:bg-green-700"
              disabled={!selectedPlan || !periodicity}
            >
              عرض الخارطة
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Header with title and actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMap(false)}
                  >
                    رجوع
                  </Button>
                  <h2 className="text-lg font-semibold">
                    {plansData.find((p) => p.id === selectedPlan)?.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                    <Printer className="h-4 w-4 ml-2" />
                    نسخة للطباعة
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-300 hover:bg-green-50">
                    <FileSpreadsheet className="h-4 w-4 ml-2" />
                    تصدير اكسل
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-6">
                {/* Color Legend */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">مؤشر الألوان:</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-red-500"></div>
                      <span className="text-sm">0%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-blue-500"></div>
                      <span className="text-sm">1% - 50%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-yellow-500"></div>
                      <span className="text-sm">51% - 99%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-500"></div>
                      <span className="text-sm">100%+</span>
                    </div>
                  </div>
                </div>

                {/* Display Filters */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">فلاتر العرض:</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="perspectives"
                        checked={filters.perspectives}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({ ...prev, perspectives: !!checked }))
                        }
                      />
                      <Label htmlFor="perspectives" className="cursor-pointer text-sm">المناظير</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="goals"
                        checked={filters.goals}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({ ...prev, goals: !!checked }))
                        }
                      />
                      <Label htmlFor="goals" className="cursor-pointer text-sm">الأهداف</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="mainIndicators"
                        checked={filters.mainIndicators}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({ ...prev, mainIndicators: !!checked }))
                        }
                      />
                      <Label htmlFor="mainIndicators" className="cursor-pointer text-sm">المؤشرات الرئيسية</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="subIndicators"
                        checked={filters.subIndicators}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({ ...prev, subIndicators: !!checked }))
                        }
                      />
                      <Label htmlFor="subIndicators" className="cursor-pointer text-sm">المؤشرات الفرعية</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                      <TableHead className="text-center font-semibold text-xs" colSpan={3}>
                        فترة القياس
                      </TableHead>
                      <TableHead className="text-right font-semibold text-xs">المستهدف الإستراتيجي</TableHead>
                      <TableHead className="text-right font-semibold text-xs">الإجمالي الإستراتيجي</TableHead>
                      <TableHead className="text-right font-semibold text-xs">الإجمالي المتحقق</TableHead>
                      <TableHead className="text-right font-semibold text-xs">متوسط التحققات</TableHead>
                      <TableHead className="text-right font-semibold text-xs">آداء المشاريع</TableHead>
                      <TableHead className="text-right font-semibold text-xs">آداء البرامج</TableHead>
                      <TableHead className="text-right font-semibold text-xs">آداء المؤشر</TableHead>
                    </TableRow>
                    <TableRow className="bg-muted/30">
                      <TableHead colSpan={6}></TableHead>
                      <TableHead className="text-center text-xs">مستهدف</TableHead>
                      <TableHead className="text-center text-xs">متحقق</TableHead>
                      <TableHead className="text-center text-xs">نسبة التحقق</TableHead>
                      <TableHead colSpan={7}></TableHead>
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
                        <TableCell className="text-center text-sm">{item.strategicTotal}</TableCell>
                        <TableCell className="text-center text-sm">{item.achievedTotal}</TableCell>
                        <TableCell className="text-center text-sm">{item.avgAchievements}%</TableCell>
                        <TableCell className="text-center text-sm">{item.projectPerformance}%</TableCell>
                        <TableCell className="text-center text-sm">{item.programPerformance}%</TableCell>
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

export default StrategicPlanMapPage;
