import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestForm, { RequestField } from "@/components/requests/RequestForm";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { Calendar } from "lucide-react";
import { useState } from "react";

const leaveFields: RequestField[] = [
  {
    name: "leaveType",
    label: "نوع الإجازة",
    type: "select",
    options: [
      { value: "annual", label: "إجازة سنوية" },
      { value: "sick", label: "إجازة مرضية" },
      { value: "emergency", label: "إجازة طارئة" },
      { value: "unpaid", label: "إجازة بدون راتب" },
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
    name: "startDate",
    label: "من تاريخ",
    type: "date",
    required: true,
  },
  {
    name: "endDate",
    label: "إلى تاريخ",
    type: "date",
    required: true,
  },
  {
    name: "details",
    label: "تفاصيل الطلب",
    type: "textarea",
    placeholder: "أدخل تفاصيل الطلب...",
    colSpan: 2,
  },
];

const LeaveRequestPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="تقديم طلب إجازة"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">تقديم طلب إجازة</h2>
        </div>

        <RequestForm 
          title="نموذج طلب الإجازة"
          fields={leaveFields}
          submitLabel="تقديم الطلب"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">الطلبات السابقة</h3>
          <RequestsTable 
            requests={requests}
            emptyMessage="لا توجد طلبات إجازة سابقة"
            emptyIcon={Calendar}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default LeaveRequestPage;
