import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ProjectsTable, ProjectData } from "@/components/projects/ProjectsTable";
import { CheckCircle } from "lucide-react";

const projectsData: ProjectData[] = [
  {
    id: "1",
    projectNumber: "PRJ-001",
    projectName: "مشروع أفراد المعانين و الزواج",
    balance: 150000,
    status: "جاري",
    sector: "الرياض - الرياض",
    village: "حي النخيل",
    targetCategory: "أسر محتاجة",
    supportType: "نقدي",
    currency: "ريال",
  },
  {
    id: "3",
    projectNumber: "PRJ-003",
    projectName: "مشروع كسوة الشتاء",
    balance: 50000,
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
    balance: 300000,
    status: "جاري",
    sector: "الطائف - مكة",
    village: "حي الشرقية",
    targetCategory: "أسر محتاجة",
    supportType: "عيني",
    currency: "ريال",
  },
  {
    id: "6",
    projectNumber: "PRJ-006",
    projectName: "مشروع سلة غذائية",
    balance: 80000,
    status: "جاري",
    sector: "أبها - عسير",
    village: "حي النزهة",
    targetCategory: "أسر محتاجة",
    supportType: "عيني",
    currency: "ريال",
  },
  {
    id: "7",
    projectNumber: "PRJ-007",
    projectName: "مشروع مور نرك",
    balance: 120000,
    status: "جاري",
    sector: "تبوك - تبوك",
    village: "حي المروج",
    targetCategory: "أيتام",
    supportType: "نقدي",
    currency: "ريال",
  },
  {
    id: "8",
    projectNumber: "PRJ-008",
    projectName: "مشروع دعم الأسر المنتجة",
    balance: 95000,
    status: "جاري",
    sector: "الخبر - الشرقية",
    village: "حي الراكة",
    targetCategory: "أسر منتجة",
    supportType: "نقدي",
    currency: "ريال",
  },
];

export default function CompleteProjectPage() {
  const handleComplete = (id: string) => {
    console.log("Complete project:", id);
  };

  const handlePreview = (id: string) => {
    console.log("Preview project:", id);
  };

  return (
    <InnerPageLayout
      title="إكمال مشروع"
      moduleId="financial-resources"
      moduleTitle="الموارد المالية"
      sectionTitle="مرحلة الإقفال و التقييم"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-xl font-bold">إكمال مشروع</h1>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <ProjectsTable
            data={projectsData}
            actionType="complete"
            actionLabel="إكمال"
            actionColor="green"
            onAction={handleComplete}
            onPreview={handlePreview}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
}
