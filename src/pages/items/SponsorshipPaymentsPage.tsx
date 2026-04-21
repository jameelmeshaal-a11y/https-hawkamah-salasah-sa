import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { Banknote, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface PaymentRecord {
  id: number;
  paymentNumber: string;
  sponsorshipNumber: string;
  sponsorName: string;
  sponsoredName: string;
  amount: number;
  dueDate: string;
  paymentDate: string;
  paymentMethod: string;
  receiptNumber: string;
  status: string;
}

const SponsorshipPaymentsPage = () => {
  const [records] = useState<PaymentRecord[]>([
    {
      id: 1,
      paymentNumber: "PAY-2024-001",
      sponsorshipNumber: "SPO-2024-001",
      sponsorName: "محمد عبدالله الراشد",
      sponsoredName: "أحمد صالح العمري",
      amount: 500,
      dueDate: "2024-06-01",
      paymentDate: "2024-06-01",
      paymentMethod: "تحويل بنكي",
      receiptNumber: "RCP-001",
      status: "مسدد",
    },
    {
      id: 2,
      paymentNumber: "PAY-2024-002",
      sponsorshipNumber: "SPO-2024-002",
      sponsorName: "فهد سعود المطيري",
      sponsoredName: "سارة محمد الحربي",
      amount: 1000,
      dueDate: "2024-06-15",
      paymentDate: "2024-06-15",
      paymentMethod: "بطاقة ائتمان",
      receiptNumber: "RCP-002",
      status: "مسدد",
    },
    {
      id: 3,
      paymentNumber: "PAY-2024-003",
      sponsorshipNumber: "SPO-2024-003",
      sponsorName: "عبدالرحمن خالد السبيعي",
      sponsoredName: "نورة عبدالعزيز الدوسري",
      amount: 750,
      dueDate: "2024-07-01",
      paymentDate: "-",
      paymentMethod: "-",
      receiptNumber: "-",
      status: "متأخر",
    },
    {
      id: 4,
      paymentNumber: "PAY-2024-004",
      sponsorshipNumber: "SPO-2024-001",
      sponsorName: "محمد عبدالله الراشد",
      sponsoredName: "أحمد صالح العمري",
      amount: 500,
      dueDate: "2024-07-01",
      paymentDate: "-",
      paymentMethod: "-",
      receiptNumber: "-",
      status: "قادم",
    },
  ]);

  const columns: TableColumn[] = [
    { key: "paymentNumber", label: "رقم السداد", type: "link" },
    { key: "sponsorshipNumber", label: "رقم الكفالة" },
    { key: "sponsorName", label: "اسم الكفيل" },
    { key: "sponsoredName", label: "اسم المكفول" },
    { key: "amount", label: "المبلغ", type: "number" },
    { key: "dueDate", label: "تاريخ الاستحقاق", type: "date" },
    { key: "paymentDate", label: "تاريخ السداد" },
    { key: "paymentMethod", label: "طريقة الدفع" },
    { key: "receiptNumber", label: "رقم الإيصال" },
    { key: "status", label: "الحالة", type: "status" },
  ];

  const actions: TableAction[] = [
    {
      icon: "view",
      onClick: (row) => toast.info(`عرض تفاصيل السداد: ${row.paymentNumber}`),
    },
    {
      icon: "pdf",
      label: "إيصال",
      onClick: (row) => toast.info(`طباعة إيصال: ${row.paymentNumber}`),
    },
  ];

  const totalPayments = records.length;
  const paidPayments = records.filter((r) => r.status === "مسدد").length;
  const latePayments = records.filter((r) => r.status === "متأخر").length;
  const totalAmount = records.filter((r) => r.status === "مسدد").reduce((sum, r) => sum + r.amount, 0);

  return (
    <InnerPageLayout
      moduleId="financial-resources"
      title="سجل مدفوعات الكفالات"
      sectionTitle="إدارة الكفالات"
      moduleTitle="إدارة الموارد المالية"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي الدفعات"
            value={totalPayments}
            icon={Banknote}
            variant="info"
          />
          <StatCard
            title="دفعات مسددة"
            value={paidPayments}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="دفعات متأخرة"
            value={latePayments}
            icon={AlertTriangle}
            variant="danger"
          />
          <StatCard
            title="إجمالي المحصل"
            value={`${totalAmount.toLocaleString()} ﷼`}
            icon={Clock}
            variant="default"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سجل المدفوعات</CardTitle>
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

export default SponsorshipPaymentsPage;
