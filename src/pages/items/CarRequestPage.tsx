import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestForm, { RequestField } from "@/components/requests/RequestForm";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { Car } from "lucide-react";
import { useState } from "react";

const carFields: RequestField[] = [
  {
    name: "purpose",
    label: "الغرض من الطلب",
    type: "text",
    placeholder: "أدخل الغرض من توفير السيارة",
    required: true,
  },
  {
    name: "destination",
    label: "الوجهة",
    type: "text",
    placeholder: "المكان المطلوب الذهاب إليه",
    required: true,
  },
  {
    name: "date",
    label: "التاريخ",
    type: "date",
    required: true,
  },
  {
    name: "passengers",
    label: "عدد الركاب",
    type: "number",
    placeholder: "عدد الأشخاص",
    required: true,
  },
  {
    name: "details",
    label: "تفاصيل إضافية",
    type: "textarea",
    placeholder: "أدخل أي تفاصيل إضافية...",
    colSpan: 2,
  },
];

const CarRequestPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="طلب توفير سيارة"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">طلب توفير سيارة</h2>
        </div>

        <RequestForm 
          title="نموذج طلب توفير سيارة"
          fields={carFields}
          submitLabel="تقديم الطلب"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">الطلبات السابقة</h3>
          <RequestsTable 
            requests={requests}
            emptyMessage="لا توجد طلبات سيارات سابقة"
            emptyIcon={Car}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default CarRequestPage;
