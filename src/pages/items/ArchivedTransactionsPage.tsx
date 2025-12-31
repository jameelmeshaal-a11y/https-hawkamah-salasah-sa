import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive } from "lucide-react";

const ArchivedTransactionsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="archived-transactions"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="المعاملات المؤرشفة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            المعاملات المؤرشفة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={[]}
            emptyMessage="لا توجد معاملات مؤرشفة"
            emptyIcon={Archive}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default ArchivedTransactionsPage;
