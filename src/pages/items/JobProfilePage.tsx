import InnerPageLayout from "@/components/layout/InnerPageLayout";
import EmployeeCard from "@/components/records/EmployeeCard";
import { User } from "lucide-react";

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

const JobProfilePage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="job-profile"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="الملف الوظيفي"
    >
      <EmployeeCard employee={sampleEmployee} variant="full" />
    </InnerPageLayout>
  );
};

export default JobProfilePage;
