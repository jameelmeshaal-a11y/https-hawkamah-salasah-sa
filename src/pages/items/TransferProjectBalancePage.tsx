import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ProjectsTable, ProjectData } from "@/components/projects/ProjectsTable";
import { ArrowRightLeft } from "lucide-react";

const projectsData: ProjectData[] = [
  {
    id: "1",
    projectNumber: "PRJ-001",
    projectName: "مشروع أفراد المعانين و الزواج",
    balance: "150,000",
    status: "جاري",
    sector: "الرياض - الرياض",
    village: "حي النخيل",
    targetCategory: "أسر محتاجة",
    supportType: "نقدي",
    currency: "ريال",
  },
  {
    id: "2",
    projectNumber: "PRJ-002",
    projectName: "مشروع الحقيبة المدرسية",
    balance: "75,000",
    status: "مكتمل",
    sector: "جدة - مكة",
    village: "حي الصفا",
    targetCategory: "طلاب",
    supportType: "عيني",
    currency: "ريال",
  },
  {
    id: "3",
    projectNumber: "PRJ-003",
    projectName: "مشروع كسوة الشتاء",
    balance: "50,000",
    status: "جاري",
    sector: "الدمام - الشرقية",
    village: "حي الفيصلية",
    targetCategory: "أيتام",
    supportType: "عيني",
    currency: "ريال",
  },
  {
    id: "5",
    projectNumber: "PRJ-005",
    projectName: "مشروع ترميم منازل",
    balance: "300,000",
    status: "جاري",
    sector: "الطائف - مكة",
    village: "حي الشرقية",
    targetCategory: "أسر محتاجة",
    supportType: "عيني",
    currency: "ريال",
  },
  {
    id: "7",
    projectNumber: "PRJ-007",
    projectName: "مشروع مور نرك",
    balance: "120,000",
    status: "جاري",
    sector: "تبوك - تبوك",
    village: "حي المروج",
    targetCategory: "أيتام",
    supportType: "نقدي",
    currency: "ريال",
  },
];

export default function TransferProjectBalancePage() {
  const handleTransfer = (id: string) => {
    console.log("Transfer project balance:", id);
  };

  const handlePreview = (id: string) => {
    console.log("Preview project:", id);
  };

  return (
    <InnerPageLayout
      title="تحويل رصيد مشروع"
      moduleId="financial-resources"
      moduleTitle="الموارد المالية"
      sectionTitle="مرحلة الإقفال و التقييم"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ArrowRightLeft className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold">تحويل رصيد مشروع</h1>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <ProjectsTable
            data={projectsData}
            actionType="transfer"
            actionLabel="تحويل"
            actionColor="blue"
            onAction={handleTransfer}
            onPreview={handlePreview}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
}
