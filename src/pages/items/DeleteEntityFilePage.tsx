import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search, Eye, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const DeleteEntityFilePage = () => {
  const [entities, setEntities] = useState([
    { id: "1", name: "جمعية البر الخيرية", type: "جمعية", city: "الرياض", representativesCount: 0, status: "نشط" },
    { id: "2", name: "مؤسسة الإحسان", type: "مؤسسة", city: "جدة", representativesCount: 2, status: "نشط" },
  ]);

  const handleDelete = (entity: any) => {
    if (entity.representativesCount > 0) {
      toast.error("لا يمكن حذف جهة لديها ممثلين مسجلين");
      return;
    }
    setEntities(entities.filter(e => e.id !== entity.id));
    toast.success("تم حذف الجهة بنجاح");
  };

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="حذف ملف جهة" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-destructive/10 rounded-lg"><Trash2 className="h-6 w-6 text-destructive" /></div>
          <h1 className="text-2xl font-bold">حذف ملف جهة</h1>
        </div>
        <Card className="mb-4 border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">لا يمكن حذف جهة لديها ممثلين مسجلين</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>قائمة الجهات</CardTitle>
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
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(entity)} disabled={entity.representativesCount > 0}><Trash2 className="h-4 w-4" /></Button>
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

export default DeleteEntityFilePage;
