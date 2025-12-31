import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Search, Download, Eye, Settings } from "lucide-react";

interface PurchaseVoucher {
  id: number;
  voucherType: string;
  startDate: string;
  endDate: string;
  voucherValue: number;
  notes: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

const PurchaseVouchersApprovalPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const [vouchers] = useState<PurchaseVoucher[]>([
    {
      id: 1,
      voucherType: "مواد غذائية",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      voucherValue: 300,
      notes: "قسيمة شهرية",
      createdAt: "2024-01-01",
      createdBy: "مدير المشتريات",
      updatedAt: "2024-01-05",
      updatedBy: "مدير المشتريات",
    },
    {
      id: 2,
      voucherType: "أخرى",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      voucherValue: 50,
      notes: "قسيمة مستلزمات",
      createdAt: "2024-02-01",
      createdBy: "مدير المشتريات",
      updatedAt: "2024-02-02",
      updatedBy: "مدير المشتريات",
    },
  ]);

  return (
    <InnerPageLayout
      moduleId="supervision"
      sectionId="aid-committee"
      itemId="purchase-vouchers"
      title="اعتماد القسائم الشرائية"
      sectionTitle="لجنة المساعدات"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg">القسائم الشرائية</CardTitle>
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
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">إدارة</TableHead>
                    <TableHead className="text-right">معاينة القسيمة</TableHead>
                    <TableHead className="text-right">نوع القسيمة</TableHead>
                    <TableHead className="text-right">بداية القسيمة</TableHead>
                    <TableHead className="text-right">نهاية القسيمة</TableHead>
                    <TableHead className="text-right">قيمة القسيمة</TableHead>
                    <TableHead className="text-right">ملاحظات</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">أنشأ بواسطة</TableHead>
                    <TableHead className="text-right">تاريخ التحديث</TableHead>
                    <TableHead className="text-right">حدث بواسطة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Settings className="h-4 w-4 ml-1" />
                          إدارة الطلب
                        </Button>
                      </TableCell>
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
                      <TableCell>{voucher.voucherType}</TableCell>
                      <TableCell>{voucher.startDate}</TableCell>
                      <TableCell>{voucher.endDate}</TableCell>
                      <TableCell>{voucher.voucherValue} ريال</TableCell>
                      <TableCell>{voucher.notes}</TableCell>
                      <TableCell>{voucher.createdAt}</TableCell>
                      <TableCell>{voucher.createdBy}</TableCell>
                      <TableCell>{voucher.updatedAt}</TableCell>
                      <TableCell>{voucher.updatedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              عرض {vouchers.length} من {vouchers.length} سجل
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default PurchaseVouchersApprovalPage;
