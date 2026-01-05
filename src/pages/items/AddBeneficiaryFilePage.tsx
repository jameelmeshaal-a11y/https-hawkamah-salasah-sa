import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Save, X } from "lucide-react";
import { toast } from "sonner";

const AddBeneficiaryFilePage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم حفظ ملف المستفيد بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="إضافة ملف مستفيد"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">إضافة ملف مستفيد</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>بيانات المستفيد الجديد</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
                  <TabsTrigger value="contact">بيانات التواصل</TabsTrigger>
                  <TabsTrigger value="financial">البيانات المالية</TabsTrigger>
                  <TabsTrigger value="documents">المستندات</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input id="name" placeholder="أدخل الاسم الكامل" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="id-number">رقم الهوية *</Label>
                      <Input id="id-number" placeholder="أدخل رقم الهوية" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birth-date">تاريخ الميلاد</Label>
                      <Input id="birth-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">الجنس *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">ذكر</SelectItem>
                          <SelectItem value="female">أنثى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">الجنسية</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saudi">سعودي</SelectItem>
                          <SelectItem value="other">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marital-status">الحالة الاجتماعية</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">أعزب</SelectItem>
                          <SelectItem value="married">متزوج</SelectItem>
                          <SelectItem value="divorced">مطلق</SelectItem>
                          <SelectItem value="widowed">أرمل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الجوال *</Label>
                      <Input id="phone" placeholder="05XXXXXXXX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" placeholder="example@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">المدينة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="riyadh">الرياض</SelectItem>
                          <SelectItem value="jeddah">جدة</SelectItem>
                          <SelectItem value="makkah">مكة المكرمة</SelectItem>
                          <SelectItem value="madinah">المدينة المنورة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-3">
                      <Label htmlFor="address">العنوان التفصيلي</Label>
                      <Textarea id="address" placeholder="أدخل العنوان التفصيلي" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financial" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="income">الدخل الشهري</Label>
                      <Input id="income" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="income-source">مصدر الدخل</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salary">راتب</SelectItem>
                          <SelectItem value="support">إعانة</SelectItem>
                          <SelectItem value="pension">تقاعد</SelectItem>
                          <SelectItem value="none">لا يوجد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank">البنك</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alrajhi">الراجحي</SelectItem>
                          <SelectItem value="alinma">الإنماء</SelectItem>
                          <SelectItem value="alahli">الأهلي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iban">رقم الآيبان</Label>
                      <Input id="iban" placeholder="SA..." />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="id-copy">صورة الهوية</Label>
                      <Input id="id-copy" type="file" accept="image/*,.pdf" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="family-card">صورة سجل الأسرة</Label>
                      <Input id="family-card" type="file" accept="image/*,.pdf" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary-cert">شهادة الراتب</Label>
                      <Input id="salary-cert" type="file" accept="image/*,.pdf" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="other-docs">مستندات أخرى</Label>
                      <Input id="other-docs" type="file" accept="image/*,.pdf" multiple />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <Button type="button" variant="outline">
                  <X className="h-4 w-4 ml-2" />
                  إلغاء
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 ml-2" />
                  حفظ الملف
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default AddBeneficiaryFilePage;
