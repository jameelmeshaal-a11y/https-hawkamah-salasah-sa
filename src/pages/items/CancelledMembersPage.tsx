import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMinus, Search, Filter, RefreshCw, Eye } from "lucide-react";
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

const CancelledMembersPage = () => {
  const columns = [
    { key: "accountNumber", label: "رقم الحساب" },
    { key: "preview", label: "معاينة" },
    { key: "name", label: "الإسم" },
    { key: "type", label: "النوع" },
    { key: "birthDate", label: "تاريخ الميلاد" },
    { key: "idNumber", label: "رقم الهوية" },
    { key: "mobile", label: "رقم الجوال" },
    { key: "membershipNumber", label: "رقم العضوية" },
    { key: "cancellationDate", label: "تاريخ الإلغاء" },
    { key: "cancellationReason", label: "سبب الإلغاء" },
  ];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="الأعضاء الملغاة عضوياتهم"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <UserMinus className="h-6 w-6 text-red-600" />
            </div>
            <h1 className="text-xl font-bold">الأعضاء الملغاة عضوياتهم</h1>
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
                      <EmptyState message="لا يوجد أعضاء ملغاة عضوياتهم" />
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

export default CancelledMembersPage;
