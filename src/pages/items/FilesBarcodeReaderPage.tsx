import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScanLine, Camera, Search, User, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const FilesBarcodeReaderPage = () => {
  const [barcodeValue, setBarcodeValue] = useState("");
  const [beneficiaryData, setBeneficiaryData] = useState<any>(null);

  const handleScan = () => {
    if (barcodeValue) {
      setBeneficiaryData({
        name: "أحمد محمد علي",
        idNumber: "1234567890",
        fileNumber: "BEN-001",
        category: "يتيم",
        status: "نشط",
        phone: "0512345678",
        address: "الرياض - حي النسيم",
        lastUpdate: "2024-01-15",
      });
      toast.success("تم العثور على الملف");
    }
  };

  const handleCameraScan = () => {
    toast.info("جاري فتح الكاميرا...");
    // Simulate camera scan
    setTimeout(() => {
      setBarcodeValue("BEN-001");
      handleScan();
    }, 1000);
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="قارئ باركود الملفات"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ScanLine className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">قارئ باركود الملفات</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>مسح الباركود</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">وجه الكاميرا نحو الباركود</p>
                <Button onClick={handleCameraScan}>
                  <Camera className="h-4 w-4 ml-2" />
                  فتح الكاميرا
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">أو أدخل الرقم يدوياً</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>رقم الباركود / رقم الملف</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="أدخل رقم الباركود..."
                    value={barcodeValue}
                    onChange={(e) => setBarcodeValue(e.target.value)}
                  />
                  <Button onClick={handleScan}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>بيانات الملف</CardTitle>
            </CardHeader>
            <CardContent>
              {beneficiaryData ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{beneficiaryData.name}</h3>
                      <p className="text-muted-foreground">{beneficiaryData.fileNumber}</p>
                    </div>
                    <Badge className="mr-auto">{beneficiaryData.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">رقم الهوية</Label>
                      <p className="font-medium">{beneficiaryData.idNumber}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">الفئة</Label>
                      <p className="font-medium">{beneficiaryData.category}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">رقم الجوال</Label>
                      <p className="font-medium">{beneficiaryData.phone}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">آخر تحديث</Label>
                      <p className="font-medium">{beneficiaryData.lastUpdate}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-muted-foreground">العنوان</Label>
                      <p className="font-medium">{beneficiaryData.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button className="flex-1">
                      <User className="h-4 w-4 ml-2" />
                      عرض الملف الكامل
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 ml-2" />
                      طباعة
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ScanLine className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>قم بمسح الباركود لعرض بيانات الملف</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default FilesBarcodeReaderPage;
