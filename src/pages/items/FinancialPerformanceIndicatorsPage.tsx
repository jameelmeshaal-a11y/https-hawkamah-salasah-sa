import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, RefreshCw, Download, TrendingUp, TrendingDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const indicatorsData = [
  { name: "نسبة السيولة", formula: "الأصول المتداولة / الخصوم المتداولة", value: 1.85, target: 2.0, unit: "مرة", status: "warning" },
  { name: "نسبة الاستدامة المالية", formula: "الإيرادات المتكررة / المصروفات", value: 92, target: 100, unit: "%", status: "warning" },
  { name: "نسبة كفاءة جمع التبرعات", formula: "صافي التبرعات / تكلفة جمع التبرعات", value: 85, target: 80, unit: "%", status: "success" },
  { name: "نسبة المصروفات الإدارية", formula: "المصروفات الإدارية / إجمالي المصروفات", value: 12, target: 15, unit: "%", status: "success" },
  { name: "نسبة تغطية الالتزامات", formula: "الأصول / الالتزامات", value: 3.2, target: 3.0, unit: "مرة", status: "success" },
  { name: "معدل نمو الإيرادات", formula: "(الإيرادات الحالية - السابقة) / السابقة", value: 15, target: 10, unit: "%", status: "success" },
];

const FinancialPerformanceIndicatorsPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-600 bg-green-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "danger": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getProgressColor = (value: number, target: number, isLowerBetter = false) => {
    const ratio = value / target;
    if (isLowerBetter) {
      if (ratio <= 1) return "bg-green-500";
      if (ratio <= 1.2) return "bg-yellow-500";
      return "bg-red-500";
    }
    if (ratio >= 1) return "bg-green-500";
    if (ratio >= 0.8) return "bg-yellow-500";
    return "bg-red-500";
  };

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
            <h3 className="text-lg font-semibold">مؤشرات الأداء المالي</h3>
            <p className="text-sm text-muted-foreground">آخر تحديث: 1446/06/15</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث البيانات
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600">4</div>
              <p className="text-sm">مؤشرات محققة</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">2</div>
              <p className="text-sm">مؤشرات تحتاج تحسين</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">6</div>
              <p className="text-sm">إجمالي المؤشرات</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              جدول المؤشرات المالية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المؤشر</TableHead>
                  <TableHead className="text-right">المعادلة</TableHead>
                  <TableHead className="text-right">القيمة</TableHead>
                  <TableHead className="text-right">المستهدف</TableHead>
                  <TableHead className="text-right">الأداء</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indicatorsData.map((indicator, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{indicator.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{indicator.formula}</TableCell>
                    <TableCell className="font-bold">{indicator.value} {indicator.unit}</TableCell>
                    <TableCell>{indicator.target} {indicator.unit}</TableCell>
                    <TableCell className="w-32">
                      <Progress 
                        value={Math.min((indicator.value / indicator.target) * 100, 100)} 
                        className="h-2"
                      />
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${getStatusColor(indicator.status)}`}>
                        {indicator.status === "success" ? (
                          <><TrendingUp className="h-3 w-3" /> محقق</>
                        ) : (
                          <><TrendingDown className="h-3 w-3" /> يحتاج تحسين</>
                        )}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default FinancialPerformanceIndicatorsPage;
