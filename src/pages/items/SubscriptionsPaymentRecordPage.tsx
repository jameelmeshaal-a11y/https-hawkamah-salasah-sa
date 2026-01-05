import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardList, Search, Filter, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";
import ExportDropdown from "@/components/shared/ExportDropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubscriptionsPaymentRecordPage = () => {
  const columns = [
    { key: "transactionNumber", label: "رقم العملية" },
    { key: "accountNumber", label: "رقم الحساب" },
    { key: "name", label: "الإسم" },
    { key: "amount", label: "المبلغ" },
    { key: "paymentDate", label: "تاريخ السداد" },
    { key: "paymentMethod", label: "طريقة الدفع" },
    { key: "status", label: "الحالة" },
  ];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="سجل سداد الإشتراكات"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <ClipboardList className="h-6 w-6 text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold">سجل سداد الإشتراكات</h1>
          </div>
          <ExportDropdown columns={columns} />
        </div>

        {/* Toolbar */}
        <Card>
          <CardContent className="p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" title="تحديث">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Search className="h-4 w-4" />
                  بحث متقدم
                </Button>
                <Button variant="outline" size="icon" title="فلتر">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="بحث..." className="w-48" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">إظهار:</span>
                  <Select defaultValue="20">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
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
                    <TableCell colSpan={columns.length}>
                      <EmptyState message="لا توجد سجلات سداد" />
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

export default SubscriptionsPaymentRecordPage;
