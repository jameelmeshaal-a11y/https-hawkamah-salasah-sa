import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

const strategicPlans = [
  { value: "plan-2024-2028", label: "الخطة الإستراتيجية 2024-2028" },
  { value: "plan-2019-2023", label: "الخطة الإستراتيجية 2019-2023" },
  { value: "plan-2014-2018", label: "الخطة الإستراتيجية 2014-2018" },
];

const AutomatedVerificationValuesPage = () => {
  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="automated-verification-values"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="تحديث قيم التحقق المؤتمتة"
    >
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              تحديث قيم التحقق المؤتمتة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>الخطة الإستراتيجية</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الخطة الإستراتيجية..." />
                </SelectTrigger>
                <SelectContent>
                  {strategicPlans.map((plan) => (
                    <SelectItem key={plan.value} value={plan.value}>
                      {plan.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث قيم الخطة
            </Button>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default AutomatedVerificationValuesPage;
