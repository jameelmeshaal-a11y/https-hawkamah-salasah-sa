import { useState } from "react";
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
import { Plus, Trash2, Save, FileText, Calculator } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface JournalLine {
  id: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  costCenter?: string;
  description?: string;
}

const AddJournalEntryPage = () => {
  const [entryDate, setEntryDate] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [lines, setLines] = useState<JournalLine[]>([
    { id: "1", accountCode: "", accountName: "", debit: 0, credit: 0 },
    { id: "2", accountCode: "", accountName: "", debit: 0, credit: 0 },
  ]);

  const accounts = [
    { code: "1101", name: "النقدية في الصندوق" },
    { code: "1102", name: "البنك الأهلي" },
    { code: "1103", name: "مصرف الراجحي" },
    { code: "2101", name: "الدائنون" },
    { code: "3101", name: "رأس المال" },
    { code: "4101", name: "إيرادات التبرعات" },
    { code: "4102", name: "إيرادات الكفالات" },
    { code: "5101", name: "مصروفات الرواتب" },
    { code: "5102", name: "مصروفات إدارية" },
  ];

  const costCenters = [
    { code: "CC01", name: "الإدارة العامة" },
    { code: "CC02", name: "قسم المشاريع" },
    { code: "CC03", name: "قسم الكفالات" },
    { code: "CC04", name: "قسم التسويق" },
  ];

  const addLine = () => {
    const newLine: JournalLine = {
      id: Date.now().toString(),
      accountCode: "",
      accountName: "",
      debit: 0,
      credit: 0,
    };
    setLines([...lines, newLine]);
  };

  const removeLine = (id: string) => {
    if (lines.length > 2) {
      setLines(lines.filter((line) => line.id !== id));
    } else {
      toast.error("يجب أن يحتوي القيد على سطرين على الأقل");
    }
  };

  const updateLine = (id: string, field: keyof JournalLine, value: string | number) => {
    setLines(
      lines.map((line) => {
        if (line.id === id) {
          if (field === "accountCode") {
            const account = accounts.find((a) => a.code === value);
            return { ...line, accountCode: value as string, accountName: account?.name || "" };
          }
          return { ...line, [field]: value };
        }
        return line;
      })
    );
  };

  const totalDebit = lines.reduce((sum, line) => sum + (Number(line.debit) || 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + (Number(line.credit) || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleSubmit = () => {
    if (!entryDate) {
      toast.error("يرجى تحديد تاريخ القيد");
      return;
    }
    if (!isBalanced) {
      toast.error("القيد غير متوازن - مجموع المدين يجب أن يساوي مجموع الدائن");
      return;
    }
    toast.success("تم حفظ قيد اليومية بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="إضافة قيد يومية"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Entry Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              بيانات القيد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entryDate">تاريخ القيد *</Label>
                <Input
                  id="entryDate"
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">رقم المرجع</Label>
                <Input
                  id="reference"
                  placeholder="رقم المرجع الخارجي"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>رقم القيد</Label>
                <Input value="JE-2024-0001" disabled className="bg-muted" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="description">البيان / الوصف</Label>
              <Textarea
                id="description"
                placeholder="أدخل وصف القيد..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Journal Lines */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              سطور القيد
            </CardTitle>
            <Button onClick={addLine} variant="outline" size="sm">
              <Plus className="h-4 w-4 ml-2" />
              إضافة سطر
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right w-40">الحساب</TableHead>
                  <TableHead className="text-right">اسم الحساب</TableHead>
                  <TableHead className="text-right w-32">مركز التكلفة</TableHead>
                  <TableHead className="text-right w-32">مدين</TableHead>
                  <TableHead className="text-right w-32">دائن</TableHead>
                  <TableHead className="text-right w-48">ملاحظات</TableHead>
                  <TableHead className="text-right w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lines.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell>
                      <Select
                        value={line.accountCode}
                        onValueChange={(value) => updateLine(line.id, "accountCode", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.code} value={account.code}>
                              {account.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {line.accountName || "-"}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={line.costCenter}
                        onValueChange={(value) => updateLine(line.id, "costCenter", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر" />
                        </SelectTrigger>
                        <SelectContent>
                          {costCenters.map((cc) => (
                            <SelectItem key={cc.code} value={cc.code}>
                              {cc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={line.debit || ""}
                        onChange={(e) => updateLine(line.id, "debit", parseFloat(e.target.value) || 0)}
                        className="text-left"
                        dir="ltr"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={line.credit || ""}
                        onChange={(e) => updateLine(line.id, "credit", parseFloat(e.target.value) || 0)}
                        className="text-left"
                        dir="ltr"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="ملاحظات..."
                        value={line.description || ""}
                        onChange={(e) => updateLine(line.id, "description", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLine(line.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Totals Row */}
                <TableRow className="bg-muted/50 font-bold">
                  <TableCell colSpan={3} className="text-left">
                    المجموع
                  </TableCell>
                  <TableCell className="text-left font-mono">
                    {totalDebit.toLocaleString("ar-SA")}
                  </TableCell>
                  <TableCell className="text-left font-mono">
                    {totalCredit.toLocaleString("ar-SA")}
                  </TableCell>
                  <TableCell colSpan={2}>
                    {isBalanced ? (
                      <span className="text-green-600">✓ القيد متوازن</span>
                    ) : (
                      <span className="text-red-600">
                        الفرق: {Math.abs(totalDebit - totalCredit).toLocaleString("ar-SA")}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">إلغاء</Button>
          <Button variant="outline">حفظ كمسودة</Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700"
            disabled={!isBalanced}
          >
            <Save className="h-4 w-4 ml-2" />
            حفظ وترحيل
          </Button>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default AddJournalEntryPage;
