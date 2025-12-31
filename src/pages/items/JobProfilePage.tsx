import InnerPageLayout from "@/components/layout/InnerPageLayout";
import EmployeeProfileHeader from "@/components/records/EmployeeProfileHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard } from "lucide-react";

const sampleEmployee = {
  name: "أحمد محمد الغامدي",
  position: "مطور برمجيات أول",
  createdAt: "2022-03-15",
  createdBy: "مدير الموارد البشرية",
  systemManager: "محمد عبدالله",
  updatedAt: "2024-01-10",
  updatedBy: "مدير الموارد البشرية",
  accountType: "موظف",
  jobGrade: "الدرجة الخامسة",
  jobRank: "أخصائي",
  employeeNumber: "EMP-2024-0015",
};

const personalData = [
  { label: "الاسم الثلاثي", value: "أحمد محمد عبدالله الغامدي" },
  { label: "تاريخ الميلاد", value: "1990-05-15" },
  { label: "النوع", value: "ذكر" },
  { label: "العمر", value: "34 سنة" },
  { label: "الحالة الاجتماعية", value: "متزوج" },
  { label: "رقم الهوية", value: "1098765432" },
  { label: "مصدر الهوية", value: "الرياض" },
  { label: "ملاحظات إضافية", value: "لا يوجد" },
];

const tabs = [
  { id: "personal", label: "البيانات الشخصية" },
  { id: "contact", label: "بيانات الاتصال" },
  { id: "qualifications", label: "المؤهلات" },
  { id: "employment", label: "بيانات التعيين" },
  { id: "additional", label: "بيانات إضافية" },
  { id: "attachments", label: "المرفقات" },
  { id: "archived-meetings", label: "سجل الاجتماعات المؤرشفة" },
  { id: "meetings", label: "سجل الاجتماعات" },
  { id: "statistics", label: "إحصائيات الموظف" },
  { id: "evaluations", label: "تقييمات الموظف" },
];

const JobProfilePage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="job-profile"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="الملف الوظيفي"
    >
      <EmployeeProfileHeader employee={sampleEmployee} />

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-2 rounded-lg mb-6">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="text-xs px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Personal Data Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">البيانات الشخصية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground text-sm">{item.label}</span>
                    <span className="text-foreground font-medium text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bank Accounts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                الحسابات البنكية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                لا توجد حسابات بنكية مسجلة
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              لا توجد بيانات اتصال
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qualifications">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              لا توجد مؤهلات مسجلة
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              لا توجد بيانات تعيين
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="additional">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              لا توجد بيانات إضافية
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attachments">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              لا توجد مرفقات
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived-meetings">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              لا توجد اجتماعات مؤرشفة
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              لا توجد اجتماعات مسجلة
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              لا توجد إحصائيات
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluations">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              لا توجد تقييمات
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </InnerPageLayout>
  );
};

export default JobProfilePage;
