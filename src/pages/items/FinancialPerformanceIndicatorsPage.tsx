import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticalIndicator {
  name: string;
  weight: number;
  target: string;
  achieved: number;
  weightedScore: number;
}

interface MainIndicator {
  name: string;
  weight: number;
  analyticalIndicators: AnalyticalIndicator[];
  achievementRate: number;
  achievedScore: number;
}

const indicatorsData: MainIndicator[] = [
  {
    name: "المصاريف الإدارية",
    weight: 20,
    analyticalIndicators: [
      { name: "نسبة المصاريف الإدارية إلى إجمالي المصاريف", weight: 80, target: "≤ 15%", achieved: 0, weightedScore: 0 },
      { name: "نسبة عوائد الاستدامة المالية إلى المصاريف الإدارية", weight: 20, target: "≥ 50%", achieved: 0, weightedScore: 0 },
    ],
    achievementRate: 0,
    achievedScore: 0,
  },
  {
    name: "مصاريف البرامج والأنشطة",
    weight: 45,
    analyticalIndicators: [
      { name: "نسبة مصاريف البرامج والأنشطة إلى إجمالي المصاريف", weight: 70, target: "≥ 70%", achieved: 0, weightedScore: 0 },
      { name: "نسبة مصاريف الاستدامة إلى إجمالي المصاريف", weight: 30, target: "≤ 10%", achieved: 0, weightedScore: 0 },
    ],
    achievementRate: 0,
    achievedScore: 0,
  },
  {
    name: "الاستدامة المالية",
    weight: 10,
    analyticalIndicators: [
      { name: "نسبة مصاريف الاستدامة إلى عوائد الاستدامة", weight: 30, target: "≤ 30%", achieved: 0, weightedScore: 0 },
      { name: "نسبة عوائد الاستدامة إلى إجمالي أصول الاستدامة", weight: 40, target: "≥ 5%", achieved: 0, weightedScore: 0 },
      { name: "نسبة أصول الاستدامة إلى إجمالي الأصول", weight: 30, target: "≥ 20%", achieved: 0, weightedScore: 0 },
    ],
    achievementRate: 0,
    achievedScore: 0,
  },
  {
    name: "جمع الأموال والتبرعات",
    weight: 10,
    analyticalIndicators: [
      { name: "نسبة مصاريف جمع الأموال إلى إجمالي المصاريف", weight: 50, target: "≤ 5%", achieved: 0, weightedScore: 0 },
      { name: "نسبة مصاريف جمع الأموال إلى إجمالي التبرعات", weight: 50, target: "≤ 10%", achieved: 0, weightedScore: 0 },
    ],
    achievementRate: 0,
    achievedScore: 0,
  },
  {
    name: "قدرة الجمعية على تغطية التزاماتها المستقبلية",
    weight: 15,
    analyticalIndicators: [
      { name: "نسبة النقد وما في حكمه إلى صافي الأصول المقيدة والالتزامات", weight: 70, target: "≥ 100%", achieved: 0, weightedScore: 0 },
      { name: "نسبة صافي النقد والاستثمارات المتداولة إلى المصاريف الإدارية التقديرية", weight: 30, target: "≥ 3 أشهر", achieved: 0, weightedScore: 0 },
    ],
    achievementRate: 0,
    achievedScore: 0,
  },
];

const evaluationScale = [
  { min: 0, max: 49.99, label: "ضعيف", color: "bg-red-100 text-red-800" },
  { min: 50, max: 69.99, label: "متوسط", color: "bg-yellow-100 text-yellow-800" },
  { min: 70, max: 79.99, label: "جيد", color: "bg-blue-100 text-blue-800" },
  { min: 80, max: 89.99, label: "جيد جداً", color: "bg-green-100 text-green-800" },
  { min: 90, max: 100, label: "ممتاز", color: "bg-emerald-100 text-emerald-800" },
];

const accountBalancesData = [
  { account: "الأصول المتداولة", balance: 0 },
  { account: "الخصوم المتداولة", balance: 0 },
  { account: "إجمالي المصاريف", balance: 0 },
  { account: "المصاريف الإدارية", balance: 0 },
  { account: "مصاريف البرامج والأنشطة", balance: 0 },
  { account: "مصاريف جمع الأموال", balance: 0 },
  { account: "عوائد الاستدامة", balance: 0 },
  { account: "أصول الاستدامة", balance: 0 },
  { account: "إجمالي التبرعات", balance: 0 },
  { account: "صافي الأصول المقيدة", balance: 0 },
];

const variablesData = [
  { variable: "الحد الأقصى للمصاريف الإدارية", value: "15%", description: "نسبة المصاريف الإدارية المسموح بها" },
  { variable: "الحد الأدنى لمصاريف البرامج", value: "70%", description: "الحد الأدنى المطلوب لمصاريف البرامج والأنشطة" },
  { variable: "معدل العائد على الاستدامة", value: "5%", description: "الحد الأدنى للعائد على أصول الاستدامة" },
  { variable: "نسبة السيولة المطلوبة", value: "100%", description: "الحد الأدنى لتغطية الالتزامات" },
];

