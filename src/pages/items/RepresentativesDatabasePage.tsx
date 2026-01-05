import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Eye, FileText, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import StatCard from "@/components/shared/StatCard";

const RepresentativesDatabasePage = () => {
  const [representatives] = useState([
    { id: "1", name: "أحمد محمد", entityName: "جمعية البر", idNumber: "1234567890", phone: "0512345678", status: "نشط" },
    { id: "2", name: "فاطمة علي", entityName: "مؤسسة الإحسان", idNumber: "1234567891", phone: "0512345679", status: "نشط" },
  ]);

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="قاعدة بيانات الممثلين" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><Users className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">قاعدة بيانات الممثلين</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="إجمالي الممثلين" value={representatives.length} icon={Users} />
          <StatCard title="الممثلين النشطين" value={representatives.filter(r => r.status === "نشط").length} />
          <StatCard title="الجهات المرتبطة" value={2} />
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>قائمة الممثلين</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="بحث..." className="w-64" />
                <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
                <Button variant="outline" onClick={() => toast.success("جاري التصدير...")}><Download className="h-4 w-4 ml-2" />تصدير</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">الجهة</TableHead>
                  <TableHead className="text-right">رقم الهوية</TableHead>
                  <TableHead className="text-right">الجوال</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {representatives.map((rep) => (
                  <TableRow key={rep.id}>
                    <TableCell className="font-medium">{rep.name}</TableCell>
                    <TableCell>{rep.entityName}</TableCell>
                    <TableCell>{rep.idNumber}</TableCell>
                    <TableCell>{rep.phone}</TableCell>
                    <TableCell><Badge>{rep.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm"><FileText className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default RepresentativesDatabasePage;
