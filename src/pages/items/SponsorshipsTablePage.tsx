import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { Heart, DollarSign, Users, Calendar } from "lucide-react";
import { toast } from "sonner";

interface SponsorshipRecord {
  id: number;
  sponsorshipNumber: string;
  sponsorName: string;
  sponsoredName: string;
  sponsorshipType: string;
  monthlyAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  lastPayment: string;
  totalPaid: number;
}

const SponsorshipsTablePage = () => {
  const [records] = useState<SponsorshipRecord[]>([
    {
      id: 1,
      sponsorshipNumber: "SPO-2024-001",
      sponsorName: "محمد عبدالله الراشد",
      sponsoredName: "أحمد صالح العمري",
      sponsorshipType: "كفالة يتيم",
      monthlyAmount: 500,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "فعال",
      lastPayment: "2024-06-01",
      totalPaid: 3000,
    },
    {
      id: 2,
      sponsorshipNumber: "SPO-2024-002",
      sponsorName: "فهد سعود المطيري",
      sponsoredName: "سارة محمد الحربي",
      sponsorshipType: "كفالة أسرة",
      monthlyAmount: 1000,
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      status: "فعال",
      lastPayment: "2024-06-15",
      totalPaid: 4000,
    },
    {
      id: 3,
      sponsorshipNumber: "SPO-2024-003",
      sponsorName: "عبدالرحمن خالد السبيعي",
      sponsoredName: "نورة عبدالعزيز الدوسري",
      sponsorshipType: "كفالة تعليمية",
      monthlyAmount: 750,
      startDate: "2023-09-01",
      endDate: "2024-08-31",
      status: "منتهي",
      lastPayment: "2024-05-01",
      totalPaid: 6750,
    },
  ]);

  const columns: TableColumn[] = [
    { key: "sponsorshipNumber", label: "رقم الكفالة", type: "link" },
    { key: "sponsorName", label: "اسم الكفيل" },
    { key: "sponsoredName", label: "اسم المكفول" },
    { key: "sponsorshipType", label: "نوع الكفالة" },
    { key: "monthlyAmount", label: "المبلغ الشهري", type: "number" },
    { key: "startDate", label: "تاريخ البداية", type: "date" },
    { key: "endDate", label: "تاريخ الانتهاء", type: "date" },
    { key: "status", label: "الحالة", type: "status" },
    { key: "lastPayment", label: "آخر دفعة", type: "date" },
    { key: "totalPaid", label: "إجمالي المدفوع", type: "number" },
  ];

  const actions: TableAction[] = [
    {
      icon: "view",
      onClick: (row) => toast.info(`عرض كفالة: ${row.sponsorshipNumber}`),
    },
    {
      icon: "edit",
      onClick: (row) => toast.info(`تعديل كفالة: ${row.sponsorshipNumber}`),
    },
    {
      icon: "pdf",
      label: "PDF",
      onClick: (row) => toast.info(`تصدير PDF: ${row.sponsorshipNumber}`),
    },
  ];

  const totalSponsorships = records.length;
  const activeSponsorships = records.filter((r) => r.status === "فعال").length;
  const totalMonthlyAmount = records.reduce((sum, r) => sum + r.monthlyAmount, 0);
  const totalPaidAmount = records.reduce((sum, r) => sum + r.totalPaid, 0);

  return (
    <InnerPageLayout
      moduleId="financial-resources"
      title="جدول الكفالات"
      sectionTitle="إدارة الكفالات"
      moduleTitle="إدارة الموارد المالية"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي الكفالات"
            value={totalSponsorships}
            icon={Heart}
            variant="info"
          />
          <StatCard
            title="الكفالات النشطة"
            value={activeSponsorships}
            icon={Users}
            variant="success"
          />
          <StatCard
            title="المبلغ الشهري"
            value={`${totalMonthlyAmount.toLocaleString()} ريال`}
            icon={Calendar}
            variant="warning"
          />
          <StatCard
            title="إجمالي المدفوع"
            value={`${totalPaidAmount.toLocaleString()} ريال`}
            icon={DollarSign}
            variant="default"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سجلات الكفالات</CardTitle>
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

export default SponsorshipsTablePage;
