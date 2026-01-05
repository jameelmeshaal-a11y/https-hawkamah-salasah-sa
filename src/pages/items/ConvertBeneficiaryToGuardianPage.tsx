import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserCheck, Search, ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const ConvertBeneficiaryToGuardianPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [found, setFound] = useState(false);

  const handleSearch = () => {
    if (searchValue) {
      setFound(true);
      toast.info("تم العثور على المستفيد");
    }
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم تحويل المستفيد إلى وصي بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="تحويل مستفيد إلى وصي"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserCheck className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">تحويل مستفيد إلى وصي</h1>
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
              <CardTitle className="flex items-center gap-2">
                <span>تحويل إلى وصي</span>
                <ArrowLeft className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleConvert} className="space-y-6">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-3">بيانات المستفيد الحالية</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">الاسم:</span>
                      <p className="font-medium">أحمد محمد علي</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">رقم الهوية:</span>
                      <p className="font-medium">1234567890</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">رقم الجوال:</span>
                      <p className="font-medium">0512345678</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">الحالة:</span>
                      <Badge>نشط</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="relation">صلة القرابة مع التابعين *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="-- اختر --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mother">أم</SelectItem>
                        <SelectItem value="father">أب</SelectItem>
                        <SelectItem value="brother">أخ</SelectItem>
                        <SelectItem value="sister">أخت</SelectItem>
                        <SelectItem value="uncle">عم / خال</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="action">إجراء ملف المستفيد *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="-- اختر --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="close">إغلاق الملف</SelectItem>
                        <SelectItem value="keep">الاحتفاظ بالملف</SelectItem>
                        <SelectItem value="transfer">تحويل إلى تابع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea id="notes" placeholder="أدخل أي ملاحظات حول عملية التحويل..." />
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    <Save className="h-4 w-4 ml-2" />
                    تأكيد التحويل
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

export default ConvertBeneficiaryToGuardianPage;
