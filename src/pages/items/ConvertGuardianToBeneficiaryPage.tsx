import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserMinus, Search, ArrowLeft, Save, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const ConvertGuardianToBeneficiaryPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [found, setFound] = useState(false);

  const handleSearch = () => {
    if (searchValue) {
      setFound(true);
      toast.info("تم العثور على الوصي");
    }
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم تحويل الوصي إلى مستفيد بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="تحويل وصي إلى مستفيد"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserMinus className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">تحويل وصي إلى مستفيد</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>البحث عن وصي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="أدخل رقم الهوية"
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
          <>
            <Card className="mb-4 border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium">تنبيه: يجب نقل أو تعيين وصي جديد للتابعين قبل إتمام التحويل</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>تحويل إلى مستفيد</span>
                  <ArrowLeft className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleConvert} className="space-y-6">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-3">بيانات الوصي الحالية</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">الاسم:</span>
                        <p className="font-medium">فاطمة محمد العتيبي</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">رقم الهوية:</span>
                        <p className="font-medium">1234567890</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">عدد التابعين:</span>
                        <Badge variant="outline">3</Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">الحالة:</span>
                        <Badge>نشط</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">فئة المستفيد الجديدة *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="widow">أرملة</SelectItem>
                          <SelectItem value="poor">فقير</SelectItem>
                          <SelectItem value="disabled">ذوي إعاقة</SelectItem>
                          <SelectItem value="elderly">مسن</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dependents-action">إجراء التابعين *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transfer">نقل لوصي آخر</SelectItem>
                          <SelectItem value="close">إغلاق ملفاتهم</SelectItem>
                          <SelectItem value="independent">تحويلهم لمستفيدين مستقلين</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-guardian">الوصي الجديد (إن وجد)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="g1">سارة أحمد السالم</SelectItem>
                          <SelectItem value="g2">أحمد علي الشمري</SelectItem>
                          <SelectItem value="g3">نورة سعد القحطاني</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">سبب التحويل</Label>
                    <Textarea id="notes" placeholder="أدخل سبب تحويل الوصي إلى مستفيد..." />
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
          </>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default ConvertGuardianToBeneficiaryPage;
