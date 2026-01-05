import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Plus, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const indicatorsData = [
  { id: 1, name: "نسبة رضا المستفيدين", target: 90, actual: 85, unit: "%", status: "on-track", goal: "زيادة رضا المستفيدين" },
  { id: 2, name: "عدد المستفيدين الجدد", target: 500, actual: 380, unit: "مستفيد", status: "behind", goal: "توسيع قاعدة المستفيدين" },
  { id: 3, name: "نسبة الالتزام بالميزانية", target: 95, actual: 98, unit: "%", status: "achieved", goal: "ضبط المصروفات" },
  { id: 4, name: "عدد البرامج المنفذة", target: 20, actual: 15, unit: "برنامج", status: "on-track", goal: "تحسين جودة الخدمات" },
  { id: 5, name: "نسبة أتمتة العمليات", target: 80, actual: 45, unit: "%", status: "behind", goal: "أتمتة العمليات" },
  { id: 6, name: "عدد الدورات التدريبية", target: 30, actual: 28, unit: "دورة", status: "on-track", goal: "تطوير الكوادر" },
];

const MainIndicatorsManagementPage = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "achieved":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 ml-1" />محقق</Badge>;
      case "on-track":
        return <Badge className="bg-blue-500"><Clock className="h-3 w-3 ml-1" />على المسار</Badge>;
      case "behind":
        return <Badge className="bg-red-500"><AlertTriangle className="h-3 w-3 ml-1" />متأخر</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getProgressColor = (actual: number, target: number) => {
    const ratio = actual / target;
    if (ratio >= 1) return "bg-green-500";
    if (ratio >= 0.7) return "bg-blue-500";
    return "bg-red-500";
  };

  const achievedCount = indicatorsData.filter(i => i.status === "achieved").length;
  const onTrackCount = indicatorsData.filter(i => i.status === "on-track").length;
  const behindCount = indicatorsData.filter(i => i.status === "behind").length;

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="main-indicators-management"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="إدارة المؤشرات الرئيسية"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">المؤشرات الرئيسية</h3>
            <p className="text-sm text-muted-foreground">متابعة مؤشرات الأداء الرئيسية للخطة الإستراتيجية</p>
          </div>
          <Button className="bg-primary">
            <Plus className="h-4 w-4 ml-2" />
            إضافة مؤشر جديد
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-50">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="h-10 w-10 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{achievedCount}</div>
                <p className="text-sm">مؤشرات محققة</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="h-10 w-10 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{onTrackCount}</div>
                <p className="text-sm">على المسار</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className="h-10 w-10 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{behindCount}</div>
                <p className="text-sm">تحتاج متابعة</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              جدول المؤشرات الرئيسية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المؤشر</TableHead>
                  <TableHead className="text-right">الهدف المرتبط</TableHead>
                  <TableHead className="text-right">المستهدف</TableHead>
                  <TableHead className="text-right">الفعلي</TableHead>
                  <TableHead className="text-right">التقدم</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indicatorsData.map((indicator) => (
                  <TableRow key={indicator.id}>
                    <TableCell className="font-medium">{indicator.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{indicator.goal}</TableCell>
                    <TableCell>{indicator.target} {indicator.unit}</TableCell>
                    <TableCell className="font-bold">{indicator.actual} {indicator.unit}</TableCell>
                    <TableCell className="w-32">
                      <Progress
                        value={Math.min((indicator.actual / indicator.target) * 100, 100)}
                        className="h-2"
                      />
                    </TableCell>
                    <TableCell>{getStatusBadge(indicator.status)}</TableCell>
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

export default MainIndicatorsManagementPage;
