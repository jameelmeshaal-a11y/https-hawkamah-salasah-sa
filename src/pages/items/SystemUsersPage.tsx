import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { Users, UserCheck, UserX, Shield } from "lucide-react";
import { toast } from "sonner";

interface SystemUser {
  id: number;
  username: string;
  employeeName: string;
  email: string;
  department: string;
  jobTitle: string;
  role: string;
  createdAt: string;
  lastLogin: string;
  status: string;
  twoFactorEnabled: boolean;
}

const SystemUsersPage = () => {
  const [records] = useState<SystemUser[]>([
    {
      id: 1,
      username: "ahmed.alghamdi",
      employeeName: "أحمد محمد الغامدي",
      email: "ahmed@company.com",
      department: "تقنية المعلومات",
      jobTitle: "مطور برمجيات",
      role: "مدير النظام",
      createdAt: "2023-01-15",
      lastLogin: "2024-06-15",
      status: "نشط",
      twoFactorEnabled: true,
    },
    {
      id: 2,
      username: "mohammed.alharbi",
      employeeName: "محمد عبدالله الحربي",
      email: "mohammed@company.com",
      department: "الموارد البشرية",
      jobTitle: "أخصائي موارد بشرية",
      role: "مستخدم",
      createdAt: "2023-03-20",
      lastLogin: "2024-06-14",
      status: "نشط",
      twoFactorEnabled: false,
    },
    {
      id: 3,
      username: "sara.aldosari",
      employeeName: "سارة خالد الدوسري",
      email: "sara@company.com",
      department: "المالية",
      jobTitle: "محاسب",
      role: "مستخدم",
      createdAt: "2023-06-10",
      lastLogin: "2024-06-10",
      status: "معلق",
      twoFactorEnabled: true,
    },
  ]);

  const columns: TableColumn[] = [
    { key: "username", label: "اسم المستخدم", type: "link" },
    { key: "employeeName", label: "اسم الموظف" },
    { key: "email", label: "البريد الإلكتروني" },
    { key: "department", label: "القسم" },
    { key: "jobTitle", label: "الوظيفة" },
    { key: "role", label: "الدور" },
    { key: "createdAt", label: "تاريخ الإنشاء", type: "date" },
    { key: "lastLogin", label: "آخر دخول", type: "date" },
    { key: "status", label: "الحالة", type: "status" },
  ];

  const actions: TableAction[] = [
    {
      icon: "view",
      onClick: (row) => toast.info(`عرض مستخدم: ${row.username}`),
    },
    {
      icon: "edit",
      onClick: (row) => toast.info(`تعديل مستخدم: ${row.username}`),
    },
  ];

  const totalUsers = records.length;
  const activeUsers = records.filter((r) => r.status === "نشط").length;
  const suspendedUsers = records.filter((r) => r.status === "معلق").length;
  const twoFactorUsers = records.filter((r) => r.twoFactorEnabled).length;

  return (
    <InnerPageLayout
      moduleId="technical"
      title="مستخدمي النظام"
      sectionTitle="الأمن السيبراني"
      moduleTitle="التمكين التقني"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي المستخدمين"
            value={totalUsers}
            icon={Users}
            variant="info"
          />
          <StatCard
            title="مستخدمون نشطون"
            value={activeUsers}
            icon={UserCheck}
            variant="success"
          />
          <StatCard
            title="حسابات معلقة"
            value={suspendedUsers}
            icon={UserX}
            variant="warning"
          />
          <StatCard
            title="التحقق الثنائي"
            value={twoFactorUsers}
            icon={Shield}
            variant="default"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">قائمة مستخدمي النظام</CardTitle>
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

export default SystemUsersPage;
