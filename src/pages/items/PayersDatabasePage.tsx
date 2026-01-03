import { useParams } from "react-router-dom";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import RehabilitationFilterCard from "@/components/rehabilitation/RehabilitationFilterCard";
import EmptyState from "@/components/shared/EmptyState";

const PayersDatabasePage = () => {
  const { moduleId } = useParams();

  return (
    <InnerPageLayout moduleId={moduleId || "projects"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">قاعدة بيانات المسددين</h1>
            <p className="text-muted-foreground text-sm">
              إدارة بيانات المستفيدين المسددين لأقساط المشاريع
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
              icon={CreditCard}
              message="لا توجد بيانات - الرجاء اختيار الفئة والضغط على زر إدارة"
            />
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default PayersDatabasePage;
