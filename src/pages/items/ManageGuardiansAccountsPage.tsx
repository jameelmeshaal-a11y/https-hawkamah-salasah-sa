import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCog, Plus, Search, Edit, Eye, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

interface Guardian {
  id: string;
  name: string;
  idNumber: string;
  phone: string;
  dependentsCount: number;
  status: string;
}

const ManageGuardiansAccountsPage = () => {
  const [guardians] = useState<Guardian[]>([
    { id: "1", name: "فاطمة محمد العتيبي", idNumber: "1234567890", phone: "0512345678", dependentsCount: 3, status: "نشط" },
    { id: "2", name: "سارة أحمد السالم", idNumber: "1234567891", phone: "0512345679", dependentsCount: 2, status: "نشط" },
    { id: "3", name: "أحمد علي الشمري", idNumber: "1234567892", phone: "0512345670", dependentsCount: 4, status: "متوقف" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم حفظ بيانات الوصي بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="إدارة حسابات الأوصياء"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserCog className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">إدارة حسابات الأوصياء</h1>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">قائمة الأوصياء</TabsTrigger>
            <TabsTrigger value="add">إضافة وصي جديد</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>الأوصياء المسجلين</CardTitle>
                  <div className="flex items-center gap-2">
                    <Input placeholder="بحث..." className="w-64" />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">رقم الهوية</TableHead>
                      <TableHead className="text-right">رقم الجوال</TableHead>
                      <TableHead className="text-right">عدد التابعين</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guardians.map((guardian) => (
                      <TableRow key={guardian.id}>
                        <TableCell className="font-medium">{guardian.name}</TableCell>
                        <TableCell>{guardian.idNumber}</TableCell>
                        <TableCell>{guardian.phone}</TableCell>
                        <TableCell>{guardian.dependentsCount}</TableCell>
                        <TableCell>
                          <Badge variant={guardian.status === "نشط" ? "default" : "secondary"}>
                            {guardian.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>إضافة وصي جديد</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input id="name" placeholder="أدخل الاسم الكامل" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="id-number">رقم الهوية *</Label>
                      <Input id="id-number" placeholder="أدخل رقم الهوية" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الجوال *</Label>
                      <Input id="phone" placeholder="05XXXXXXXX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relation">صلة القرابة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="-- اختر --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mother">أم</SelectItem>
                          <SelectItem value="father">أب</SelectItem>
                          <SelectItem value="uncle">عم / خال</SelectItem>
                          <SelectItem value="aunt">عمة / خالة</SelectItem>
                          <SelectItem value="other">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" placeholder="example@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">العنوان</Label>
                      <Input id="address" placeholder="أدخل العنوان" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة الوصي
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InnerPageLayout>
  );
};

export default ManageGuardiansAccountsPage;
