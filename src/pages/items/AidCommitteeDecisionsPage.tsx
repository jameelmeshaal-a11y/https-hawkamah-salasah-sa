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
import { Search, Download, Eye, FileText, Edit } from "lucide-react";

interface DecisionRecord {
  id: number;
  requestTitle: string;
  requestSerial: string;
  requestFile: string;
  requestType: string;
  approvalPath: string;
  requestStatus: string;
  statusDescription: string;
  fileType: string;
  beneficiaryFile: string;
  familyMembers: number;
  serialNumber: string;
}

const AidCommitteeDecisionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("20");

  const [records] = useState<DecisionRecord[]>([
    {
      id: 1,
      requestTitle: "طلب مساعدة مالية",
      requestSerial: "AID-2024-001",
      requestFile: "request-001.pdf",
      requestType: "مساعدة مالية",
      approvalPath: "لجنة المساعدات",
      requestStatus: "معتمد",
      statusDescription: "تمت الموافقة",
      fileType: "مستفيد",
      beneficiaryFile: "BEN-001",
      familyMembers: 5,
      serialNumber: "001",
    },
    {
      id: 2,
      requestTitle: "طلب دعم عاجل",
      requestSerial: "AID-2024-002",
      requestFile: "request-002.pdf",
      requestType: "دعم عاجل",
      approvalPath: "لجنة المساعدات",
      requestStatus: "قيد المراجعة",
      statusDescription: "في انتظار الموافقة",
      fileType: "مستفيد",
      beneficiaryFile: "BEN-002",
      familyMembers: 3,
      serialNumber: "002",
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
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg">قرارات اللجنة</CardTitle>
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
                    <TableHead className="text-right">تحرير</TableHead>
                    <TableHead className="text-right">عنوان الطلب</TableHead>
                    <TableHead className="text-right">مسلسل الطلب</TableHead>
                    <TableHead className="text-right">ملف الطلب</TableHead>
                    <TableHead className="text-right">نوع الطلب</TableHead>
                    <TableHead className="text-right">مسار الاعتماد</TableHead>
                    <TableHead className="text-right">حالة الطلب</TableHead>
                    <TableHead className="text-right">وصف الحالة</TableHead>
                    <TableHead className="text-right">نوع الملف</TableHead>
                    <TableHead className="text-right">ملف المستفيد</TableHead>
                    <TableHead className="text-right">عدد أفراد الأسرة</TableHead>
                    <TableHead className="text-right">رقم</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <FileText className="h-4 w-4" />
                            PDF
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{record.requestTitle}</TableCell>
                      <TableCell>{record.requestSerial}</TableCell>
                      <TableCell>
                        <Button variant="link" className="text-blue-600 p-0">
                          {record.requestFile}
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
                      <TableCell>{record.fileType}</TableCell>
                      <TableCell>{record.beneficiaryFile}</TableCell>
                      <TableCell>{record.familyMembers}</TableCell>
                      <TableCell>{record.serialNumber}</TableCell>
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
