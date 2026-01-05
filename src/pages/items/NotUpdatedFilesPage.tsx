import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XCircle, Search, Eye, Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";

const NotUpdatedFilesPage = () => {
  const [files] = useState([
    { id: "1", fileNumber: "BEN-001", name: "أحمد محمد", lastUpdate: "2023-01-15", daysSinceUpdate: 365 },
    { id: "2", fileNumber: "BEN-002", name: "فاطمة سالم", lastUpdate: "2023-06-20", daysSinceUpdate: 210 },
  ]);

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="ملفات غير محدثة" sectionTitle="إدارة تحديث البيانات" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 rounded-lg"><XCircle className="h-6 w-6 text-red-600" /></div>
          <h1 className="text-2xl font-bold">ملفات غير محدثة</h1>
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
                    <TableHead className="text-right">آخر تحديث</TableHead>
                    <TableHead className="text-right">الأيام منذ التحديث</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.fileNumber}</TableCell>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{file.lastUpdate}</TableCell>
                      <TableCell><Badge variant="destructive">{file.daysSinceUpdate} يوم</Badge></TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                          <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد ملفات غير محدثة" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default NotUpdatedFilesPage;
