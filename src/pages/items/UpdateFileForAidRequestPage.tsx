import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileEdit, Search, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UpdateFileForAidRequestPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [found, setFound] = useState(false);

  const handleSearch = () => {
    if (searchValue) { setFound(true); toast.info("تم العثور على الملف"); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم تحديث الملف بنجاح");
  };

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="تحديث ملف لطلب إعانة" sectionTitle="إدارة تحديث البيانات" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><FileEdit className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">تحديث ملف لطلب إعانة</h1>
        </div>
        <Card className="mb-6">
          <CardHeader><CardTitle>البحث عن مستفيد</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input placeholder="أدخل رقم الهوية أو رقم الملف" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              </div>
              <Button onClick={handleSearch}><Search className="h-4 w-4 ml-2" />بحث</Button>
            </div>
          </CardContent>
        </Card>
        {found && (
          <Card>
            <CardHeader><CardTitle>تحديث البيانات لطلب الإعانة</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اسم المستفيد</Label>
                    <Input value="أحمد محمد علي" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الجوال</Label>
                    <Input id="phone" defaultValue="0512345678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income">الدخل الشهري</Label>
                    <Input id="income" type="number" defaultValue="2000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dependents">عدد المعالين</Label>
                    <Input id="dependents" type="number" defaultValue="4" />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90"><Save className="h-4 w-4 ml-2" />حفظ وتقديم طلب الإعانة</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default UpdateFileForAidRequestPage;
