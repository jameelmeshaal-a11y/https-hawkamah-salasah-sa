import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

const RejectedWithNotePage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="الطلبات المرفوضة مع ملاحظة"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold text-foreground">الطلبات المرفوضة مع ملاحظة</h2>
        </div>

        <p className="text-muted-foreground">
          هذه الطلبات تم رفضها مع إمكانية إعادة التقديم بعد التعديل.
        </p>

        <RequestsTable 
          requests={requests}
          emptyMessage="لا توجد طلبات مرفوضة مع ملاحظات"
          emptyIcon={AlertCircle}
          showActions={true}
        />
      </div>
    </InnerPageLayout>
  );
};

export default RejectedWithNotePage;
