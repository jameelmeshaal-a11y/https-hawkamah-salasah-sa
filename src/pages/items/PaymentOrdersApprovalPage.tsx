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
import { Search, Download, Eye, FileText, Settings } from "lucide-react";

interface PaymentOrder {
  id: number;
  orderNumber: string;
  taskDetails: string;
  taskStatus: string;
  downloadPath: string;
  orderStatus: string;
  orderClassification: string;
  fileType: string;
  orderType: string;
  orderTitle: string;
  supportType: string;
  supportCategory: string;
  targetCategory: string;
  fileCount: number;
}

const PaymentOrdersApprovalPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const [orders] = useState<PaymentOrder[]>([
    {
      id: 1,
      orderNumber: "PO-2024-001",
      taskDetails: "صرف مستحقات الربع الأول",
      taskStatus: "مكتمل",
      downloadPath: "path-001",
      orderStatus: "قيد الإعتماد",
      orderClassification: "عادي",
      fileType: "ملف مستفيد",
      orderType: "صرف دوري",
      orderTitle: "صرف كفالات شهر يناير",
      supportType: "مالي",
      supportCategory: "كفالة أيتام",
      targetCategory: "أيتام",
      fileCount: 25,
    },
    {
      id: 2,
      orderNumber: "PO-2024-002",
      taskDetails: "صرف مساعدات طارئة",
      taskStatus: "جاري",
      downloadPath: "path-002",
      orderStatus: "معتمد",
      orderClassification: "عاجل",
      fileType: "ملف مستفيد",
      orderType: "صرف طارئ",
      orderTitle: "مساعدات شتوية",
      supportType: "عيني",
      supportCategory: "مساعدات موسمية",
      targetCategory: "أسر محتاجة",
      fileCount: 50,
    },
  ]);

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="اعتماد أوامر الصرف"
      sectionTitle="لجنة المساعدات"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg">أوامر الصرف</CardTitle>
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
                    <TableHead className="text-right">أمر الصرف</TableHead>
                    <TableHead className="text-right">تفاصيل المهمة</TableHead>
                    <TableHead className="text-right">حالة المهمة</TableHead>
                    <TableHead className="text-right">تحميل المسير</TableHead>
                    <TableHead className="text-right">حالة الأمر</TableHead>
                    <TableHead className="text-right">تصنيف الأمر</TableHead>
                    <TableHead className="text-right">نوع الملفات</TableHead>
                    <TableHead className="text-right">نوع الأمر</TableHead>
                    <TableHead className="text-right">عنوان الأمر</TableHead>
                    <TableHead className="text-right">نوع الدعم</TableHead>
                    <TableHead className="text-right">فئة الدعم</TableHead>
                    <TableHead className="text-right">الفئة المستهدفة</TableHead>
                    <TableHead className="text-right">عدد الملفات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Settings className="h-4 w-4 ml-1" />
                            إدارة
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>{order.taskDetails}</TableCell>
                      <TableCell>{order.taskStatus}</TableCell>
                      <TableCell>
                        <Button variant="link" className="text-blue-600 p-0">
                          تحميل
                        </Button>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            order.orderStatus === "معتمد"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </TableCell>
                      <TableCell>{order.orderClassification}</TableCell>
                      <TableCell>{order.fileType}</TableCell>
                      <TableCell>{order.orderType}</TableCell>
                      <TableCell>{order.orderTitle}</TableCell>
                      <TableCell>{order.supportType}</TableCell>
                      <TableCell>{order.supportCategory}</TableCell>
                      <TableCell>{order.targetCategory}</TableCell>
                      <TableCell>{order.fileCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              عرض {orders.length} من {orders.length} سجل
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default PaymentOrdersApprovalPage;
