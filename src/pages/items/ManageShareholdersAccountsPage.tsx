import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCog, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";

const ManageShareholdersAccountsPage = () => {
  const columns = ["رقم الحساب", "معاينة", "الإسم", "رقم العضوية", "رقم الجوال", "البريد الإلكتروني"];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="إدارة حسابات المساهمين"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <UserCog className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">إدارة حسابات المساهمين</h1>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">الإسم *</Label>
                <Input id="name" placeholder="أدخل الإسم" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="membershipNumber">رقم العضوية *</Label>
                <Input id="membershipNumber" placeholder="أدخل رقم العضوية" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">رقم الجوال *</Label>
                <div className="flex gap-2">
                  <Input id="mobile" placeholder="5xxxxxxxx" className="flex-1" />
                  <span className="flex items-center px-3 bg-muted rounded-md text-sm">05</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="أدخل البريد الإلكتروني" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province">المحافظة</Label>
                <Input id="province" placeholder="المحافظة" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">إسم المدينة</Label>
                <Input id="city" placeholder="المدينة" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">إسم الحي</Label>
                <Input id="district" placeholder="الحي" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">إسم الشارع</Label>
                <Input id="street" placeholder="الشارع" />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalAddress">عنوان البريدي</Label>
                <Input id="postalAddress" placeholder="العنوان البريدي" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buildingNumber">رقم المبنى</Label>
                <Input id="buildingNumber" placeholder="رقم المبنى" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitNumber">رقم الوحدة</Label>
                <Input id="unitNumber" placeholder="رقم الوحدة" />
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">الرمز البريدي</Label>
                <Input id="postalCode" placeholder="الرمز البريدي" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalNumber">الرقم الإضافي</Label>
                <Input id="additionalNumber" placeholder="الرقم الإضافي" />
              </div>
            </div>

            <div className="flex justify-start">
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                <Plus className="h-4 w-4" />
                إضافة سجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col} className="text-right">{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <EmptyState message="لا يوجد مساهمين مسجلين" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageShareholdersAccountsPage;
