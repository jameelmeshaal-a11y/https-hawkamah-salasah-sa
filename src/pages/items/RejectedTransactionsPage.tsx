import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XOctagon } from "lucide-react";

const RejectedTransactionsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="rejected-transactions"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="سجل المعاملات المرفوضة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XOctagon className="h-5 w-5" />
            سجل المعاملات المرفوضة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={[]}
            emptyMessage="لا توجد معاملات مرفوضة"
            emptyIcon={XOctagon}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default RejectedTransactionsPage;
