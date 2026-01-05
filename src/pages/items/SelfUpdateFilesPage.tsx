import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCheck, Search, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";

const SelfUpdateFilesPage = () => {
  const [files] = useState([
    { id: "1", fileNumber: "BEN-005", name: "محمد علي", updateType: "تحديث ذاتي", updatedAt: "2024-01-18", status: "معتمد" },
    { id: "2", fileNumber: "BEN-006", name: "سارة أحمد", updateType: "تحديث ذاتي", updatedAt: "2024-01-17", status: "قيد المراجعة" },
  ]);

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="ملفات تحديث ذاتي" sectionTitle="إدارة تحديث البيانات" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><UserCheck className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">ملفات تحديث ذاتي</h1>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>الملفات ({files.length})</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="بحث..." className="w-64" />
                <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {files.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم الملف</TableHead>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">نوع التحديث</TableHead>
                    <TableHead className="text-right">تاريخ التحديث</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.fileNumber}</TableCell>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{file.updateType}</TableCell>
                      <TableCell>{file.updatedAt}</TableCell>
                      <TableCell><Badge variant={file.status === "معتمد" ? "default" : "secondary"}>{file.status}</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد ملفات تحديث ذاتي" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default SelfUpdateFilesPage;
