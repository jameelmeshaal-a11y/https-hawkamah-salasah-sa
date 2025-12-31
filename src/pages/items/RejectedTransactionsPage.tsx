import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
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
      <TransactionsTable
        transactions={[]}
        emptyMessage="لا توجد معاملات مرفوضة"
        emptyIcon={XOctagon}
      />
    </InnerPageLayout>
  );
};

export default RejectedTransactionsPage;
