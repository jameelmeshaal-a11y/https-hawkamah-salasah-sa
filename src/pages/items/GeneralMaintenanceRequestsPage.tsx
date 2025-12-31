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

interface MaintenanceRequest {
  id: number;
  requestDetails: string;
  status: string;
  requestStatement: string;
  classification: string;
  priceQuotes: number;
  finalCost: number;
  managementComment: string;
  createdAt: string;
}

const GeneralMaintenanceRequestsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const [requests] = useState<MaintenanceRequest[]>([
    {
      id: 1,
      requestDetails: "صيانة مكيفات المبنى الرئيسي",
      status: "قيد المراجعة",
      requestStatement: "صيانة دورية",
      classification: "صيانة الأجهزة",
      priceQuotes: 3,
      finalCost: 150.0,
      managementComment: "في انتظار الموافقة",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      requestDetails: "إصلاح تسريب المياه",
      status: "معتمد",
      requestStatement: "صيانة طارئة",
      classification: "صيانة المباني",
      priceQuotes: 2,
      finalCost: 500.0,
      managementComment: "تمت الموافقة",
      createdAt: "2024-01-10",
    },
  ]);

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="طلبات الصيانة العامة"
      sectionTitle="الطلبات قيد الاعتماد"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg">طلبات الصيانة</CardTitle>
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
                    <TableHead className="text-right">التفاصيل</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">بيان الطلب</TableHead>
                    <TableHead className="text-right">التصنيف</TableHead>
                    <TableHead className="text-right">عروض الأسعار</TableHead>
                    <TableHead className="text-right">التكلفة النهائية</TableHead>
                    <TableHead className="text-right">تعقيب الإدارة</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Settings className="h-4 w-4 ml-1" />
                            إدارة الطلب
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600"
                          >
                            <Eye className="h-4 w-4 ml-1" />
                            عرض التفاصيل
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{request.requestDetails}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            request.status === "معتمد"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell>{request.requestStatement}</TableCell>
                      <TableCell>{request.classification}</TableCell>
                      <TableCell>{request.priceQuotes}</TableCell>
                      <TableCell>{request.finalCost.toFixed(2)} ريال</TableCell>
                      <TableCell>{request.managementComment}</TableCell>
                      <TableCell>{request.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              عرض {requests.length} من {requests.length} سجل
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GeneralMaintenanceRequestsPage;
