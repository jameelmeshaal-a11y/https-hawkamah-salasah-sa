import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, RefreshCw, Eye, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ExportDropdown from "@/components/shared/ExportDropdown";

const tabs = [
  { id: "basic", label: "البيانات الأساسية" },
  { id: "contact", label: "بيانات الاتصال" },
  { id: "orphan-files", label: "ملفات الأيتام" },
  { id: "orphan-data", label: "بيانات الأيتام" },
  { id: "orphan-housing", label: "بيانات سكن الأيتام" },
  { id: "orphan-attachments", label: "مرفقات الأيتام" },
];

interface Guardian {
  id: string;
  name: string;
  idNumber: string;
  phone: string;
  orphansCount: number;
  status: string;
  fileNumber: string;
}

const mockGuardians: Guardian[] = [
  { id: "1", name: "خالد مسفر العازمي", idNumber: "1087654321", phone: "0551234567", orphansCount: 3, status: "معتمد", fileNumber: "150001277" },
  { id: "2", name: "فاطمة أحمد الشمري", idNumber: "1098765432", phone: "0562345678", orphansCount: 2, status: "معتمد", fileNumber: "540001195" },
  { id: "3", name: "محمد سعد القحطاني", idNumber: "1076543210", phone: "0573456789", orphansCount: 4, status: "قيد المراجعة", fileNumber: "580001047" },
  { id: "4", name: "نورة عبدالله العتيبي", idNumber: "1065432109", phone: "0584567890", orphansCount: 1, status: "معتمد", fileNumber: "840000778" },
  { id: "5", name: "سلمان فهد الدوسري", idNumber: "1054321098", phone: "0595678901", orphansCount: 5, status: "معتمد", fileNumber: "890000850" },
];

