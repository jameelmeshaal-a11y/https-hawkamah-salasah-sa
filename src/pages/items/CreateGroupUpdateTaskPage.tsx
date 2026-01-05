import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, Save, Calendar } from "lucide-react";
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
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FilePlus className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">إنشاء مهمة تحديث جماعي</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>بيانات المهمة</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان المهمة *</Label>
                  <Input id="title" placeholder="أدخل عنوان المهمة" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">فئة المستفيدين *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الفئات</SelectItem>
                      <SelectItem value="orphan">أيتام</SelectItem>
                      <SelectItem value="widow">أرامل</SelectItem>
                      <SelectItem value="poor">فقراء</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date">تاريخ البدء *</Label>
                  <Input id="start-date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">تاريخ الانتهاء *</Label>
                  <Input id="end-date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">المسؤول</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emp1">أحمد محمد</SelectItem>
                      <SelectItem value="emp2">سارة علي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">وصف المهمة</Label>
                <Textarea id="description" placeholder="أدخل وصف المهمة..." />
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 ml-2" />
                  إنشاء المهمة
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default CreateGroupUpdateTaskPage;
