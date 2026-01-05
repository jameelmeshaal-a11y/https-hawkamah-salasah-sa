import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BarChart3, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ShareholdersManagementStatisticsPage = () => {
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  
  const capitalData = years.map(year => ({ year: year.toString(), value: 0 }));
  const expensesData = years.map(year => ({ year: year.toString(), value: 0 }));
  const profitsData = years.map(year => ({ year: year.toString(), value: 0 }));
  const top20Data: { name: string; stocks: number }[] = [];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="إحصائيات إدارة المساهمين"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">إحصائيات إدارة المساهمين</h1>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Capital Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <h3 className="font-semibold">رأس المال</h3>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={capitalData}>
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" name="رأس المال" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-800 hover:bg-slate-800">
                    <TableHead className="text-white text-right">السنة</TableHead>
                    <TableHead className="text-white text-right">رأس المال الإجمالي</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {years.map(year => (
                    <TableRow key={year}>
                      <TableCell>{year}</TableCell>
                      <TableCell>0</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Issuance Expenses Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <h3 className="font-semibold">مصروفات الإصدار</h3>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expensesData}>
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 1]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" name="مصروفات الإصدار" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-800 hover:bg-slate-800">
                    <TableHead className="text-white text-right">السنة</TableHead>
                    <TableHead className="text-white text-right">مصروفات الإصدار</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                      لا توجد بيانات
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Annual Profits Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <h3 className="font-semibold">الأرباح السنوية</h3>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitsData}>
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8b5cf6" name="الأرباح" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-800 hover:bg-slate-800">
                    <TableHead className="text-white text-right">السنة</TableHead>
                    <TableHead className="text-white text-right">الأرباح</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                      لا توجد بيانات
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top 20 Shareholders Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <h3 className="font-semibold">أكبر 20 مساهم</h3>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={top20Data} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="stocks" fill="#f59e0b" name="عدد الأسهم" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-800 hover:bg-slate-800">
                    <TableHead className="text-white text-right">المساهم</TableHead>
                    <TableHead className="text-white text-right">عدد الأسهم</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                      لا توجد بيانات
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default ShareholdersManagementStatisticsPage;
