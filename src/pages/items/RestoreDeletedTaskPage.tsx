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
import { Search, Download, Eye, RotateCcw, ImageOff, Paperclip } from "lucide-react";

interface DeletedTaskRecord {
  id: number;
  taskTitle: string;
  taskStatus: string;
  deletionReason: string;
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

const RestoreDeletedTaskPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const deletedTasks: DeletedTaskRecord[] = [
    {
      id: 1,
      taskTitle: "مهمة أمر صرف عيني (مستودعات) لطلب الإعانة رقم 02-51500012775-1",
      taskStatus: "متعثرة",
      deletionReason: "تم حذف أمر الصرف",
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
      id: 2,
      taskTitle: "مهمة أمر صرف مالي لطلب الإعانة رقم 03-51500012890-1",
      taskStatus: "متعثرة",
      deletionReason: "تم حذف أمر الصرف",
      completionPercentage: 10,
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
      id: 3,
      taskTitle: "مهمة أمر صرف مالي لطلب الإعانة رقم 04-51500012995-1",
      taskStatus: "متعثرة",
      deletionReason: "تم حذف أمر الصرف",
      completionPercentage: 0,
      taskClassification: "نظامية",
      taskType: "أمر صرف مالي",
      startDateHijri: "1446/06/10",
      startDateGregorian: "2024/12/11",
      endDateHijri: "1446/06/17",
      endDateGregorian: "2024/12/18",
      department: "إدارة الشؤون المالية",
      assignedEmployee: "ملف موظف تجريبي خامس",
      hasImages: false,
      hasAttachments: false,
      createdDateHijri: "1446/06/10",
      createdDateGregorian: "2024/12/11",
      createdBy: "مدير النظام التقني",
    },
  ];

  const filteredTasks = deletedTasks.filter(task =>
    task.taskTitle.includes(searchQuery) ||
    task.department.includes(searchQuery) ||
    task.assignedEmployee.includes(searchQuery) ||
    task.deletionReason.includes(searchQuery)
  );

  return (
    <InnerPageLayout
      moduleId="supervision"
      itemSlug="restore-deleted-task"
      title="استعادة مهمة محذوفة"
      sectionTitle="إدارة مهام الموظفين"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-4">
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
                  <TableHead className="text-right">إدارة</TableHead>
                  <TableHead className="text-right">معاينة</TableHead>
                  <TableHead className="text-right">عنوان المهمة</TableHead>
                  <TableHead className="text-right">حالة المهمة</TableHead>
                  <TableHead className="text-right">سبب الحذف</TableHead>
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
                      <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <RotateCcw className="h-4 w-4 ml-1" />
                        استعادة المهمة
                      </Button>
                    </TableCell>
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
                    <TableCell className="text-red-600">{task.deletionReason}</TableCell>
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
                    <TableCell>{task.assignedEmployee}</TableCell>
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
            إظهار السجلات 1 لـ {filteredTasks.length} من {deletedTasks.length}
          </div>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default RestoreDeletedTaskPage;
