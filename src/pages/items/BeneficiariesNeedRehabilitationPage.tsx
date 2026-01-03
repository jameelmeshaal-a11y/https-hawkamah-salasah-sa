import { useParams } from "react-router-dom";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import RehabilitationFilterCard from "@/components/rehabilitation/RehabilitationFilterCard";
import EmptyState from "@/components/shared/EmptyState";

const BeneficiariesNeedRehabilitationPage = () => {
  const { moduleId } = useParams();

  return (
    <InnerPageLayout moduleId={moduleId || "projects"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">مستفيدين بحاجة للتأهيل</h1>
            <p className="text-muted-foreground text-sm">
              عرض المستفيدين الذين يحتاجون إلى برامج تأهيلية
            </p>
          </div>
        </div>

        {/* Filter Card */}
        <RehabilitationFilterCard 
          actionLabel="عرض" 
          actionVariant="success"
        />

        {/* Results */}
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={Users}
              message="لا توجد نتائج - الرجاء اختيار الفئة والضغط على زر عرض"
            />
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default BeneficiariesNeedRehabilitationPage;
