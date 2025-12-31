import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

const ApprovedRequestsPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="سجل الطلبات المعتمدة"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h2 className="text-xl font-semibold text-foreground">سجل الطلبات المعتمدة</h2>
        </div>

        <RequestsTable 
          requests={requests}
          emptyMessage="لا توجد طلبات معتمدة"
          emptyIcon={CheckCircle}
          showActions={true}
        />
      </div>
    </InnerPageLayout>
  );
};

export default ApprovedRequestsPage;
