import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
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
      <TransactionsTable
        transactions={[]}
        emptyMessage="لا توجد معاملات مؤرشفة"
        emptyIcon={Archive}
      />
    </InnerPageLayout>
  );
};

export default ArchivedTransactionsPage;
