import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { CheckSquare } from "lucide-react";
import { useState } from "react";

const CompletedRequestsPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="سجل الطلبات المكتملة"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-foreground">سجل الطلبات المكتملة</h2>
        </div>

        <RequestsTable 
          requests={requests}
          emptyMessage="لا توجد طلبات مكتملة"
          emptyIcon={CheckSquare}
          showActions={false}
        />
      </div>
    </InnerPageLayout>
  );
};

export default CompletedRequestsPage;
