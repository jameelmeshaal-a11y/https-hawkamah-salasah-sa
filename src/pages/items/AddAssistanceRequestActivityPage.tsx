import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ActivityForm, ActivityRecord } from "@/components/activities/ActivityForm";

const tableData: ActivityRecord[] = [];

export default function AddAssistanceRequestActivityPage() {
  return (
    <InnerPageLayout
      moduleId="evaluation-followup"
      title="إضافة نشاط طلب إعانة"
      moduleTitle="التقييم والمتابعة"
      sectionTitle="إدارة متابعة النشاطات"
    >
      <ActivityForm
        activityType="طلب إعانة"
        ownerLabel="ملف المستفيد"
        showSecondDropdown={true}
        secondDropdownLabel="طلب الإعانة"
        tableData={tableData}
      />
    </InnerPageLayout>
  );
}
