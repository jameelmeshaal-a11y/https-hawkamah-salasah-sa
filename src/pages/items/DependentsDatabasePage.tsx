import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Eye, FileText, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import StatCard from "@/components/shared/StatCard";

interface Dependent {
  id: string;
  name: string;
  idNumber: string;
  relation: string;
  age: number;
  gender: string;
  guardianName: string;
  status: string;
}

const DependentsDatabasePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dependents] = useState<Dependent[]>([
    { id: "1", name: "سارة أحمد", idNumber: "1234567890", relation: "ابنة", age: 12, gender: "أنثى", guardianName: "فاطمة محمد", status: "نشط" },
    { id: "2", name: "خالد محمد", idNumber: "1234567891", relation: "ابن", age: 8, gender: "ذكر", guardianName: "أحمد علي", status: "نشط" },
    { id: "3", name: "نورة سالم", idNumber: "1234567892", relation: "ابنة", age: 15, gender: "أنثى", guardianName: "سالم محمد", status: "متوقف" },
    { id: "4", name: "عبدالله فهد", idNumber: "1234567893", relation: "ابن", age: 6, gender: "ذكر", guardianName: "فهد سعود", status: "نشط" },
  ]);

  const filteredDependents = dependents.filter(d => 
    d.name.includes(searchValue) || d.idNumber.includes(searchValue) || d.guardianName.includes(searchValue)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="قاعدة بيانات التابعين"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">قاعدة بيانات التابعين</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="إجمالي التابعين" value={dependents.length} icon={Users} />
          <StatCard title="التابعين النشطين" value={dependents.filter(d => d.status === "نشط").length} />
          <StatCard title="الذكور" value={dependents.filter(d => d.gender === "ذكر").length} />
          <StatCard title="الإناث" value={dependents.filter(d => d.gender === "أنثى").length} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <CardTitle>قائمة التابعين</CardTitle>
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
                  <TableHead className="text-right">صلة القرابة</TableHead>
                  <TableHead className="text-right">العمر</TableHead>
                  <TableHead className="text-right">الجنس</TableHead>
                  <TableHead className="text-right">اسم الوصي</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDependents.map((dependent) => (
                  <TableRow key={dependent.id}>
                    <TableCell className="font-medium">{dependent.name}</TableCell>
                    <TableCell>{dependent.idNumber}</TableCell>
                    <TableCell>{dependent.relation}</TableCell>
                    <TableCell>{dependent.age} سنة</TableCell>
                    <TableCell>{dependent.gender}</TableCell>
                    <TableCell>{dependent.guardianName}</TableCell>
                    <TableCell>
                      <Badge variant={dependent.status === "نشط" ? "default" : "secondary"}>
                        {dependent.status}
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

export default DependentsDatabasePage;
