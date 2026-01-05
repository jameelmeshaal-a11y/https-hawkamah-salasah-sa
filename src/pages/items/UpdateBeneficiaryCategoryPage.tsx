import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FolderOpen, Search, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UpdateBeneficiaryCategoryPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [found, setFound] = useState(false);

  const handleSearch = () => {
    if (searchValue) {
      setFound(true);
      toast.info("تم العثور على الملف");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم تحديث فئة الملف بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="تحديث فئة ملف مستفيد"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FolderOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">تحديث فئة ملف مستفيد</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>البحث عن مستفيد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="أدخل رقم الهوية أو رقم الملف"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 ml-2" />
                بحث
              </Button>
            </div>
          </CardContent>
        </Card>

        {found && (
          <Card>
            <CardHeader>
              <CardTitle>تحديث الفئة</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اسم المستفيد</Label>
                    <Input value="أحمد محمد علي" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>الفئة الحالية</Label>
                    <Input value="يتيم" disabled className="bg-blue-50 text-blue-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-category">الفئة الجديدة *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="-- اختر الفئة الجديدة --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orphan">يتيم</SelectItem>
                        <SelectItem value="widow">أرملة</SelectItem>
                        <SelectItem value="poor">فقير</SelectItem>
                        <SelectItem value="disabled">ذوي إعاقة</SelectItem>
                        <SelectItem value="elderly">مسن</SelectItem>
                        <SelectItem value="student">طالب علم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sub-category">الفئة الفرعية</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="-- اختر --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sub1">فئة فرعية 1</SelectItem>
                        <SelectItem value="sub2">فئة فرعية 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">سبب التغيير</Label>
                  <Textarea id="notes" placeholder="أدخل سبب تغيير الفئة..." />
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default UpdateBeneficiaryCategoryPage;
