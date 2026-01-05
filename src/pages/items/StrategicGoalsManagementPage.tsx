import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Plus, ChevronDown, ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const goalsData = [
  {
    id: 1,
    perspective: "المنظور المالي",
    goals: [
      { id: 1, name: "تحقيق الاستدامة المالية", progress: 75, indicators: 3 },
      { id: 2, name: "تنويع مصادر الدخل", progress: 60, indicators: 4 },
      { id: 3, name: "ضبط المصروفات التشغيلية", progress: 85, indicators: 2 },
    ],
  },
  {
    id: 2,
    perspective: "منظور المستفيدين",
    goals: [
      { id: 4, name: "زيادة رضا المستفيدين", progress: 70, indicators: 5 },
      { id: 5, name: "توسيع قاعدة المستفيدين", progress: 55, indicators: 3 },
      { id: 6, name: "تحسين جودة الخدمات", progress: 80, indicators: 4 },
    ],
  },
  {
    id: 3,
    perspective: "منظور العمليات الداخلية",
    goals: [
      { id: 7, name: "أتمتة العمليات", progress: 45, indicators: 6 },
      { id: 8, name: "تطوير البنية التحتية", progress: 65, indicators: 4 },
    ],
  },
  {
    id: 4,
    perspective: "منظور التعلم والنمو",
    goals: [
      { id: 9, name: "تطوير الكوادر البشرية", progress: 70, indicators: 5 },
      { id: 10, name: "بناء ثقافة التميز", progress: 50, indicators: 3 },
    ],
  },
];

const StrategicGoalsManagementPage = () => {
  const [openPerspectives, setOpenPerspectives] = useState<number[]>([1]);

  const togglePerspective = (id: number) => {
    setOpenPerspectives(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="strategic-goals-management"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="إدارة الأهداف الإستراتيجية"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">الأهداف الإستراتيجية</h3>
            <p className="text-sm text-muted-foreground">إدارة ومتابعة الأهداف حسب المناظير</p>
          </div>
          <Button className="bg-primary">
            <Plus className="h-4 w-4 ml-2" />
            إضافة هدف جديد
          </Button>
        </div>

        <div className="space-y-4">
          {goalsData.map((perspective) => (
            <Card key={perspective.id}>
              <Collapsible
                open={openPerspectives.includes(perspective.id)}
                onOpenChange={() => togglePerspective(perspective.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {perspective.perspective}
                        <span className="text-sm font-normal text-muted-foreground">
                          ({perspective.goals.length} أهداف)
                        </span>
                      </div>
                      {openPerspectives.includes(perspective.id) ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronLeft className="h-5 w-5" />
                      )}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    {perspective.goals.map((goal) => (
                      <div
                        key={goal.id}
                        className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{goal.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {goal.indicators} مؤشرات مرتبطة
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            عرض التفاصيل
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={goal.progress} className="flex-1 h-3" />
                          <span className="text-sm font-medium w-12">{goal.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default StrategicGoalsManagementPage;
