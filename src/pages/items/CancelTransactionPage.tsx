import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
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
      <TransactionsTable
        transactions={[]}
        showCancelAction={true}
        emptyMessage="لا توجد معاملات قابلة للإلغاء"
        emptyIcon={XCircle}
      />
    </InnerPageLayout>
  );
};

export default CancelTransactionPage;
