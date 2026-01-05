import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, Search, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";

const RestoreEntityFilePage = () => {
  const [entities, setEntities] = useState([
    { id: "1", name: "جمعية الخير", type: "جمعية", deletedAt: "2024-01-10", deletedBy: "أحمد محمد" },
  ]);

  const handleRestore = (id: string) => {
    setEntities(entities.filter(e => e.id !== id));
    toast.success("تم استعادة الجهة بنجاح");
  };

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="استعادة ملف جهة" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><RotateCcw className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">استعادة ملف جهة</h1>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>الجهات المحذوفة ({entities.length})</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="بحث..." className="w-64" />
                <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {entities.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم الجهة</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">تاريخ الحذف</TableHead>
                    <TableHead className="text-right">حذف بواسطة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entities.map((entity) => (
                    <TableRow key={entity.id}>
                      <TableCell className="font-medium">{entity.name}</TableCell>
                      <TableCell>{entity.type}</TableCell>
                      <TableCell>{entity.deletedAt}</TableCell>
                      <TableCell>{entity.deletedBy}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                          <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700" onClick={() => handleRestore(entity.id)}><RotateCcw className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد جهات محذوفة" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default RestoreEntityFilePage;
