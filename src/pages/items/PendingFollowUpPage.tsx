import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Clock } from "lucide-react";

const PendingFollowUpPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="pending-follow-up"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="معاملات بحاجة للمتابعة"
    >
      <TransactionsTable
        transactions={[]}
        emptyMessage="لا توجد معاملات بحاجة للمتابعة"
        emptyIcon={Clock}
      />
    </InnerPageLayout>
  );
};

export default PendingFollowUpPage;
