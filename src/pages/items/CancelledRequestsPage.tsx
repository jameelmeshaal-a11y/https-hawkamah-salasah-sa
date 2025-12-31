import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { Ban } from "lucide-react";
import { useState } from "react";

const CancelledRequestsPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="سجل الطلبات الملغاة"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Ban className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">سجل الطلبات الملغاة</h2>
        </div>

        <RequestsTable 
          requests={requests}
          emptyMessage="لا توجد طلبات ملغاة"
          emptyIcon={Ban}
          showActions={false}
        />
      </div>
    </InnerPageLayout>
  );
};

export default CancelledRequestsPage;
