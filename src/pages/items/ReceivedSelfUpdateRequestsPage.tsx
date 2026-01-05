import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileInput, Search, Eye, Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";

const ReceivedSelfUpdateRequestsPage = () => {
  const [requests] = useState([
    { id: "1", beneficiaryName: "خالد سعد", field: "رقم الجوال", oldValue: "0512345678", newValue: "0598765432", requestDate: "2024-01-20" },
    { id: "2", beneficiaryName: "نورة محمد", field: "العنوان", oldValue: "الرياض - النسيم", newValue: "الرياض - الملز", requestDate: "2024-01-19" },
  ]);

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="طلبات التحديث الذاتي المستلمة" sectionTitle="إدارة تحديث البيانات" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><FileInput className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">طلبات التحديث الذاتي المستلمة</h1>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>الطلبات المستلمة</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="بحث..." className="w-64" />
                <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {requests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم المستفيد</TableHead>
                    <TableHead className="text-right">الحقل</TableHead>
                    <TableHead className="text-right">القيمة القديمة</TableHead>
                    <TableHead className="text-right">القيمة الجديدة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.beneficiaryName}</TableCell>
                      <TableCell>{request.field}</TableCell>
                      <TableCell className="text-red-600">{request.oldValue}</TableCell>
                      <TableCell className="text-green-600">{request.newValue}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700"><Check className="h-4 w-4" /></Button>
                          <Button variant="destructive" size="sm"><X className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد طلبات مستلمة" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ReceivedSelfUpdateRequestsPage;
