import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Minus, Copy, Merge, Calculator, X } from "lucide-react";

interface DynamicForm {
  id: number;
  title: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
}

const CreateDynamicListFormsPage = () => {
  const [englishTitle, setEnglishTitle] = useState("");
  const [arabicTitle, setArabicTitle] = useState("");
  const [columns] = useState(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]);
  const [rows, setRows] = useState(5);

  const existingForms: DynamicForm[] = [
    { id: 1, title: "قائمة الأنشطة بالفترة", createdBy: "أحمد محمد", createdDate: "01/07/1447", updatedBy: "أحمد محمد", updatedDate: "05/07/1447" },
    { id: 2, title: "قائمة المركز المالي الفصلي", createdBy: "محمد علي", createdDate: "02/07/1447", updatedBy: "محمد علي", updatedDate: "06/07/1447" },
    { id: 3, title: "تحليل مصاريف رواتب وأنشطة غير مقيدة", createdBy: "سعد أحمد", createdDate: "03/07/1447", updatedBy: "سعد أحمد", updatedDate: "07/07/1447" },
    { id: 4, title: "تحليل مصاريف أنشطة تقديرية مقيدة", createdBy: "خالد عبدالله", createdDate: "04/07/1447", updatedBy: "خالد عبدالله", updatedDate: "08/07/1447" },
    { id: 5, title: "تحليل مصاريف الإستقطاب والإنتماء", createdBy: "عمر حسن", createdDate: "05/07/1447", updatedBy: "عمر حسن", updatedDate: "09/07/1447" },
    { id: 6, title: "تحليل الرواتب والأجور التقديرية", createdBy: "فهد سعود", createdDate: "06/07/1447", updatedBy: "فهد سعود", updatedDate: "10/07/1447" },
    { id: 7, title: "تحليل أصول الأوقاف", createdBy: "عبدالرحمن خالد", createdDate: "07/07/1447", updatedBy: "عبدالرحمن خالد", updatedDate: "11/07/1447" },
    { id: 8, title: "تحليل التبرعات والإيرادات الوقفية", createdBy: "ماجد عبدالله", createdDate: "08/07/1447", updatedBy: "ماجد عبدالله", updatedDate: "12/07/1447" },
    { id: 9, title: "تحليل التبرعات والإيرادات غير المقيدة", createdBy: "سلطان محمد", createdDate: "09/07/1447", updatedBy: "سلطان محمد", updatedDate: "13/07/1447" },
    { id: 10, title: "تحليل المصروفات", createdBy: "ناصر علي", createdDate: "10/07/1447", updatedBy: "ناصر علي", updatedDate: "14/07/1447" },
    { id: 11, title: "تحليل صافي الأصول", createdBy: "بندر سعد", createdDate: "11/07/1447", updatedBy: "بندر سعد", updatedDate: "15/07/1447" },
    { id: 12, title: "تحليل المديون", createdBy: "تركي فهد", createdDate: "12/07/1447", updatedBy: "تركي فهد", updatedDate: "16/07/1447" },
  ];

  const addRow = () => setRows((prev) => prev + 1);
  const removeRow = () => setRows((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <InnerPageLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold">إنشاء نماذج قوائم ديناميكية</h1>
        </div>

        {/* Report Data Section */}
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">بيانات التقرير</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>العنوان الإنجليزي *</Label>
              <Input
                value={englishTitle}
                onChange={(e) => setEnglishTitle(e.target.value)}
                placeholder="Enter English title"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label>العنوان العربي *</Label>
              <Input
                value={arabicTitle}
                onChange={(e) => setArabicTitle(e.target.value)}
                placeholder="أدخل العنوان العربي"
              />
            </div>
          </div>
        </div>

        {/* Report Template Section */}
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold">نموذج التقرير</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={addRow}>
                <Plus className="h-4 w-4 ml-1" />
                إضافة صف
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 ml-1" />
                إضافة عمود
              </Button>
              <Button variant="outline" size="sm" onClick={removeRow}>
                <Minus className="h-4 w-4 ml-1" />
                حذف صف
              </Button>
              <Button variant="outline" size="sm">
                <Minus className="h-4 w-4 ml-1" />
                حذف عمود
              </Button>
              <Button variant="outline" size="sm">
                <X className="h-4 w-4 ml-1" />
                إلغاء الدمج
              </Button>
              <Button variant="outline" size="sm">
                <Merge className="h-4 w-4 ml-1" />
                دمج الخلايا
              </Button>
              <Button variant="outline" size="sm">
                <Calculator className="h-4 w-4 ml-1" />
                إدخال معادلة
              </Button>
            </div>
          </div>

          {/* Template Grid */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12 text-center">#</TableHead>
                  {columns.map((col) => (
                    <TableHead key={col} className="text-center min-w-[100px]">{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: rows }, (_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell className="text-center bg-muted/30 font-medium">{rowIndex + 1}</TableCell>
                    {columns.map((col) => (
                      <TableCell key={col} className="p-1">
                        <Input className="h-8 text-center" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center pt-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8">
              إضافة السجل
            </Button>
          </div>
        </div>

        {/* Existing Forms Table */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">النماذج الموجودة</h2>
          <div className="bg-card border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center font-bold w-12">نسخ</TableHead>
                  <TableHead className="text-right font-bold">العنوان</TableHead>
                  <TableHead className="text-right font-bold">أنشأ بواسطة</TableHead>
                  <TableHead className="text-center font-bold">تاريخ الإنشاء</TableHead>
                  <TableHead className="text-right font-bold">حدث بواسطة</TableHead>
                  <TableHead className="text-center font-bold">تاريخ التحديث</TableHead>
                  <TableHead className="text-center font-bold w-12">+</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {existingForms.map((form) => (
                  <TableRow key={form.id}>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-primary hover:underline cursor-pointer">{form.title}</TableCell>
                    <TableCell>{form.createdBy}</TableCell>
                    <TableCell className="text-center">{form.createdDate}</TableCell>
                    <TableCell>{form.updatedBy}</TableCell>
                    <TableCell className="text-center">{form.updatedDate}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:text-green-600">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default CreateDynamicListFormsPage;
