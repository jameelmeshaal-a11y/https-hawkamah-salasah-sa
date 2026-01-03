import { useParams } from "react-router-dom";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

const RestoreSupplierAccountPage = () => {
  const { moduleId } = useParams();

  return (
    <InnerPageLayout moduleId={moduleId || "projects"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <RotateCcw className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">استعادة حساب مورد</h1>
            <p className="text-muted-foreground text-sm">
              استعادة حسابات الموردين المحذوفة
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={RotateCcw}
              message="لا توجد بيانات متوفرة في الجدول"
            />
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default RestoreSupplierAccountPage;
