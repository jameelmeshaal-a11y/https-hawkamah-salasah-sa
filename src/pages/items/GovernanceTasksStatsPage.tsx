import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, MoreHorizontal, BarChart3, PieChart, LineChart, AreaChart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

const taskStatusData = [
  { name: "جديدة", value: 12, color: "#6b7280" },
  { name: "جارية", value: 25, color: "#3b82f6" },
  { name: "متعثرة", value: 5, color: "#f97316" },
  { name: "منتهية", value: 8, color: "#ef4444" },
  { name: "منجزة", value: 45, color: "#22c55e" },
];

const tasksByYearData = [
  { year: "2022", count: 35 },
  { year: "2023", count: 48 },
  { year: "2024", count: 95 },
];

const tasksByEmployeeData = [
  { employee: "أحمد محمد", count: 15 },
  { employee: "سارة علي", count: 12 },
  { employee: "خالد سعيد", count: 18 },
  { employee: "نورة أحمد", count: 10 },
  { employee: "محمد علي", count: 8 },
  { employee: "فاطمة خالد", count: 14 },
];

const tasksByCriteriaData = [
  { criterion: "الالتزام والامتثال", count: 42, color: "#3b82f6" },
  { criterion: "الشفافية والإفصاح", count: 28, color: "#22c55e" },
  { criterion: "السلامة المالية", count: 25, color: "#f97316" },
];

const tasksByIndicatorData = [
  { indicator: "المؤشر 1", count: 12, color: "#3b82f6" },
  { indicator: "المؤشر 2", count: 18, color: "#22c55e" },
  { indicator: "المؤشر 3", count: 8, color: "#f97316" },
  { indicator: "المؤشر 4", count: 15, color: "#8b5cf6" },
  { indicator: "المؤشر 5", count: 22, color: "#ec4899" },
  { indicator: "المؤشر 6", count: 10, color: "#06b6d4" },
];

const tasksByPracticeData = [
  { practice: "الممارسة 1.1", count: 8 },
  { practice: "الممارسة 1.2", count: 5 },
  { practice: "الممارسة 2.4", count: 12 },
  { practice: "الممارسة 3.8", count: 7 },
  { practice: "الممارسة 5.17", count: 15 },
  { practice: "الممارسة 6.18", count: 10 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#ef4444", "#8b5cf6", "#06b6d4"];

type ChartType = "bar" | "line" | "pie" | "area";

const GovernanceTasksStatsPage = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [chartTypes, setChartTypes] = useState<Record<string, ChartType>>({
    status: "bar",
    years: "bar",
    employees: "bar",
    criteria: "bar",
    indicators: "bar",
    practices: "bar",
  });

  const handleView = () => {
    setShowStats(true);
  };

  const changeChartType = (chartId: string, type: ChartType) => {
    setChartTypes(prev => ({ ...prev, [chartId]: type }));
  };

  const renderChart = (chartId: string, data: any[], dataKey: string, nameKey: string, title: string) => {
    const type = chartTypes[chartId];

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeChartType(chartId, "bar")}>
                <BarChart3 className="h-4 w-4 ml-2" />
                مخطط شريطي
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeChartType(chartId, "line")}>
                <LineChart className="h-4 w-4 ml-2" />
                مخطط خطي
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeChartType(chartId, "pie")}>
                <PieChart className="h-4 w-4 ml-2" />
                مخطط دائري
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeChartType(chartId, "area")}>
                <AreaChart className="h-4 w-4 ml-2" />
                مخطط مساحي
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 ml-2" />
                تحميل المخطط
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {type === "bar" ? (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={nameKey} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={dataKey} fill="#3b82f6">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              ) : type === "line" ? (
                <RechartsLineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={nameKey} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey={dataKey} stroke="#3b82f6" strokeWidth={2} />
                </RechartsLineChart>
              ) : type === "pie" ? (
                <RechartsPieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey={dataKey}
                    nameKey={nameKey}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              ) : (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={nameKey} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={dataKey} fill="#3b82f6" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">{title}</TableHead>
                  <TableHead className="text-right">عدد المهام</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item[nameKey]}</TableCell>
                    <TableCell>{item[dataKey]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!showStats) {
    return (
      <InnerPageLayout
        moduleId="excellence"
        itemSlug="governance-tasks-stats"
        moduleTitle="إدارة التميز المؤسسي"
        sectionTitle="إدارة الحوكمة"
        title="إحصائيات مهام الحوكمة"
      >
        <Card className="max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle>اختر السنة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="اختر..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل السنوات</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleView} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!selectedYear}
            >
              <Eye className="h-4 w-4 ml-2" />
              عرض
            </Button>
          </CardContent>
        </Card>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="governance-tasks-stats"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الحوكمة"
      title="إحصائيات مهام الحوكمة"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            إحصائيات مهام الحوكمة - {selectedYear === "all" ? "كل السنوات" : selectedYear}
          </h3>
          <Button variant="outline" onClick={() => setShowStats(false)}>
            تغيير الفترة
          </Button>
        </div>

        <Tabs defaultValue="selected" className="w-full">
          <TabsList>
            <TabsTrigger value="selected">السنة المحددة</TabsTrigger>
            <TabsTrigger value="all">كل السنوات</TabsTrigger>
          </TabsList>

          <TabsContent value="selected" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {taskStatusData.map((status) => (
                <Card key={status.name} style={{ borderTop: `4px solid ${status.color}` }}>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold" style={{ color: status.color }}>{status.value}</div>
                    <p className="text-sm text-muted-foreground">{status.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderChart("status", taskStatusData, "value", "name", "مهام الحوكمة")}
              {renderChart("years", tasksByYearData, "count", "year", "سنوات مهام الحوكمة")}
              {renderChart("employees", tasksByEmployeeData, "count", "employee", "موظفي مهام الحوكمة")}
              {renderChart("criteria", tasksByCriteriaData, "count", "criterion", "مهام معايير الحوكمة")}
              {renderChart("indicators", tasksByIndicatorData, "count", "indicator", "مهام مؤشرات الحوكمة")}
              {renderChart("practices", tasksByPracticeData, "count", "practice", "مهام ممارسات الحوكمة")}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderChart("years", tasksByYearData, "count", "year", "سنوات مهام الحوكمة")}
              {renderChart("criteria", tasksByCriteriaData, "count", "criterion", "مهام معايير الحوكمة")}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </InnerPageLayout>
  );
};

export default GovernanceTasksStatsPage;
