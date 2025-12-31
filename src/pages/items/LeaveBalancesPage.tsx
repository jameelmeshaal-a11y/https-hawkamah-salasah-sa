import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, ChevronLeft, ChevronRight, Search, FileSpreadsheet, Download } from "lucide-react";
import { useState } from "react";

const years = [2021, 2022, 2023, 2024, 2025];

const balanceDefinitions = [
  "رصيد الإجازات: إجمالي أيام الإجازات المستحقة للموظف خلال السنة",
  "الإجازات من الرصيد: عدد أيام الإجازات التي تم استخدامها من الرصيد الأساسي",
  "المتبقي من الرصيد: الفرق بين رصيد الإجازات والإجازات المستخدمة",
  "إجمالي الإجازات: مجموع جميع أيام الإجازات المأخوذة",
  "إجمالي أيام السماحية: عدد أيام السماحية المسموح بها للموظف",
  "المتبقي من أيام السماحية: أيام السماحية غير المستخدمة",
  "رصيد الأذونات: إجمالي ساعات الأذونات المسموح بها شهرياً",
  "الأذونات: ساعات الأذونات المستخدمة خلال الفترة",
];

const tableColumns = [
  "#",
  "الموظف",
  "رصيد الإجازات",
  "الإجازات من الرصيد",
  "المتبقي من الرصيد",
  "إجمالي الإجازات",
  "إجمالي أيام السماحية",
  "المتبقي من أيام السماحية",
  "رصيد الأذونات",
  "الأذونات",
  "المتبقي",
  "معاينة سجلات الرصيد",
];

const LeaveBalancesPage = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="leave-balances"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="سجلات أرصدة الإجازات"
    >
      <div className="space-y-6">
        {/* Year Selection Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" className="gap-2">
                <ChevronRight className="h-4 w-4" />
                السابق
              </Button>
              
              <div className="flex items-center gap-2">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(year)}
                    className="gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    {year}
                  </Button>
                ))}
              </div>

              <Button variant="outline" size="sm" className="gap-2">
                الحالي
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Balance Definitions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">تعريفات الرصيد</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {balanceDefinitions.map((definition, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{definition}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Leave Balances Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-lg">أرصدة الإجازات والأذونات</CardTitle>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 w-64"
                  />
                </div>
                <Button variant="default" size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <FileSpreadsheet className="h-4 w-4" />
                  تصدير إكسل
                </Button>
                <Button variant="default" size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <Download className="h-4 w-4" />
                  تصدير الكل
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {tableColumns.map((column, index) => (
                      <TableHead key={index} className="text-center whitespace-nowrap">
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={tableColumns.length} className="text-center py-12 text-muted-foreground">
                      لا توجد بيانات متوفرة للسنة المحددة
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

export default LeaveBalancesPage;
