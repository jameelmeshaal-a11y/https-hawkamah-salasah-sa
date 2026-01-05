import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const plansData = [
  { id: 1, name: "الخطة الإستراتيجية 2024-2028", startYear: "2024", endYear: "2028", status: "نشطة", progress: 25 },
  { id: 2, name: "الخطة الإستراتيجية 2019-2023", startYear: "2019", endYear: "2023", status: "مكتملة", progress: 100 },
  { id: 3, name: "الخطة الإستراتيجية 2014-2018", startYear: "2014", endYear: "2018", status: "مؤرشفة", progress: 100 },
];

const StrategicPlansManagementPage = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "نشطة": return <Badge className="bg-green-500">نشطة</Badge>;
      case "مكتملة": return <Badge className="bg-blue-500">مكتملة</Badge>;
      case "مؤرشفة": return <Badge variant="secondary">مؤرشفة</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="strategic-plans-management"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="إدارة الخطط الإستراتيجية"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">الخطط الإستراتيجية</h3>
            <p className="text-sm text-muted-foreground">إدارة وعرض جميع الخطط الإستراتيجية للجمعية</p>
          </div>
          <Button className="bg-primary">
            <Plus className="h-4 w-4 ml-2" />
            إضافة خطة جديدة
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              قائمة الخطط الإستراتيجية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم الخطة</TableHead>
                  <TableHead className="text-right">سنة البداية</TableHead>
                  <TableHead className="text-right">سنة النهاية</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">نسبة الإنجاز</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plansData.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.startYear}</TableCell>
                    <TableCell>{plan.endYear}</TableCell>
                    <TableCell>{getStatusBadge(plan.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{plan.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default StrategicPlansManagementPage;
