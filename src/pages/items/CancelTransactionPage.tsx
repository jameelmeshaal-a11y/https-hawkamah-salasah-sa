import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

const CancelTransactionPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="cancel-transaction"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="إلغاء طلب معاملة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            المعاملات القابلة للإلغاء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={[]}
            emptyMessage="لا توجد معاملات قابلة للإلغاء"
            emptyIcon={XCircle}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default CancelTransactionPage;
