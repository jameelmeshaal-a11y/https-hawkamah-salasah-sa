import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";

const FieldUpdateFilesPage = () => {
  const [files] = useState([
    { id: "1", fileNumber: "BEN-007", name: "عبدالله فهد", updatedBy: "أحمد محمد", updatedAt: "2024-01-19", area: "الرياض - النسيم" },
    { id: "2", fileNumber: "BEN-008", name: "نورة سعد", updatedBy: "سارة علي", updatedAt: "2024-01-18", area: "الرياض - الملز" },
  ]);

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="ملفات تحديث ميداني" sectionTitle="إدارة تحديث البيانات" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><MapPin className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">ملفات تحديث ميداني</h1>
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
                    <TableHead className="text-right">تحديث بواسطة</TableHead>
                    <TableHead className="text-right">تاريخ التحديث</TableHead>
                    <TableHead className="text-right">المنطقة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.fileNumber}</TableCell>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{file.updatedBy}</TableCell>
                      <TableCell>{file.updatedAt}</TableCell>
                      <TableCell><Badge variant="outline">{file.area}</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد ملفات تحديث ميداني" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default FieldUpdateFilesPage;
