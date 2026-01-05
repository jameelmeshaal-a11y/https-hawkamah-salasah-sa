import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Link2, CheckCircle, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const vision2030Goals = [
  {
    id: 1,
    vision2030Goal: "مجتمع حيوي",
    pillar: "تعزيز القيم الإسلامية",
    associationGoals: ["نشر ثقافة التكافل", "دعم الأيتام"],
    alignment: 85,
  },
  {
    id: 2,
    vision2030Goal: "مجتمع حيوي",
    pillar: "تمكين المسؤولية الاجتماعية",
    associationGoals: ["التطوع المجتمعي", "الشراكات المجتمعية"],
    alignment: 90,
  },
  {
    id: 3,
    vision2030Goal: "اقتصاد مزدهر",
    pillar: "تنمية القطاع غير الربحي",
    associationGoals: ["الاستدامة المالية", "تنويع مصادر الدخل"],
    alignment: 75,
  },
  {
    id: 4,
    vision2030Goal: "وطن طموح",
    pillar: "تعزيز الحوكمة",
    associationGoals: ["تطبيق معايير الحوكمة", "الشفافية والإفصاح"],
    alignment: 80,
  },
];

const Vision2030AlignmentPage = () => {
  const [showData, setShowData] = useState(true);

  const overallAlignment = Math.round(
    vision2030Goals.reduce((sum, g) => sum + g.alignment, 0) / vision2030Goals.length
  );

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="vision-2030-alignment"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="تناغم أهداف رؤية 2030"
    >
      <div className="space-y-6">
        {/* Demo toggle */}
        <div className="flex items-center gap-2 justify-end">
          <Label htmlFor="show-data" className="text-sm text-muted-foreground">
            عرض البيانات (للعرض التوضيحي)
          </Label>
          <Switch id="show-data" checked={showData} onCheckedChange={setShowData} />
        </div>

        {!showData ? (
          <Card className="border-destructive bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 text-destructive">
                <AlertTriangle className="h-12 w-12" />
                <div>
                  <h3 className="text-lg font-bold">لا يوجد تناغم</h3>
                  <p>لا يوجد تناغم بين أهداف الجمعية وأهداف رؤية 2030</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="bg-gradient-to-l from-green-100 to-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800">رؤية المملكة 2030</h3>
                      <p className="text-green-600">تناغم أهداف الجمعية مع الرؤية الوطنية</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">{overallAlignment}%</div>
                    <p className="text-sm text-green-600">نسبة التناغم الإجمالية</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary">3</div>
                  <p className="text-sm text-muted-foreground">محاور رؤية 2030</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary">4</div>
                  <p className="text-sm text-muted-foreground">ركائز مرتبطة</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary">8</div>
                  <p className="text-sm text-muted-foreground">أهداف متناغمة</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  جدول التناغم مع رؤية 2030
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">محور رؤية 2030</TableHead>
                      <TableHead className="text-right">الركيزة</TableHead>
                      <TableHead className="text-right">أهداف الجمعية المرتبطة</TableHead>
                      <TableHead className="text-right">نسبة التناغم</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vision2030Goals.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.vision2030Goal}</TableCell>
                        <TableCell>{item.pillar}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.associationGoals.map((goal, idx) => (
                              <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                {goal}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={item.alignment} className="w-20 h-2" />
                            <span className="font-bold">{item.alignment}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default Vision2030AlignmentPage;
