import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const FollowedTransactionsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="followed-transactions"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="المعاملات الداخلية"
      title="معاملات قمت بمتابعتها"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            معاملات قمت بمتابعتها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable
            transactions={[]}
            emptyMessage="لا توجد معاملات قمت بمتابعتها"
            emptyIcon={CheckCircle}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default FollowedTransactionsPage;
