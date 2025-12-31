import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestForm, { RequestField } from "@/components/requests/RequestForm";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { FileText } from "lucide-react";
import { useState } from "react";

const generalFields: RequestField[] = [
  {
    name: "requestType",
    label: "تصنيف الطلب",
    type: "select",
    options: [
      { value: "certificate", label: "شهادة" },
      { value: "letter", label: "خطاب" },
      { value: "equipment", label: "تجهيزات" },
      { value: "other", label: "أخرى" },
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
    name: "details",
    label: "تفاصيل الطلب",
    type: "textarea",
    placeholder: "أدخل تفاصيل الطلب...",
    colSpan: 2,
  },
];

const GeneralRequestPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="تقديم طلب عام"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">تقديم طلب عام</h2>
        </div>

        <RequestForm 
          title="نموذج الطلب العام"
          fields={generalFields}
          submitLabel="تقديم الطلب"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">الطلبات السابقة</h3>
          <RequestsTable 
            requests={requests}
            emptyMessage="لا توجد طلبات عامة سابقة"
            emptyIcon={FileText}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default GeneralRequestPage;
