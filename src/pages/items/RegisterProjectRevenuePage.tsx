import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ProjectsTable } from "@/components/projects/ProjectsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RegisterFinancialDialog from "@/components/dialogs/RegisterFinancialDialog";

const projectsData = [
  { id: "1", projectNumber: "19000788", projectName: "مشروع افراص المقبلين ع الزواج", balance: 49700, status: "جاري" as const, sector: "منطقة الرياض", village: "محافظة الرياض", targetCategory: "أخرى", supportType: "نوع احدائي", currency: "ريال" },
  { id: "2", projectNumber: "19000789", projectName: "مشروع دعم الأيتام", balance: 85000, status: "جاري" as const, sector: "منطقة الرياض", village: "محافظة الخرج", targetCategory: "أيتام", supportType: "دعم مالي", currency: "ريال" },
  { id: "3", projectNumber: "19000790", projectName: "مشروع الحقيبة المدرسية", balance: 0, status: "مكتمل" as const, sector: "منطقة الرياض", village: "محافظة الرياض", targetCategory: "طلاب", supportType: "دعم عيني", currency: "ريال" },
  { id: "4", projectNumber: "19000791", projectName: "مشروع كسوة الشتاء", balance: 125000, status: "جاري" as const, sector: "منطقة مكة", village: "محافظة جدة", targetCategory: "أسر محتاجة", supportType: "دعم عيني", currency: "ريال" },
  { id: "5", projectNumber: "19000792", projectName: "مشروع إفطار صائم", balance: 200000, status: "جديد" as const, sector: "منطقة الرياض", village: "محافظة الرياض", targetCategory: "عموم المسلمين", supportType: "دعم عيني", currency: "ريال" },
];

const RegisterProjectRevenuePage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);

  const handleAction = (id: string) => {
    const p = projectsData.find(p => p.id === id);
    setSelectedProject(p?.projectName);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProject(undefined);
    setDialogOpen(true);
  };

  return (
    <InnerPageLayout moduleId="projects-management" title="تسجيل إيراد مشروع" moduleTitle="إدارة المشاريع" sectionTitle="مرحلة التنفيذ">
      <div className="p-6 space-y-4">
        <div className="flex justify-end">
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            تسجيل إيراد جديد
          </Button>
        </div>
        <ProjectsTable data={projectsData} actionType="manage" actionLabel="تسجيل إيراد" actionColor="blue" onAction={handleAction} />
      </div>
      <RegisterFinancialDialog open={dialogOpen} onOpenChange={setDialogOpen} type="revenue" projectName={selectedProject} />
    </InnerPageLayout>
  );
};

export default RegisterProjectRevenuePage;
