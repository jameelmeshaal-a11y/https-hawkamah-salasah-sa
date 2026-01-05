import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Filter, RefreshCw, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const programsData = [
  {
    id: 1,
    name: "دورة في الرسم",
    type: "فتيات",
    status: "مكتمل",
    statusDescription: "تم إكمال البرنامج",
    year: "2024",
    startDate: { hijri: "1445/07/15", gregorian: "2024/01/26" },
    endDate: { hijri: "1445/08/20", gregorian: "2024/03/01" },
  },
  {
    id: 2,
    name: "دورة في الازياء",
    type: "توعوية وترفيهية",
    status: "معتمد/جاري",
    statusDescription: "تم تحديث البرنامج",
    year: "2024",
    startDate: { hijri: "1445/09/01", gregorian: "2024/03/11" },
    endDate: { hijri: "1445/10/15", gregorian: "2024/04/24" },
  },
  {
    id: 3,
    name: "دورة في الخياطة",
    type: "فتيات",
    status: "معتمد/جاري",
    statusDescription: "تم تحويل البرنامج",
    year: "2024",
    startDate: { hijri: "1445/08/10", gregorian: "2024/02/20" },
    endDate: { hijri: "1445/09/25", gregorian: "2024/04/04" },
  },
  {
    id: 4,
    name: "جلسة علاجية لمريض توحد",
    type: "صحية",
    status: "معتمد/جاري",
    statusDescription: "تم تحديث البرنامج",
    year: "2024",
    startDate: { hijri: "1445/10/01", gregorian: "2024/04/10" },
    endDate: { hijri: "1445/11/15", gregorian: "2024/05/23" },
  },
  {
    id: 5,
    name: "دورة في الأمن السيبراني",
    type: "برنامج تدريبي",
    status: "معتمد/جاري",
    statusDescription: "تم تحديث البرنامج",
    year: "2024",
    startDate: { hijri: "1445/11/01", gregorian: "2024/05/09" },
    endDate: { hijri: "1446/01/15", gregorian: "2024/07/20" },
  },
  {
    id: 6,
    name: "دوالية ومسابقات",
    type: "توعوية وترفيهية",
    status: "قيد تقديم الخطة",
    statusDescription: "قيد تقديم الخطة و الميزانية",
    year: "2024",
    startDate: { hijri: "1446/02/01", gregorian: "2024/08/05" },
    endDate: { hijri: "1446/03/15", gregorian: "2024/09/18" },
  },
  {
    id: 7,
    name: "جلسة استشارات",
    type: "برنامج تدريبي",
    status: "قيد تسجيل الفريق",
    statusDescription: "قيد تسجيل الفريق",
    year: "2024",
    startDate: { hijri: "1446/03/01", gregorian: "2024/09/04" },
    endDate: { hijri: "1446/04/15", gregorian: "2024/10/17" },
  },
  {
    id: 8,
    name: "جلسة علاجية لمرضى السرطان",
    type: "صحية",
    status: "قيد تسجيل الفريق",
    statusDescription: "قيد تسجيل الفريق",
    year: "2024",
    startDate: { hijri: "1446/04/01", gregorian: "2024/10/04" },
    endDate: { hijri: "1446/05/20", gregorian: "2024/11/21" },
  },
  {
    id: 9,
    name: "دورة في المحاسبة",
    type: "برنامج تدريبي",
    status: "قيد إعتماد الفريق",
    statusDescription: "قيد إعتماد الفريق",
    year: "2024",
    startDate: { hijri: "1446/05/01", gregorian: "2024/11/02" },
    endDate: { hijri: "1446/06/15", gregorian: "2024/12/15" },
  },
  {
    id: 10,
    name: "دورة في القانون",
    type: "برنامج تدريبي",
    status: "قيد إعتماد المقترح",
    statusDescription: "قيد إعتماد المقترح",
    year: "2024",
    startDate: { hijri: "1446/06/01", gregorian: "2024/12/02" },
    endDate: { hijri: "1446/07/20", gregorian: "2025/01/19" },
  },
  {
    id: 11,
    name: "دورة في الجمال والمكياج",
    type: "فتيات",
    status: "قيد إعتماد المقترح",
    statusDescription: "قيد إعتماد المقترح",
    year: "2024",
    startDate: { hijri: "1446/07/01", gregorian: "2024/12/31" },
    endDate: { hijri: "1446/08/15", gregorian: "2025/02/13" },
  },
  {
    id: 12,
    name: "برنامج شارك واكسب",
    type: "توعوية وترفيهية",
    status: "قيد إعتماد المقترح",
    statusDescription: "قيد إعتماد المقترح",
    year: "2024",
    startDate: { hijri: "1446/08/01", gregorian: "2025/01/30" },
    endDate: { hijri: "1446/09/20", gregorian: "2025/03/20" },
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "مكتمل":
      return "bg-green-100 text-green-800 border-green-300";
    case "معتمد/جاري":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "قيد تقديم الخطة":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "قيد تسجيل الفريق":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "قيد إعتماد الفريق":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "قيد إعتماد المقترح":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const ProgramsIndicatorsPage = () => {
  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="programs-indicators"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="إدارة مؤشرات البرامج"
    >
      <Card>
        <CardContent className="p-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عام..." className="pr-10 text-right" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 ml-2" />
                فلتر
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
                <Select defaultValue="20">
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right font-semibold">معاينة</TableHead>
                  <TableHead className="text-right font-semibold">اسم البرنامج</TableHead>
                  <TableHead className="text-right font-semibold">نوع البرنامج</TableHead>
                  <TableHead className="text-right font-semibold">حالة البرنامج</TableHead>
                  <TableHead className="text-right font-semibold">وصف الحالة</TableHead>
                  <TableHead className="text-right font-semibold">العام</TableHead>
                  <TableHead className="text-right font-semibold">تاريخ البداية</TableHead>
                  <TableHead className="text-right font-semibold">تاريخ النهاية</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programsData.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                        <Eye className="h-4 w-4 ml-1" />
                        معاينة
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{program.name}</TableCell>
                    <TableCell>{program.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(program.status)}>
                        {program.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{program.statusDescription}</TableCell>
                    <TableCell>{program.year}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{program.startDate.hijri}</div>
                        <div className="text-muted-foreground text-xs">{program.startDate.gregorian}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{program.endDate.hijri}</div>
                        <div className="text-muted-foreground text-xs">{program.endDate.gregorian}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <span>إظهار السجلات 1 إلى {programsData.length} من {programsData.length}</span>
          </div>
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default ProgramsIndicatorsPage;
