import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

const OngoingTransactionsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="ongoing-transactions"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="سجل المعاملات الجارية"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            سجل المعاملات الجارية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={[]}
            emptyMessage="لا توجد معاملات جارية"
            emptyIcon={RefreshCw}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default OngoingTransactionsPage;
