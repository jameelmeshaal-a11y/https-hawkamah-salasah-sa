import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const CompletedTransactionsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="completed-transactions"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="سجل المعاملات المكتملة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            سجل المعاملات المكتملة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={[]}
            emptyMessage="لا توجد معاملات مكتملة"
            emptyIcon={CheckCircle2}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default CompletedTransactionsPage;
