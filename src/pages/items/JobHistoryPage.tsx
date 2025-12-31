import InnerPageLayout from "@/components/layout/InnerPageLayout";
import EmployeeProfileHeader from "@/components/records/EmployeeProfileHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileX } from "lucide-react";

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

const tabs = [
  { id: "leaves", label: "سجل الإجازات" },
  { id: "permissions", label: "سجل الأذونات" },
  { id: "warnings", label: "سجل الإنذارات" },
  { id: "inquiries", label: "سجل المسائلات" },
  { id: "requests", label: "سجل الطلبات" },
  { id: "kpi", label: "مؤشرات قياس الأداء" },
];

const EmptyTabContent = ({ message }: { message: string }) => (
  <Card>
    <CardContent className="py-12 flex flex-col items-center justify-center text-muted-foreground">
      <FileX className="h-12 w-12 mb-4 opacity-50" />
      <p>{message}</p>
    </CardContent>
  </Card>
);

const JobHistoryPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="job-history"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="السجل الوظيفي"
    >
      <EmployeeProfileHeader employee={sampleEmployee} />

      <Tabs defaultValue="leaves" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-2 rounded-lg mb-6">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="text-sm px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="leaves">
          <EmptyTabContent message="لا يوجد سجلات إجازات لهذا الموظف" />
        </TabsContent>

        <TabsContent value="permissions">
          <EmptyTabContent message="لا يوجد سجلات أذونات لهذا الموظف" />
        </TabsContent>

        <TabsContent value="warnings">
          <EmptyTabContent message="لا يوجد سجلات إنذارات لهذا الموظف" />
        </TabsContent>

        <TabsContent value="inquiries">
          <EmptyTabContent message="لا يوجد سجلات مسائلات لهذا الموظف" />
        </TabsContent>

        <TabsContent value="requests">
          <EmptyTabContent message="لا يوجد سجلات طلبات لهذا الموظف" />
        </TabsContent>

        <TabsContent value="kpi">
          <EmptyTabContent message="لا يوجد مؤشرات قياس أداء لهذا الموظف" />
        </TabsContent>
      </Tabs>
    </InnerPageLayout>
  );
};

export default JobHistoryPage;