const FinancialPerformanceIndicatorsPage = () => {
  const [showReport, setShowReport] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [manualEntry, setManualEntry] = useState(false);

  const totalScore = indicatorsData.reduce((sum, ind) => sum + ind.achievedScore, 0);
  const overallPercentage = (totalScore / 100) * 100;

  const getEvaluationLabel = (percentage: number) => {
    const scale = evaluationScale.find(s => percentage >= s.min && percentage <= s.max);
    return scale || evaluationScale[0];
  };

  const handleView = () => {
    if (selectedYear) {
      setShowReport(true);
    }
  };

  if (!showReport) {
    return (
      <InnerPageLayout
        moduleId="excellence"
        itemSlug="financial-performance-indicators"
        moduleTitle="إدارة التميز المؤسسي"
        sectionTitle="إدارة الحوكمة"
        title="حساب مؤشرات الأداء المالي"
      >
        <Card className="max-w-xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>اختر السنة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>السنة</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر السنة..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="manual-entry">إدخال الأرصدة يدوياً</Label>
              <Switch
                id="manual-entry"
                checked={manualEntry}
                onCheckedChange={setManualEntry}
              />
            </div>

            <Button 
              onClick={handleView} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!selectedYear}
            >
              <Eye className="h-4 w-4 ml-2" />
              عرض
            </Button>
          </CardContent>
        </Card>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="financial-performance-indicators"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الحوكمة"
      title="حساب مؤشرات الأداء المالي"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">تقرير حساب مؤشرات الأداء المالي لعام {selectedYear}</h3>
            <p className="text-sm text-muted-foreground">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowReport(false)}>
              رجوع
            </Button>
            <Button variant="outline">
              <FileSpreadsheet className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 ml-2" />
              تصدير PDF
            </Button>
          </div>
        </div>

        <Tabs defaultValue="final-report" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="final-report">التقرير النهائي</TabsTrigger>
            <TabsTrigger value="account-balances">أرصدة الحسابات</TabsTrigger>
            <TabsTrigger value="variables">المتغيرات</TabsTrigger>
          </TabsList>

          <TabsContent value="final-report" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-right font-bold">المؤشر الرئيسي</TableHead>
                        <TableHead className="text-right font-bold">المؤشر التحليلي</TableHead>
                        <TableHead className="text-center font-bold">الدرجة</TableHead>
                        <TableHead className="text-center font-bold">الوزن النسبي للمؤشر التحليلي</TableHead>
                        <TableHead className="text-center font-bold">المستهدف</TableHead>
                        <TableHead className="text-center font-bold">المحقق</TableHead>
                        <TableHead className="text-center font-bold">التقييم الموزون</TableHead>
                        <TableHead className="text-center font-bold">نسبة تحقق المؤشر الرئيسي</TableHead>
                        <TableHead className="text-center font-bold">الوزن النسبي للمؤشر الرئيسي</TableHead>
                        <TableHead className="text-center font-bold">الدرجة المتحققة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {indicatorsData.map((mainIndicator, mainIndex) => (
                        mainIndicator.analyticalIndicators.map((analytical, analyticalIndex) => (
                          <TableRow key={`${mainIndex}-${analyticalIndex}`}>
                            {analyticalIndex === 0 && (
                              <TableCell 
                                rowSpan={mainIndicator.analyticalIndicators.length}
                                className="font-bold bg-muted/30 align-top"
                              >
                                {mainIndicator.name}
                              </TableCell>
                            )}
                            <TableCell>{analytical.name}</TableCell>
                            <TableCell className="text-center">-</TableCell>
                            <TableCell className="text-center">{analytical.weight}%</TableCell>
                            <TableCell className="text-center">{analytical.target}</TableCell>
                            <TableCell className="text-center">{analytical.achieved}</TableCell>
                            <TableCell className="text-center">{analytical.weightedScore}</TableCell>
                            {analyticalIndex === 0 && (
                              <>
                                <TableCell 
                                  rowSpan={mainIndicator.analyticalIndicators.length}
                                  className="text-center align-middle bg-muted/30"
                                >
                                  {mainIndicator.achievementRate}%
                                </TableCell>
                                <TableCell 
                                  rowSpan={mainIndicator.analyticalIndicators.length}
                                  className="text-center align-middle bg-muted/30"
                                >
                                  {mainIndicator.weight}%
                                </TableCell>
                                <TableCell 
                                  rowSpan={mainIndicator.analyticalIndicators.length}
                                  className="text-center align-middle bg-muted/30 font-bold"
                                >
                                  {mainIndicator.achievedScore}
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        ))
                      ))}
                      <TableRow className="bg-muted font-bold">
                        <TableCell colSpan={7} className="text-left">المجموع الكلي</TableCell>
                        <TableCell className="text-center">{overallPercentage}%</TableCell>
                        <TableCell className="text-center">100%</TableCell>
                        <TableCell className="text-center">{totalScore}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>النتيجة النهائية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-right">النسبة</TableHead>
                          <TableHead className="text-right">التقييم</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {evaluationScale.map((scale, index) => (
                          <TableRow key={index}>
                            <TableCell>من {scale.min}% إلى {scale.max}%</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${scale.color}`}>
                                {scale.label}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-center">
                    <Card className="text-center p-6">
                      <p className="text-sm text-muted-foreground mb-2">النتيجة النهائية</p>
                      <p className="text-4xl font-bold mb-2">{overallPercentage}%</p>
                      <span className={`px-4 py-2 rounded-full text-lg ${getEvaluationLabel(overallPercentage).color}`}>
                        {getEvaluationLabel(overallPercentage).label}
                      </span>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account-balances">
            <Card>
              <CardHeader>
                <CardTitle>أرصدة الحسابات</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الحساب</TableHead>
                      <TableHead className="text-right">الرصيد</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountBalancesData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.account}</TableCell>
                        <TableCell>{item.balance.toLocaleString('ar-SA')} ريال</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variables">
            <Card>
              <CardHeader>
                <CardTitle>المتغيرات</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">المتغير</TableHead>
                      <TableHead className="text-right">القيمة</TableHead>
                      <TableHead className="text-right">الوصف</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variablesData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.variable}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell className="text-muted-foreground">{item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InnerPageLayout>
  );
};

export default FinancialPerformanceIndicatorsPage;
