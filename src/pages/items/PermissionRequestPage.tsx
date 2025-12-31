import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestForm, { RequestField } from "@/components/requests/RequestForm";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { Clock } from "lucide-react";
import { useState } from "react";

const permissionFields: RequestField[] = [
  {
    name: "permissionType",
    label: "نوع الإذن",
    type: "select",
    options: [
      { value: "early_leave", label: "مغادرة مبكرة" },
      { value: "late_arrival", label: "تأخر في الحضور" },
      { value: "personal", label: "إذن شخصي" },
    ],
    required: true,
  },
  {
    name: "title",
    label: "عنوان الطلب",
    type: "text",
    placeholder: "أدخل عنوان الطلب",
    required: true,
  },
  {
    name: "date",
    label: "التاريخ",
    type: "date",
    required: true,
  },
  {
    name: "duration",
    label: "المدة (بالساعات)",
    type: "number",
    placeholder: "مثال: 2",
    required: true,
  },
  {
    name: "details",
    label: "تفاصيل الطلب",
    type: "textarea",
    placeholder: "أدخل سبب الإذن...",
    colSpan: 2,
  },
];

const PermissionRequestPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="تقديم طلب إذن"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">تقديم طلب إذن</h2>
        </div>

        <RequestForm 
          title="نموذج طلب الإذن"
          fields={permissionFields}
          submitLabel="تقديم الطلب"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">الطلبات السابقة</h3>
          <RequestsTable 
            requests={requests}
            emptyMessage="لا توجد طلبات إذن سابقة"
            emptyIcon={Clock}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default PermissionRequestPage;
