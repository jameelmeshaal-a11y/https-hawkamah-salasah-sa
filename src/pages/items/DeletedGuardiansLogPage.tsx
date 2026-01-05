import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History, Search, RotateCcw, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";

interface DeletedGuardian {
  id: string;
  name: string;
  idNumber: string;
  phone: string;
  deletedBy: string;
  deletedAt: string;
  reason: string;
}

const DeletedGuardiansLogPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [guardians, setGuardians] = useState<DeletedGuardian[]>([
    { id: "1", name: "محمد سالم الحربي", idNumber: "1234567890", phone: "0512345678", deletedBy: "أحمد علي", deletedAt: "2024-01-15", reason: "طلب شخصي" },
    { id: "2", name: "عبدالله فهد", idNumber: "1234567891", phone: "0512345679", deletedBy: "سارة محمد", deletedAt: "2024-01-10", reason: "انتهاء الوصاية" },
  ]);

  const handleRestore = (id: string) => {
    setGuardians(guardians.filter(g => g.id !== id));
    toast.success("تم استعادة ملف الوصي بنجاح");
  };

  const filteredGuardians = guardians.filter(g => 
    g.name.includes(searchValue) || g.idNumber.includes(searchValue)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="سجل الأوصياء المحذوفين"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 rounded-lg">
            <History className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold">سجل الأوصياء المحذوفين</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>الأوصياء المحذوفين ({guardians.length})</CardTitle>
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="بحث..."
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
            {filteredGuardians.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">رقم الهوية</TableHead>
                    <TableHead className="text-right">رقم الجوال</TableHead>
                    <TableHead className="text-right">حذف بواسطة</TableHead>
                    <TableHead className="text-right">تاريخ الحذف</TableHead>
                    <TableHead className="text-right">السبب</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuardians.map((guardian) => (
                    <TableRow key={guardian.id}>
                      <TableCell className="font-medium">{guardian.name}</TableCell>
                      <TableCell>{guardian.idNumber}</TableCell>
                      <TableCell>{guardian.phone}</TableCell>
                      <TableCell>{guardian.deletedBy}</TableCell>
                      <TableCell>{guardian.deletedAt}</TableCell>
                      <TableCell>{guardian.reason}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleRestore(guardian.id)}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد سجلات أوصياء محذوفين" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default DeletedGuardiansLogPage;
