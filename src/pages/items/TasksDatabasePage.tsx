import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import { Search, Download, Eye, Edit, ImageOff, Paperclip } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

interface StatusCount {
  label: string;
  count: number;
  color: string;
  bgColor: string;
}

interface TaskRecord {
  id: number;
  taskTitle: string;
  taskStatus: string;
  completionPercentage: number;
  taskClassification: string;
  taskType: string;
  startDateHijri: string;
  startDateGregorian: string;
  endDateHijri: string;
  endDateGregorian: string;
  department: string;
  assignedEmployee: string;
  hasImages: boolean;
  hasAttachments: boolean;
  createdDateHijri: string;
  createdDateGregorian: string;
  createdBy: string;
}

const TasksDatabasePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const statusCounts: StatusCount[] = [
    { label: "جديدة", count: 0, color: "text-green-700", bgColor: "bg-green-100" },
    { label: "جارية", count: 0, color: "text-blue-700", bgColor: "bg-blue-100" },
    { label: "متعثرة", count: 25, color: "text-red-700", bgColor: "bg-red-100" },
    { label: "منتهية", count: 0, color: "text-green-700", bgColor: "bg-green-100" },
    { label: "منجزة", count: 10, color: "text-green-700", bgColor: "bg-green-100" },
  ];

  // Example tasks data - empty by default, shows based on filter
  const allTasks: TaskRecord[] = [];

  const filteredTasks = selectedStatus 
    ? allTasks.filter(task => task.taskStatus === selectedStatus)
    : allTasks;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "جديدة":
        return "bg-green-100 text-green-700";
      case "جارية":
        return "bg-blue-100 text-blue-700";
      case "متعثرة":
        return "bg-red-100 text-red-700";
      case "منتهية":
        return "bg-green-100 text-green-700";
      case "منجزة":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <InnerPageLayout
      moduleId="supervision"
      itemSlug="tasks-database"
      title="قواعد بيانات المهام"
      sectionTitle="إدارة مهام الموظفين"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="flex gap-4">
        {/* Sidebar Filter */}
        <div className="w-48 flex-shrink-0">
          <Card className="p-4 space-y-2">
            {statusCounts.map((status) => (
              <button
                key={status.label}
                onClick={() => setSelectedStatus(selectedStatus === status.label ? null : status.label)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedStatus === status.label 
                    ? status.bgColor + " ring-2 ring-offset-1 ring-primary"
                    : "hover:bg-muted"
                }`}
              >
                <span className={`font-medium ${status.color}`}>{status.label}</span>
                <span className={`px-2 py-1 rounded text-sm font-bold ${status.bgColor} ${status.color}`}>
                  {status.count}
                </span>
              </button>
            ))}
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
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

              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">معاينة</TableHead>
                    <TableHead className="text-right">عنوان المهمة</TableHead>
                    <TableHead className="text-right">حالة المهمة</TableHead>
                    <TableHead className="text-right">نسبة إنجاز المهمة</TableHead>
                    <TableHead className="text-right">تصنيف المهمة</TableHead>
                    <TableHead className="text-right">نوع المهمة</TableHead>
                    <TableHead className="text-right">تاريخ بداية المهمة</TableHead>
                    <TableHead className="text-right">تاريخ إنهاء المهمة</TableHead>
                    <TableHead className="text-right">الإدارة المختصة</TableHead>
                    <TableHead className="text-right">الموظف المكلف</TableHead>
                    <TableHead className="text-right">الصور</TableHead>
                    <TableHead className="text-right">المرفقات</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">أنشأ بواسطة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <EmptyState colSpan={14} />
                  ) : (
                    filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                            <Eye className="h-4 w-4 ml-1" />
                            معاينة
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium max-w-xs truncate">{task.taskTitle}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(task.taskStatus)}`}>
                            {task.taskStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={task.completionPercentage} className="w-16 h-2" />
                            <span className="text-xs text-muted-foreground">{task.completionPercentage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{task.taskClassification}</TableCell>
                        <TableCell>{task.taskType}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>{task.startDateHijri}</div>
                            <div className="text-muted-foreground">{task.startDateGregorian}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>{task.endDateHijri}</div>
                            <div className="text-muted-foreground">{task.endDateGregorian}</div>
                          </div>
                        </TableCell>
                        <TableCell>{task.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-sm">{task.assignedEmployee}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-600">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          {task.hasImages ? (
                            <span className="text-green-600">متاح</span>
                          ) : (
                            <ImageOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell>
                          {task.hasAttachments ? (
                            <Paperclip className="h-4 w-4 text-green-600" />
                          ) : (
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>{task.createdDateHijri}</div>
                            <div className="text-muted-foreground">{task.createdDateGregorian}</div>
                          </div>
                        </TableCell>
                        <TableCell>{task.createdBy}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t text-sm text-muted-foreground text-center">
              إظهار السجلات 0 لـ 0 من 0
            </div>
          </Card>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default TasksDatabasePage;
