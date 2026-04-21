import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { FileText, CheckCircle, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface PaymentOrder {
  id: number;
  orderNumber: string;
  orderDate: string;
  beneficiaryName: string;
  beneficiaryFile: string;
  orderType: string;
  amount: number;
  description: string;
  preparedBy: string;
  approvedBy: string;
  approvalDate: string;
  status: string;
}

const PaymentOrdersPage = () => {
  const [records] = useState<PaymentOrder[]>([
    {
      id: 1,
      orderNumber: "PO-2024-001",
      orderDate: "2024-06-01",
      beneficiaryName: "محمد أحمد العتيبي",
      beneficiaryFile: "BEN-001",
      orderType: "مساعدة مالية",
      amount: 3000,
      description: "مساعدة شهرية",
      preparedBy: "أحمد الغامدي",
      approvedBy: "المدير العام",
      approvalDate: "2024-06-02",
      status: "معتمد",
    },
    {
      id: 2,
      orderNumber: "PO-2024-002",
      orderDate: "2024-06-05",
      beneficiaryName: "فاطمة علي الدوسري",
      beneficiaryFile: "BEN-002",
      orderType: "دعم إيجار",
      amount: 2000,
      description: "دعم إيجار شهري",
      preparedBy: "سارة الحربي",
      approvedBy: "-",
      approvalDate: "-",
      status: "قيد المراجعة",
    },
    {
      id: 3,
      orderNumber: "PO-2024-003",
      orderDate: "2024-06-10",
      beneficiaryName: "خالد محمد السهلي",
      beneficiaryFile: "BEN-003",
      orderType: "مساعدة عاجلة",
      amount: 5000,
      description: "مساعدة طبية عاجلة",
      preparedBy: "محمد الحربي",
      approvedBy: "المدير العام",
      approvalDate: "2024-06-10",
      status: "مصروف",
    },
  ]);

  const columns: TableColumn[] = [
    { key: "orderNumber", label: "رقم الأمر", type: "link" },
    { key: "orderDate", label: "تاريخ الأمر", type: "date" },
    { key: "beneficiaryName", label: "اسم المستفيد" },
    { key: "beneficiaryFile", label: "رقم الملف" },
    { key: "orderType", label: "نوع الأمر" },
    { key: "amount", label: "المبلغ", type: "number" },
    { key: "description", label: "الوصف" },
    { key: "preparedBy", label: "المعد" },
    { key: "approvedBy", label: "المعتمد" },
    { key: "approvalDate", label: "تاريخ الاعتماد" },
    { key: "status", label: "الحالة", type: "status" },
  ];

  const actions: TableAction[] = [
    {
      icon: "view",
      onClick: (row) => toast.info(`عرض أمر الصرف: ${row.orderNumber}`),
    },
    {
      icon: "pdf",
      label: "PDF",
      onClick: (row) => toast.info(`تصدير PDF: ${row.orderNumber}`),
    },
  ];

  const totalOrders = records.length;
  const approvedOrders = records.filter((r) => r.status === "معتمد").length;
  const pendingOrders = records.filter((r) => r.status === "قيد المراجعة").length;
  const totalAmount = records.filter((r) => r.status === "مصروف" || r.status === "معتمد").reduce((sum, r) => sum + r.amount, 0);

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="أوامر الصرف"
      sectionTitle="الموافقات المعلقة"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي الأوامر"
            value={totalOrders}
            icon={FileText}
            variant="info"
          />
          <StatCard
            title="أوامر معتمدة"
            value={approvedOrders}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="قيد المراجعة"
            value={pendingOrders}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="إجمالي المبالغ"
            value={`${totalAmount.toLocaleString()} ﷼`}
            icon={DollarSign}
            variant="default"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سجل أوامر الصرف</CardTitle>
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

export default PaymentOrdersPage;
