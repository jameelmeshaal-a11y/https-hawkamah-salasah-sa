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
import { Search, Download, Eye, Settings } from "lucide-react";

interface PurchaseVoucher {
  id: number;
  voucherType: string;
  startDateHijri: string;
  startDateGregorian: string;
  endDateHijri: string;
  endDateGregorian: string;
  voucherValue: number;
  notes: string;
  createdAtHijri: string;
  createdAtGregorian: string;
}

const PurchaseVouchersApprovalPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const [vouchers] = useState<PurchaseVoucher[]>([
    {
      id: 1,
      voucherType: "مواد غذائية",
      startDateHijri: "1446-06-01",
      startDateGregorian: "2024-12-01",
      endDateHijri: "1446-06-30",
      endDateGregorian: "2024-12-30",
      voucherValue: 300,
      notes: "",
      createdAtHijri: "1446-05-28",
      createdAtGregorian: "2024-11-28",
    },
    {
      id: 2,
      voucherType: "أخرى",
      startDateHijri: "1446-07-01",
      startDateGregorian: "2025-01-01",
      endDateHijri: "1446-07-29",
      endDateGregorian: "2025-01-29",
      voucherValue: 50,
      notes: "",
      createdAtHijri: "1446-06-25",
      createdAtGregorian: "2024-12-25",
    },
  ]);

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="اعتماد القسائم الشرائية"
      sectionTitle="إدارة الاعتمادات"
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
                    <TableHead className="text-right">إدارة</TableHead>
                    <TableHead className="text-right">معاينة</TableHead>
                    <TableHead className="text-right">نوع القسيمة</TableHead>
                    <TableHead className="text-right">بداية القسيمة</TableHead>
                    <TableHead className="text-right">نهاية القسيمة</TableHead>
                    <TableHead className="text-right">قيمة القسيمة</TableHead>
                    <TableHead className="text-right">ملاحظات</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
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
                      <TableCell>
                        <div className="text-sm">
                          <div>{voucher.startDateHijri}</div>
                          <div className="text-muted-foreground">{voucher.startDateGregorian}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{voucher.endDateHijri}</div>
                          <div className="text-muted-foreground">{voucher.endDateGregorian}</div>
                        </div>
                      </TableCell>
                      <TableCell>{voucher.voucherValue} ﷼</TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">
                          {voucher.notes || "غير متاح"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{voucher.createdAtHijri}</div>
                          <div className="text-muted-foreground">{voucher.createdAtGregorian}</div>
                        </div>
                      </TableCell>
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
