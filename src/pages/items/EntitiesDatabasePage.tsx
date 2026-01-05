import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Search, Eye, FileText, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import StatCard from "@/components/shared/StatCard";

const EntitiesDatabasePage = () => {
  const [entities] = useState([
    { id: "1", name: "جمعية البر الخيرية", type: "جمعية خيرية", city: "الرياض", representativesCount: 2, status: "نشط" },
    { id: "2", name: "مؤسسة الإحسان", type: "مؤسسة", city: "جدة", representativesCount: 1, status: "نشط" },
    { id: "3", name: "شركة التكافل", type: "شركة", city: "الدمام", representativesCount: 3, status: "نشط" },
  ]);

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="قاعدة بيانات الجهات" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><Database className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">قاعدة بيانات الجهات</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="إجمالي الجهات" value={entities.length} icon={Database} />
          <StatCard title="الجهات النشطة" value={entities.filter(e => e.status === "نشط").length} />
          <StatCard title="إجمالي الممثلين" value={entities.reduce((sum, e) => sum + e.representativesCount, 0)} />
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>قائمة الجهات</CardTitle>
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
                    <TableCell><Badge variant="outline">{entity.representativesCount}</Badge></TableCell>
                    <TableCell><Badge>{entity.status}</Badge></TableCell>
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

export default EntitiesDatabasePage;
