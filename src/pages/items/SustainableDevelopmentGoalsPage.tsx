import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Link2, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const sdgGoals = [
  { id: 1, name: "القضاء على الفقر", color: "#E5243B", linked: true, alignment: 95 },
  { id: 2, name: "القضاء على الجوع", color: "#DDA63A", linked: true, alignment: 80 },
  { id: 3, name: "الصحة الجيدة والرفاه", color: "#4C9F38", linked: true, alignment: 70 },
  { id: 4, name: "التعليم الجيد", color: "#C5192D", linked: true, alignment: 85 },
  { id: 5, name: "المساواة بين الجنسين", color: "#FF3A21", linked: false, alignment: 0 },
  { id: 6, name: "المياه النظيفة والنظافة", color: "#26BDE2", linked: false, alignment: 0 },
  { id: 7, name: "طاقة نظيفة وبأسعار معقولة", color: "#FCC30B", linked: false, alignment: 0 },
  { id: 8, name: "العمل اللائق ونمو الاقتصاد", color: "#A21942", linked: true, alignment: 60 },
  { id: 9, name: "الصناعة والابتكار والبنية التحتية", color: "#FD6925", linked: false, alignment: 0 },
  { id: 10, name: "الحد من أوجه عدم المساواة", color: "#DD1367", linked: true, alignment: 75 },
  { id: 11, name: "مدن ومجتمعات مستدامة", color: "#FD9D24", linked: true, alignment: 65 },
  { id: 12, name: "الاستهلاك والإنتاج المسؤولان", color: "#BF8B2E", linked: false, alignment: 0 },
  { id: 13, name: "العمل المناخي", color: "#3F7E44", linked: false, alignment: 0 },
  { id: 14, name: "الحياة تحت الماء", color: "#0A97D9", linked: false, alignment: 0 },
  { id: 15, name: "الحياة في البر", color: "#56C02B", linked: false, alignment: 0 },
  { id: 16, name: "السلام والعدل والمؤسسات القوية", color: "#00689D", linked: true, alignment: 70 },
  { id: 17, name: "عقد الشراكات لتحقيق الأهداف", color: "#19486A", linked: true, alignment: 80 },
];

const SustainableDevelopmentGoalsPage = () => {
  const [showData, setShowData] = useState(true);

  const linkedGoals = sdgGoals.filter(g => g.linked);
  const averageAlignment = Math.round(
    linkedGoals.reduce((sum, g) => sum + g.alignment, 0) / linkedGoals.length
  );

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="sustainable-development-goals"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="تناغم أهداف التنمية المستدامة"
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
                  <p>لا يوجد تناغم بين أهداف الجمعية وأهداف التنمية المستدامة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="bg-gradient-to-l from-blue-100 to-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-800">أهداف التنمية المستدامة 2030</h3>
                      <p className="text-blue-600">ربط أهداف الجمعية مع الأهداف الأممية الـ 17</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{linkedGoals.length}</div>
                    <p className="text-sm text-blue-600">أهداف مرتبطة من 17</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary">{linkedGoals.length}</div>
                  <p className="text-sm text-muted-foreground">أهداف مرتبطة</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary">{17 - linkedGoals.length}</div>
                  <p className="text-sm text-muted-foreground">أهداف غير مرتبطة</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary">{averageAlignment}%</div>
                  <p className="text-sm text-muted-foreground">متوسط التناغم</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary">{Math.round((linkedGoals.length / 17) * 100)}%</div>
                  <p className="text-sm text-muted-foreground">نسبة التغطية</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  أهداف التنمية المستدامة الـ 17
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {sdgGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        goal.linked 
                          ? "border-transparent shadow-lg" 
                          : "border-gray-200 opacity-50"
                      }`}
                      style={{ backgroundColor: goal.linked ? `${goal.color}15` : undefined }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mb-2"
                        style={{ backgroundColor: goal.color }}
                      >
                        {goal.id}
                      </div>
                      <h4 className="text-sm font-medium mb-2 line-clamp-2">{goal.name}</h4>
                      {goal.linked && (
                        <div className="space-y-1">
                          <Progress value={goal.alignment} className="h-2" />
                          <p className="text-xs text-muted-foreground">{goal.alignment}% تناغم</p>
                        </div>
                      )}
                      {!goal.linked && (
                        <p className="text-xs text-muted-foreground">غير مرتبط</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default SustainableDevelopmentGoalsPage;
