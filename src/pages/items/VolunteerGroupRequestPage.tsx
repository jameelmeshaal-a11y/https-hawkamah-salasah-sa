import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RequestForm, { RequestField } from "@/components/requests/RequestForm";
import RequestsTable, { RequestRecord } from "@/components/requests/RequestsTable";
import { Users } from "lucide-react";
import { useState } from "react";

const volunteerFields: RequestField[] = [
  {
    name: "title",
    label: "عنوان الطلب",
    type: "text",
    placeholder: "أدخل عنوان الطلب",
    required: true,
  },
  {
    name: "classification",
    label: "التصنيف",
    type: "select",
    options: [
      { value: "charity", label: "خيري" },
      { value: "educational", label: "تعليمي" },
      { value: "health", label: "صحي" },
      { value: "social", label: "اجتماعي" },
      { value: "environmental", label: "بيئي" },
    ],
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
    label: "العدد المطلوب",
    type: "number",
    placeholder: "العدد المطلوب من المتطوعين",
    required: true,
  },
  {
    name: "startDate",
    label: "تاريخ البداية",
    type: "date",
    required: true,
  },
  {
    name: "endDate",
    label: "تاريخ الإنتهاء",
    type: "date",
    required: true,
  },
  {
    name: "certificates",
    label: "الشهادات المطلوبة",
    type: "text",
    placeholder: "الشهادات المطلوبة للمتطوعين",
  },
  {
    name: "qualifications",
    label: "المؤهلات المطلوبة",
    type: "text",
    placeholder: "المؤهلات والخبرات المطلوبة",
  },
  {
    name: "details",
    label: "تفاصيل المهمة",
    type: "textarea",
    placeholder: "أدخل تفاصيل المهمة التطوعية...",
    colSpan: 2,
    required: true,
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
