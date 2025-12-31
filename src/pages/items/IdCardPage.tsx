import InnerPageLayout from "@/components/layout/InnerPageLayout";
import EmployeeCard from "@/components/records/EmployeeCard";
import { IdCard } from "lucide-react";

const sampleEmployee = {
  id: "1",
  name: "أحمد محمد الغامدي",
  arabicName: "أحمد محمد الغامدي",
  employeeNumber: "EMP-2024-0015",
  nationalId: "1098765432",
  email: "ahmed.ghamdi@company.sa",
  phone: "0555123456",
  department: "تقنية المعلومات",
  position: "مطور برمجيات أول",
  jobTitle: "مطور برمجيات أول",
  hireDate: "2022-03-15",
  status: "active" as const,
  manager: "محمد عبدالله السعيد",
};

const IdCardPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="id-card"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="بطاقة التعريف"
    >
      <div className="max-w-md mx-auto">
        <EmployeeCard employee={sampleEmployee} variant="id-card" />
      </div>
    </InnerPageLayout>
  );
};

export default IdCardPage;
