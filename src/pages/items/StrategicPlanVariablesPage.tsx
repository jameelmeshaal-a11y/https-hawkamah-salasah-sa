import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Plus, Trash2, Settings } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

interface Condition {
  id: number;
  field: string;
  operator: string;
  value: string;
  connector: "and" | "or";
}

const databases = [
  { value: "beneficiaries", label: "المستفيدين" },
  { value: "sponsors", label: "الكفلاء" },
  { value: "projects", label: "المشاريع" },
  { value: "donations", label: "التبرعات" },
  { value: "employees", label: "الموظفين" },
];

const fields = [
  { value: "status", label: "الحالة" },
  { value: "type", label: "النوع" },
  { value: "category", label: "التصنيف" },
  { value: "date", label: "التاريخ" },
  { value: "amount", label: "المبلغ" },
];

const operators = [
  { value: "equals", label: "يساوي" },
  { value: "not_equals", label: "لا يساوي" },
  { value: "greater", label: "أكبر من" },
  { value: "less", label: "أقل من" },
  { value: "contains", label: "يحتوي على" },
];

const categories = ["فئة الملف", "نشط", "معلق", "مكتمل"];

const StrategicPlanVariablesPage = () => {
  const [variableType, setVariableType] = useState<"fixed" | "variable">("variable");
  const [outputType, setOutputType] = useState<"count" | "sum" | "average">("count");
  const [conditions, setConditions] = useState<Condition[]>([
    { id: 1, field: "status", operator: "equals", value: "فئة الملف", connector: "and" },
  ]);
  const [fixedPeriod, setFixedPeriod] = useState(false);

  const addCondition = () => {
    const newId = Math.max(...conditions.map(c => c.id), 0) + 1;
    setConditions([...conditions, { id: newId, field: "", operator: "equals", value: "", connector: "and" }]);
  };

  const addConditionGroup = () => {
    const newId = Math.max(...conditions.map(c => c.id), 0) + 1;
    setConditions([...conditions, { id: newId, field: "", operator: "equals", value: "", connector: "or" }]);
  };

  const removeCondition = (id: number) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: number, field: keyof Condition, value: string) => {
    setConditions(conditions.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="strategic-plan-variables"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="متغيرات الخطة الإستراتيجية"
    >
      <div className="space-y-6">
        {/* Add Variable Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إضافة متغير جديد
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Variable Type */}
            <div className="space-y-3">
              <Label>النوع</Label>
              <RadioGroup
                value={variableType}
                onValueChange={(v) => setVariableType(v as "fixed" | "variable")}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="cursor-pointer">ثابت</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="variable" id="variable" />
                  <Label htmlFor="variable" className="cursor-pointer">متغير</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">العنوان <span className="text-red-500">*</span></Label>
              <Input id="title" placeholder="أدخل عنوان المتغير" />
            </div>

            {/* Output Type */}
            <div className="space-y-3">
              <Label>ناتج العملية</Label>
              <RadioGroup
                value={outputType}
                onValueChange={(v) => setOutputType(v as "count" | "sum" | "average")}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="count" id="count" />
                  <Label htmlFor="count" className="cursor-pointer">عدد</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="sum" id="sum" />
                  <Label htmlFor="sum" className="cursor-pointer">مجموع</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="average" id="average" />
                  <Label htmlFor="average" className="cursor-pointer">متوسط</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Database Selection */}
            <div className="space-y-2">
              <Label>قاعدة البيانات</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر قاعدة البيانات..." />
                </SelectTrigger>
                <SelectContent>
                  {databases.map((db) => (
                    <SelectItem key={db.value} value={db.value}>{db.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>شروط المتغير</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={addCondition}>
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة شرط
                  </Button>
                  <Button variant="outline" size="sm" onClick={addConditionGroup}>
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة مجموعة من الشروط
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {conditions.map((condition, index) => (
                  <div key={condition.id} className="flex items-center gap-3">
                    {index > 0 && (
                      <div className="flex gap-1">
                        <Button
                          variant={condition.connector === "and" ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateCondition(condition.id, "connector", "and")}
                          className="w-10"
                        >
                          و
                        </Button>
                        <Button
                          variant={condition.connector === "or" ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateCondition(condition.id, "connector", "or")}
                          className="w-10"
                        >
                          أو
                        </Button>
                      </div>
                    )}
                    <Select
                      value={condition.field}
                      onValueChange={(v) => updateCondition(condition.id, "field", v)}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="الحقل" />
                      </SelectTrigger>
                      <SelectContent>
                        {fields.map((field) => (
                          <SelectItem key={field.value} value={field.value}>{field.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={condition.operator}
                      onValueChange={(v) => updateCondition(condition.id, "operator", v)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="المعامل" />
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map((op) => (
                          <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={condition.value}
                      onValueChange={(v) => updateCondition(condition.id, "value", v)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="القيمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeCondition(condition.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed Period Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <Label htmlFor="fixed-period">محددة بفترة ثابتة</Label>
              <Switch
                id="fixed-period"
                checked={fixedPeriod}
                onCheckedChange={setFixedPeriod}
              />
            </div>

            {/* Submit Button */}
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 ml-2" />
              إضافة السجل
            </Button>
          </CardContent>
        </Card>

        {/* Variables Table */}
        <Card>
          <CardHeader>
            <CardTitle>المتغيرات المسجلة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">العنوان</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">قاعدة البيانات</TableHead>
                    <TableHead className="text-right">ناتج العملية</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <EmptyState colSpan={5} asTableRow />
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default StrategicPlanVariablesPage;
