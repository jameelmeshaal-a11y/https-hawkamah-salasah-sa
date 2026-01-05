import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const ManageEntitiesAccountsPage = () => {
  const [entities] = useState([
    { id: "1", name: "جمعية البر الخيرية", type: "جمعية خيرية", city: "الرياض", representativesCount: 2, status: "نشط" },
    { id: "2", name: "مؤسسة الإحسان", type: "مؤسسة", city: "جدة", representativesCount: 1, status: "نشط" },
  ]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("تم حفظ بيانات الجهة بنجاح"); };

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="إدارة حسابات الجهات" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><Building2 className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">إدارة حسابات الجهات</h1>
        </div>
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">قائمة الجهات</TabsTrigger>
            <TabsTrigger value="add">إضافة جهة جديدة</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>الجهات المسجلة</CardTitle>
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
                      <TableHead className="text-right">اسم الجهة</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">المدينة</TableHead>
                      <TableHead className="text-right">عدد الممثلين</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entities.map((entity) => (
                      <TableRow key={entity.id}>
                        <TableCell className="font-medium">{entity.name}</TableCell>
                        <TableCell>{entity.type}</TableCell>
                        <TableCell>{entity.city}</TableCell>
                        <TableCell>{entity.representativesCount}</TableCell>
                        <TableCell><Badge>{entity.status}</Badge></TableCell>
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
              <CardHeader><CardTitle>إضافة جهة جديدة</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label htmlFor="name">اسم الجهة *</Label><Input id="name" placeholder="أدخل اسم الجهة" required /></div>
                    <div className="space-y-2"><Label htmlFor="type">نوع الجهة *</Label><Select required><SelectTrigger><SelectValue placeholder="-- اختر --" /></SelectTrigger><SelectContent><SelectItem value="charity">جمعية خيرية</SelectItem><SelectItem value="foundation">مؤسسة</SelectItem><SelectItem value="company">شركة</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label htmlFor="city">المدينة</Label><Select><SelectTrigger><SelectValue placeholder="-- اختر --" /></SelectTrigger><SelectContent><SelectItem value="riyadh">الرياض</SelectItem><SelectItem value="jeddah">جدة</SelectItem></SelectContent></Select></div>
                  </div>
                  <div className="flex justify-end pt-4"><Button type="submit" className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 ml-2" />إضافة الجهة</Button></div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InnerPageLayout>
  );
};

export default ManageEntitiesAccountsPage;
