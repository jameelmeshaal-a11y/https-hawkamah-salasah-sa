import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Search, Download, RefreshCw, Filter, MoreHorizontal, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: number;
  indicatorNumber: string;
  year: string;
  dueDate: string;
  assignee: string;
  taskTiming: string;
  status: "منجزة" | "متعثرة" | "انقضت المدة" | "جارية" | "جديدة";
  progress: number;
}

interface NewTaskRow {
  id: number;
  year: string;
  indicatorNumber: string;
  practiceNumber: string;
  questionNumber: string;
  question: string;
  score: number;
  criterion: string;
  evaluationMechanism: string;
  dueDate: string;
}

const tasksData: Task[] = [
  { id: 1, indicatorNumber: "1.1", year: "2024", dueDate: "1446/06/20", assignee: "أحمد محمد", taskTiming: "شهري", status: "منجزة", progress: 100 },
  { id: 2, indicatorNumber: "2.4", year: "2024", dueDate: "1446/06/10", assignee: "سارة علي", taskTiming: "ربع سنوي", status: "متعثرة", progress: 30 },
  { id: 3, indicatorNumber: "3.8", year: "2024", dueDate: "1446/05/25", assignee: "خالد سعيد", taskTiming: "سنوي", status: "انقضت المدة", progress: 0 },
  { id: 4, indicatorNumber: "5.17", year: "2024", dueDate: "1446/07/01", assignee: "نورة أحمد", taskTiming: "شهري", status: "جارية", progress: 60 },
  { id: 5, indicatorNumber: "6.18", year: "2024", dueDate: "1446/07/15", assignee: "محمد علي", taskTiming: "ربع سنوي", status: "جديدة", progress: 0 },
];

const newTasksData: NewTaskRow[] = [
  { id: 1, year: "2024", indicatorNumber: "1", practiceNumber: "1.1", questionNumber: "1", question: "هل توجد لائحة أساسية معتمدة للجمعية؟", score: 3, criterion: "الالتزام والامتثال", evaluationMechanism: "وثائقي", dueDate: "" },
  { id: 2, year: "2024", indicatorNumber: "1", practiceNumber: "1.2", questionNumber: "2", question: "هل تم تحديد فئات وشروط العضوية؟", score: 1, criterion: "الالتزام والامتثال", evaluationMechanism: "وثائقي", dueDate: "" },
  { id: 3, year: "2024", indicatorNumber: "2", practiceNumber: "2.4", questionNumber: "3", question: "ما حالة اشتراكات أعضاء الجمعية العمومية؟", score: 3, criterion: "الالتزام والامتثال", evaluationMechanism: "إحصائي", dueDate: "" },
  { id: 4, year: "2024", indicatorNumber: "1", practiceNumber: "1.1", questionNumber: "1", question: "هل لدى الجمعية موقع إلكتروني محدث؟", score: 5, criterion: "الشفافية والإفصاح", evaluationMechanism: "ميداني", dueDate: "" },
  { id: 5, year: "2024", indicatorNumber: "1", practiceNumber: "1.1", questionNumber: "1", question: "هل يوجد هيكل تنظيمي معتمد؟", score: 8, criterion: "السلامة المالية", evaluationMechanism: "وثائقي", dueDate: "" },
];

const getStatusBadge = (status: Task["status"]) => {
  const styles: Record<string, string> = {
    "منجزة": "bg-green-100 text-green-800 border-green-200",
    "متعثرة": "bg-orange-100 text-orange-800 border-orange-200",
    "انقضت المدة": "bg-red-100 text-red-800 border-red-200",
    "جارية": "bg-blue-100 text-blue-800 border-blue-200",
    "جديدة": "bg-gray-100 text-gray-800 border-gray-200",
  };
  return styles[status] || "bg-gray-100 text-gray-800";
};

const getProgressColor = (status: Task["status"]) => {
  switch (status) {
    case "منجزة": return "bg-green-500";
    case "متعثرة": return "bg-orange-500";
    case "انقضت المدة": return "bg-red-500";
    case "جارية": return "bg-blue-500";
    default: return "bg-gray-500";
  }
};

