import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

const StrategicPlanMapPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="strategic-plan-map"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="خارطة مهام الخطة الإستراتيجية"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            خارطة مهام الخطة الإستراتيجية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState 
            message="لا توجد خارطة مهام متوفرة" 
            icon={Map} 
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default StrategicPlanMapPage;
