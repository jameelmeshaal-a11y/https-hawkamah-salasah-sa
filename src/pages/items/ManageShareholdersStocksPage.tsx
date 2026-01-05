import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Plus, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageShareholdersStocksPage = () => {
  const columns = ["رقم الحساب", "الإسم", "عدد الأسهم", "تاريخ الشراء", "قيمة الأسهم"];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="إدارة أسهم المساهمين"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">إدارة أسهم المساهمين</h1>
        </div>

        {/* Alert */}
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            يرجي تحديد السهم التأسيسي من خلال الضبط على زر المجاور لاضافة فقط من صفحة إعدادات المساهمين
          </AlertDescription>
        </Alert>

        {/* Form */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>ملف المساهم *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="بدون" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">بدون</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stockCount">عدد الأسهم *</Label>
                <Input id="stockCount" type="number" placeholder="أدخل عدد الأسهم" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">تاريخ الشراء *</Label>
                <Input id="purchaseDate" type="date" />
              </div>
            </div>

            <div className="flex justify-start">
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                <Plus className="h-4 w-4" />
                إضافة سجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col} className="text-right">{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <EmptyState message="لا توجد أسهم مسجلة" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageShareholdersStocksPage;
