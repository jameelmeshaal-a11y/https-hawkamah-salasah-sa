import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Download, Printer } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ExportBeneficiaryCardsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleExport = () => {
    toast.success("جاري تصدير البطاقات...");
  };

  const handlePrint = () => {
    toast.success("جاري الطباعة...");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="تصدير بطاقات المستفيدين"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">تصدير بطاقات المستفيدين</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>خيارات التصدير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>فئة المستفيدين *</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="-- اختر الفئة --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="orphan">أيتام</SelectItem>
                    <SelectItem value="widow">أرامل</SelectItem>
                    <SelectItem value="poor">فقراء</SelectItem>
                    <SelectItem value="disabled">ذوي إعاقة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>حالة الملف</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="-- اختر الحالة --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="stopped">متوقف</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>صيغة التصدير *</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="-- اختر الصيغة --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label>البيانات المطلوبة في البطاقة:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="name" defaultChecked />
                    <Label htmlFor="name" className="font-normal">الاسم</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="id" defaultChecked />
                    <Label htmlFor="id" className="font-normal">رقم الهوية</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="file-num" defaultChecked />
                    <Label htmlFor="file-num" className="font-normal">رقم الملف</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="category" defaultChecked />
                    <Label htmlFor="category" className="font-normal">الفئة</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="photo" />
                    <Label htmlFor="photo" className="font-normal">الصورة</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="barcode" />
                    <Label htmlFor="barcode" className="font-normal">الباركود</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معاينة البطاقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-6 max-w-sm mx-auto">
                  <div className="text-lg font-bold mb-4">بطاقة مستفيد</div>
                  <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                  <div className="space-y-2 text-sm">
                    <div>الاسم: أحمد محمد علي</div>
                    <div>رقم الهوية: 1234567890</div>
                    <div>رقم الملف: BEN-001</div>
                    <div>الفئة: يتيم</div>
                  </div>
                  <div className="mt-4 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                    [باركود]
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1" onClick={handleExport}>
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
                <Button variant="outline" className="flex-1" onClick={handlePrint}>
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default ExportBeneficiaryCardsPage;