const ManageGuardiansAccountsPage = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [searchValue, setSearchValue] = useState("");
  const [guardians] = useState<Guardian[]>(mockGuardians);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم إضافة الوصي بنجاح");
  };

  const filteredGuardians = guardians.filter(g =>
    g.name.includes(searchValue) || g.idNumber.includes(searchValue) || g.fileNumber.includes(searchValue)
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الاسم الثلاثي *</Label>
              <Input placeholder="أدخل الاسم الثلاثي" />
            </div>
            <div className="space-y-2">
              <Label>النوع *</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="اختار" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>الحالة الاجتماعية</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="اختار" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">أعزب</SelectItem>
                  <SelectItem value="married">متزوج</SelectItem>
                  <SelectItem value="divorced">مطلق</SelectItem>
                  <SelectItem value="widowed">أرمل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>دولة الجنسية</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="اختار" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sa">المملكة العربية السعودية</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>تاريخ الميلاد</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>رقم الهوية *</Label>
              <Input placeholder="أدخل رقم الهوية" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الصورة الشخصية</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">اسحب الصورة هنا أو انقر للتحميل</p>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>رقم الجوال *</Label>
              <Input placeholder="05xxxxxxxx" />
            </div>
            <div className="space-y-2">
              <Label>هاتف أرضي</Label>
              <Input placeholder="01xxxxxxx" />
            </div>
            <div className="space-y-2">
              <Label>البريد الإلكتروني</Label>
              <Input type="email" placeholder="example@domain.com" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>العنوان</Label>
              <Textarea placeholder="أدخل العنوان بالتفصيل" />
            </div>
          </div>
        );
      case "orphan-files":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold">قائمة ملفات الأيتام</Label>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 ml-1" />
                إضافة تابع
              </Button>
            </div>
            <div className="border rounded-lg p-8 text-center text-muted-foreground">
              لا توجد ملفات أيتام مضافة
            </div>
          </div>
        );
      case "orphan-data":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>اسم الأب المتوفى</Label>
              <Input placeholder="أدخل اسم الأب" />
            </div>
            <div className="space-y-2">
              <Label>رقم هوية الأب</Label>
              <Input placeholder="أدخل رقم هوية الأب" />
            </div>
            <div className="space-y-2">
              <Label>تاريخ الوفاة</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>سبب الوفاة</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="اختار" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">طبيعي</SelectItem>
                  <SelectItem value="accident">حادث</SelectItem>
                  <SelectItem value="illness">مرض</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "orphan-housing":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>مع من يسكن الأيتام</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="اختار" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mother">الأم</SelectItem>
                  <SelectItem value="grandmother">الجدة</SelectItem>
                  <SelectItem value="uncle">العم</SelectItem>
                  <SelectItem value="aunt">الخالة</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>نوع السكن</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="اختار" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">شقة</SelectItem>
                  <SelectItem value="villa">فيلا</SelectItem>
                  <SelectItem value="house">منزل شعبي</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ملكية السكن</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="اختار" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="owned">ملك</SelectItem>
                  <SelectItem value="rented">إيجار</SelectItem>
                  <SelectItem value="provided">مقدم من جهة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "orphan-attachments":
        return (
          <div className="space-y-4">
            <Label className="text-base font-semibold">مرفقات الأيتام</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-2">اسحب الملفات هنا أو انقر للتحميل</p>
              <p className="text-xs text-muted-foreground">PDF, JPG, PNG (الحد الأقصى 10MB)</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <InnerPageLayout
      moduleId="beneficiaries-management"
      title="إدارة حسابات الأوصياء"
      sectionTitle="إدارة ملفات الأوصياء"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="space-y-6">
        {/* Form with Vertical Tabs */}
        <Card>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row">
                {/* Vertical Tabs */}
                <div className="md:w-56 border-b md:border-b-0 md:border-l bg-muted/30">
                  <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "px-4 py-3 text-sm font-medium text-right whitespace-nowrap transition-colors",
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6">
                  {renderTabContent()}
                </div>
              </div>

              {/* Association Data Section */}
              <div className="border-t p-6 space-y-4">
                <h3 className="font-semibold text-base">بيانات الانضمام للجمعية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>رقم ملف الأرشيف</Label>
                    <Input placeholder="أدخل رقم الملف" />
                  </div>
                  <div className="space-y-2">
                    <Label>المستودع المفضل للصرف</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="أي مستودع" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">أي مستودع</SelectItem>
                        <SelectItem value="main">المستودع الرئيسي</SelectItem>
                        <SelectItem value="branch">مستودع الفرع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>الإحتياجات</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="اختار" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">مواد غذائية</SelectItem>
                        <SelectItem value="clothes">ملابس</SelectItem>
                        <SelectItem value="furniture">أثاث</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>الصفات</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="اختار" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poor">فقير</SelectItem>
                        <SelectItem value="orphan">يتيم</SelectItem>
                        <SelectItem value="widow">أرملة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>الحسابات البنكية</Label>
                    <Button type="button" variant="outline" size="sm">
                      <Plus className="h-4 w-4 ml-1" />
                      إضافة حساب
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 text-center text-muted-foreground text-sm">
                    لا توجد حسابات بنكية مضافة
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t p-4 flex justify-end">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة سجل
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card>
          <CardContent className="p-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Select defaultValue="20">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
              <div className="flex-1" />
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pr-9 w-48"
                />
              </div>
              <ExportDropdown columns={[
                { key: "name", label: "الاسم" },
                { key: "idNumber", label: "رقم الهوية" },
                { key: "fileNumber", label: "رقم الملف" },
                { key: "phone", label: "رقم الجوال" },
                { key: "orphansCount", label: "عدد الأيتام" },
                { key: "status", label: "الحالة" }
              ]} />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">الإجراء</TableHead>
                    <TableHead className="text-right">رقم الملف</TableHead>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">رقم الهوية</TableHead>
                    <TableHead className="text-right">رقم الجوال</TableHead>
                    <TableHead className="text-right">عدد الأيتام</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuardians.map((guardian) => (
                    <TableRow key={guardian.id}>
                      <TableCell>
                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                          <Eye className="h-4 w-4 ml-1" />
                          معاينة
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">{guardian.fileNumber}</TableCell>
                      <TableCell>{guardian.name}</TableCell>
                      <TableCell>{guardian.idNumber}</TableCell>
                      <TableCell>{guardian.phone}</TableCell>
                      <TableCell>{guardian.orphansCount}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          guardian.status === "معتمد" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        )}>
                          {guardian.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageGuardiansAccountsPage;
