import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ActivityForm, ActivityRecord } from "@/components/activities/ActivityForm";

const tableData: ActivityRecord[] = [
  {
    id: "1",
    activityOwnerType: "تابع",
    attachments: 1,
    createdAt: "2024/02/05",
    createdBy: "علي الشهري",
    updatedAt: "2024/02/07",
    updatedBy: "سامي أحمد",
  },
  {
    id: "2",
    activityOwnerType: "تابع",
    attachments: 0,
    createdAt: "2024/02/02",
    createdBy: "يوسف خالد",
    updatedAt: "2024/02/04",
    updatedBy: "مازن علي",
  },
];

export default function AddDependentActivityPage() {
  return (
    <InnerPageLayout
      moduleId="evaluation-followup"
      title="إضافة نشاط تابع"
      moduleTitle="التقييم والمتابعة"
      sectionTitle="إدارة متابعة النشاطات"
    >
      <ActivityForm
        activityType="تابع"
        ownerLabel="ملف التابع"
        tableData={tableData}
      />
    </InnerPageLayout>
  );
}
