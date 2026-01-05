import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search, Eye, AlertTriangle, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

interface Guardian {
  id: string;
  name: string;
  idNumber: string;
  phone: string;
  dependentsCount: number;
  status: string;
}

const DeleteGuardianFilePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [guardians, setGuardians] = useState<Guardian[]>([
    { id: "1", name: "فاطمة محمد العتيبي", idNumber: "1234567890", phone: "0512345678", dependentsCount: 0, status: "نشط" },
    { id: "2", name: "سارة أحمد السالم", idNumber: "1234567891", phone: "0512345679", dependentsCount: 0, status: "متوقف" },
    { id: "3", name: "أحمد علي الشمري", idNumber: "1234567892", phone: "0512345670", dependentsCount: 2, status: "نشط" },
  ]);

  const handleDelete = (guardian: Guardian) => {
    if (guardian.dependentsCount > 0) {
      toast.error("لا يمكن حذف وصي لديه تابعين. يجب نقل التابعين أولاً");
      return;
    }
    setGuardians(guardians.filter(g => g.id !== guardian.id));
    toast.success("تم حذف ملف الوصي بنجاح");
  };

  const filteredGuardians = guardians.filter(g => 
    g.name.includes(searchValue) || g.idNumber.includes(searchValue)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="حذف ملف وصي"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <Trash2 className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">حذف ملف وصي</h1>
        </div>

        <Card className="mb-4 border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">لا يمكن حذف وصي لديه تابعين مسجلين. يجب نقل التابعين إلى وصي آخر أولاً</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>قائمة الأوصياء</CardTitle>
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="بحث بالاسم أو رقم الهوية..."
                  className="w-64"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
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
                  <TableHead className="text-right">عدد التابعين</TableHead>
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
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{guardian.dependentsCount}</span>
                      </div>
                    </TableCell>
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
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(guardian)}
                          disabled={guardian.dependentsCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
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

export default DeleteGuardianFilePage;
