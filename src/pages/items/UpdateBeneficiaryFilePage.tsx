import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCog, Search, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UpdateBeneficiaryFilePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [beneficiaryFound, setBeneficiaryFound] = useState(false);

  const handleSearch = () => {
    if (searchValue) {
      setBeneficiaryFound(true);
      toast.info("تم العثور على الملف");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم تحديث ملف المستفيد بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="تحديث ملف مستفيد"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserCog className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">تحديث ملف مستفيد</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>البحث عن مستفيد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">رقم الهوية أو رقم الملف</Label>
                <Input 
                  id="search" 
                  placeholder="أدخل رقم الهوية أو رقم الملف"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 ml-2" />
                  بحث
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {beneficiaryFound && (
          <Card>
            <CardHeader>
              <CardTitle>بيانات المستفيد</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input id="name" defaultValue="أحمد محمد علي" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="id-number">رقم الهوية</Label>
                    <Input id="id-number" defaultValue="1234567890" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الجوال</Label>
                    <Input id="phone" defaultValue="0512345678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">حالة الملف</Label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="stopped">متوقف</SelectItem>
                        <SelectItem value="suspended">معلق</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة</Label>
                    <Select defaultValue="orphan">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orphan">يتيم</SelectItem>
                        <SelectItem value="widow">أرملة</SelectItem>
                        <SelectItem value="poor">فقير</SelectItem>
                        <SelectItem value="disabled">ذوي إعاقة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income">الدخل الشهري</Label>
                    <Input id="income" type="number" defaultValue="2000" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التعديلات
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

export default UpdateBeneficiaryFilePage;
