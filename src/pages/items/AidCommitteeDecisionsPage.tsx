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

interface DecisionRecord {
  id: number;
  requestTitle: string;
  requestSerial: string;
  requestType: string;
  approvalPath: string;
  requestStatus: string;
  statusDescription: string;
}

const AidCommitteeDecisionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const [records] = useState<DecisionRecord[]>([
    {
      id: 1,
      requestTitle: "طلب 44",
      requestSerial: "44",
      requestType: "مساعدة مالية",
      approvalPath: "اعتماد",
      requestStatus: "معتمد",
      statusDescription: "تمت الموافقة",
    },
    {
      id: 2,
      requestTitle: "طلب 180000160-1",
      requestSerial: "180000160-1",
      requestType: "علاج",
      approvalPath: "النموذج الافتراضي لمسار اعتمادات طلبات الإعانة",
      requestStatus: "قيد المراجعة",
      statusDescription: "في انتظار الموافقة",
    },
  ]);

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="نماذج قرارات لجنة المساعدات"
      sectionTitle="لجنة المساعدات"
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
                    <TableHead className="text-right">تصدير</TableHead>
                    <TableHead className="text-right">عنوان الطلب</TableHead>
                    <TableHead className="text-right">مسلسل الطلب</TableHead>
                    <TableHead className="text-right">ملف الطلب</TableHead>
                    <TableHead className="text-right">نوع الطلب</TableHead>
                    <TableHead className="text-right">مسار الاعتماد</TableHead>
                    <TableHead className="text-right">حالة الطلب</TableHead>
                    <TableHead className="text-right">وصف الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <FileText className="h-4 w-4 ml-1" />
                          PDF
                        </Button>
                      </TableCell>
                      <TableCell>{record.requestTitle}</TableCell>
                      <TableCell>{record.requestSerial}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="h-4 w-4 ml-1" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell>{record.requestType}</TableCell>
                      <TableCell>{record.approvalPath}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            record.requestStatus === "معتمد"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {record.requestStatus}
                        </span>
                      </TableCell>
                      <TableCell>{record.statusDescription}</TableCell>
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

export default AidCommitteeDecisionsPage;
