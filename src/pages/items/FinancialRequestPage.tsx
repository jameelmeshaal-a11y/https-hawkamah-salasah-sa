import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestForm, { RequestField } from "@/components/requests/RequestForm";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { DollarSign } from "lucide-react";
import { useState } from "react";

const financialFields: RequestField[] = [
  {
    name: "financialType",
    label: "التصنيف المالي",
    type: "select",
    options: [
      { value: "advance", label: "سلفة" },
      { value: "expense", label: "صرف مستحقات" },
      { value: "bonus", label: "مكافأة" },
      { value: "reimbursement", label: "تعويض" },
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
    name: "amount",
    label: "المبلغ",
    type: "number",
    placeholder: "المبلغ بالريال",
    required: true,
  },
  {
    name: "details",
    label: "تفاصيل الطلب",
    type: "textarea",
    placeholder: "أدخل تفاصيل الطلب المالي...",
    colSpan: 2,
  },
];

const FinancialRequestPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="تقديم طلب مالي"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">تقديم طلب مالي</h2>
        </div>

        <RequestForm 
          title="نموذج الطلب المالي"
          fields={financialFields}
          submitLabel="تقديم الطلب"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">الطلبات السابقة</h3>
          <RequestsTable 
            requests={requests}
            emptyMessage="لا توجد طلبات مالية سابقة"
            emptyIcon={DollarSign}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default FinancialRequestPage;
