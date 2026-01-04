import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Download, Eye, FileText } from "lucide-react";

interface ConfirmationRecord {
  id: number;
  confirmationNumber: string;
  paymentStatement: string;
  status: string;
  paymentType: string;
  amount: number;
  createdAtHijri: string;
  createdAtGregorian: string;
  createdBy: string;
}

const PaymentConfirmationsRecordsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const [records] = useState<ConfirmationRecord[]>([
    {
      id: 1,
      confirmationNumber: "65874",
      paymentStatement: "صرف دفعة مشروع",
      status: "معتمد",
      paymentType: "صرف مشروع",
      amount: 200.0,
      createdAtHijri: "1446-06-10",
      createdAtGregorian: "2024-12-10",
      createdBy: "مدير المالية",
    },
    {
      id: 2,
      confirmationNumber: "54117",
      paymentStatement: "صرف دفعة مشروع",
      status: "معتمد",
      paymentType: "صرف رواتب",
      amount: 150.0,
      createdAtHijri: "1446-06-15",
      createdAtGregorian: "2024-12-15",
      createdBy: "مدير المالية",
    },
  ]);

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="سجلات تعميدات الصرف"
      sectionTitle="إدارة التعميد بالصرف"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث عام..."
                    className="pr-9 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 سجلات</SelectItem>
                    <SelectItem value="20">20 سجل</SelectItem>
                    <SelectItem value="50">50 سجل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">التفاصيل</TableHead>
                    <TableHead className="text-right">تحميل التعميد</TableHead>
                    <TableHead className="text-right">رقم التعميد</TableHead>
                    <TableHead className="text-right">بيان الصرف</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">نوع الصرف</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">أنشأ بواسطة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600"
                        >
                          <Eye className="h-4 w-4 ml-1" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-700"
                        >
                          <FileText className="h-4 w-4 ml-1" />
                          PDF
                        </Button>
                      </TableCell>
                      <TableCell>{record.confirmationNumber}</TableCell>
                      <TableCell>{record.paymentStatement}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-sm bg-cyan-100 text-cyan-800">
                          {record.status}
                        </span>
                      </TableCell>
                      <TableCell>{record.paymentType}</TableCell>
                      <TableCell>{record.amount.toFixed(2)} ريال</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{record.createdAtHijri}</div>
                          <div className="text-muted-foreground">{record.createdAtGregorian}</div>
                        </div>
                      </TableCell>
                      <TableCell>{record.createdBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              عرض {records.length} من {records.length} سجل
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default PaymentConfirmationsRecordsPage;
