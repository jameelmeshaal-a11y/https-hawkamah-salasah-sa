import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestForm, { RequestField } from "@/components/requests/RequestForm";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const purchaseFields: RequestField[] = [
  {
    name: "statement",
    label: "بيان الطلبة",
    type: "text",
    placeholder: "أدخل بيان طلب الشراء",
    required: true,
  },
  {
    name: "estimatedCost",
    label: "المبلغ المتوقع",
    type: "number",
    placeholder: "التكلفة التقديرية بالريال",
  },
  {
    name: "items",
    label: "العناصر المطلوبة",
    type: "dynamic-list",
    placeholder: "أدخل اسم العنصر",
    itemLabel: "إضافة عنصر",
    required: true,
    colSpan: 2,
  },
];

const PurchaseRequestPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="تقديم طلب شراء"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">تقديم طلب شراء</h2>
        </div>

        <RequestForm 
          title="نموذج طلب الشراء"
          fields={purchaseFields}
          submitLabel="تقديم الطلب"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">الطلبات السابقة</h3>
          <RequestsTable 
            requests={requests}
            emptyMessage="لا توجد طلبات شراء سابقة"
            emptyIcon={ShoppingCart}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default PurchaseRequestPage;
