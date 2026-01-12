import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet, Plus, Search, Download, Upload, Eye, CheckCircle, Clock, XCircle } from "lucide-react";
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

interface SalaryRecord {
  id: string;
  month: string;
  year: string;
  employeesCount: number;
  totalBasic: number;
  totalAllowances: number;
  totalDeductions: number;
  netSalary: number;
  status: "draft" | "approved" | "paid" | "cancelled";
  createdAt: string;
}

const ManageSalaryRecordsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("2024");
  
  const records: SalaryRecord[] = [
    {
      id: "1",
      month: "يناير",
      year: "2024",
      employeesCount: 45,
      totalBasic: 180000,
      totalAllowances: 45000,
      totalDeductions: 18000,
      netSalary: 207000,
      status: "paid",
      createdAt: "2024-01-25",
    },
    {
      id: "2",
      month: "فبراير",
      year: "2024",
      employeesCount: 47,
      totalBasic: 188000,
      totalAllowances: 47000,
      totalDeductions: 19000,
      netSalary: 216000,
      status: "paid",
      createdAt: "2024-02-25",
    },
    {
      id: "3",
      month: "مارس",
      year: "2024",
      employeesCount: 48,
      totalBasic: 192000,
      totalAllowances: 48000,
      totalDeductions: 19500,
      netSalary: 220500,
      status: "approved",
      createdAt: "2024-03-25",
    },
    {
      id: "4",
      month: "أبريل",
      year: "2024",
      employeesCount: 48,
      totalBasic: 192000,
      totalAllowances: 48000,
      totalDeductions: 19500,
      netSalary: 220500,
      status: "draft",
      createdAt: "2024-04-20",
    },
  ];

  const getStatusBadge = (status: SalaryRecord["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 ml-1" />
            مصروف
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CheckCircle className="h-3 w-3 ml-1" />
            معتمد
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 ml-1" />
            مسودة
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 ml-1" />
            ملغي
          </Badge>
        );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA").format(amount) + " ر.س";
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="إدارة سجلات الرواتب"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
              <div className="text-2xl font-bold text-primary">48</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي الرواتب الأساسية</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(192000)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي البدلات</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(48000)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">صافي الرواتب</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(220500)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              سجلات الرواتب
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
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="السنة" />
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
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 ml-2" />
                إنشاء مسير جديد
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الشهر</TableHead>
                  <TableHead className="text-right">السنة</TableHead>
                  <TableHead className="text-right">عدد الموظفين</TableHead>
                  <TableHead className="text-right">الرواتب الأساسية</TableHead>
                  <TableHead className="text-right">البدلات</TableHead>
                  <TableHead className="text-right">الاستقطاعات</TableHead>
                  <TableHead className="text-right">الصافي</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.month}</TableCell>
                    <TableCell>{record.year}</TableCell>
                    <TableCell>{record.employeesCount}</TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(record.totalBasic)}
                    </TableCell>
                    <TableCell className="font-mono text-green-600">
                      +{formatCurrency(record.totalAllowances)}
                    </TableCell>
                    <TableCell className="font-mono text-red-600">
                      -{formatCurrency(record.totalDeductions)}
                    </TableCell>
                    <TableCell className="font-mono font-bold">
                      {formatCurrency(record.netSalary)}
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("عرض تفاصيل المسير")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("تحميل المسير")}
                        >
                          <Download className="h-4 w-4" />
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

export default ManageSalaryRecordsPage;
