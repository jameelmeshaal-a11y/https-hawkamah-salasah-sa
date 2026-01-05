import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, GripVertical, Edit, FileText, BarChart3, Target } from "lucide-react";

interface CategoryRow {
  id: number;
  color: string;
  startValue: number;
  endValue: number;
}

const colorOptions = [
  { value: "red", label: "أحمر", className: "bg-red-500" },
  { value: "orange", label: "برتقالي", className: "bg-orange-500" },
  { value: "yellow", label: "أصفر", className: "bg-yellow-500" },
  { value: "blue", label: "أزرق", className: "bg-blue-500" },
  { value: "green", label: "أخضر", className: "bg-green-500" },
];

const months = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];

const existingPlans = [
  {
    id: 1,
    title: "الخطة الإستراتيجية 2024-2028",
    periodMonths: 60,
    startDateHijri: "1445/07/01",
    startDateGregorian: "2024/01/13",
    endDateHijri: "1450/06/30",
    endDateGregorian: "2028/01/12",
  },
  {
    id: 2,
    title: "الخطة الإستراتيجية 2019-2023",
    periodMonths: 60,
    startDateHijri: "1440/05/01",
    startDateGregorian: "2019/01/07",
    endDateHijri: "1445/04/30",
    endDateGregorian: "2023/12/13",
  },
];

const StrategicPlansManagementPage = () => {
  const [categories, setCategories] = useState<CategoryRow[]>([
    { id: 1, color: "red", startValue: 0, endValue: 49 },
    { id: 2, color: "orange", startValue: 50, endValue: 59 },
    { id: 3, color: "yellow", startValue: 60, endValue: 69 },
    { id: 4, color: "blue", startValue: 70, endValue: 89 },
    { id: 5, color: "green", startValue: 90, endValue: 100 },
  ]);

  const addCategory = () => {
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    setCategories([...categories, { id: newId, color: "blue", startValue: 0, endValue: 0 }]);
  };

  const removeCategory = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const updateCategory = (id: number, field: keyof CategoryRow, value: string | number) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const getColorClass = (color: string) => {
    return colorOptions.find(c => c.value === color)?.className || "bg-gray-500";
  };

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="strategic-plans-management"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="إدارة الخطط الإستراتيجية"
    >
      <div className="space-y-6">
        {/* Add Plan Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              إضافة خطة إستراتيجية جديدة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">العنوان <span className="text-red-500">*</span></Label>
              <Input id="title" placeholder="أدخل عنوان الخطة الإستراتيجية" />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>تاريخ البداية</Label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="الشهر" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, idx) => (
                        <SelectItem key={idx} value={String(idx + 1)}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="السنة" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>تاريخ النهاية</Label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="الشهر" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, idx) => (
                        <SelectItem key={idx} value={String(idx + 1)}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="السنة" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Verification Categories */}
            <div className="space-y-4">
              <Label>فئات نسب التحقق</Label>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead className="text-right">اللون</TableHead>
                      <TableHead className="text-right">بداية الفئة</TableHead>
                      <TableHead className="text-right">نهاية الفئة</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((cat) => (
                      <TableRow key={cat.id}>
                        <TableCell>
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded ${getColorClass(cat.color)}`} />
                            <Select
                              value={cat.color}
                              onValueChange={(v) => updateCategory(cat.id, "color", v)}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {colorOptions.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    <div className="flex items-center gap-2">
                                      <div className={`w-4 h-4 rounded ${opt.className}`} />
                                      {opt.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={cat.startValue}
                            onChange={(e) => updateCategory(cat.id, "startValue", Number(e.target.value))}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={cat.endValue}
                            onChange={(e) => updateCategory(cat.id, "endValue", Number(e.target.value))}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeCategory(cat.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button variant="outline" size="sm" onClick={addCategory}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة فئة
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="data" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="data">بيانات الخطة</TabsTrigger>
                <TabsTrigger value="swot">تحليل SWOT</TabsTrigger>
                <TabsTrigger value="kano">نموذج KANO</TabsTrigger>
              </TabsList>
              <TabsContent value="data" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>المهمة</Label>
                    <Textarea placeholder="أدخل مهمة المنظمة" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>الرؤية</Label>
                    <Textarea placeholder="أدخل رؤية المنظمة" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>الأهداف</Label>
                    <Textarea placeholder="أدخل الأهداف العامة" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>القيم</Label>
                    <Textarea placeholder="أدخل قيم المنظمة" rows={4} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="swot" className="pt-4">
                <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>تحليل SWOT</p>
                    <p className="text-sm">نقاط القوة والضعف والفرص والتهديدات</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="kano" className="pt-4">
                <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <Target className="h-12 w-12 mx-auto mb-2" />
                    <p>نموذج KANO</p>
                    <p className="text-sm">تحليل احتياجات العملاء</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Submit Button */}
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 ml-2" />
              إضافة السجل
            </Button>
          </CardContent>
        </Card>

        {/* Existing Plans Table */}
        <Card>
          <CardHeader>
            <CardTitle>الخطط الإستراتيجية المسجلة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">العنوان</TableHead>
                    <TableHead className="text-right">فترة الخطة (شهر)</TableHead>
                    <TableHead className="text-right">تاريخ البداية</TableHead>
                    <TableHead className="text-right">تاريخ النهاية</TableHead>
                    <TableHead className="text-right w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {existingPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.title}</TableCell>
                      <TableCell>{plan.periodMonths}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{plan.startDateHijri}</div>
                          <div className="text-muted-foreground">{plan.startDateGregorian}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{plan.endDateHijri}</div>
                          <div className="text-muted-foreground">{plan.endDateGregorian}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default StrategicPlansManagementPage;
