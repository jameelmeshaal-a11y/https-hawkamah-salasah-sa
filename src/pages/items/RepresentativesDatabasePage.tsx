import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Filter, RefreshCw, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ExportDropdown from "@/components/shared/ExportDropdown";
import EmptyState from "@/components/shared/EmptyState";
import MaskedPhone from "@/components/shared/MaskedPhone";

const RepresentativesDatabasePage = () => {
  const representatives = [
    { accountNumber: "43000375", name: "ملفي", idNumber: "1032554478", phone: "0556699441", email: "yhefyjeekhj...@gmail.com" },
    { accountNumber: "48000369", name: "محمد", idNumber: "1033659842", phone: "0547771000", email: "gwsvwdfklwe...@gmail.com" },
    { accountNumber: "31000356", name: "الناصر", idNumber: "1023654712", phone: "0556633208", email: "jnfhefhjgff...@gmail.com" },
    { accountNumber: "95000343", name: "صابر", idNumber: "1023654784", phone: "0544778856", email: "غير متاح" },
  ];

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
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-lg">الممثلين ({representatives.length})</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
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
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث..." className="w-48 pr-9" />
                </div>
                <ExportDropdown columns={exportColumns} />
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><RefreshCw className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {representatives.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">
                        <div className="flex items-center gap-1">
                          رقم الحساب
                          <Filter className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center gap-1">
                          ملف الممثل
                          <Filter className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">رقم الهوية</TableHead>
                      <TableHead className="text-right">رقم الجوال</TableHead>
                      <TableHead className="text-right">البريد الإلكتروني</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {representatives.map((rep, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{rep.accountNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{rep.name}</span>
                            <Button variant="outline" size="icon" className="h-7 w-7 bg-blue-500 hover:bg-blue-600 text-white border-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{rep.idNumber}</TableCell>
                        <TableCell><MaskedPhone value={rep.phone} /></TableCell>
                        <TableCell className="max-w-[200px] truncate" title={rep.email}>{rep.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-sm text-muted-foreground text-center">
                  إظهار السجلات 1 ل {representatives.length} من {representatives.length}
                </div>
              </>
            ) : (
              <EmptyState message="لا توجد بيانات ممثلين" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default RepresentativesDatabasePage;
