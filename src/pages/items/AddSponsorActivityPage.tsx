import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ActivityForm, ActivityRecord } from "@/components/activities/ActivityForm";

const tableData: ActivityRecord[] = [
  {
    id: "1",
    activityOwnerType: "كافل",
    attachments: 0,
    createdAt: "2024/01/20",
    createdBy: "فهد العتيبي",
    updatedAt: "2024/01/22",
    updatedBy: "سلطان محمد",
  },
  {
    id: "2",
    activityOwnerType: "كافل",
    attachments: 3,
    createdAt: "2024/01/18",
    createdBy: "ناصر الدوسري",
    updatedAt: "2024/01/19",
    updatedBy: "عبدالرحمن علي",
  },
];

export default function AddSponsorActivityPage() {
  return (
    <InnerPageLayout
      moduleId="evaluation-followup"
      title="إضافة نشاط كافل"
      moduleTitle="التقييم والمتابعة"
      sectionTitle="إدارة متابعة النشاطات"
    >
      <ActivityForm
        activityType="كافل"
        ownerLabel="ملف الكافل"
        tableData={tableData}
      />
    </InnerPageLayout>
  );
}
