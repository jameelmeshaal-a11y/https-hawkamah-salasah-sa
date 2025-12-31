import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { MessageSquareX } from "lucide-react";

const RejectedFollowUpsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="rejected-follow-ups"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="متابعات مرفوضة مع ملاحظة"
    >
      <TransactionsTable
        transactions={[]}
        emptyMessage="لا توجد متابعات مرفوضة"
        emptyIcon={MessageSquareX}
      />
    </InnerPageLayout>
  );
};

export default RejectedFollowUpsPage;
