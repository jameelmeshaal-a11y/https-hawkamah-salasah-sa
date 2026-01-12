import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, Plus, Search, Download, Edit, Eye, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface BudgetItem {
  id: string;
  accountCode: string;
  accountName: string;
  budgetAmount: number;
  actualAmount: number;
  variance: number;
  variancePercentage: number;
  status: "under" | "normal" | "over";
}

interface Budget {
  id: string;
  name: string;
  year: string;
  status: "draft" | "approved" | "active" | "closed";
  totalBudget: number;
  totalActual: number;
  items: BudgetItem[];
}

const ManageBudgetsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");
  
  const budgets: Budget[] = [
    {
      id: "1",
      name: "الموازنة التشغيلية 2024",
      year: "2024",
      status: "active",
      totalBudget: 5000000,
      totalActual: 3200000,
      items: [],
    },
    {
      id: "2",
      name: "موازنة المشاريع 2024",
      year: "2024",
      status: "active",
      totalBudget: 8000000,
      totalActual: 5500000,
      items: [],
    },
    {
      id: "3",
      name: "الموازنة التشغيلية 2023",
      year: "2023",
      status: "closed",
      totalBudget: 4500000,
      totalActual: 4200000,
      items: [],
    },
  ];

  const budgetItems: BudgetItem[] = [
    {
      id: "1",
      accountCode: "5101",
      accountName: "مصروفات الرواتب",
      budgetAmount: 2400000,
      actualAmount: 1600000,
      variance: -800000,
      variancePercentage: -33.3,
      status: "under",
    },
    {
      id: "2",
      accountCode: "5102",
      accountName: "مصروفات إدارية",
      budgetAmount: 600000,
      actualAmount: 580000,
      variance: -20000,
      variancePercentage: -3.3,
      status: "normal",
    },
    {
      id: "3",
      accountCode: "5103",
      accountName: "مصروفات صيانة",
      budgetAmount: 300000,
      actualAmount: 350000,
      variance: 50000,
      variancePercentage: 16.7,
      status: "over",
    },
    {
      id: "4",
      accountCode: "5104",
      accountName: "مصروفات تشغيلية",
      budgetAmount: 800000,
      actualAmount: 420000,
      variance: -380000,
      variancePercentage: -47.5,
      status: "under",
    },
    {
      id: "5",
      accountCode: "5105",
      accountName: "مصروفات مشاريع",
      budgetAmount: 900000,
      actualAmount: 250000,
      variance: -650000,
      variancePercentage: -72.2,
      status: "under",
    },
  ];

  const getStatusBadge = (status: Budget["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشطة</Badge>;
      case "approved":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">معتمدة</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">مسودة</Badge>;
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">مغلقة</Badge>;
    }
  };

  const getVarianceIndicator = (status: BudgetItem["status"], variance: number) => {
    switch (status) {
      case "under":
        return (
          <span className="flex items-center gap-1 text-green-600">
            <TrendingDown className="h-4 w-4" />
            وفر
          </span>
        );
      case "over":
        return (
          <span className="flex items-center gap-1 text-red-600">
            <TrendingUp className="h-4 w-4" />
            تجاوز
          </span>
        );
      default:
        return <span className="text-muted-foreground">ضمن الحد</span>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA").format(Math.abs(amount)) + " ر.س";
  };

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.budgetAmount, 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + item.actualAmount, 0);
  const totalVariance = totalBudget - totalActual;
  const utilizationRate = (totalActual / totalBudget) * 100;

  return (
    <InnerPageLayout
      title="إدارة الموازنات"
      subtitle="إدارة الشؤون المالية"
      icon={Calculator}
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي الموازنة</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(totalBudget)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المصروف الفعلي</div>
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(totalActual)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المتبقي</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalVariance)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">نسبة الاستخدام</div>
              <div className="text-2xl font-bold text-primary">
                {utilizationRate.toFixed(1)}%
              </div>
              <Progress value={utilizationRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Budget Items Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              بنود الموازنة التشغيلية 2024
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-9 w-40"
                />
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 ml-2" />
                إضافة بند
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">كود الحساب</TableHead>
                  <TableHead className="text-right">اسم البند</TableHead>
                  <TableHead className="text-right">المبلغ المعتمد</TableHead>
                  <TableHead className="text-right">المصروف الفعلي</TableHead>
                  <TableHead className="text-right">نسبة الاستخدام</TableHead>
                  <TableHead className="text-right">الفرق</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono font-medium">
                      {item.accountCode}
                    </TableCell>
                    <TableCell>{item.accountName}</TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(item.budgetAmount)}
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(item.actualAmount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(item.actualAmount / item.budgetAmount) * 100}
                          className="w-20"
                        />
                        <span className="text-sm">
                          {((item.actualAmount / item.budgetAmount) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={`font-mono ${
                        item.variance < 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.variance < 0 ? "-" : "+"}{formatCurrency(item.variance)}
                    </TableCell>
                    <TableCell>{getVarianceIndicator(item.status, item.variance)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("عرض التفاصيل")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("تعديل البند")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Totals Row */}
                <TableRow className="font-bold bg-muted/50 border-t-2">
                  <TableCell colSpan={2}>المجموع</TableCell>
                  <TableCell className="font-mono">{formatCurrency(totalBudget)}</TableCell>
                  <TableCell className="font-mono">{formatCurrency(totalActual)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={utilizationRate} className="w-20" />
                      <span className="text-sm">{utilizationRate.toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-green-600">
                    -{formatCurrency(totalVariance)}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageBudgetsPage;
