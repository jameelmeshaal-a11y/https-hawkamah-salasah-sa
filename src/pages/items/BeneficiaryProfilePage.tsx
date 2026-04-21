import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  User, Phone, MapPin, FileText, Users, DollarSign, 
  Heart, GraduationCap, Briefcase, Home, Edit, Download 
} from "lucide-react";
import { toast } from "sonner";
import MaskedPhone from "@/components/shared/MaskedPhone";

const BeneficiaryProfilePage = () => {
  const beneficiary = {
    fileNumber: "BEN-2024-001",
    name: "محمد أحمد العتيبي",
    nationalId: "1098765432",
    status: "فعال",
    category: "يتيم",
    type: "ذكر",
    birthDate: "1995-05-15",
    age: "29 سنة",
    maritalStatus: "أعزب",
    phone: "0501234567",
    email: "mohammed@email.com",
    city: "الرياض",
    district: "النزهة",
    address: "شارع الملك فهد",
    education: "بكالوريوس",
    profession: "موظف حكومي",
    housingType: "إيجار",
    healthStatus: "جيدة",
    dependentsCount: 4,
    salary: 5000,
    pension: 0,
    socialSecurity: 2000,
    insurance: 0,
  };

  const dependents = [
    { id: 1, name: "فاطمة محمد العتيبي", relation: "زوجة", age: 27, nationalId: "1087654321", status: "فعال" },
    { id: 2, name: "عبدالله محمد العتيبي", relation: "ابن", age: 5, nationalId: "1123456789", status: "فعال" },
    { id: 3, name: "نورة محمد العتيبي", relation: "ابنة", age: 3, nationalId: "1134567890", status: "فعال" },
  ];

  const aidHistory = [
    { id: 1, type: "مساعدة مالية", amount: 3000, date: "2024-05-01", status: "مسلمة" },
    { id: 2, type: "سلة غذائية", amount: 500, date: "2024-04-15", status: "مسلمة" },
    { id: 3, type: "دعم إيجار", amount: 2000, date: "2024-03-01", status: "معتمدة" },
  ];

  const tabs = [
    { id: "personal", label: "البيانات الشخصية", icon: User },
    { id: "dependents", label: "التابعين", icon: Users },
    { id: "financial", label: "البيانات المالية", icon: DollarSign },
    { id: "aid-history", label: "سجل المساعدات", icon: Heart },
    { id: "documents", label: "المستندات", icon: FileText },
  ];

  const DataRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-foreground font-medium text-sm">{value}</span>
    </div>
  );

  return (
    <InnerPageLayout
      moduleId="beneficiaries"
      title="ملف المستفيد"
      sectionTitle="إدارة المستفيدين"
      moduleTitle="إدارة شؤون المستفيدين"
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {beneficiary.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{beneficiary.name}</h2>
                  <Badge className={beneficiary.status === "فعال" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}>
                    {beneficiary.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>رقم الملف: {beneficiary.fileNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>الهوية: {beneficiary.nationalId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span><MaskedPhone value={beneficiary.phone} /></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{beneficiary.city} - {beneficiary.district}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast.info("تعديل البيانات")}>
                  <Edit className="h-4 w-4 ml-2" />
                  تعديل
                </Button>
                <Button variant="outline" onClick={() => toast.info("تصدير PDF")}>
                  <Download className="h-4 w-4 ml-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-2 rounded-lg mb-6">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="text-sm px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    البيانات الأساسية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <DataRow label="الاسم الكامل" value={beneficiary.name} />
                  <DataRow label="رقم الهوية" value={beneficiary.nationalId} />
                  <DataRow label="تاريخ الميلاد" value={beneficiary.birthDate} />
                  <DataRow label="العمر" value={beneficiary.age} />
                  <DataRow label="النوع" value={beneficiary.type} />
                  <DataRow label="الحالة الاجتماعية" value={beneficiary.maritalStatus} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    بيانات الاتصال والسكن
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <DataRow label="الجوال" value={<MaskedPhone value={beneficiary.phone} />} />
                  <DataRow label="البريد الإلكتروني" value={beneficiary.email} />
                  <DataRow label="المدينة" value={beneficiary.city} />
                  <DataRow label="الحي" value={beneficiary.district} />
                  <DataRow label="العنوان" value={beneficiary.address} />
                  <DataRow label="نوع السكن" value={beneficiary.housingType} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    التعليم والعمل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <DataRow label="المستوى التعليمي" value={beneficiary.education} />
                  <DataRow label="المهنة" value={beneficiary.profession} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    الحالة الصحية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <DataRow label="الحالة الصحية" value={beneficiary.healthStatus} />
                  <DataRow label="فئة الملف" value={beneficiary.category} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dependents">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  التابعين ({dependents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">صلة القرابة</TableHead>
                      <TableHead className="text-right">العمر</TableHead>
                      <TableHead className="text-right">رقم الهوية</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dependents.map((dep) => (
                      <TableRow key={dep.id}>
                        <TableCell className="font-medium">{dep.name}</TableCell>
                        <TableCell>{dep.relation}</TableCell>
                        <TableCell>{dep.age} سنة</TableCell>
                        <TableCell>{dep.nationalId}</TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-100 text-emerald-800">{dep.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  مصادر الدخل
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <DataRow label="الراتب" value={`${beneficiary.salary.toLocaleString()} ريال`} />
                <DataRow label="التقاعد" value={`${beneficiary.pension.toLocaleString()} ريال`} />
                <DataRow label="الضمان الاجتماعي" value={`${beneficiary.socialSecurity.toLocaleString()} ريال`} />
                <DataRow label="التأمينات" value={`${beneficiary.insurance.toLocaleString()} ريال`} />
                <DataRow label="إجمالي الدخل" value={`${(beneficiary.salary + beneficiary.pension + beneficiary.socialSecurity + beneficiary.insurance).toLocaleString()} ريال`} />
                <DataRow label="عدد التابعين" value={beneficiary.dependentsCount} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aid-history">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  سجل المساعدات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">نوع المساعدة</TableHead>
                      <TableHead className="text-right">المبلغ</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aidHistory.map((aid) => (
                      <TableRow key={aid.id}>
                        <TableCell className="font-medium">{aid.type}</TableCell>
                        <TableCell>{aid.amount.toLocaleString()} ريال</TableCell>
                        <TableCell>{aid.date}</TableCell>
                        <TableCell>
                          <Badge className={aid.status === "مسلمة" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}>
                            {aid.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                لا توجد مستندات مرفقة
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InnerPageLayout>
  );
};

export default BeneficiaryProfilePage;
