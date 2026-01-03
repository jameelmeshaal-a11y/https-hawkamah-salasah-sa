import { useParams } from "react-router-dom";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Download, Eye } from "lucide-react";
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

const RehabilitationProjectsReportsPage = () => {
  const { moduleId } = useParams();

  const projects = [
    {
      id: 1,
      calendar: "1446",
      projectNumber: "PRJ-001",
      projectName: "مشروع أفراح المعافين و الزواج",
      balance: "150,000",
      status: "جاري",
      sector: "المنطقة الوسطى",
      category: "أيتام",
      targetGroup: "أسر محتاجة",
      supportType: "دعم مالي",
      state: "نشط",
    },
    {
      id: 2,
      calendar: "1446",
      projectNumber: "PRJ-002",
      projectName: "مشروع مورد نزك",
      balance: "85,000",
      status: "مكتمل",
      sector: "المنطقة الشرقية",
      category: "أرامل",
      targetGroup: "نساء معيلات",
      supportType: "دعم عيني",
      state: "مغلق",
    },
  ];

  return (
    <InnerPageLayout moduleId={moduleId || "projects"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">تقارير المشاريع التأهيلية</h1>
              <p className="text-muted-foreground text-sm">
                عرض وإدارة تقارير المشاريع التأهيلية
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
                  <Input placeholder="بحث..." className="pr-10" />
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
            <CardTitle className="text-lg">قائمة المشاريع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">التقويم</TableHead>
                    <TableHead className="text-right">رقم المشروع</TableHead>
                    <TableHead className="text-right">ملف المشروع</TableHead>
                    <TableHead className="text-right">اسم المشروع</TableHead>
                    <TableHead className="text-right">رصيد المشروع</TableHead>
                    <TableHead className="text-right">حالة المشروع</TableHead>
                    <TableHead className="text-right">القطاع - المحافظة</TableHead>
                    <TableHead className="text-right">الفئة</TableHead>
                    <TableHead className="text-right">الفئة المستهدفة</TableHead>
                    <TableHead className="text-right">نوع الدعم</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.calendar}</TableCell>
                      <TableCell>{project.projectNumber}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 gap-1">
                          <Eye className="h-4 w-4" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">{project.projectName}</TableCell>
                      <TableCell>{project.balance} ر.س</TableCell>
                      <TableCell>
                        <StatusBadge status={project.status} />
                      </TableCell>
                      <TableCell>{project.sector}</TableCell>
                      <TableCell>{project.category}</TableCell>
                      <TableCell>{project.targetGroup}</TableCell>
                      <TableCell>{project.supportType}</TableCell>
                      <TableCell>
                        <StatusBadge status={project.state} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>عرض 1 إلى 2 من 2 سجل</span>
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

export default RehabilitationProjectsReportsPage;
