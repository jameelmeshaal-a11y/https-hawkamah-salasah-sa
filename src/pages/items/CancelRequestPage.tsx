import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { XCircle } from "lucide-react";
import { useState } from "react";

const CancelRequestPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  const handleCancel = (id: string) => {
    console.log("Cancel request:", id);
  };

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="إلغاء تقديم طلب"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-destructive" />
          <h2 className="text-xl font-semibold text-foreground">إلغاء تقديم طلب</h2>
        </div>

        <p className="text-muted-foreground">
          يمكنك إلغاء الطلبات التي لم يتم اعتمادها بعد من هذه الصفحة.
        </p>

        <RequestsTable 
          requests={requests}
          emptyMessage="لا توجد طلبات قابلة للإلغاء"
          emptyIcon={XCircle}
          showCancelAction={true}
          showActions={true}
          onCancel={handleCancel}
        />
      </div>
    </InnerPageLayout>
  );
};

export default CancelRequestPage;
