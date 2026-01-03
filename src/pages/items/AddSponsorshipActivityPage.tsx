import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ActivityForm, ActivityRecord } from "@/components/activities/ActivityForm";

const tableData: ActivityRecord[] = [
  {
    id: "1",
    activityOwnerType: "كفالة",
    attachments: 1,
    createdAt: "2024/02/01",
    createdBy: "عبدالله سعيد",
    updatedAt: "2024/02/03",
    updatedBy: "محمد أحمد",
  },
];

export default function AddSponsorshipActivityPage() {
  return (
    <InnerPageLayout
      moduleId="evaluation-followup"
      title="إضافة نشاط كفالة"
      moduleTitle="التقييم والمتابعة"
      sectionTitle="إدارة متابعة النشاطات"
    >
      <ActivityForm
        activityType="كفالة"
        ownerLabel="ملف الكفالة"
        tableData={tableData}
      />
    </InnerPageLayout>
  );
}
