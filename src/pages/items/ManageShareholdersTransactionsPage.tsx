import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardList, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageShareholdersTransactionsPage = () => {
  const columns = ["رقم المعاملة", "البند", "ملف المساهم", "تاريخ المعاملة", "قيمة المعاملة"];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="إدارة تعاملات المساهمين"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <ClipboardList className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">إدارة تعاملات المساهمين</h1>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item">البند *</Label>
                <Input id="item" placeholder="أدخل البند" />
              </div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transactionDate">تاريخ المعاملة *</Label>
                <Input id="transactionDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transactionValue">قيمة المعاملة *</Label>
                <Input id="transactionValue" type="number" placeholder="أدخل قيمة المعاملة" />
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
                    <EmptyState message="لا توجد تعاملات مسجلة" />
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

export default ManageShareholdersTransactionsPage;
