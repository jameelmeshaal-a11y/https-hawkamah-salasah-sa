import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { SuppliersTable, SupplierData } from "@/components/suppliers/SuppliersTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Plus, Upload } from "lucide-react";

const suppliersData: SupplierData[] = [
  {
    id: "1",
    name: "نسمة معاذ",
    classification: "عام",
    country: "السعودية",
    taxNumber: "300123456789",
    commercialRegister: "1234567890",
    phone: "0512345678",
    email: "nsma@example.com",
    fax: "011234567",
    currency: "﷼",
  },
  {
    id: "2",
    name: "مصادر بن ملهي",
    classification: "مقاولات",
    country: "السعودية",
    taxNumber: "300987654321",
    commercialRegister: "0987654321",
    phone: "0598765432",
    email: "masader@example.com",
    fax: "012345678",
    currency: "﷼",
  },
];

export default function ManageSupplierAccountsPage() {
  const [formData, setFormData] = useState({
    name: "",
    classification: "",
    country: "السعودية",
    commercialRegister: "",
    taxNumber: "",
    address: "",
    phone: "",
    email: "",
    fax: "",
    website: "",
  });

  const handleSubmit = () => {
    console.log("Submit:", formData);
  };

  return (
    <InnerPageLayout
      title="إدارة حسابات الموردين"
      moduleId="financial-resources"
      moduleTitle="الموارد المالية"
      sectionTitle="إدارة الموردين"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Settings className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">إدارة حسابات الموردين</h1>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Supplier Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">بيانات المورد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>اسم المورد *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label>التصنيف</Label>
                <Select
                  value={formData.classification}
                  onValueChange={(value) => setFormData({ ...formData, classification: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="أختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">عام</SelectItem>
                    <SelectItem value="contractor">مقاولات</SelectItem>
                    <SelectItem value="supplies">توريدات</SelectItem>
                    <SelectItem value="services">خدمات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>الدولة</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="أختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="السعودية">السعودية</SelectItem>
                    <SelectItem value="الإمارات">الإمارات</SelectItem>
                    <SelectItem value="الكويت">الكويت</SelectItem>
                    <SelectItem value="البحرين">البحرين</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>السجل التجاري</Label>
                <Input
                  value={formData.commercialRegister}
                  onChange={(e) => setFormData({ ...formData, commercialRegister: e.target.value })}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label>الرقم الضريبي</Label>
                <Input
                  value={formData.taxNumber}
                  onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="text-right"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">بيانات التواصل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>الهاتف *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="05"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label>الفاكس</Label>
                <Input
                  value={formData.fax}
                  onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label>الموقع الإلكتروني</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="text-right"
                />
              </div>

              <Button variant="outline" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                إضافة جهة اتصال إضافية
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Attachments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">مرفقات إضافية</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              إضافة مرفقات
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة سجل
        </Button>

        {/* Suppliers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سجلات الموردين</CardTitle>
          </CardHeader>
          <CardContent>
            <SuppliersTable data={suppliersData} showDeleteButton={false} />
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
}
