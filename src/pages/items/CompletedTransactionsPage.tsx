import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
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
      <TransactionsTable
        transactions={[]}
        emptyMessage="لا توجد معاملات مكتملة"
        emptyIcon={CheckCircle2}
      />
    </InnerPageLayout>
  );
};

export default CompletedTransactionsPage;
