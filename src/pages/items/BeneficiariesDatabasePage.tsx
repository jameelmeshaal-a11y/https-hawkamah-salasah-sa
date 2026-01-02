import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { Users, UserCheck, UserX, FileText } from "lucide-react";
import { toast } from "sonner";

interface BeneficiaryRecord {
  id: number;
  fileNumber: string;
  name: string;
  dataStatus: string;
  fileStatus: string;
  fileCategory: string;
  gender: string;
  birthDate: string;
  age: number;
  maritalStatus: string;
  idNumber: string;
  phoneNumber: string;
  dependentsCount: number;
  totalIncome: number;
  neighborhood: string;
  housingType: string;
  healthStatus: string;
}

const BeneficiariesDatabasePage = () => {
  const [records] = useState<BeneficiaryRecord[]>([
    {
      id: 1,
      fileNumber: "180000160",
      name: "مجاهد احمد الصواف",
      dataStatus: "محدثة سليمة",
      fileStatus: "معتمد",
      fileCategory: "ب",
      gender: "ذكر",
      birthDate: "14 اغسطس 1990",
      age: 35,
      maritalStatus: "متزوج",
      idNumber: "1023654785",
      phoneNumber: "0547856954",
      dependentsCount: 2,
      totalIncome: 7500,
      neighborhood: "حي الملك فهد",
      housingType: "بيت مسلح",
      healthStatus: "مريض",
    },
    {
      id: 2,
      fileNumber: "180000161",
      name: "فاطمة محمد العمري",
      dataStatus: "محدثة سليمة",
      fileStatus: "معتمد",
      fileCategory: "أ",
      gender: "أنثى",
      birthDate: "05 مارس 1985",
      age: 40,
      maritalStatus: "أرملة",
      idNumber: "1098765432",
      phoneNumber: "0551234567",
      dependentsCount: 4,
      totalIncome: 3500,
      neighborhood: "حي النزهة",
      housingType: "شقة",
      healthStatus: "سليم",
    },
    {
      id: 3,
      fileNumber: "180000162",
      name: "عبدالله سعيد القحطاني",
      dataStatus: "تحتاج تحديث",
      fileStatus: "قيد المراجعة",
      fileCategory: "ج",
      gender: "ذكر",
      birthDate: "20 يناير 1975",
      age: 50,
      maritalStatus: "متزوج",
      idNumber: "1012345678",
      phoneNumber: "0567891234",
      dependentsCount: 6,
      totalIncome: 5000,
      neighborhood: "حي السلام",
      housingType: "فيلا",
      healthStatus: "مريض",
    },
  ]);

  const columns: TableColumn[] = [
    { key: "fileNumber", label: "رقم الملف", type: "link" },
    { key: "name", label: "الإسم" },
    { key: "dataStatus", label: "حالة البيانات", type: "status" },
    { key: "fileStatus", label: "حالة الملف", type: "status" },
    { key: "fileCategory", label: "فئة الملف" },
    { key: "gender", label: "النوع" },
    { key: "age", label: "العمر", type: "number" },
    { key: "maritalStatus", label: "الحالة الاجتماعية" },
    { key: "idNumber", label: "رقم الهوية" },
    { key: "phoneNumber", label: "رقم الجوال" },
    { key: "dependentsCount", label: "عدد التابعين", type: "number" },
    { key: "totalIncome", label: "إجمالي الدخل", type: "number" },
    { key: "neighborhood", label: "الحي" },
    { key: "healthStatus", label: "الحالة الصحية" },
  ];

  const actions: TableAction[] = [
    {
      icon: "view",
      onClick: (row) => toast.info(`عرض ملف: ${row.name}`),
    },
    {
      icon: "edit",
      onClick: (row) => toast.info(`تعديل ملف: ${row.name}`),
    },
    {
      icon: "pdf",
      label: "PDF",
      onClick: (row) => toast.info(`تصدير PDF: ${row.name}`),
    },
  ];

  const totalBeneficiaries = records.length;
  const activeBeneficiaries = records.filter((r) => r.fileStatus === "معتمد").length;
  const pendingBeneficiaries = records.filter((r) => r.fileStatus === "قيد المراجعة").length;

  return (
    <InnerPageLayout
      moduleId="beneficiaries"
      title="قاعدة بيانات المستفيدين"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة المستفيدين"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي المستفيدين"
            value={totalBeneficiaries}
            icon={Users}
            variant="info"
          />
          <StatCard
            title="الملفات المعتمدة"
            value={activeBeneficiaries}
            icon={UserCheck}
            variant="success"
          />
          <StatCard
            title="قيد المراجعة"
            value={pendingBeneficiaries}
            icon={FileText}
            variant="warning"
          />
          <StatCard
            title="الملفات المرفوضة"
            value={0}
            icon={UserX}
            variant="danger"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سجلات المستفيدين</CardTitle>
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

export default BeneficiariesDatabasePage;
