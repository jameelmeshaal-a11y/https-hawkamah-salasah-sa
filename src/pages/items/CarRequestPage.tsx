import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestForm, { RequestField } from "@/components/requests/RequestForm";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { Car } from "lucide-react";
import { useState } from "react";

const carFields: RequestField[] = [
  {
    name: "car",
    label: "السيارة",
    type: "select",
    options: [
      { value: "bus-6223", label: "مبكو - باص - 6223" },
      { value: "van-4521", label: "تويوتا - فان - 4521" },
      { value: "sedan-3312", label: "هيونداي - سيدان - 3312" },
      { value: "suv-7789", label: "نيسان - SUV - 7789" },
    ],
    required: true,
  },
  {
    name: "reason",
    label: "السبب",
    type: "text",
    placeholder: "أدخل سبب الطلب",
    required: true,
  },
  {
    name: "deliveryDate",
    label: "تاريخ التسليم",
    type: "date",
    required: true,
  },
  {
    name: "notes",
    label: "ملاحظات",
    type: "textarea",
    placeholder: "أدخل أي ملاحظات إضافية...",
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
