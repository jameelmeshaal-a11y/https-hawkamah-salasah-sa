import { useState } from "react";
import { useParams } from "react-router-dom";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FolderPlus, Search, Download, Eye, Plus, Upload } from "lucide-react";
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

const RegisterBeneficiaryProjectPage = () => {
  const { moduleId } = useParams();
  const [installments, setInstallments] = useState<string[]>([]);

  const existingProjects = [
    {
      id: 1,
      project: "مشروع التأهيل الأول",
      projectTitle: "مشروع البقالة",
      category: "أيتام",
      fileNumber: "F-001",
      beneficiaryFile: "BEN-001",
      supportType: "فردي",
      location: "الرياض",
      startDate: "1446/01/15",
    },
  ];

  return (
    <InnerPageLayout moduleId={moduleId || "projects"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FolderPlus className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">تسجيل مشروع مستفيد</h1>
            <p className="text-muted-foreground text-sm">
              إضافة مشروع تأهيلي جديد لمستفيد
            </p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">بيانات التأهيل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rehabilitation Data Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  المشروع التأهيلي <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="أختر المشروع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project1">مشروع التأهيل الأول</SelectItem>
                    <SelectItem value="project2">مشروع التأهيل الثاني</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  الفئة <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="أختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orphans">أيتام</SelectItem>
                    <SelectItem value="widows">أرامل</SelectItem>
                    <SelectItem value="poor">فقراء</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Beneficiary Selection Section */}
            <div className="border rounded-lg p-4 bg-muted/20">
              <h3 className="font-semibold mb-4">المستفيد أو الناتج</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="outline" className="gap-2">
                  <Search className="h-4 w-4" />
                  أختر الملف
                </Button>
                <Button variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  معاينة الملف
                </Button>
                <span className="text-muted-foreground text-sm">
                  لم تقم بإختيار ملف المستفيد أو الناتج
                </span>
              </div>
            </div>

            {/* Beneficiary Project Data Section */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">بيانات مشروع المستفيد</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>
                    نوع الدعم <span className="text-destructive">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="فردي" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">فردي</SelectItem>
                      <SelectItem value="group">جماعي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    حالة المشروع <span className="text-destructive">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="لم يبدأ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-started">لم يبدأ</SelectItem>
                      <SelectItem value="in-progress">جاري</SelectItem>
                      <SelectItem value="completed">مكتمل</SelectItem>
                      <SelectItem value="stopped">متوقف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    مكان المشروع <span className="text-destructive">*</span>
                  </Label>
                  <Input placeholder="أدخل مكان المشروع" />
                </div>
                <div className="space-y-2">
                  <Label>
                    اسم المشروع <span className="text-destructive">*</span>
                  </Label>
                  <Input placeholder="أدخل اسم المشروع" />
                </div>
                <div className="space-y-2">
                  <Label>
                    قيمة المشروع <span className="text-destructive">*</span>
                  </Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>
                    تاريخ البداية <span className="text-destructive">*</span>
                  </Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>
                    تاريخ النهاية <span className="text-destructive">*</span>
                  </Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label>وصف المشروع</Label>
                  <Textarea placeholder="أدخل وصف المشروع" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>ملاحظات إضافية</Label>
                  <Textarea placeholder="أدخل ملاحظات إضافية" rows={3} />
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">المرفقات</h3>
              <div className="space-y-2">
                <Label>مرفقات إضافية</Label>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  إضافة مرفقات
                </Button>
              </div>
            </div>

            {/* Guarantor Data Section */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">بيانات الكفيل</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>
                    اسم الكفيل <span className="text-destructive">*</span>
                  </Label>
                  <Input placeholder="أدخل اسم الكفيل" />
                </div>
                <div className="space-y-2">
                  <Label>
                    رقم الهوية <span className="text-destructive">*</span>
                  </Label>
                  <Input placeholder="أدخل رقم الهوية" />
                </div>
                <div className="space-y-2">
                  <Label>
                    الوظيفة <span className="text-destructive">*</span>
                  </Label>
                  <Input placeholder="أدخل الوظيفة" />
                </div>
                <div className="space-y-2">
                  <Label>
                    رقم الجوال <span className="text-destructive">*</span>
                  </Label>
                  <Input placeholder="05" dir="ltr" className="text-right" />
                </div>
              </div>
            </div>

            {/* Installments Section */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">الأقساط</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => setInstallments([...installments, `قسط ${installments.length + 1}`])}
                >
                  <Plus className="h-4 w-4" />
                  إضافة قسط
                </Button>
              </div>
              {installments.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">
                  لم يتم إضافة أقساط بعد
                </p>
              ) : (
                <div className="space-y-2">
                  {installments.map((inst, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                <Plus className="h-4 w-4" />
                إضافة سجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Records Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">السجلات الحالية</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث..." className="pr-10 w-[200px]" />
              </div>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">المشروع</TableHead>
                    <TableHead className="text-right">عنوان المشروع</TableHead>
                    <TableHead className="text-right">الفئة</TableHead>
                    <TableHead className="text-right">رقم الملف</TableHead>
                    <TableHead className="text-right">ملف المستفيد</TableHead>
                    <TableHead className="text-right">نوع الدعم</TableHead>
                    <TableHead className="text-right">المكان</TableHead>
                    <TableHead className="text-right">تاريخ البداية</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {existingProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.project}</TableCell>
                      <TableCell className="font-medium">{project.projectTitle}</TableCell>
                      <TableCell>{project.category}</TableCell>
                      <TableCell>{project.fileNumber}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 gap-1">
                          <Eye className="h-4 w-4" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell>{project.supportType}</TableCell>
                      <TableCell>{project.location}</TableCell>
                      <TableCell>{project.startDate}</TableCell>
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

export default RegisterBeneficiaryProjectPage;
