import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
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
      <TransactionsTable
        transactions={[]}
        emptyMessage="لا توجد معاملات جارية"
        emptyIcon={RefreshCw}
      />
    </InnerPageLayout>
  );
};

export default OngoingTransactionsPage;
