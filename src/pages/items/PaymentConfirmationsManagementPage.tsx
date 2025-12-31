import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Upload } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import { FileX } from "lucide-react";

const PaymentConfirmationsManagementPage = () => {
  const [confirmationType, setConfirmationType] = useState("");
  const [paymentStatement, setPaymentStatement] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [records] = useState<any[]>([]);

  const handleAddRecord = () => {
    console.log("Adding confirmation:", {
      confirmationType,
      paymentStatement,
      amount,
      paymentDetails,
    });
  };

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="إدارة تعميدات الصرف"
      sectionTitle="تعميدات الصرف"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        {/* Instructions Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>يظهر فقط تعميدات الصرف التي تم إنشاؤها من حسابك</li>
              <li>
                لا يمكن حذف أو تعديل تعميدات الصرف المعتمدة عند طلب نوع الصرف
                للأعضاء
              </li>
              <li>لا يمكن حذف أو تعديل تعميدات الصرف المنشأة لها سندات صرف</li>
              <li>يجب التأكد من صحة البيانات قبل الإضافة</li>
            </ul>
          </div>
        </div>

        {/* Add Record Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إضافة سجل جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>النوع</Label>
                <Select
                  value={confirmationType}
                  onValueChange={setConfirmationType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">تعميد صرف عام</SelectItem>
                    <SelectItem value="members">تعميد صرف للأعضاء</SelectItem>
                    <SelectItem value="project">تعميد صرف مشروع</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>بيان الصرف</Label>
                <Input
                  value={paymentStatement}
                  onChange={(e) => setPaymentStatement(e.target.value)}
                  placeholder="أدخل بيان الصرف"
                />
              </div>
              <div className="space-y-2">
                <Label>المبلغ</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="أدخل المبلغ"
                />
              </div>
              <div className="space-y-2">
                <Label>المرفقات</Label>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 ml-2" />
                  إضافة مرفقات
                </Button>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>تفاصيل الصرف</Label>
                <Textarea
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder="أدخل تفاصيل الصرف"
                  rows={3}
                />
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleAddRecord}
                className="bg-green-600 hover:bg-green-700"
              >
                إضافة السجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">السجلات</CardTitle>
          </CardHeader>
          <CardContent>
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
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
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
                      <TableCell>{record.status}</TableCell>
                      <TableCell>{record.createdAt}</TableCell>
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

export default PaymentConfirmationsManagementPage;