const GovernanceTasksPage = () => {
  const [showTasks, setShowTasks] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [pageSize, setPageSize] = useState("20");

  const criteriaFilters = [
    { id: "all", label: "كل المعايير" },
    { id: "commitment", label: "الالتزام والامتثال" },
    { id: "transparency", label: "الشفافية والإفصاح" },
    { id: "financial", label: "السلامة المالية" },
  ];

  const filteredTasks = tasksData.filter(task => 
    task.indicatorNumber.includes(searchQuery) || 
    task.assignee.includes(searchQuery)
  );

  const filteredNewTasks = newTasksData.filter(task => {
    const matchesSearch = task.question.includes(searchQuery) || task.indicatorNumber.includes(searchQuery);
    const matchesFilter = activeFilter === "all" || 
      (activeFilter === "commitment" && task.criterion === "الالتزام والامتثال") ||
      (activeFilter === "transparency" && task.criterion === "الشفافية والإفصاح") ||
      (activeFilter === "financial" && task.criterion === "السلامة المالية");
    return matchesSearch && matchesFilter;
  });

  const handleConfirm = () => {
    if (selectedYear) {
      setShowTasks(true);
    }
  };

  if (!showTasks) {
    return (
      <InnerPageLayout
        moduleId="excellence"
        itemSlug="governance-tasks"
        moduleTitle="إدارة التميز المؤسسي"
        sectionTitle="إدارة الحوكمة"
        title="إدارة مهام الحوكمة"
      >
        <Card className="max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle>اختر السنة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="اختر السنة..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleConfirm} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!selectedYear}
            >
              تأكيد
            </Button>
          </CardContent>
        </Card>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="governance-tasks"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الحوكمة"
      title="إدارة مهام الحوكمة"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">إدارة مهام الحوكمة - {selectedYear}</h3>
          <Button variant="outline" onClick={() => setShowTasks(false)}>
            تغيير السنة
          </Button>
        </div>

        {/* Criteria Filters */}
        <div className="flex flex-wrap gap-2">
          {criteriaFilters.map(filter => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={activeFilter === filter.id ? "bg-primary" : ""}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="registered" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="registered">المهام المسجلة</TabsTrigger>
            <TabsTrigger value="create">إنشاء مهمة جديدة</TabsTrigger>
          </TabsList>

          <TabsContent value="registered">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">سجلات الصفحة:</span>
                    <Select value={pageSize} onValueChange={setPageSize}>
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
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-right">رقم المؤشر</TableHead>
                        <TableHead className="text-right">السنة</TableHead>
                        <TableHead className="text-right">تاريخ انتهاء المهمة</TableHead>
                        <TableHead className="text-right">الموظف المكلف</TableHead>
                        <TableHead className="text-right">توقيت المهمة</TableHead>
                        <TableHead className="text-right">حالة المهمة</TableHead>
                        <TableHead className="text-right">نسبة الإنجاز</TableHead>
                        <TableHead className="text-center">معاينة</TableHead>
                        <TableHead className="text-center">إجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>
                            <a href="#" className="text-blue-600 hover:underline font-medium">
                              {task.indicatorNumber}
                            </a>
                          </TableCell>
                          <TableCell>{task.year}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>{task.assignee}</TableCell>
                          <TableCell>{task.taskTiming}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusBadge(task.status)}>
                              {task.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16">
                                <Progress value={task.progress} className="h-2" />
                              </div>
                              <span className="text-sm">{task.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">سجلات الصفحة:</span>
                    <Select value={pageSize} onValueChange={setPageSize}>
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
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-right">السنة</TableHead>
                        <TableHead className="text-right">رقم المؤشر</TableHead>
                        <TableHead className="text-right">رقم الممارسة</TableHead>
                        <TableHead className="text-right">رقم السؤال</TableHead>
                        <TableHead className="text-right">السؤال</TableHead>
                        <TableHead className="text-center">درجة السؤال</TableHead>
                        <TableHead className="text-right">المعيار</TableHead>
                        <TableHead className="text-right">آلية التقييم</TableHead>
                        <TableHead className="text-right">انتهاء المهمة</TableHead>
                        <TableHead className="text-center">إجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNewTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.year}</TableCell>
                          <TableCell>{task.indicatorNumber}</TableCell>
                          <TableCell>{task.practiceNumber}</TableCell>
                          <TableCell>{task.questionNumber}</TableCell>
                          <TableCell>
                            <a href="#" className="text-blue-600 hover:underline">
                              {task.question}
                            </a>
                          </TableCell>
                          <TableCell className="text-center">{task.score}</TableCell>
                          <TableCell>{task.criterion}</TableCell>
                          <TableCell>{task.evaluationMechanism}</TableCell>
                          <TableCell>
                            <Input type="date" className="w-32" />
                          </TableCell>
                          <TableCell className="text-center">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Plus className="h-4 w-4 ml-1" />
                              إنشاء
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InnerPageLayout>
  );
};

export default GovernanceTasksPage;
