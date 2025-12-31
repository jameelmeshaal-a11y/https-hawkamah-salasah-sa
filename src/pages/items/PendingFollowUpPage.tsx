import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const PendingFollowUpPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="pending-follow-up"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="معاملات بحاجة للمتابعة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            معاملات بحاجة للمتابعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={[]}
            emptyMessage="لا توجد معاملات بحاجة للمتابعة"
            emptyIcon={Clock}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default PendingFollowUpPage;
