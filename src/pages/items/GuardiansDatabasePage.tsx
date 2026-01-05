import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Search, Eye, FileText, Download, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import StatCard from "@/components/shared/StatCard";

interface Guardian {
  id: string;
  name: string;
  idNumber: string;
  phone: string;
  email: string;
  dependentsCount: number;
  relation: string;
  status: string;
  registrationDate: string;
}

const GuardiansDatabasePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [guardians] = useState<Guardian[]>([
    { id: "1", name: "فاطمة محمد العتيبي", idNumber: "1234567890", phone: "0512345678", email: "f.otaibi@email.com", dependentsCount: 3, relation: "أم", status: "نشط", registrationDate: "2023-05-15" },
    { id: "2", name: "سارة أحمد السالم", idNumber: "1234567891", phone: "0512345679", email: "s.salem@email.com", dependentsCount: 2, relation: "أم", status: "نشط", registrationDate: "2023-06-20" },
    { id: "3", name: "أحمد علي الشمري", idNumber: "1234567892", phone: "0512345670", email: "a.shamri@email.com", dependentsCount: 4, relation: "عم", status: "متوقف", registrationDate: "2023-04-10" },
    { id: "4", name: "نورة سعد القحطاني", idNumber: "1234567893", phone: "0512345671", email: "n.qahtani@email.com", dependentsCount: 1, relation: "خالة", status: "نشط", registrationDate: "2023-07-25" },
  ]);

  const filteredGuardians = guardians.filter(g => 
    g.name.includes(searchValue) || g.idNumber.includes(searchValue) || g.phone.includes(searchValue)
  );

  const totalDependents = guardians.reduce((sum, g) => sum + g.dependentsCount, 0);

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="قاعدة بيانات الأوصياء"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Database className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">قاعدة بيانات الأوصياء</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="إجمالي الأوصياء" value={guardians.length} icon={Database} />
          <StatCard title="الأوصياء النشطين" value={guardians.filter(g => g.status === "نشط").length} />
          <StatCard title="إجمالي التابعين" value={totalDependents} icon={Users} />
          <StatCard title="متوسط التابعين لكل وصي" value={(totalDependents / guardians.length).toFixed(1)} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <CardTitle>قائمة الأوصياء</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Input 
                  placeholder="بحث..."
                  className="w-48"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="stopped">متوقف</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => toast.success("جاري تصدير البيانات...")}>
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">رقم الهوية</TableHead>
                  <TableHead className="text-right">رقم الجوال</TableHead>
                  <TableHead className="text-right">صلة القرابة</TableHead>
                  <TableHead className="text-right">عدد التابعين</TableHead>
                  <TableHead className="text-right">تاريخ التسجيل</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuardians.map((guardian) => (
                  <TableRow key={guardian.id}>
                    <TableCell className="font-medium">{guardian.name}</TableCell>
                    <TableCell>{guardian.idNumber}</TableCell>
                    <TableCell>{guardian.phone}</TableCell>
                    <TableCell>{guardian.relation}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{guardian.dependentsCount}</Badge>
                    </TableCell>
                    <TableCell>{guardian.registrationDate}</TableCell>
                    <TableCell>
                      <Badge variant={guardian.status === "نشط" ? "default" : "secondary"}>
                        {guardian.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
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

export default GuardiansDatabasePage;
