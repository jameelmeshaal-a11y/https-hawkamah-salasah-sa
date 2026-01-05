import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CheckCircle, Clock, AlertTriangle, PlayCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const statsData = {
  new: 5,
  inProgress: 8,
  stuck: 2,
  completed: 15,
};

const tasksData = [
  { id: 1, title: "مراجعة سياسة الإفصاح", assignee: "أحمد محمد", department: "الحوكمة", status: "جارية", progress: 60, dueDate: "1446/06/20" },
  { id: 2, title: "تحديث لائحة المخاطر", assignee: "سارة علي", department: "إدارة المخاطر", status: "متعثرة", progress: 30, dueDate: "1446/06/10" },
  { id: 3, title: "إعداد تقرير المراجعة", assignee: "خالد سعيد", department: "الرقابة", status: "جديدة", progress: 0, dueDate: "1446/06/25" },
  { id: 4, title: "تدقيق الالتزام", assignee: "نورة أحمد", department: "الالتزام", status: "منتهية", progress: 100, dueDate: "1446/05/30" },
  { id: 5, title: "تحديث الهيكل التنظيمي", assignee: "محمد علي", department: "الحوكمة", status: "جارية", progress: 45, dueDate: "1446/06/22" },
];

const GovernanceTasksStatsPage = () => {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "جديدة": "bg-blue-100 text-blue-800",
      "جارية": "bg-yellow-100 text-yellow-800",
      "متعثرة": "bg-red-100 text-red-800",
      "منتهية": "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const total = statsData.new + statsData.inProgress + statsData.stuck + statsData.completed;
  const completionRate = Math.round((statsData.completed / total) * 100);

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="governance-tasks-stats"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الحوكمة"
      title="إحصائيات مهام الحوكمة"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-blue-50">
            <CardContent className="p-4 text-center">
              <PlayCircle className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">{statsData.new}</div>
              <p className="text-sm">مهام جديدة</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
              <div className="text-2xl font-bold text-yellow-600">{statsData.inProgress}</div>
              <p className="text-sm">مهام جارية</p>
            </CardContent>
          </Card>
          <Card className="bg-red-50">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
              <div className="text-2xl font-bold text-red-600">{statsData.stuck}</div>
              <p className="text-sm">مهام متعثرة</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">{statsData.completed}</div>
              <p className="text-sm">مهام منتهية</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
              <p className="text-sm">نسبة الإنجاز</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              توزيع المهام حسب الحالة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm">جديدة</span>
                <Progress value={(statsData.new / total) * 100} className="flex-1 h-4" />
                <span className="w-12 text-sm text-left">{Math.round((statsData.new / total) * 100)}%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm">جارية</span>
                <Progress value={(statsData.inProgress / total) * 100} className="flex-1 h-4" />
                <span className="w-12 text-sm text-left">{Math.round((statsData.inProgress / total) * 100)}%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm">متعثرة</span>
                <Progress value={(statsData.stuck / total) * 100} className="flex-1 h-4" />
                <span className="w-12 text-sm text-left">{Math.round((statsData.stuck / total) * 100)}%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm">منتهية</span>
                <Progress value={(statsData.completed / total) * 100} className="flex-1 h-4" />
                <span className="w-12 text-sm text-left">{Math.round((statsData.completed / total) * 100)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>جدول المهام التفصيلي</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المهمة</TableHead>
                  <TableHead className="text-right">المسؤول</TableHead>
                  <TableHead className="text-right">القسم</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">التقدم</TableHead>
                  <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasksData.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>{task.department}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(task.status)}`}>
                        {task.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={task.progress} className="w-16 h-2" />
                        <span className="text-sm">{task.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GovernanceTasksStatsPage;
