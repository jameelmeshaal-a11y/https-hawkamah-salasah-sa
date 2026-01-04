import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Calendar } from "lucide-react";

const CreateGeneralTaskPage = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskType, setTaskType] = useState("general");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [taskCategory, setTaskCategory] = useState("system");
  const [department, setDepartment] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [beneficiaryFile, setBeneficiaryFile] = useState("");
  const [aidRequest, setAidRequest] = useState("");

  const handleAddRecord = () => {
    console.log("Creating task:", {
      taskTitle,
      taskType,
      startDate,
      endDate,
      taskDetails,
      taskCategory,
      department,
      transferTo,
      beneficiaryFile,
      aidRequest,
    });
  };

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="إنشاء مهمة عامة"
      sectionTitle="إدارة مهام الموظفين"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        {/* Task Data Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">بيانات المهمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>
                  عنوان المهمة <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="أدخل عنوان المهمة"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  نوع المهمة <span className="text-red-500">*</span>
                </Label>
                <Select value={taskType} onValueChange={setTaskType}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المهمة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">مهمة عامة</SelectItem>
                    <SelectItem value="field-research">بحث ميداني</SelectItem>
                    <SelectItem value="financial-order">أمر صرف مالي</SelectItem>
                    <SelectItem value="in-kind-order">أمر صرف عيني</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    تاريخ بداية المهمة <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>
                    تاريخ إنهاء المهمة <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>تفاصيل المهمة</Label>
                <Textarea
                  value={taskDetails}
                  onChange={(e) => setTaskDetails(e.target.value)}
                  placeholder="أدخل تفاصيل المهمة"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الصور</Label>
                  <Button variant="outline" className="w-full justify-start bg-slate-700 text-white hover:bg-slate-800 border-slate-700">
                    <Upload className="h-4 w-4 ml-2" />
                    إضافة صور
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>المرفقات</Label>
                  <Button variant="outline" className="w-full justify-start bg-slate-700 text-white hover:bg-slate-800 border-slate-700">
                    <Upload className="h-4 w-4 ml-2" />
                    إضافة مرفقات
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>تصنيف المهمة</Label>
                <Select value={taskCategory} onValueChange={setTaskCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر تصنيف المهمة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">نظامية</SelectItem>
                    <SelectItem value="urgent">عاجلة</SelectItem>
                    <SelectItem value="routine">روتينية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Responsible Employee Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الموظف المسؤول</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>
                  الإدارة المختصة <span className="text-red-500">*</span>
                </Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الإدارة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="endowments">إدارة الأوقاف</SelectItem>
                    <SelectItem value="beneficiaries">إدارة المستفيدين</SelectItem>
                    <SelectItem value="warehouses">إدارة المخازن والمستودعات</SelectItem>
                    <SelectItem value="financial">إدارة الشؤون المالية</SelectItem>
                    <SelectItem value="hr">إدارة الموارد البشرية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  تحويل إلى <span className="text-red-500">*</span>
                </Label>
                <Select value={transferTo} onValueChange={setTransferTo}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">مدير الإدارة</SelectItem>
                    <SelectItem value="employee">موظف محدد</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  الموظف المختص <span className="text-red-500">*</span>
                </Label>
                <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
                  لا يوجد مديرين معينين لهذه الإدارة
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attached Files Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-700">الملفات المرفقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-green-700">ملف المستفيد</Label>
                <Select value={beneficiaryFile} onValueChange={setBeneficiaryFile}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="file1">ملف 1</SelectItem>
                    <SelectItem value="file2">ملف 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-green-700">طلب الإعانة</Label>
                <Select value={aidRequest} onValueChange={setAidRequest}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="request1">طلب 1</SelectItem>
                    <SelectItem value="request2">طلب 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-start">
          <Button
            onClick={handleAddRecord}
            className="bg-green-600 hover:bg-green-700"
          >
            إضافة سجل
          </Button>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default CreateGeneralTaskPage;
