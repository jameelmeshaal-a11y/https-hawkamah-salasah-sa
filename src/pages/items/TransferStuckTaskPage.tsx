import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Search, Download, Eye, Edit, AlertTriangle, ImageOff, Paperclip } from "lucide-react";

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

const TransferStuckTaskPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const tasks: TaskRecord[] = [
    {
      id: 1,
      taskTitle: "بحث ميداني لطلب الإعانة رقم 02-51500012775-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "بحث ميداني",
      startDateHijri: "1446/06/12",
      startDateGregorian: "2024/12/13",
      endDateHijri: "1446/06/17",
      endDateGregorian: "2024/12/18",
      department: "إدارة المستفيدين",
      assignedEmployee: "خالد مسفر العنازي الشمراني",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/06/12",
      createdDateGregorian: "2024/12/13",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 2,
      taskTitle: "مهمة أمر صرف عيني (مستودعات) لطلب الإعانة رقم 02-51500012775-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف عيني",
      startDateHijri: "1446/06/15",
      startDateGregorian: "2024/12/16",
      endDateHijri: "1446/06/22",
      endDateGregorian: "2024/12/23",
      department: "إدارة المخازن والمستودعات",
      assignedEmployee: "ملف موظف تجريبي رابع",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/06/15",
      createdDateGregorian: "2024/12/16",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 3,
      taskTitle: "مهمة أمر صرف مالي لطلب الإعانة رقم 02-51500012775-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف مالي",
      startDateHijri: "1446/06/18",
      startDateGregorian: "2024/12/19",
      endDateHijri: "1446/06/25",
      endDateGregorian: "2024/12/26",
      department: "إدارة الشؤون المالية",
      assignedEmployee: "ملف موظف تجريبي خامس",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/06/18",
      createdDateGregorian: "2024/12/19",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 4,
      taskTitle: "بحث ميداني لطلب الإعانة رقم 03-51500012890-1",
      taskStatus: "متعثرة",
      completionPercentage: 10,
      taskClassification: "نظامية",
      taskType: "بحث ميداني",
      startDateHijri: "1446/06/10",
      startDateGregorian: "2024/12/11",
      endDateHijri: "1446/06/15",
      endDateGregorian: "2024/12/16",
      department: "إدارة المستفيدين",
      assignedEmployee: "خالد مسفر العنازي الشمراني",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/06/10",
      createdDateGregorian: "2024/12/11",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 5,
      taskTitle: "مهمة أمر صرف عيني (مستودعات) لطلب الإعانة رقم 04-51500012995-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف عيني",
      startDateHijri: "1446/06/08",
      startDateGregorian: "2024/12/09",
      endDateHijri: "1446/06/13",
      endDateGregorian: "2024/12/14",
      department: "إدارة المخازن والمستودعات",
      assignedEmployee: "ملف موظف تجريبي رابع",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/06/08",
      createdDateGregorian: "2024/12/09",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 6,
      taskTitle: "مهمة أمر صرف مالي لطلب الإعانة رقم 05-51500013100-1",
      taskStatus: "متعثرة",
      completionPercentage: 5,
      taskClassification: "نظامية",
      taskType: "أمر صرف مالي",
      startDateHijri: "1446/06/05",
      startDateGregorian: "2024/12/06",
      endDateHijri: "1446/06/10",
      endDateGregorian: "2024/12/11",
      department: "إدارة الشؤون المالية",
      assignedEmployee: "ملف موظف تجريبي خامس",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/06/05",
      createdDateGregorian: "2024/12/06",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 7,
      taskTitle: "بحث ميداني لطلب الإعانة رقم 06-51500013200-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "بحث ميداني",
      startDateHijri: "1446/06/01",
      startDateGregorian: "2024/12/02",
      endDateHijri: "1446/06/06",
      endDateGregorian: "2024/12/07",
      department: "إدارة المستفيدين",
      assignedEmployee: "خالد مسفر العنازي الشمراني",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/06/01",
      createdDateGregorian: "2024/12/02",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 8,
      taskTitle: "مهمة أمر صرف عيني (مستودعات) لطلب الإعانة رقم 07-51500013300-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف عيني",
      startDateHijri: "1446/05/28",
      startDateGregorian: "2024/11/29",
      endDateHijri: "1446/06/03",
      endDateGregorian: "2024/12/04",
      department: "إدارة المخازن والمستودعات",
      assignedEmployee: "ملف موظف تجريبي رابع",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/28",
      createdDateGregorian: "2024/11/29",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 9,
      taskTitle: "مهمة أمر صرف مالي لطلب الإعانة رقم 08-51500013400-1",
      taskStatus: "متعثرة",
      completionPercentage: 15,
      taskClassification: "نظامية",
      taskType: "أمر صرف مالي",
      startDateHijri: "1446/05/25",
      startDateGregorian: "2024/11/26",
      endDateHijri: "1446/05/30",
      endDateGregorian: "2024/12/01",
      department: "إدارة الشؤون المالية",
      assignedEmployee: "ملف موظف تجريبي خامس",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/25",
      createdDateGregorian: "2024/11/26",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 10,
      taskTitle: "بحث ميداني لطلب الإعانة رقم 09-51500013500-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "بحث ميداني",
      startDateHijri: "1446/05/22",
      startDateGregorian: "2024/11/23",
      endDateHijri: "1446/05/27",
      endDateGregorian: "2024/11/28",
      department: "إدارة المستفيدين",
      assignedEmployee: "خالد مسفر العنازي الشمراني",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/22",
      createdDateGregorian: "2024/11/23",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 11,
      taskTitle: "مهمة أمر صرف عيني (مستودعات) لطلب الإعانة رقم 10-51500013600-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف عيني",
      startDateHijri: "1446/05/20",
      startDateGregorian: "2024/11/21",
      endDateHijri: "1446/05/25",
      endDateGregorian: "2024/11/26",
      department: "إدارة المخازن والمستودعات",
      assignedEmployee: "ملف موظف تجريبي رابع",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/20",
      createdDateGregorian: "2024/11/21",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 12,
      taskTitle: "مهمة أمر صرف مالي لطلب الإعانة رقم 11-51500013700-1",
      taskStatus: "متعثرة",
      completionPercentage: 20,
      taskClassification: "نظامية",
      taskType: "أمر صرف مالي",
      startDateHijri: "1446/05/18",
      startDateGregorian: "2024/11/19",
      endDateHijri: "1446/05/23",
      endDateGregorian: "2024/11/24",
      department: "إدارة الشؤون المالية",
      assignedEmployee: "ملف موظف تجريبي خامس",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/18",
      createdDateGregorian: "2024/11/19",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 13,
      taskTitle: "بحث ميداني لطلب الإعانة رقم 12-51500013800-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "بحث ميداني",
      startDateHijri: "1446/05/15",
      startDateGregorian: "2024/11/16",
      endDateHijri: "1446/05/20",
      endDateGregorian: "2024/11/21",
      department: "إدارة المستفيدين",
      assignedEmployee: "خالد مسفر العنازي الشمراني",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/15",
      createdDateGregorian: "2024/11/16",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 14,
      taskTitle: "مهمة أمر صرف عيني (مستودعات) لطلب الإعانة رقم 13-51500013900-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف عيني",
      startDateHijri: "1446/05/12",
      startDateGregorian: "2024/11/13",
      endDateHijri: "1446/05/17",
      endDateGregorian: "2024/11/18",
      department: "إدارة المخازن والمستودعات",
      assignedEmployee: "ملف موظف تجريبي رابع",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/12",
      createdDateGregorian: "2024/11/13",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 15,
      taskTitle: "مهمة أمر صرف مالي لطلب الإعانة رقم 14-51500014000-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف مالي",
      startDateHijri: "1446/05/10",
      startDateGregorian: "2024/11/11",
      endDateHijri: "1446/05/15",
      endDateGregorian: "2024/11/16",
      department: "إدارة الشؤون المالية",
      assignedEmployee: "ملف موظف تجريبي خامس",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/10",
      createdDateGregorian: "2024/11/11",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 16,
      taskTitle: "بحث ميداني لطلب الإعانة رقم 15-51500014100-1",
      taskStatus: "متعثرة",
      completionPercentage: 25,
      taskClassification: "نظامية",
      taskType: "بحث ميداني",
      startDateHijri: "1446/05/08",
      startDateGregorian: "2024/11/09",
      endDateHijri: "1446/05/13",
      endDateGregorian: "2024/11/14",
      department: "إدارة المستفيدين",
      assignedEmployee: "خالد مسفر العنازي الشمراني",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/08",
      createdDateGregorian: "2024/11/09",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 17,
      taskTitle: "مهمة أمر صرف عيني (مستودعات) لطلب الإعانة رقم 16-51500014200-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف عيني",
      startDateHijri: "1446/05/05",
      startDateGregorian: "2024/11/06",
      endDateHijri: "1446/05/10",
      endDateGregorian: "2024/11/11",
      department: "إدارة المخازن والمستودعات",
      assignedEmployee: "ملف موظف تجريبي رابع",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/05",
      createdDateGregorian: "2024/11/06",
      createdBy: "مدير النظام التقني",
    },
    {
      id: 18,
      taskTitle: "مهمة أمر صرف مالي لطلب الإعانة رقم 17-51500014300-1",
      taskStatus: "متعثرة",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف مالي",
      startDateHijri: "1446/05/02",
      startDateGregorian: "2024/11/03",
      endDateHijri: "1446/05/07",
      endDateGregorian: "2024/11/08",
      department: "إدارة الشؤون المالية",
      assignedEmployee: "ملف موظف تجريبي خامس",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/05/02",
      createdDateGregorian: "2024/11/03",
      createdBy: "مدير النظام التقني",
    },
  ];

  const filteredTasks = tasks.filter(task =>
    task.taskTitle.includes(searchQuery) ||
    task.department.includes(searchQuery) ||
    task.assignedEmployee.includes(searchQuery)
  );

  return (
    <InnerPageLayout
      moduleId="supervision"
      itemSlug="transfer-stuck-task"
      title="تحويل مهمة متعثرة"
      sectionTitle="إدارة مهام الموظفين"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-4">
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 text-right">
            في حالة تحديث بيانات المهمة أو تحويلها لموظف آخر يتم تحديث حالة المهمة الى "جديدة"
          </AlertDescription>
        </Alert>

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
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        <Eye className="h-4 w-4 ml-1" />
                        معاينة
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">{task.taskTitle}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
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
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 border-t text-sm text-muted-foreground text-center">
            إظهار السجلات 1 لـ {filteredTasks.length} من {tasks.length}
          </div>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default TransferStuckTaskPage;
