import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileBarChart, Download, Printer, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const reportData = {
  overallScore: 78,
  previousScore: 72,
  categories: [
    { name: "الشفافية والإفصاح", score: 85, previous: 80, weight: 25 },
    { name: "مجلس الإدارة", score: 75, previous: 70, weight: 25 },
    { name: "إدارة المخاطر", score: 70, previous: 65, weight: 20 },
    { name: "الرقابة الداخلية", score: 80, previous: 78, weight: 15 },
    { name: "الالتزام", score: 78, previous: 75, weight: 15 },
  ],
  recommendations: [
    "تحسين آليات الإفصاح عن المعلومات المالية",
    "زيادة عدد اجتماعات مجلس الإدارة",
    "تطوير سجل المخاطر وتحديثه بشكل دوري",
    "تعزيز دور لجنة المراجعة الداخلية",
  ],
};

const GovernanceEvaluationReportPage = () => {
  const getTrend = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="governance-evaluation-report"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الحوكمة"
      title="تقرير تقييم الحوكمة"
    >
      <div className="space-y-6">
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-2" />
            تصدير PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-l from-primary/10 to-transparent">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary">{reportData.overallScore}%</div>
              <p className="text-sm text-muted-foreground mt-1">الدرجة الإجمالية الحالية</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold">{reportData.previousScore}%</div>
              <p className="text-sm text-muted-foreground mt-1">الدرجة السابقة</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-green-600">
                +{reportData.overallScore - reportData.previousScore}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">نسبة التحسن</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="h-5 w-5" />
              تفاصيل التقييم حسب المحاور
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportData.categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category.name}</span>
                    {getTrend(category.score, category.previous)}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">الوزن: {category.weight}%</span>
                    <span className="font-bold">{category.score}%</span>
                  </div>
                </div>
                <Progress value={category.score} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>التوصيات والملاحظات</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {reportData.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GovernanceEvaluationReportPage;
