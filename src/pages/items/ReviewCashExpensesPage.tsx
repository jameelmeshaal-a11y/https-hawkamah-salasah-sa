import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, CheckCircle, XCircle, Clock, Send } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ExpenseRecord {
  id: string;
  voucherNumber: string;
  date: string;
  paidTo: string;
  amount: number;
  description: string;
  account: string;
  costCenter: string;
  paymentMethod: string;
  status: "pending" | "approved" | "rejected";
  createdBy: string;
}

const ReviewCashExpensesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  
  const expenses: ExpenseRecord[] = [
    {
      id: "1",
      voucherNumber: "PV-2024-0156",
      date: "2024-01-20",
      paidTo: "شركة الصيانة المتكاملة",
      amount: 12000,
      description: "صيانة أجهزة التكييف",
      account: "مصروفات صيانة",
      costCenter: "الإدارة العامة",
      paymentMethod: "تحويل",
      status: "pending",
      createdBy: "أحمد محمد",
    },
    {
      id: "2",
      voucherNumber: "PV-2024-0157",
      date: "2024-01-20",
      paidTo: "مكتبة النور",
      amount: 3500,
      description: "شراء مستلزمات مكتبية",
      account: "مصروفات إدارية",
      costCenter: "قسم المشتريات",
      paymentMethod: "نقداً",
      status: "pending",
      createdBy: "سعد العتيبي",
    },
    {
      id: "3",
      voucherNumber: "PV-2024-0155",
      date: "2024-01-19",
      paidTo: "شركة الأمن والحراسة",
      amount: 8000,
      description: "خدمات أمنية شهرية",
      account: "مصروفات تشغيلية",
      costCenter: "الإدارة العامة",
      paymentMethod: "شيك",
      status: "approved",
      createdBy: "محمد علي",
    },
    {
      id: "4",
      voucherNumber: "PV-2024-0154",
      date: "2024-01-18",
      paidTo: "مؤسسة النظافة",
      amount: 5000,
      description: "خدمات نظافة",
      account: "مصروفات تشغيلية",
      costCenter: "الإدارة العامة",
      paymentMethod: "تحويل",
      status: "rejected",
      createdBy: "خالد الشمري",
    },
  ];

  const getStatusBadge = (status: ExpenseRecord["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 ml-1" />
            معتمد
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 ml-1" />
            قيد المراجعة
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 ml-1" />
            مرفوض
          </Badge>
        );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA").format(amount) + " ﷼";
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.voucherNumber.includes(searchQuery) ||
      expense.paidTo.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="مراجعة المصروفات النقدية"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">قيد المراجعة</div>
              <div className="text-2xl font-bold text-yellow-600">
                {expenses.filter((e) => e.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المعتمدة</div>
              <div className="text-2xl font-bold text-green-600">
                {expenses.filter((e) => e.status === "approved").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المرفوضة</div>
              <div className="text-2xl font-bold text-red-600">
                {expenses.filter((e) => e.status === "rejected").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي المبالغ المعلقة</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(
                  expenses
                    .filter((e) => e.status === "pending")
                    .reduce((sum, e) => sum + e.amount, 0)
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              سندات الصرف
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-9 w-48"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="pending">قيد المراجعة</SelectItem>
                  <SelectItem value="approved">معتمد</SelectItem>
                  <SelectItem value="rejected">مرفوض</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم السند</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">صرف إلى</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">البيان</TableHead>
                  <TableHead className="text-right">مركز التكلفة</TableHead>
                  <TableHead className="text-right">طريقة الدفع</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-mono font-medium">
                      {expense.voucherNumber}
                    </TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.paidTo}</TableCell>
                    <TableCell className="font-mono font-bold text-red-600">
                      -{formatCurrency(expense.amount)}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {expense.description}
                    </TableCell>
                    <TableCell>{expense.costCenter}</TableCell>
                    <TableCell>{expense.paymentMethod}</TableCell>
                    <TableCell>{getStatusBadge(expense.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("عرض التفاصيل")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {expense.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600"
                              onClick={() => toast.success("تم اعتماد السند")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600"
                              onClick={() => toast.error("تم رفض السند")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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

export default ReviewCashExpensesPage;
