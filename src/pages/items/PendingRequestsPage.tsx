import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { Clock } from "lucide-react";
import { useState } from "react";

const PendingRequestsPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="سجل الطلبات قيد الاعتماد"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-600" />
          <h2 className="text-xl font-semibold text-foreground">سجل الطلبات قيد الاعتماد</h2>
        </div>

        <RequestsTable 
          requests={requests}
          emptyMessage="لا توجد طلبات قيد الاعتماد"
          emptyIcon={Clock}
          showActions={true}
          showCancelAction={false}
        />
      </div>
    </InnerPageLayout>
  );
};

export default PendingRequestsPage;
