import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardCheck, Upload, Save } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const standardsData = [
  { id: 1, standard: "معيار الشفافية المالية", answer: "مطبق بالكامل", date: "1446/06/01", status: "مكتمل" },
  { id: 2, standard: "معيار الحوكمة الإدارية", answer: "مطبق جزئياً", date: "1446/05/28", status: "قيد المراجعة" },
  { id: 3, standard: "معيار إدارة المخاطر", answer: "قيد التطبيق", date: "1446/05/25", status: "جديد" },
];

const StandardsAnswersPage = () => {
  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="standards-answers"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الحوكمة"
      title="تسجيل إجابات المعايير"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              تسجيل إجابة جديدة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>اختر المعيار</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المعيار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transparency">معيار الشفافية المالية</SelectItem>
                    <SelectItem value="governance">معيار الحوكمة الإدارية</SelectItem>
                    <SelectItem value="risk">معيار إدارة المخاطر</SelectItem>
                    <SelectItem value="compliance">معيار الالتزام</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>حالة التطبيق</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">مطبق بالكامل</SelectItem>
                    <SelectItem value="partial">مطبق جزئياً</SelectItem>
                    <SelectItem value="progress">قيد التطبيق</SelectItem>
                    <SelectItem value="not-applied">غير مطبق</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>الإجابة التفصيلية</Label>
              <Textarea placeholder="أدخل الإجابة التفصيلية للمعيار..." className="min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label>المرفقات الداعمة</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">اسحب الملفات هنا أو انقر للتحميل</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-primary">
                <Save className="h-4 w-4 ml-2" />
                حفظ الإجابة
              </Button>
              <Button variant="outline">إلغاء</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>سجل الإجابات السابقة</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المعيار</TableHead>
                  <TableHead className="text-right">الإجابة</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standardsData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.standard}</TableCell>
                    <TableCell>{item.answer}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "مكتمل" ? "bg-green-100 text-green-800" :
                        item.status === "قيد المراجعة" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">تعديل</Button>
                    </TableCell>
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

export default StandardsAnswersPage;
