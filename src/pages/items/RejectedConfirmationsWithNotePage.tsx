import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, FileX } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

const RejectedConfirmationsWithNotePage = () => {
  const [records] = useState<any[]>([]);

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="التعميدات المرفوضة مع ملاحظة"
      sectionTitle="إدارة التعميد بالصرف"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        {/* Instructions Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">
              يظهر فقط تعميدات الصرف التي تم إنشاؤها من حسابك والتي تم رفضها مع
              ملاحظة
            </p>
          </div>
        </div>

        {/* Records Table */}
        <Card>
          <CardContent className="pt-6">
            {records.length === 0 ? (
              <EmptyState
                icon={FileX}
                message="لا توجد بيانات متوفرة في الجدول"
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم التعميد</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">بيان الصرف</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">ملاحظة الرفض</TableHead>
                    <TableHead className="text-right">تاريخ الرفض</TableHead>
                    <TableHead className="text-right">رفض بواسطة</TableHead>
                    <TableHead className="text-right">إدارة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record: any) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.confirmationNumber}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.statement}</TableCell>
                      <TableCell>{record.amount}</TableCell>
                      <TableCell>{record.rejectionNote}</TableCell>
                      <TableCell>{record.rejectedAt}</TableCell>
                      <TableCell>{record.rejectedBy}</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default RejectedConfirmationsWithNotePage;
