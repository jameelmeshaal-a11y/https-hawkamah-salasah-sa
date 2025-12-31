import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { FileText } from "lucide-react";

const InternalTransactionPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="internal-transaction"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="طلب معاملة داخلية"
    >
      <div className="space-y-6">
        <TransactionForm />
        <TransactionsTable
          transactions={[]}
          showToolbar={false}
          showActions={false}
          emptyMessage="لا توجد بيانات متوفرة في الجدول"
          emptyIcon={FileText}
        />
      </div>
    </InnerPageLayout>
  );
};

export default InternalTransactionPage;
