import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, Plus, Image, Paperclip } from "lucide-react";
import { toast } from "sonner";

const CreateGroupUpdateTaskPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم إنشاء مهمة التحديث الجماعي بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="إنشاء مهمة تحديث جماعي"
      sectionTitle="إدارة تحديث البيانات"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <form onSubmit={handleSubmit}>
          {/* بيانات المهمة */}
          <Card className="mb-6">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-lg">بيانات المهمة</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* عنوان المهمة */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-1">
                    عنوان المهمة <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="title" 
                    defaultValue="تحديث بيانات مستفيدين (تحديث جماعي)"
                    className="text-right"
                    required 
                  />
                </div>

                {/* نوع المهمة */}
                <div className="space-y-2">
                  <Label htmlFor="task-type" className="flex items-center gap-1">
                    نوع المهمة <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="group-update">
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="group-update">تحديث بيانات مستفيدين (تحديث جماعي)</SelectItem>
                      <SelectItem value="field-update">تحديث ميداني</SelectItem>
                      <SelectItem value="verification">التحقق من البيانات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* تاريخ بداية المهمة */}
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="flex items-center gap-1">
                    تاريخ بداية المهمة <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="start-date" 
                    type="datetime-local" 
                    defaultValue="2026-01-07T00:00"
                    required 
                  />
                </div>

                {/* تاريخ إنهاء المهمة */}
                <div className="space-y-2">
                  <Label htmlFor="end-date" className="flex items-center gap-1">
                    تاريخ إنهاء المهمة <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="end-date" 
                    type="datetime-local" 
                    defaultValue="2026-01-08T00:00"
                    required 
                  />
                </div>

                {/* تفاصيل المهمة */}
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="details">تفاصيل المهمة</Label>
                  <Textarea 
                    id="details" 
                    placeholder="أدخل تفاصيل المهمة..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* الصور */}
                <div className="space-y-2">
                  <Label>الصور</Label>
                  <Button type="button" className="w-full bg-primary hover:bg-primary/90">
                    <Image className="h-4 w-4 ml-2" />
                    إضافة صور
                  </Button>
                </div>

                {/* المرفقات */}
                <div className="space-y-2">
                  <Label>المرفقات</Label>
                  <Button type="button" className="w-full bg-primary hover:bg-primary/90">
                    <Paperclip className="h-4 w-4 ml-2" />
                    إضافة مرفقات
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* الموظف المسؤول */}
          <Card className="mb-6">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-lg">الموظف المسؤول</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* الإدارة المختصة */}
                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-1">
                    الإدارة المختصة <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="beneficiaries">
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beneficiaries">إدارة المستفيدين</SelectItem>
                      <SelectItem value="finance">الإدارة المالية</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* تحويل إلى */}
                <div className="space-y-2">
                  <Label htmlFor="transfer-to" className="flex items-center gap-1">
                    تحويل إلى <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="manager">
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">مدير الإدارة</SelectItem>
                      <SelectItem value="supervisor">المشرف</SelectItem>
                      <SelectItem value="employee">موظف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* الموظف المختص */}
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="employee" className="flex items-center gap-1">
                    الموظف المختص <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="system-admin">
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system-admin">مدير النظام التقني</SelectItem>
                      <SelectItem value="emp1">أحمد محمد</SelectItem>
                      <SelectItem value="emp2">سارة علي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* الملفات المسجلة */}
          <Card className="mb-6">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-lg">الملفات المسجلة</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* آلية البحث */}
                <div className="space-y-2">
                  <Label htmlFor="search-method" className="flex items-center gap-1">
                    آلية البحث <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="category-area">
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category-area">تنقية بالفئة او الحي</SelectItem>
                      <SelectItem value="file-number">رقم الملف</SelectItem>
                      <SelectItem value="national-id">رقم الهوية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* اجمالي عدد الملفات */}
                <div className="space-y-2">
                  <Label htmlFor="total-files" className="flex items-center gap-1">
                    اجمالي عدد الملفات <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="total-files" 
                    type="number"
                    defaultValue="12"
                    readOnly
                    className="bg-muted text-center"
                  />
                </div>

                {/* فراغ */}
                <div></div>

                {/* فئة الملف */}
                <div className="space-y-2">
                  <Label htmlFor="file-category">فئة الملف</Label>
                  <Input 
                    id="file-category" 
                    placeholder="اترك الحقول فارغة لاختيار كافة التابعين في التصنيف"
                  />
                </div>

                {/* القرية - الحي */}
                <div className="space-y-2">
                  <Label htmlFor="area">القرية - الحي</Label>
                  <Input 
                    id="area" 
                    placeholder="اترك الحقول فارغة لاختيار كافة التابعين في التصنيف"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* زر الإضافة */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 text-lg"
            >
              <Plus className="h-5 w-5 ml-2" />
              إضافة سجل
            </Button>
          </div>
        </form>
      </div>
    </InnerPageLayout>
  );
};

export default CreateGroupUpdateTaskPage;
