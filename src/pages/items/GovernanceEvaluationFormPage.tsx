import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, Save, Calculator } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const evaluationCriteria = [
  { id: 1, category: "الشفافية والإفصاح", criteria: [
    "وجود سياسة إفصاح معتمدة",
    "نشر التقارير المالية السنوية",
    "الإفصاح عن معلومات مجلس الإدارة",
  ]},
  { id: 2, category: "مجلس الإدارة", criteria: [
    "وجود لائحة عمل مجلس الإدارة",
    "عقد اجتماعات دورية للمجلس",
    "توثيق محاضر الاجتماعات",
  ]},
  { id: 3, category: "إدارة المخاطر", criteria: [
    "وجود سياسة إدارة المخاطر",
    "تحديد المخاطر الرئيسية",
    "وضع خطط للتعامل مع المخاطر",
  ]},
];

const GovernanceEvaluationFormPage = () => {
  const totalScore = 75; // Example calculated score

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="governance-evaluation-form"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الحوكمة"
      title="نموذج تقييم الحوكمة"
    >
      <div className="space-y-6">
        <Card className="bg-gradient-to-l from-primary/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">الدرجة الإجمالية للتقييم</h3>
                <p className="text-sm text-muted-foreground">بناءً على معايير الحوكمة المعتمدة</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{totalScore}%</div>
                <Progress value={totalScore} className="w-32 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {evaluationCriteria.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.criteria.map((criterion, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <Label className="text-base mb-3 block">{criterion}</Label>
                  <RadioGroup defaultValue="3" className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center gap-1">
                        <RadioGroupItem value={String(value)} id={`${section.id}-${index}-${value}`} />
                        <Label htmlFor={`${section.id}-${index}-${value}`} className="text-sm cursor-pointer">
                          {value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>غير مطبق</span>
                    <span>مطبق بالكامل</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-2 sticky bottom-4">
          <Button className="bg-primary flex-1">
            <Calculator className="h-4 w-4 ml-2" />
            حساب الدرجة الإجمالية
          </Button>
          <Button variant="outline" className="flex-1">
            <Save className="h-4 w-4 ml-2" />
            حفظ التقييم
          </Button>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default GovernanceEvaluationFormPage;
