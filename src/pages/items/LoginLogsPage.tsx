import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { Shield, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface LoginLogRecord {
  id: number;
  username: string;
  employeeName: string;
  loginDate: string;
  loginTime: string;
  logoutTime: string;
  ipAddress: string;
  userAgent: string;
  deviceType: string;
  status: string;
  location: string;
}

const LoginLogsPage = () => {
  const [records] = useState<LoginLogRecord[]>([
    {
      id: 1,
      username: "ahmed.alghamdi",
      employeeName: "أحمد محمد الغامدي",
      loginDate: "2024-06-15",
      loginTime: "08:30:15",
      logoutTime: "17:45:22",
      ipAddress: "192.168.1.105",
      userAgent: "Chrome 120.0 / Windows 10",
      deviceType: "كمبيوتر",
      status: "ناجح",
      location: "الرياض",
    },
    {
      id: 2,
      username: "mohammed.alharbi",
      employeeName: "محمد عبدالله الحربي",
      loginDate: "2024-06-15",
      loginTime: "09:15:00",
      logoutTime: "18:00:00",
      ipAddress: "192.168.1.108",
      userAgent: "Firefox 121.0 / MacOS",
      deviceType: "كمبيوتر",
      status: "ناجح",
      location: "جدة",
    },
    {
      id: 3,
      username: "sara.aldosari",
      employeeName: "سارة خالد الدوسري",
      loginDate: "2024-06-15",
      loginTime: "10:00:00",
      logoutTime: "-",
      ipAddress: "10.0.0.55",
      userAgent: "Safari / iPhone 15",
      deviceType: "جوال",
      status: "فشل",
      location: "الدمام",
    },
  ]);

  const columns: TableColumn[] = [
    { key: "username", label: "اسم المستخدم", type: "link" },
    { key: "employeeName", label: "اسم الموظف" },
    { key: "loginDate", label: "تاريخ الدخول", type: "date" },
    { key: "loginTime", label: "وقت الدخول" },
    { key: "logoutTime", label: "وقت الخروج" },
    { key: "ipAddress", label: "عنوان IP" },
    { key: "userAgent", label: "المتصفح/النظام" },
    { key: "deviceType", label: "نوع الجهاز" },
    { key: "location", label: "الموقع" },
    { key: "status", label: "الحالة", type: "status" },
  ];

  const actions: TableAction[] = [
    {
      icon: "view",
      onClick: (row) => toast.info(`عرض تفاصيل الدخول: ${row.username}`),
    },
  ];

  const totalLogins = records.length;
  const successfulLogins = records.filter((r) => r.status === "ناجح").length;
  const failedLogins = records.filter((r) => r.status === "فشل").length;
  const activeUsers = new Set(records.filter((r) => r.logoutTime === "-").map((r) => r.username)).size;

  return (
    <InnerPageLayout
      moduleId="technical"
      title="سجلات الدخول"
      sectionTitle="الأمن السيبراني"
      moduleTitle="التمكين التقني"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي عمليات الدخول"
            value={totalLogins}
            icon={Shield}
            variant="info"
          />
          <StatCard
            title="عمليات ناجحة"
            value={successfulLogins}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="عمليات فاشلة"
            value={failedLogins}
            icon={AlertTriangle}
            variant="danger"
          />
          <StatCard
            title="مستخدمون نشطون"
            value={activeUsers}
            icon={Users}
            variant="warning"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سجل عمليات الدخول والخروج</CardTitle>
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

export default LoginLogsPage;
