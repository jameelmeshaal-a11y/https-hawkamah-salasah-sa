import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Search, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UpdateBeneficiaryStatusPage = () => {
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
    toast.success("تم تحديث حالة الملف بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="تحديث حالة ملف مستفيد"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <RefreshCw className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">تحديث حالة ملف مستفيد</h1>
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
              <CardTitle>تحديث الحالة</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اسم المستفيد</Label>
                    <Input value="أحمد محمد علي" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>الحالة الحالية</Label>
                    <Input value="نشط" disabled className="bg-green-50 text-green-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-status">الحالة الجديدة *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="-- اختر الحالة الجديدة --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="stopped">متوقف</SelectItem>
                        <SelectItem value="suspended">معلق</SelectItem>
                        <SelectItem value="transferred">محول</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">سبب التغيير</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="-- اختر --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="improvement">تحسن الحالة</SelectItem>
                        <SelectItem value="death">وفاة</SelectItem>
                        <SelectItem value="travel">سفر</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea id="notes" placeholder="أدخل أي ملاحظات إضافية..." />
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

export default UpdateBeneficiaryStatusPage;
