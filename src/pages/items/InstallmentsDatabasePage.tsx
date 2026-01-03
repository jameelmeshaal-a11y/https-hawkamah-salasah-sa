import { useParams } from "react-router-dom";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Search, Download, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/shared/StatusBadge";

const InstallmentsDatabasePage = () => {
  const { moduleId } = useParams();

  const installments = [
    {
      id: 1,
      status: "معلق",
      installmentTitle: "القسط الأول - مشروع البقالة",
      beneficiaryFile: "BEN-001",
      fileNumber: "F-2024-001",
      projectTitle: "مشروع البقالة الصغيرة",
      projectNumber: "PRJ-001",
      actionTaken: "في الانتظار",
    },
    {
      id: 2,
      status: "معلق",
      installmentTitle: "القسط الثاني - مشروع الخياطة",
      beneficiaryFile: "BEN-002",
      fileNumber: "F-2024-002",
      projectTitle: "مشروع الخياطة المنزلية",
      projectNumber: "PRJ-002",
      actionTaken: "قيد المراجعة",
    },
    {
      id: 3,
      status: "معلق",
      installmentTitle: "القسط الأول - مشروع التجارة",
      beneficiaryFile: "BEN-003",
      fileNumber: "F-2024-003",
      projectTitle: "مشروع التجارة الإلكترونية",
      projectNumber: "PRJ-003",
      actionTaken: "في الانتظار",
    },
    {
      id: 4,
      status: "معلق",
      installmentTitle: "القسط الثالث - مشروع الزراعة",
      beneficiaryFile: "BEN-004",
      fileNumber: "F-2024-004",
      projectTitle: "مشروع الزراعة المائية",
      projectNumber: "PRJ-004",
      actionTaken: "قيد المراجعة",
    },
  ];

  return (
    <InnerPageLayout moduleId={moduleId || "projects"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">قاعدة بيانات الأقساط</h1>
              <p className="text-muted-foreground text-sm">
                إدارة ومتابعة أقساط المشاريع التأهيلية
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث عام..." className="pr-10" />
                </div>
              </div>
              <Select defaultValue="20">
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">قائمة الأقساط</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">عنوان القسط</TableHead>
                    <TableHead className="text-right">ملف المستفيد</TableHead>
                    <TableHead className="text-right">رقم الملف</TableHead>
                    <TableHead className="text-right">عنوان المشروع</TableHead>
                    <TableHead className="text-right">المشروع</TableHead>
                    <TableHead className="text-right">الإجراء المتخذ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installments.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <StatusBadge status={item.status} type="warning" />
                      </TableCell>
                      <TableCell className="font-medium">{item.installmentTitle}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 gap-1">
                          <Eye className="h-4 w-4" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell>{item.fileNumber}</TableCell>
                      <TableCell>{item.projectTitle}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 gap-1">
                          <Eye className="h-4 w-4" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell>{item.actionTaken}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>عرض 1 إلى 4 من 4 سجل</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  السابق
                </Button>
                <Button variant="outline" size="sm" disabled>
                  التالي
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default InstallmentsDatabasePage;
