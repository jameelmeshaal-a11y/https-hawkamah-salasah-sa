import { useParams } from "react-router-dom";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import RehabilitationFilterCard from "@/components/rehabilitation/RehabilitationFilterCard";
import EmptyState from "@/components/shared/EmptyState";

const LatePayersPage = () => {
  const { moduleId } = useParams();

  return (
    <InnerPageLayout moduleId={moduleId || "projects"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">المتأخرين عن السداد</h1>
            <p className="text-muted-foreground text-sm">
              متابعة المستفيدين المتأخرين عن سداد أقساط المشاريع
            </p>
          </div>
        </div>

        {/* Filter Card */}
        <RehabilitationFilterCard 
          actionLabel="إدارة" 
          actionVariant="success"
        />

        {/* Results */}
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={AlertCircle}
              message="لا توجد بيانات - الرجاء اختيار الفئة والضغط على زر إدارة"
            />
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default LatePayersPage;
