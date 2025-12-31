import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareX } from "lucide-react";

const RejectedFollowUpsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="rejected-follow-ups"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="متابعات مرفوضة مع ملاحظة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareX className="h-5 w-5" />
            متابعات مرفوضة مع ملاحظة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={[]}
            emptyMessage="لا توجد متابعات مرفوضة"
            emptyIcon={MessageSquareX}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default RejectedFollowUpsPage;
