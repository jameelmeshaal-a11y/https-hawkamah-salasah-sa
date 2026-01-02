import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { Users, Briefcase, Building, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  nationalId: string;
  department: string;
  jobTitle: string;
  jobGrade: string;
  hireDate: string;
  phone: string;
  email: string;
  status: string;
  contractType: string;
}

const EmployeesListPage = () => {
  const [records] = useState<Employee[]>([
    {
      id: 1,
      employeeNumber: "EMP-001",
      name: "أحمد محمد الغامدي",
      nationalId: "1098765432",
      department: "تقنية المعلومات",
      jobTitle: "مطور برمجيات أول",
      jobGrade: "الدرجة الخامسة",
      hireDate: "2020-01-15",
      phone: "0501234567",
      email: "ahmed@company.com",
      status: "نشط",
      contractType: "دائم",
    },
    {
      id: 2,
      employeeNumber: "EMP-002",
      name: "محمد عبدالله الحربي",
      nationalId: "1087654321",
      department: "الموارد البشرية",
      jobTitle: "أخصائي موارد بشرية",
      jobGrade: "الدرجة الرابعة",
      hireDate: "2021-03-20",
      phone: "0559876543",
      email: "mohammed@company.com",
      status: "نشط",
      contractType: "دائم",
    },
    {
      id: 3,
      employeeNumber: "EMP-003",
      name: "سارة خالد الدوسري",
      nationalId: "1076543210",
      department: "المالية",
      jobTitle: "محاسب",
      jobGrade: "الدرجة الثالثة",
      hireDate: "2022-06-10",
      phone: "0541122334",
      email: "sara@company.com",
      status: "إجازة",
      contractType: "مؤقت",
    },
  ]);

  const columns: TableColumn[] = [
    { key: "employeeNumber", label: "رقم الموظف", type: "link" },
    { key: "name", label: "الاسم" },
    { key: "nationalId", label: "رقم الهوية" },
    { key: "department", label: "القسم" },
    { key: "jobTitle", label: "المسمى الوظيفي" },
    { key: "jobGrade", label: "الدرجة الوظيفية" },
    { key: "hireDate", label: "تاريخ التعيين", type: "date" },
    { key: "phone", label: "الجوال" },
    { key: "contractType", label: "نوع العقد" },
    { key: "status", label: "الحالة", type: "status" },
  ];

  const actions: TableAction[] = [
    {
      icon: "view",
      onClick: (row) => toast.info(`عرض ملف الموظف: ${row.name}`),
    },
    {
      icon: "edit",
      onClick: (row) => toast.info(`تعديل بيانات: ${row.name}`),
    },
    {
      icon: "pdf",
      label: "PDF",
      onClick: (row) => toast.info(`تصدير PDF: ${row.name}`),
    },
  ];

  const totalEmployees = records.length;
  const activeEmployees = records.filter((r) => r.status === "نشط").length;
  const departments = new Set(records.map((r) => r.department)).size;
  const permanentEmployees = records.filter((r) => r.contractType === "دائم").length;

  return (
    <InnerPageLayout
      moduleId="hr"
      title="قائمة الموظفين"
      sectionTitle="بيانات الموظفين"
      moduleTitle="إدارة الموارد البشرية"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي الموظفين"
            value={totalEmployees}
            icon={Users}
            variant="info"
          />
          <StatCard
            title="موظفون نشطون"
            value={activeEmployees}
            icon={UserCheck}
            variant="success"
          />
          <StatCard
            title="عدد الأقسام"
            value={departments}
            icon={Building}
            variant="warning"
          />
          <StatCard
            title="عقود دائمة"
            value={permanentEmployees}
            icon={Briefcase}
            variant="default"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سجل الموظفين</CardTitle>
          </CardHeader>
          <CardContent>
            <AdvancedTable
              columns={columns}
              data={records}
              actions={actions}
            />
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default EmployeesListPage;
