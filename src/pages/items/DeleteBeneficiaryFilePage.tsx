import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Search, Eye, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";

interface Beneficiary {
  id: string;
  fileNumber: string;
  name: string;
  idNumber: string;
  category: string;
  status: string;
}

const DeleteBeneficiaryFilePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: "1", fileNumber: "BEN-001", name: "أحمد محمد علي", idNumber: "1234567890", category: "يتيم", status: "نشط" },
    { id: "2", fileNumber: "BEN-002", name: "فاطمة أحمد", idNumber: "1234567891", category: "أرملة", status: "نشط" },
    { id: "3", fileNumber: "BEN-003", name: "محمد سالم", idNumber: "1234567892", category: "فقير", status: "متوقف" },
  ]);

  const handleDelete = (id: string) => {
    setBeneficiaries(beneficiaries.filter(b => b.id !== id));
    toast.success("تم حذف الملف بنجاح");
  };

  const filteredBeneficiaries = beneficiaries.filter(b => 
    b.name.includes(searchValue) || b.idNumber.includes(searchValue) || b.fileNumber.includes(searchValue)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="حذف ملف مستفيد"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <Trash2 className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">حذف ملف مستفيد</h1>
        </div>

        <Card className="mb-4 border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">تنبيه: حذف الملف سينقله إلى سجل الملفات المحذوفة ويمكن استعادته لاحقاً</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>قائمة المستفيدين</CardTitle>
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
            {filteredBeneficiaries.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم الملف</TableHead>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">رقم الهوية</TableHead>
                    <TableHead className="text-right">الفئة</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBeneficiaries.map((beneficiary) => (
                    <TableRow key={beneficiary.id}>
                      <TableCell className="font-medium">{beneficiary.fileNumber}</TableCell>
                      <TableCell>{beneficiary.name}</TableCell>
                      <TableCell>{beneficiary.idNumber}</TableCell>
                      <TableCell>{beneficiary.category}</TableCell>
                      <TableCell>
                        <Badge variant={beneficiary.status === "نشط" ? "default" : "secondary"}>
                          {beneficiary.status}
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
                            onClick={() => handleDelete(beneficiary.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد نتائج مطابقة للبحث" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default DeleteBeneficiaryFilePage;
