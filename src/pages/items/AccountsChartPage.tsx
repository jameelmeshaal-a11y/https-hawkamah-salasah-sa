import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface AccountRecord {
  id: number;
  accountCode: string;
  accountTitle: string;
  parentAccount: string;
  level: number;
  accountType: string;
  nature: string;
  closing: string;
  status: string;
  createdAt: string;
}

const AccountsChartPage = () => {
  const [records] = useState<AccountRecord[]>([
    {
      id: 1,
      accountCode: "1",
      accountTitle: "الأصول",
      parentAccount: "-",
      level: 1,
      accountType: "رئيسي",
      nature: "مدين",
      closing: "ميزانية",
      status: "مفعل",
      createdAt: "13 ابريل 2021",
    },
    {
      id: 2,
      accountCode: "11",
      accountTitle: "الأصول المتداولة",
      parentAccount: "1",
      level: 2,
      accountType: "رئيسي",
      nature: "مدين",
      closing: "ميزانية",
      status: "مفعل",
      createdAt: "13 ابريل 2021",
    },
    {
      id: 3,
      accountCode: "111",
      accountTitle: "النقدية وما في حكمها",
      parentAccount: "11",
      level: 3,
      accountType: "رئيسي",
      nature: "مدين",
      closing: "ميزانية",
      status: "مفعل",
      createdAt: "13 ابريل 2021",
    },
    {
      id: 4,
      accountCode: "11101",
      accountTitle: "نقدية وودائع في البنوك",
      parentAccount: "111",
      level: 4,
      accountType: "رئيسي",
      nature: "مدين",
      closing: "ميزانية",
      status: "مفعل",
      createdAt: "13 ابريل 2021",
    },
    {
      id: 5,
      accountCode: "11101001",
      accountTitle: "حسابات جارية - بنك الرياض",
      parentAccount: "11101",
      level: 5,
      accountType: "فرعي",
      nature: "مدين",
      closing: "ميزانية",
      status: "مفعل",
      createdAt: "13 ابريل 2021",
    },
    {
      id: 6,
      accountCode: "11101002",
      accountTitle: "حسابات جارية - بنك الراجحي",
      parentAccount: "11101",
      level: 5,
      accountType: "فرعي",
      nature: "مدين",
      closing: "ميزانية",
      status: "مفعل",
      createdAt: "13 ابريل 2021",
    },
    {
      id: 7,
      accountCode: "2",
      accountTitle: "الخصوم",
      parentAccount: "-",
      level: 1,
      accountType: "رئيسي",
      nature: "دائن",
      closing: "ميزانية",
      status: "مفعل",
      createdAt: "13 ابريل 2021",
    },
    {
      id: 8,
      accountCode: "4",
      accountTitle: "الإيرادات",
      parentAccount: "-",
      level: 1,
      accountType: "رئيسي",
      nature: "دائن",
      closing: "نتيجة",
      status: "مفعل",
      createdAt: "13 ابريل 2021",
    },
    {
      id: 9,
      accountCode: "5",
      accountTitle: "المصروفات",
      parentAccount: "-",
      level: 1,
      accountType: "رئيسي",
      nature: "مدين",
      closing: "نتيجة",
      status: "مفعل",
      createdAt: "13 ابريل 2021",
    },
  ]);

  const columns: TableColumn[] = [
    { key: "accountCode", label: "كود الحساب", type: "link" },
    { key: "accountTitle", label: "عنوان الحساب" },
    { key: "parentAccount", label: "حساب رئيسي" },
    { key: "level", label: "مستوى", type: "number" },
    { key: "accountType", label: "نوع الحساب" },
    { key: "nature", label: "الطبيعة" },
    { key: "closing", label: "إقفال" },
    { key: "status", label: "حالة الحساب", type: "status" },
    { key: "createdAt", label: "تاريخ الإنشاء", type: "date" },
  ];

  const actions: TableAction[] = [
    {
      icon: "view",
      onClick: (row) => toast.info(`عرض حساب: ${row.accountTitle}`),
    },
    {
      icon: "edit",
      onClick: (row) => toast.info(`تعديل حساب: ${row.accountTitle}`),
    },
  ];

  return (
    <InnerPageLayout
      moduleId="finance"
      title="دليل الحسابات"
      sectionTitle="الشئون المالية"
      moduleTitle="الشئون المالية"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">شجرة الحسابات</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              إضافة حساب جديد
            </Button>
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

export default AccountsChartPage;
