import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { XCircle } from "lucide-react";
import { useState } from "react";

const RejectedRequestsPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="سجل الطلبات المرفوضة نهائياً"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-destructive" />
          <h2 className="text-xl font-semibold text-foreground">سجل الطلبات المرفوضة نهائياً</h2>
        </div>

        <RequestsTable 
          requests={requests}
          emptyMessage="لا توجد طلبات مرفوضة نهائياً"
          emptyIcon={XCircle}
          showActions={false}
        />
      </div>
    </InnerPageLayout>
  );
};

export default RejectedRequestsPage;
