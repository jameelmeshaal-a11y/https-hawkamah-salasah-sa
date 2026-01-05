import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Phone, Home, Plus, Paperclip, Upload, Search, RefreshCw, Filter, Eye } from "lucide-react";
import ExportDropdown from "@/components/shared/ExportDropdown";

const demoData = [
  {
    accountNumber: "20000018",
    name: "لافي",
    gender: "ذكر",
    birthDate: "الاثنين، 29 صفر 1446هـ، 02 سبتمبر 2024",
    idNumber: "1023636325",
    mobile: "0555874569",
    membershipNumber: "001",
    email: "lafi@example.com",
    province: "الرياض",
    city: "الرياض",
    district: "النزهة",
    street: "شارع الملك فهد",
    buildingNumber: "123",
    unitNumber: "5",
    postalCode: "12345",
    additionalNumber: "6789",
    membershipCategory: "مشترك عامل",
    subscriptionValue: "100",
    votesCount: "1",
  },
];

const columns = [
  { key: "accountNumber", label: "رقم الحساب", width: "100px" },
  { key: "preview", label: "معاينة", width: "80px" },
  { key: "name", label: "الإسم", width: "150px" },
  { key: "gender", label: "النوع", width: "80px" },
  { key: "birthDate", label: "تاريخ الميلاد", width: "200px" },
  { key: "idNumber", label: "رقم الهوية", width: "120px" },
  { key: "mobile", label: "رقم الجوال", width: "120px" },
  { key: "membershipNumber", label: "رقم العضوية", width: "100px" },
  { key: "email", label: "البريد الإلكتروني", width: "180px" },
  { key: "province", label: "المحافظة", width: "100px" },
  { key: "city", label: "المدينة", width: "100px" },
  { key: "district", label: "الحي", width: "100px" },
  { key: "street", label: "الشارع", width: "150px" },
  { key: "buildingNumber", label: "رقم المبنى", width: "80px" },
  { key: "unitNumber", label: "رقم الوحدة", width: "80px" },
  { key: "postalCode", label: "الرمز البريدي", width: "100px" },
  { key: "additionalNumber", label: "الرقم الإضافي", width: "100px" },
  { key: "membershipCategory", label: "فئة العضوية", width: "120px" },
  { key: "subscriptionValue", label: "قيمة الاشتراك", width: "100px" },
  { key: "votesCount", label: "عدد الأصوات", width: "80px" },
];

const ManageMembersAccountsPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [pageSize, setPageSize] = useState("20");

  const tabs = [
    { id: "personal", label: "البيانات الشخصية", icon: User },
    { id: "contact", label: "التواصل", icon: Phone },
    { id: "residence", label: "بيانات السكن", icon: Home },
    { id: "additional", label: "البيانات الإضافية", icon: Plus },
    { id: "attachments", label: "المرفقات", icon: Paperclip },
  ];

  const renderCellContent = (row: typeof demoData[0], columnKey: string) => {
    if (columnKey === "preview") {
      return (
        <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          <Eye className="h-4 w-4 ml-1" />
          معاينة
        </Button>
      );
    }
    return row[columnKey as keyof typeof row] || "—";
  };

  return (
    <InnerPageLayout
      moduleId="members"
      title="إدارة حسابات الأعضاء"
      moduleTitle="إدارة الأعضاء المشاركين"
      sectionTitle="أعضاء الجمعية العمومية"
    >
      <div className="p-6 space-y-6">
        {/* Form Section */}
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
              <TabsList className="w-full justify-start gap-2 bg-transparent border-b rounded-none pb-0 mb-6">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-t-lg"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="personal" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>اسم المشترك *</Label>
                    <Input placeholder="أدخل اسم المشترك" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>رقم العضوية *</Label>
                    <Input placeholder="أدخل رقم العضوية" />
                  </div>
                  <div className="space-y-2">
                    <Label>النوع *</Label>
                    <RadioGroup defaultValue="male" className="flex gap-6" dir="rtl">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer">ذكر</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer">أنثى</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>رقم الجوال</Label>
                    <Input placeholder="05xxxxxxxx" dir="ltr" className="text-right" />
                  </div>
                  <div className="space-y-2">
                    <Label>البريد الإلكتروني</Label>
                    <Input type="email" placeholder="example@email.com" dir="ltr" className="text-right" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>تاريخ الميلاد</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>الحالة الإجتماعية</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">أعزب</SelectItem>
                        <SelectItem value="married">متزوج</SelectItem>
                        <SelectItem value="divorced">مطلق</SelectItem>
                        <SelectItem value="widowed">أرمل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>رقم الهوية *</Label>
                    <Input placeholder="أدخل رقم الهوية" />
                  </div>
                  <div className="space-y-2">
                    <Label>مكان الميلاد</Label>
                    <Input placeholder="أدخل مكان الميلاد" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>الصورة الشخصية</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">اسحب الصورة هنا أو انقر للاختيار</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>رقم الجوال الإضافي</Label>
                    <Input placeholder="05xxxxxxxx" dir="ltr" className="text-right" />
                  </div>
                  <div className="space-y-2">
                    <Label>هاتف أرضي</Label>
                    <Input placeholder="أدخل رقم الهاتف الأرضي" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>جهات اتصال إضافية</Label>
                  <Textarea placeholder="أدخل جهات الاتصال الإضافية" />
                </div>
              </TabsContent>

              <TabsContent value="residence" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>المحافظة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="riyadh">الرياض</SelectItem>
                        <SelectItem value="jeddah">جدة</SelectItem>
                        <SelectItem value="makkah">مكة المكرمة</SelectItem>
                        <SelectItem value="madinah">المدينة المنورة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>المدينة</Label>
                    <Input placeholder="أدخل المدينة" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الحي</Label>
                    <Input placeholder="أدخل الحي" />
                  </div>
                  <div className="space-y-2">
                    <Label>الشارع</Label>
                    <Input placeholder="أدخل الشارع" />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>رقم المبنى</Label>
                    <Input placeholder="رقم المبنى" />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الوحدة</Label>
                    <Input placeholder="رقم الوحدة" />
                  </div>
                  <div className="space-y-2">
                    <Label>الرمز البريدي</Label>
                    <Input placeholder="الرمز البريدي" />
                  </div>
                  <div className="space-y-2">
                    <Label>الرقم الإضافي</Label>
                    <Input placeholder="الرقم الإضافي" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="additional" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>فئة العضوية</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر فئة العضوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">مشترك عامل</SelectItem>
                        <SelectItem value="supporting">مشترك مؤيد</SelectItem>
                        <SelectItem value="honorary">عضو شرفي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>قيمة الاشتراك</Label>
                    <Input type="number" placeholder="أدخل قيمة الاشتراك" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>عدد الأصوات</Label>
                    <Input type="number" placeholder="أدخل عدد الأصوات" />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم قرار المجلس</Label>
                    <Input placeholder="أدخل رقم القرار" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>ملاحظات إضافية</Label>
                  <Textarea placeholder="أدخل أي ملاحظات إضافية" />
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span>صورة البطاقة الشخصية</span>
                    <Button variant="default" size="sm">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة صور
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span>مستندات العضوية</span>
                    <Button variant="default" size="sm">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة صور
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span>مرفقات إضافية</span>
                    <Button variant="default" size="sm">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة مرفقات
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end mt-6">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                إضافة سجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card>
          <CardContent className="p-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث عام..." className="pr-10" />
                </div>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <ExportDropdown columns={columns} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {columns.map((column) => (
                      <TableHead
                        key={column.key}
                        className="text-right whitespace-nowrap"
                        style={{ minWidth: column.width }}
                      >
                        {column.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoData.map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.key} className="whitespace-nowrap">
                          {renderCellContent(row, column.key)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>إظهار السجلات 1 لـ 1 من 1</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ManageMembersAccountsPage;
