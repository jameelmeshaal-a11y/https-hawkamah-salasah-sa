import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, Plus, Trash2, AlertTriangle, X } from "lucide-react";

interface BudgetAccount {
  id: string;
  accountCode: string;
  accountName: string;
  distribution: "yearly" | "monthly";
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}

const ManageBudgetsPage = () => {
  const [principal, setPrincipal] = useState("");
  const [year, setYear] = useState("");
  const [budgetType, setBudgetType] = useState("revenue");
  const [source, setSource] = useState("classifications");
  const [accounts, setAccounts] = useState<BudgetAccount[]>([]);

  const years = ["2023", "2024", "2025", "2026"];

  const handleAddAccount = () => {
    const newAccount: BudgetAccount = {
      id: Date.now().toString(),
      accountCode: "",
      accountName: "",
      distribution: "yearly",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    };
    setAccounts([...accounts, newAccount]);
  };

  const handleDeleteAll = () => {
    setAccounts([]);
  };

  const handleRemoveAccount = (id: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  const handleAccountChange = (
    id: string,
    field: keyof BudgetAccount,
    value: string | number
  ) => {
    setAccounts(
      accounts.map((acc) =>
        acc.id === id ? { ...acc, [field]: value } : acc
      )
    );
  };

  const handleSubmit = () => {
    console.log("Budget data:", { principal, year, budgetType, source, accounts });
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      moduleTitle="إدارة الشؤون المالية"
      title="إدارة الموازنات"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">إدارة الموازنات</h1>
            <p className="text-muted-foreground">إنشاء وإدارة موازنات الإيرادات والتكاليف</p>
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>بيانات الموازنة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Principal */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  المعول <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="أدخل اسم المعول"
                />
              </div>

              {/* Year */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  السنة <span className="text-red-500">*</span>
                </Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر السنة" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Budget Type */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                النوع <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={budgetType}
                onValueChange={setBudgetType}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="revenue" id="revenue" />
                  <Label htmlFor="revenue" className="cursor-pointer">موازنة إيرادات</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="costs" id="costs" />
                  <Label htmlFor="costs" className="cursor-pointer">موازنة تكاليف</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Source */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">المصدر</Label>
              <RadioGroup
                value={source}
                onValueChange={setSource}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="classifications" id="classifications" />
                  <Label htmlFor="classifications" className="cursor-pointer">التصنيفات المالية</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="cost-centers" id="cost-centers" />
                  <Label htmlFor="cost-centers" className="cursor-pointer">مراكز التكلفة</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Budget Accounts Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-foreground font-medium text-lg">
                  حسابات الموازنة <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={handleAddAccount}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة حساب
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDeleteAll}
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف الكل
                  </Button>
                </div>
              </div>

              {/* Warning Alert */}
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  يمكنك إضافة حتى 100 حساب من الشجرة
                </AlertDescription>
              </Alert>

              {/* Accounts Table */}
              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right w-10">×</TableHead>
                      <TableHead className="text-right">الحساب</TableHead>
                      <TableHead className="text-right">التوزيع الزمني</TableHead>
                      <TableHead className="text-right">يناير</TableHead>
                      <TableHead className="text-right">فبراير</TableHead>
                      <TableHead className="text-right">مارس</TableHead>
                      <TableHead className="text-right">أبريل</TableHead>
                      <TableHead className="text-right">مايو</TableHead>
                      <TableHead className="text-right">يونيو</TableHead>
                      <TableHead className="text-right">يوليو</TableHead>
                      <TableHead className="text-right">أغسطس</TableHead>
                      <TableHead className="text-right">سبتمبر</TableHead>
                      <TableHead className="text-right">أكتوبر</TableHead>
                      <TableHead className="text-right">نوفمبر</TableHead>
                      <TableHead className="text-right">ديسمبر</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={15} className="text-center py-8 text-muted-foreground">
                          لا توجد بيانات متوفرة في الجدول
                        </TableCell>
                      </TableRow>
                    ) : (
                      accounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveAccount(account.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Input
                              value={account.accountName}
                              onChange={(e) =>
                                handleAccountChange(account.id, "accountName", e.target.value)
                              }
                              placeholder="اسم الحساب"
                              className="min-w-[150px]"
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={account.distribution}
                              onValueChange={(value) =>
                                handleAccountChange(account.id, "distribution", value)
                              }
                            >
                              <SelectTrigger className="min-w-[100px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yearly">سنوي</SelectItem>
                                <SelectItem value="monthly">شهري</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          {["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].map(
                            (month) => (
                              <TableCell key={month}>
                                <Input
                                  type="number"
                                  value={account[month as keyof BudgetAccount] as number}
                                  onChange={(e) =>
                                    handleAccountChange(
                                      account.id,
                                      month as keyof BudgetAccount,
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="min-w-[80px]"
                                />
                              </TableCell>
                            )
                          )}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
              >
                <Plus className="h-5 w-5 ml-2" />
                إضافة سجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>سجلات الموازنات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              لا توجد بيانات متوفرة في الجدول
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageBudgetsPage;
