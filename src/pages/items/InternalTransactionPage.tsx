import InnerPageLayout from "@/components/layout/InnerPageLayout";
import TransactionForm from "@/components/transactions/TransactionForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            نموذج طلب معاملة داخلية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default InternalTransactionPage;
