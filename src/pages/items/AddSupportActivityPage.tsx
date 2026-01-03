import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ActivityForm, ActivityRecord } from "@/components/activities/ActivityForm";

const tableData: ActivityRecord[] = [
  {
    id: "1",
    activityOwnerType: "داعم",
    attachments: 0,
    createdAt: "2024/01/15",
    createdBy: "أحمد محمد",
    updatedAt: "2024/01/16",
    updatedBy: "محمد علي",
  },
  {
    id: "2",
    activityOwnerType: "داعم",
    attachments: 2,
    createdAt: "2024/01/10",
    createdBy: "سعد الرحمن",
    updatedAt: "2024/01/12",
    updatedBy: "خالد أحمد",
  },
];

export default function AddSupportActivityPage() {
  return (
    <InnerPageLayout
      moduleId="evaluation-followup"
      title="إضافة نشاط داعم"
      moduleTitle="التقييم والمتابعة"
      sectionTitle="إدارة متابعة النشاطات"
    >
      <ActivityForm
        activityType="داعم"
        ownerLabel="ملف الداعم"
        tableData={tableData}
      />
    </InnerPageLayout>
  );
}
