import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Edit, DollarSign, Users, Settings2, BookOpen } from "lucide-react";

const perspectives = [
  {
    id: 1,
    name: "المنظور المالي",
    description: "تحقيق الاستدامة المالية وتنويع مصادر الدخل",
    icon: DollarSign,
    color: "bg-green-500",
    goals: 3,
    indicators: 8,
  },
  {
    id: 2,
    name: "منظور المستفيدين",
    description: "تقديم خدمات متميزة تلبي احتياجات المستفيدين",
    icon: Users,
    color: "bg-blue-500",
    goals: 4,
    indicators: 12,
  },
  {
    id: 3,
    name: "منظور العمليات الداخلية",
    description: "تطوير العمليات والإجراءات لتحقيق الكفاءة",
    icon: Settings2,
    color: "bg-purple-500",
    goals: 5,
    indicators: 15,
  },
  {
    id: 4,
    name: "منظور التعلم والنمو",
    description: "بناء القدرات وتطوير الكوادر البشرية",
    icon: BookOpen,
    color: "bg-orange-500",
    goals: 3,
    indicators: 10,
  },
];

const PlanPerspectivesPage = () => {
  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="plan-perspectives"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="إدارة مناظير الخطة"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">مناظير الخطة الإستراتيجية</h3>
            <p className="text-sm text-muted-foreground">بطاقة الأداء المتوازن (BSC)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {perspectives.map((perspective) => (
            <Card key={perspective.id} className="overflow-hidden">
              <div className={`h-2 ${perspective.color}`} />
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${perspective.color} text-white`}>
                      <perspective.icon className="h-5 w-5" />
                    </div>
                    <span>{perspective.name}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{perspective.description}</p>
                <div className="flex gap-4">
                  <div className="flex-1 bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{perspective.goals}</div>
                    <div className="text-sm text-muted-foreground">أهداف</div>
                  </div>
                  <div className="flex-1 bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{perspective.indicators}</div>
                    <div className="text-sm text-muted-foreground">مؤشرات</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              ملخص المناظير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">15</div>
                <div className="text-sm">إجمالي الأهداف</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">45</div>
                <div className="text-sm">إجمالي المؤشرات</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">4</div>
                <div className="text-sm">عدد المناظير</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">68%</div>
                <div className="text-sm">نسبة الإنجاز</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default PlanPerspectivesPage;
