import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCog, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const ManageRepresentativesAccountsPage = () => {
  const [representatives] = useState([
    { id: "1", name: "أحمد محمد", entityName: "جمعية البر الخيرية", phone: "0512345678", email: "ahmed@albir.org", status: "نشط" },
    { id: "2", name: "فاطمة علي", entityName: "مؤسسة الإحسان", phone: "0512345679", email: "fatima@ehsan.org", status: "نشط" },
  ]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("تم حفظ بيانات الممثل بنجاح"); };

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="إدارة حسابات الممثلين" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><UserCog className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">إدارة حسابات الممثلين</h1>
        </div>
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">قائمة الممثلين</TabsTrigger>
            <TabsTrigger value="add">إضافة ممثل جديد</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>الممثلين المسجلين</CardTitle>
                  <div className="flex items-center gap-2">
                    <Input placeholder="بحث..." className="w-64" />
                    <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">الجهة</TableHead>
                      <TableHead className="text-right">رقم الجوال</TableHead>
                      <TableHead className="text-right">البريد</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {representatives.map((rep) => (
                      <TableRow key={rep.id}>
                        <TableCell className="font-medium">{rep.name}</TableCell>
                        <TableCell>{rep.entityName}</TableCell>
                        <TableCell>{rep.phone}</TableCell>
                        <TableCell>{rep.email}</TableCell>
                        <TableCell><Badge>{rep.status}</Badge></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                            <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
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
              <CardHeader><CardTitle>إضافة ممثل جديد</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label htmlFor="name">الاسم *</Label><Input id="name" placeholder="أدخل الاسم" required /></div>
                    <div className="space-y-2"><Label htmlFor="entity">الجهة *</Label><Select required><SelectTrigger><SelectValue placeholder="-- اختر --" /></SelectTrigger><SelectContent><SelectItem value="e1">جمعية البر الخيرية</SelectItem><SelectItem value="e2">مؤسسة الإحسان</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label htmlFor="phone">رقم الجوال *</Label><Input id="phone" placeholder="05XXXXXXXX" required /></div>
                    <div className="space-y-2"><Label htmlFor="email">البريد الإلكتروني</Label><Input id="email" type="email" placeholder="example@email.com" /></div>
                  </div>
                  <div className="flex justify-end pt-4"><Button type="submit" className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 ml-2" />إضافة الممثل</Button></div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InnerPageLayout>
  );
};

export default ManageRepresentativesAccountsPage;
