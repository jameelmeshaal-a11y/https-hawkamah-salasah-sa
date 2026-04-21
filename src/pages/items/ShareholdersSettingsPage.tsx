import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShareholdersSettingsPage = () => {
  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="إعدادات المساهمين"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Settings className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">إعدادات المساهمين</h1>
        </div>

        {/* Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="stock-data" className="w-full" dir="rtl">
              <div className="border-b">
                <TabsList className="w-full justify-start rounded-none bg-transparent h-auto p-0">
                  <TabsTrigger 
                    value="stock-data" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                  >
                    بيانات السهم
                  </TabsTrigger>
                  <TabsTrigger 
                    value="calendar-display" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                  >
                    إدارة إظهار التقويم
                  </TabsTrigger>
                  <TabsTrigger 
                    value="required-data" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                  >
                    البيانات المطلوبة بدون
                  </TabsTrigger>
                  <TabsTrigger 
                    value="profit-distribution" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent px-6 py-3"
                  >
                    نسب توزيع الأرباح
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="stock-data" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockValue">القيمة الإسمية للسهم *</Label>
                    <Input id="stockValue" type="number" placeholder="أدخل قيمة السهم" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="membershipFee">نسبة رسوم العضوية *</Label>
                    <div className="relative">
                      <Input id="membershipFee" type="number" placeholder="أدخل النسبة" className="pl-8" />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxCapacity">الحد الأقصى لسعة المساهم *</Label>
                    <Input id="maxCapacity" type="number" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPurchase">الحد الأقصى لشراء الأسهم</Label>
                    <div className="relative">
                      <Input id="maxPurchase" type="number" placeholder="أدخل الحد الأقصى" className="pl-12" />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">﷼</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxBonus">الحد الأقصى لحساب المكافآت</Label>
                    <div className="relative">
                      <Input id="maxBonus" type="number" placeholder="أدخل النسبة" className="pl-8" />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                    <Save className="h-4 w-4" />
                    حفظ الإعدادات
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="calendar-display" className="p-6">
                <p className="text-muted-foreground">إعدادات إظهار التقويم</p>
              </TabsContent>

              <TabsContent value="required-data" className="p-6">
                <p className="text-muted-foreground">إعدادات البيانات المطلوبة</p>
              </TabsContent>

              <TabsContent value="profit-distribution" className="p-6">
                <p className="text-muted-foreground">إعدادات نسب توزيع الأرباح</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ShareholdersSettingsPage;
