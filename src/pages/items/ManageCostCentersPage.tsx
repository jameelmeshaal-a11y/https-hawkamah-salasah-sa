import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Plus, Search, Download, Edit, Trash2, Eye, FolderTree } from "lucide-react";
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

interface CostCenter {
  id: string;
  code: string;
  name: string;
  parentCode?: string;
  parentName?: string;
  level: number;
  status: "active" | "inactive";
  budget: number;
  spent: number;
  manager: string;
}

const ManageCostCentersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const costCenters: CostCenter[] = [
    {
      id: "1",
      code: "CC01",
      name: "الإدارة العامة",
      level: 1,
      status: "active",
      budget: 500000,
      spent: 320000,
      manager: "أحمد محمد الشريف",
    },
    {
      id: "2",
      code: "CC0101",
      name: "الموارد البشرية",
      parentCode: "CC01",
      parentName: "الإدارة العامة",
      level: 2,
      status: "active",
      budget: 150000,
      spent: 95000,
      manager: "سعد العتيبي",
    },
    {
      id: "3",
      code: "CC0102",
      name: "الشؤون المالية",
      parentCode: "CC01",
      parentName: "الإدارة العامة",
      level: 2,
      status: "active",
      budget: 200000,
      spent: 145000,
      manager: "محمد علي",
    },
    {
      id: "4",
      code: "CC02",
      name: "قسم المشاريع",
      level: 1,
      status: "active",
      budget: 800000,
      spent: 520000,
      manager: "خالد الغامدي",
    },
    {
      id: "5",
      code: "CC03",
      name: "قسم الكفالات",
      level: 1,
      status: "active",
      budget: 1200000,
      spent: 980000,
      manager: "فهد الشمري",
    },
    {
      id: "6",
      code: "CC04",
      name: "قسم التسويق",
      level: 1,
      status: "inactive",
      budget: 100000,
      spent: 25000,
      manager: "عبدالله القحطاني",
    },
  ];

  const getStatusBadge = (status: CostCenter["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">غير نشط</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA").format(amount) + " ر.س";
  };

  const getUtilization = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    let color = "text-green-600";
    if (percentage > 90) color = "text-red-600";
    else if (percentage > 75) color = "text-yellow-600";
    return <span className={`font-bold ${color}`}>{percentage.toFixed(1)}%</span>;
  };

  const filteredCenters = costCenters.filter(
    (center) =>
      center.name.includes(searchQuery) ||
      center.code.includes(searchQuery)
  );

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="إدارة مراكز التكلفة"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي المراكز</div>
              <div className="text-2xl font-bold text-primary">{costCenters.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المراكز النشطة</div>
              <div className="text-2xl font-bold text-green-600">
                {costCenters.filter((c) => c.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي الموازنات</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(costCenters.reduce((sum, c) => sum + c.budget, 0))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي المصروفات</div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(costCenters.reduce((sum, c) => sum + c.spent, 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderTree className="h-5 w-5" />
              مراكز التكلفة
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
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 ml-2" />
                إضافة مركز تكلفة
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الكود</TableHead>
                  <TableHead className="text-right">اسم المركز</TableHead>
                  <TableHead className="text-right">المركز الأب</TableHead>
                  <TableHead className="text-right">المسؤول</TableHead>
                  <TableHead className="text-right">الموازنة</TableHead>
                  <TableHead className="text-right">المصروف</TableHead>
                  <TableHead className="text-right">نسبة الاستخدام</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCenters.map((center) => (
                  <TableRow key={center.id}>
                    <TableCell className="font-mono font-medium">
                      {center.code}
                    </TableCell>
                    <TableCell
                      style={{ paddingRight: `${center.level * 16}px` }}
                      className="font-medium"
                    >
                      {center.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {center.parentName || "-"}
                    </TableCell>
                    <TableCell>{center.manager}</TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(center.budget)}
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(center.spent)}
                    </TableCell>
                    <TableCell>{getUtilization(center.spent, center.budget)}</TableCell>
                    <TableCell>{getStatusBadge(center.status)}</TableCell>
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
                          onClick={() => toast.info("تعديل المركز")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.error("حذف المركز")}
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

export default ManageCostCentersPage;
