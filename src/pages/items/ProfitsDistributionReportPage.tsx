import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PieChart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfitsDistributionReportPage = () => {
  const [confineTransactions, setConfineTransactions] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];

  const columns = [
    { key: "accountNumber", label: "رقم الحساب" },
    { key: "name", label: "الإسم" },
    { key: "stockCount", label: "عدد الأسهم" },
    { key: "ownershipPercentage", label: "نسبة الملكية" },
    { key: "profitValue", label: "قيمة الأرباح" },
  ];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="تقرير توزيع الأرباح"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <PieChart className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">تقرير توزيع الأرباح</h1>
        </div>

        {/* Filter Form */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Year Field */}
            <div className="space-y-2">
              <Label>السنة *</Label>
              <Select defaultValue={currentYear.toString()}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">يظهر فقط السنوات التي بها أرباح</p>
            </div>

            {/* Confine Transactions Switch */}
            <div className="space-y-2">
              <Label>حصر المعاملات *</Label>
              <div className="flex items-center gap-4">
                <span className={`text-sm ${!confineTransactions ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>لا</span>
                <Switch
                  checked={confineTransactions}
                  onCheckedChange={setConfineTransactions}
                />
                <span className={`text-sm ${confineTransactions ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>نعم</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Report Button */}
        <Card>
          <CardContent className="pt-6">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              عرض التقرير
            </Button>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((col) => (
                      <TableHead key={col.key} className="text-right whitespace-nowrap">
                        {col.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                      اختر السنة ثم اضغط عرض التقرير
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ProfitsDistributionReportPage;
