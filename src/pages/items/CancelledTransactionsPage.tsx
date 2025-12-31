import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
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
      <TransactionsTable
        transactions={[]}
        emptyMessage="لا توجد معاملات ملغاة"
        emptyIcon={Ban}
      />
    </InnerPageLayout>
  );
};

export default CancelledTransactionsPage;
