import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban } from "lucide-react";

const CancelledTransactionsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="cancelled-transactions"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="سجل المعاملات الملغاة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ban className="h-5 w-5" />
            سجل المعاملات الملغاة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={[]}
            emptyMessage="لا توجد معاملات ملغاة"
            emptyIcon={Ban}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default CancelledTransactionsPage;
