import InnerPageLayout from "@/components/layout/InnerPageLayout";
import StrategicPlanTable from "@/components/strategic/StrategicPlanTable";

const plansData = [
  {
    id: 1,
    title: "الخطة الإستراتيجية 2024-2028",
    periodMonths: 60,
    startDateHijri: "1445/07/01",
    startDateGregorian: "2024/01/13",
    endDateHijri: "1450/06/30",
    endDateGregorian: "2028/01/12",
  },
  {
    id: 2,
    title: "الخطة الإستراتيجية 2019-2023",
    periodMonths: 60,
    startDateHijri: "1440/05/01",
    startDateGregorian: "2019/01/07",
    endDateHijri: "1445/04/30",
    endDateGregorian: "2023/12/13",
  },
];

const OwnedIndicatorsManagementPage = () => {
  const handleActionClick = (id: number) => {
    console.log("Manage owned indicators for plan:", id);
  };

  const handleEditClick = (id: number) => {
    console.log("Edit plan:", id);
  };

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="owned-indicators-management"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="إدارة المؤشرات المملوكة"
    >
      <div className="space-y-6">
        <StrategicPlanTable
          data={plansData}
          actionLabel="إدارة تحقق المؤشرات"
          onActionClick={handleActionClick}
          onEditClick={handleEditClick}
        />
      </div>
    </InnerPageLayout>
  );
};

export default OwnedIndicatorsManagementPage;
