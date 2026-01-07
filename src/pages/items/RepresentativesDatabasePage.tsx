import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Eye, RefreshCw, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import ExportDropdown from "@/components/shared/ExportDropdown";

const RepresentativesDatabasePage = () => {
  const [representatives] = useState([
    { id: "1", accountNumber: "43000375", name: "ملفي", idNumber: "1032554478", phone: "0556699441", email: "wejnfhe...@gmail.com" },
    { id: "2", accountNumber: "48000369", name: "محمد", idNumber: "1033659842", phone: "0547771000", email: "gwsvwdf...@gmail.com" },
    { id: "3", accountNumber: "31000356", name: "الناصر", idNumber: "1023654712", phone: "0556633208", email: "wejnfhe...@gmail.com" },
    { id: "4", accountNumber: "95000343", name: "صابر", idNumber: "1023654784", phone: "0544778856", email: "غير متاح" },
  ]);

  const exportColumns = [
    { key: "accountNumber", label: "رقم الحساب" },
    { key: "name", label: "ملف الممثل" },
    { key: "idNumber", label: "رقم الهوية" },
    { key: "phone", label: "رقم الجوال" },
    { key: "email", label: "البريد الإلكتروني" },
  ];

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="قاعدة بيانات الممثلين" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><Users className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">قاعدة بيانات الممثلين</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>سجلات الممثلين ({representatives.length})</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>سجلات الصفحة</span>
                  <Select defaultValue="20">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="بحث عام..." className="w-48" />
                <ExportDropdown columns={exportColumns} onExport={(type, cols) => toast.success(`تصدير ${type} - ${cols.length} أعمدة`)} />
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><RefreshCw className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم الحساب</TableHead>
                  <TableHead className="text-right">ملف الممثل</TableHead>
                  <TableHead className="text-right">رقم الهوية</TableHead>
                  <TableHead className="text-right">رقم الجوال</TableHead>
                  <TableHead className="text-right">البريد الإلكتروني</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {representatives.map((rep) => (
                  <TableRow key={rep.id}>
                    <TableCell className="font-medium">{rep.accountNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{rep.name}</span>
                        <Button variant="outline" size="sm" className="h-7 px-2">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{rep.idNumber}</TableCell>
                    <TableCell>{rep.phone}</TableCell>
                    <TableCell className={rep.email === "غير متاح" ? "text-muted-foreground" : ""}>{rep.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default RepresentativesDatabasePage;
