import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Download, Eye, Edit, AlertTriangle, Image, Paperclip } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TaskRecord {
  id: number;
  taskTitle: string;
  taskStatus: string;
  completionPercentage: number;
  taskCategory: string;
  taskType: string;
  startDateHijri: string;
  startDateGregorian: string;
  endDateHijri: string;
  endDateGregorian: string;
  department: string;
  assignedEmployee: string;
  hasImages: boolean;
  hasAttachments: boolean;
  createdAtHijri: string;
  createdAtGregorian: string;
  createdBy: string;
}

const ManageEmployeeTasksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const [tasks] = useState<TaskRecord[]>([
    {
      id: 1,
      taskTitle: "بحث ميداني",
      taskStatus: "متأخرة",
      completionPercentage: 0,
      taskCategory: "نظامية",
      taskType: "بحث ميداني",
      startDateHijri: "1446-05-01",
      startDateGregorian: "2024-11-01",
      endDateHijri: "1446-05-15",
      endDateGregorian: "2024-11-15",
      department: "إدارة المستفيدين",
      assignedEmployee: "محمد أحمد",
      hasImages: false,
      hasAttachments: false,
      createdAtHijri: "1446-04-28",
      createdAtGregorian: "2024-10-28",
      createdBy: "مدير الإدارة",
    },
    {
      id: 2,
      taskTitle: "أمر صرف عيني",
      taskStatus: "متأخرة",
      completionPercentage: 25,
      taskCategory: "نظامية",
      taskType: "أمر صرف عيني",
      startDateHijri: "1446-05-10",
      startDateGregorian: "2024-11-10",
      endDateHijri: "1446-05-20",
      endDateGregorian: "2024-11-20",
      department: "إدارة المخازن والمستودعات",
      assignedEmployee: "سعد خالد",
      hasImages: true,
      hasAttachments: true,
      createdAtHijri: "1446-05-08",
      createdAtGregorian: "2024-11-08",
      createdBy: "مدير المخازن",
    },
    {
      id: 3,
      taskTitle: "أمر صرف مالي",
      taskStatus: "متأخرة",
      completionPercentage: 50,
      taskCategory: "عاجلة",
      taskType: "أمر صرف مالي",
      startDateHijri: "1446-06-01",
      startDateGregorian: "2024-12-01",
      endDateHijri: "1446-06-10",
      endDateGregorian: "2024-12-10",
      department: "إدارة الشؤون المالية",
      assignedEmployee: "عبدالله محمد",
      hasImages: false,
      hasAttachments: true,
      createdAtHijri: "1446-05-28",
      createdAtGregorian: "2024-11-28",
      createdBy: "المدير المالي",
    },
  ]);

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="إدارة مهام الموظفين"
      sectionTitle="إدارة مهام الموظفين"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        {/* Warning Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">
              في حالة تحديث بيانات المهمة أو تحويلها لموظف آخر يتم تحديث حالة المهمة الى "جديدة"
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث عام..."
                    className="pr-9 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 سجلات</SelectItem>
                    <SelectItem value="20">20 سجل</SelectItem>
                    <SelectItem value="50">50 سجل</SelectItem>
                    <SelectItem value="100">100 سجل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
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
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600"
                        >
                          <Eye className="h-4 w-4 ml-1" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell>{task.taskTitle}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            task.taskStatus === "متأخرة"
                              ? "bg-red-100 text-red-800"
                              : task.taskStatus === "جديدة"
                              ? "bg-blue-100 text-blue-800"
                              : task.taskStatus === "قيد التنفيذ"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.taskStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <Progress value={task.completionPercentage} className="h-2 flex-1" />
                          <span className="text-sm text-muted-foreground">
                            {task.completionPercentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{task.taskCategory}</TableCell>
                      <TableCell>{task.taskType}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{task.startDateHijri}</div>
                          <div className="text-muted-foreground">{task.startDateGregorian}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{task.endDateHijri}</div>
                          <div className="text-muted-foreground">{task.endDateGregorian}</div>
                        </div>
                      </TableCell>
                      <TableCell>{task.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{task.assignedEmployee}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Edit className="h-3 w-3 text-blue-600" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {task.hasImages ? (
                          <Image className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {task.hasAttachments ? (
                          <Paperclip className="h-4 w-4 text-blue-600" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{task.createdAtHijri}</div>
                          <div className="text-muted-foreground">{task.createdAtGregorian}</div>
                        </div>
                      </TableCell>
                      <TableCell>{task.createdBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              عرض {tasks.length} من {tasks.length} سجل
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageEmployeeTasksPage;
