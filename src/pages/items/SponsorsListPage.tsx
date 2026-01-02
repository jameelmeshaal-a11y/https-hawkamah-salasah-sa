import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { Users, Heart, DollarSign, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Sponsor {
  id: number;
  sponsorNumber: string;
  name: string;
  nationalId: string;
  phone: string;
  email: string;
  sponsorshipsCount: number;
  totalMonthly: number;
  totalPaid: number;
  joinDate: string;
  status: string;
}

const SponsorsListPage = () => {
  const [records] = useState<Sponsor[]>([
    {
      id: 1,
      sponsorNumber: "SPR-001",
      name: "محمد عبدالله الراشد",
      nationalId: "1098765432",
      phone: "0501234567",
      email: "mohammed@email.com",
      sponsorshipsCount: 3,
      totalMonthly: 1500,
      totalPaid: 45000,
      joinDate: "2022-01-15",
      status: "نشط",
    },
    {
      id: 2,
      sponsorNumber: "SPR-002",
      name: "فهد سعود المطيري",
      nationalId: "1087654321",
      phone: "0559876543",
      email: "fahad@email.com",
      sponsorshipsCount: 2,
      totalMonthly: 1000,
      totalPaid: 24000,
      joinDate: "2023-03-20",
      status: "نشط",
    },
    {
      id: 3,
      sponsorNumber: "SPR-003",
      name: "عبدالرحمن خالد السبيعي",
      nationalId: "1076543210",
      phone: "0541122334",
      email: "abdulrahman@email.com",
      sponsorshipsCount: 1,
      totalMonthly: 750,
      totalPaid: 9000,
      joinDate: "2023-09-01",
      status: "متوقف",
    },
  ]);

  const columns: TableColumn[] = [
    { key: "sponsorNumber", label: "رقم الكفيل", type: "link" },
    { key: "name", label: "اسم الكفيل" },
    { key: "nationalId", label: "رقم الهوية" },
    { key: "phone", label: "الجوال" },
    { key: "email", label: "البريد الإلكتروني" },
    { key: "sponsorshipsCount", label: "عدد الكفالات", type: "number" },
    { key: "totalMonthly", label: "المبلغ الشهري", type: "number" },
    { key: "totalPaid", label: "إجمالي المدفوع", type: "number" },
    { key: "joinDate", label: "تاريخ الانضمام", type: "date" },
    { key: "status", label: "الحالة", type: "status" },
  ];

  const actions: TableAction[] = [
    {
      icon: "view",
      onClick: (row) => toast.info(`عرض ملف الكفيل: ${row.name}`),
    },
    {
      icon: "edit",
      onClick: (row) => toast.info(`تعديل بيانات: ${row.name}`),
    },
  ];

  const totalSponsors = records.length;
  const activeSponsors = records.filter((r) => r.status === "نشط").length;
  const totalMonthlyAmount = records.reduce((sum, r) => sum + r.totalMonthly, 0);
  const totalPaidAmount = records.reduce((sum, r) => sum + r.totalPaid, 0);

  return (
    <InnerPageLayout
      moduleId="financial-resources"
      title="قائمة الكفلاء"
      sectionTitle="إدارة الكفالات"
      moduleTitle="إدارة الموارد المالية"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي الكفلاء"
            value={totalSponsors}
            icon={Users}
            variant="info"
          />
          <StatCard
            title="كفلاء نشطون"
            value={activeSponsors}
            icon={Heart}
            variant="success"
          />
          <StatCard
            title="المبلغ الشهري"
            value={`${totalMonthlyAmount.toLocaleString()} ريال`}
            icon={DollarSign}
            variant="warning"
          />
          <StatCard
            title="إجمالي المدفوع"
            value={`${totalPaidAmount.toLocaleString()} ريال`}
            icon={TrendingUp}
            variant="default"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سجل الكفلاء</CardTitle>
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

export default SponsorsListPage;
