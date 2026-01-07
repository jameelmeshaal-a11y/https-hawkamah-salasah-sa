import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSearch, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";

interface SelfUpdateRequest {
  id: string;
  beneficiaryName: string;
  requestType: string;
  requestDate: string;
  status: string;
}

const ManageSelfUpdateRequestsPage = () => {
  const [requests] = useState<SelfUpdateRequest[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم إضافة السجل بنجاح");
  };

  return (
    <InnerPageLayout 
      moduleId="beneficiary-accounts" 
      title="إدارة طلبات التحديث الذاتي" 
      sectionTitle="إدارة تحديث البيانات" 
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        {/* نموذج البحث */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* آلية البحث */}
                <div className="space-y-2">
                  <Label htmlFor="search-method" className="flex items-center gap-1">
                    آلية البحث <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="category-area">
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category-area">تنقية بالفئة او الحي</SelectItem>
                      <SelectItem value="file-number">رقم الملف</SelectItem>
                      <SelectItem value="national-id">رقم الهوية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* اجمالي عدد الملفات */}
                <div className="space-y-2">
                  <Label htmlFor="total-files" className="flex items-center gap-1">
                    اجمالي عدد الملفات <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="total-files" 
                    type="number"
                    defaultValue="11"
                    readOnly
                    className="bg-muted text-center"
                  />
                </div>

                {/* فراغ */}
                <div></div>

                {/* فئة الملف */}
                <div className="space-y-2">
                  <Label htmlFor="file-category">فئة الملف</Label>
                  <Input 
                    id="file-category" 
                    placeholder="اترك الحقول فارغة لاختيار كافة التابعين في التصنيف"
                  />
                </div>

                {/* القرية - الحي */}
                <div className="space-y-2">
                  <Label htmlFor="area">القرية - الحي</Label>
                  <Input 
                    id="area" 
                    placeholder="اترك الحقول فارغة لاختيار كافة التابعين في التصنيف"
                  />
                </div>
              </div>

              {/* زر الإضافة */}
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 text-lg"
                >
                  <Plus className="h-5 w-5 ml-2" />
                  إضافة سجل
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* الجدول */}
        <Card>
          <CardContent className="pt-6">
            {requests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم المستفيد</TableHead>
                    <TableHead className="text-right">نوع الطلب</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.beneficiaryName}</TableCell>
                      <TableCell>{request.requestType}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد بيانات متوفرة في الجدول" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageSelfUpdateRequestsPage;
