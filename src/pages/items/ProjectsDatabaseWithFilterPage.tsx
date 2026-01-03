import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ProjectsTable, ProjectData } from "@/components/projects/ProjectsTable";
import { Card, CardContent } from "@/components/ui/card";

const allProjectsData: ProjectData[] = [
  {
    id: "1",
    projectNumber: "19000999",
    projectName: "مشروع سعيا المصدر",
    balance: 100000,
    status: "جديد" as const,
    sector: "منطقة الرياض",
    village: "أخرى",
    targetCategory: "أخرى",
    supportType: "أخرى",
    currency: "ريال",
  },
  {
    id: "2",
    projectNumber: "19000788",
    projectName: "مشروع افراص المقبلين ع الزواج",
    balance: 49700,
    status: "جاري" as const,
    sector: "منطقة الرياض",
    village: "أخرى",
    targetCategory: "أخرى",
    supportType: "أخرى",
    currency: "ريال",
  },
  {
    id: "3",
    projectNumber: "19000654",
    projectName: "مشروع الإسكان التنموي",
    balance: 125000,
    status: "جاري" as const,
    sector: "منطقة الرياض",
    village: "الرياض",
    targetCategory: "أسر",
    supportType: "تمليك سكن",
    currency: "ريال",
  },
  {
    id: "4",
    projectNumber: "19000432",
    projectName: "مشروع دعم الأيتام",
    balance: 85000,
    status: "جاري" as const,
    sector: "منطقة مكة",
    village: "جدة",
    targetCategory: "أيتام",
    supportType: "دعم مالي",
    currency: "ريال",
  },
  {
    id: "5",
    projectNumber: "19000321",
    projectName: "مشروع التأهيل المهني",
    balance: 0,
    status: "مكتمل" as const,
    sector: "المنطقة الشرقية",
    village: "الدمام",
    targetCategory: "شباب",
    supportType: "تدريب",
    currency: "ريال",
  },
  {
    id: "6",
    projectNumber: "19000890",
    projectName: "مشروع سلة رمضان",
    balance: 35000,
    status: "جاري" as const,
    sector: "منطقة الرياض",
    village: "الخرج",
    targetCategory: "أسر محتاجة",
    supportType: "عيني",
    currency: "ريال",
  },
  {
    id: "7",
    projectNumber: "19000567",
    projectName: "مشروع كسوة الشتاء",
    balance: 22000,
    status: "جاري" as const,
    sector: "منطقة القصيم",
    village: "بريدة",
    targetCategory: "أسر",
    supportType: "عيني",
    currency: "ريال",
  },
];

type StatusFilter = "all" | "جديد" | "جاري" | "معلق" | "مكتمل";

interface StatusCount {
  label: string;
  value: StatusFilter;
  count: number;
  color: string;
}

export default function ProjectsDatabaseWithFilterPage() {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");

  const statusCounts: StatusCount[] = [
    { label: "جديد", value: "جديد", count: allProjectsData.filter(p => p.status === "جديد").length, color: "bg-blue-500" },
    { label: "جاري", value: "جاري", count: allProjectsData.filter(p => p.status === "جاري").length, color: "bg-yellow-500" },
    { label: "معلق", value: "معلق", count: 0, color: "bg-gray-400" },
    { label: "مكتمل", value: "مكتمل", count: allProjectsData.filter(p => p.status === "مكتمل").length, color: "bg-emerald-500" },
  ];

  const filteredData = selectedStatus === "all" 
    ? allProjectsData 
    : allProjectsData.filter(p => p.status === selectedStatus);

  const handleManage = (id: string) => {
    console.log("Managing project:", id);
  };

  const handlePreview = (id: string) => {
    console.log("Previewing project:", id);
  };

  return (
    <InnerPageLayout
      moduleId="projects-management"
      title="قواعد بيانات المشاريع"
      moduleTitle="إدارة المشاريع"
      sectionTitle="مرحلة التخطيط"
    >
      <div className="flex gap-6">
        {/* Sidebar Filter */}
        <div className="w-48 shrink-0">
          <Card>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-medium text-right mb-4">حالة المشروع</h3>
              {statusCounts.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                    selectedStatus === status.value
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <span className={`${status.color} text-white text-xs px-2 py-1 rounded`}>
                    {status.count}
                  </span>
                  <span className="text-sm">{status.label}</span>
                </button>
              ))}
              <button
                onClick={() => setSelectedStatus("all")}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  selectedStatus === "all"
                    ? "bg-muted"
                    : "hover:bg-muted/50"
                }`}
              >
                <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded">
                  {allProjectsData.length}
                </span>
                <span className="text-sm">الكل</span>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <div className="flex-1">
          <ProjectsTable
            data={filteredData}
            actionType="manage"
            actionLabel="إدارة"
            actionColor="blue"
            onAction={handleManage}
            onPreview={handlePreview}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
}
