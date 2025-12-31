import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestForm, { RequestField } from "@/components/requests/RequestForm";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { Users } from "lucide-react";
import { useState } from "react";

const volunteerFields: RequestField[] = [
  {
    name: "groupName",
    label: "اسم المجموعة",
    type: "text",
    placeholder: "أدخل اسم المجموعة التطوعية",
    required: true,
  },
  {
    name: "location",
    label: "المكان",
    type: "text",
    placeholder: "موقع النشاط",
    required: true,
  },
  {
    name: "membersCount",
    label: "عدد الأعضاء",
    type: "number",
    placeholder: "العدد المطلوب",
    required: true,
  },
  {
    name: "date",
    label: "التاريخ",
    type: "date",
    required: true,
  },
  {
    name: "certificates",
    label: "الشهادات المطلوبة",
    type: "select",
    options: [
      { value: "none", label: "لا يوجد" },
      { value: "participation", label: "شهادة مشاركة" },
      { value: "training", label: "شهادة تدريب" },
    ],
  },
  {
    name: "details",
    label: "تفاصيل الطلب",
    type: "textarea",
    placeholder: "أدخل تفاصيل المجموعة التطوعية...",
    colSpan: 2,
  },
];

const VolunteerGroupRequestPage = () => {
  const [requests] = useState<RequestRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="الطلبات الإدارية"
      title="تقديم طلب مجموعة تطوعية"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">تقديم طلب مجموعة تطوعية</h2>
        </div>

        <RequestForm 
          title="نموذج طلب مجموعة تطوعية"
          fields={volunteerFields}
          submitLabel="تقديم الطلب"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">الطلبات السابقة</h3>
          <RequestsTable 
            requests={requests}
            emptyMessage="لا توجد طلبات مجموعات تطوعية سابقة"
            emptyIcon={Users}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default VolunteerGroupRequestPage;
