import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Plus, Search, Download, Edit, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  currency: string;
  balance: number;
  status: "active" | "inactive" | "suspended";
  iban: string;
  branch: string;
}

const ManageBankAccountsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const accounts: BankAccount[] = [
    {
      id: "1",
      bankName: "البنك الأهلي السعودي",
      accountNumber: "1234567890",
      accountType: "جاري",
      currency: "﷼ سعودي",
      balance: 250000,
      status: "active",
      iban: "SA0380000000608010167519",
      branch: "الرياض - العليا",
    },
    {
      id: "2",
      bankName: "مصرف الراجحي",
      accountNumber: "9876543210",
      accountType: "ادخار",
      currency: "﷼ سعودي",
      balance: 500000,
      status: "active",
      iban: "SA0880000000608010167520",
      branch: "الرياض - الملز",
    },
    {
      id: "3",
      bankName: "بنك الرياض",
      accountNumber: "5555666677",
      accountType: "جاري",
      currency: "﷼ سعودي",
      balance: 75000,
      status: "inactive",
      iban: "SA0380000000608010167521",
      branch: "جدة - الحمراء",
    },
  ];

  const getStatusBadge = (status: BankAccount["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">غير نشط</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">معلق</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
    }).format(amount);
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.bankName.includes(searchQuery) ||
      account.accountNumber.includes(searchQuery)
  );

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="إدارة حسابات البنوك"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي الحسابات</div>
              <div className="text-2xl font-bold text-primary">{accounts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">الحسابات النشطة</div>
              <div className="text-2xl font-bold text-green-600">
                {accounts.filter((a) => a.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي الأرصدة</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(accounts.reduce((sum, a) => sum + a.balance, 0))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">عدد البنوك</div>
              <div className="text-2xl font-bold text-primary">
                {new Set(accounts.map((a) => a.bankName)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              حسابات البنوك
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-9 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 ml-2" />
                إضافة حساب بنكي
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم البنك</TableHead>
                  <TableHead className="text-right">رقم الحساب</TableHead>
                  <TableHead className="text-right">IBAN</TableHead>
                  <TableHead className="text-right">نوع الحساب</TableHead>
                  <TableHead className="text-right">الفرع</TableHead>
                  <TableHead className="text-right">الرصيد</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.bankName}</TableCell>
                    <TableCell className="font-mono">{account.accountNumber}</TableCell>
                    <TableCell className="font-mono text-xs">{account.iban}</TableCell>
                    <TableCell>{account.accountType}</TableCell>
                    <TableCell>{account.branch}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(account.balance)}
                    </TableCell>
                    <TableCell>{getStatusBadge(account.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("عرض تفاصيل الحساب")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("تعديل الحساب")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.error("حذف الحساب")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageBankAccountsPage;
