import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Edit, Eye } from "lucide-react";
import { Download } from "lucide-react";

const projectsData = [
  {
    id: 1,
    projectNumber: "PRJ-2024-001",
    projectName: "مشروع تأهيل الأسر المنتجة",
    projectBalance: 49700.00,
    status: "جاري" as const,
    sector: "المنطقة الشرقية",
    village: "أخرى",
    targetCategory: "أخرى",
    supportType: "أخرى",
    supportCategory: "أخرى",
  },
  {
    id: 2,
    projectNumber: "PRJ-2024-002",
    projectName: "مشروع كفالة الأيتام",
    projectBalance: 125000.00,
    status: "مكتمل" as const,
    sector: "المنطقة الغربية",
    village: "جدة",
    targetCategory: "أيتام",
    supportType: "كفالة",
    supportCategory: "شهرية",
  },
  {
    id: 3,
    projectNumber: "PRJ-2024-003",
    projectName: "مشروع الإغاثة العاجلة",
    projectBalance: 0,
    status: "جديد" as const,
    sector: "المنطقة الوسطى",
    village: "الرياض",
    targetCategory: "متضررين",
    supportType: "إغاثة",
    supportCategory: "طارئة",
  },
  {
    id: 4,
    projectNumber: "PRJ-2024-004",
    projectName: "مشروع بناء المساكن",
    projectBalance: 350000.00,
    status: "جاري" as const,
    sector: "المنطقة الجنوبية",
    village: "أبها",
    targetCategory: "أسر محتاجة",
    supportType: "إسكان",
    supportCategory: "بناء",
  },
];

const getStatusBadge = (status: "جاري" | "مكتمل" | "جديد") => {
  switch (status) {
    case "جاري":
      return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
    case "مكتمل":
      return <Badge className="bg-emerald-700 hover:bg-emerald-800">{status}</Badge>;
    case "جديد":
      return <Badge className="bg-red-500 hover:bg-red-600">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const ProjectsIndicatorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsData.filter(project =>
    project.projectName.includes(searchQuery) ||
    project.projectNumber.includes(searchQuery)
  );

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="projects-indicators"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="إدارة مؤشرات المشاريع"
    >
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عام"
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" title="تصدير">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
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
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right">رقم المشروع</TableHead>
                  <TableHead className="text-right">ملف المشروع</TableHead>
                  <TableHead className="text-right">اسم المشروع</TableHead>
                  <TableHead className="text-right">رصيد المشروع</TableHead>
                  <TableHead className="text-right">حالة المشروع</TableHead>
                  <TableHead className="text-right">القطاع - المحافظة</TableHead>
                  <TableHead className="text-right">القرية - الحي</TableHead>
                  <TableHead className="text-right">الفئة المستهدفة</TableHead>
                  <TableHead className="text-right">نوع الدعم</TableHead>
                  <TableHead className="text-right">فئة الدعم</TableHead>
                  <TableHead className="text-right w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                      لا توجد بيانات متوفرة في الجدول
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.projectNumber}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4 ml-1" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell>{project.projectName}</TableCell>
                      <TableCell className="font-medium">
                        {project.projectBalance.toLocaleString("ar-SA", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(project.status)}</TableCell>
                      <TableCell>{project.sector}</TableCell>
                      <TableCell>{project.village}</TableCell>
                      <TableCell>{project.targetCategory}</TableCell>
                      <TableCell>{project.supportType}</TableCell>
                      <TableCell>{project.supportCategory}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-muted-foreground">
          إظهار السجلات {filteredProjects.length > 0 ? 1 : 0} إلى {filteredProjects.length} من {filteredProjects.length}
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default ProjectsIndicatorsPage;
