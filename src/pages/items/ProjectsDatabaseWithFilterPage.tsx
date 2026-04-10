import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { ProjectsTable, ProjectData } from "@/components/projects/ProjectsTable";
import { Card, CardContent } from "@/components/ui/card";
import { useProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type StatusFilter = "all" | "planning" | "active" | "on_hold" | "completed";

interface StatusCount {
  label: string;
  value: StatusFilter;
  count: number;
  color: string;
}

export default function ProjectsDatabaseWithFilterPage() {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const { projects, loading } = useProjects();

  const mappedData: ProjectData[] = projects.map(p => ({
    id: p.id,
    projectNumber: p.id.slice(0, 8),
    projectName: p.name,
    balance: p.budget - p.spent_amount,
    status: p.status === "planning" ? "جديد" as const : p.status === "completed" ? "مكتمل" as const : "جاري" as const,
    sector: p.category || "عام",
    village: "—",
    targetCategory: "—",
    supportType: "—",
    currency: "ريال",
  }));

  const statusCounts: StatusCount[] = [
    { label: "جديد", value: "planning", count: projects.filter(p => p.status === "planning").length, color: "bg-blue-500" },
    { label: "جاري", value: "active", count: projects.filter(p => p.status === "active").length, color: "bg-yellow-500" },
    { label: "معلق", value: "on_hold", count: projects.filter(p => p.status === "on_hold").length, color: "bg-gray-400" },
    { label: "مكتمل", value: "completed", count: projects.filter(p => p.status === "completed").length, color: "bg-emerald-500" },
  ];

  const filteredData = selectedStatus === "all"
    ? mappedData
    : mappedData.filter(p => {
        if (selectedStatus === "planning") return p.status === "جديد";
        if (selectedStatus === "completed") return p.status === "مكتمل";
        if (selectedStatus === "on_hold") return p.status === "معلق";
        return p.status === "جاري";
      });

  return (
    <InnerPageLayout moduleId="projects-management" title="قواعد بيانات المشاريع" moduleTitle="إدارة المشاريع" sectionTitle="مرحلة التخطيط">
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="flex gap-6">
          <div className="w-48 shrink-0">
            <Card>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium text-right mb-4">حالة المشروع</h3>
                {statusCounts.map((status) => (
                  <button key={status.value} onClick={() => setSelectedStatus(status.value)} className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${selectedStatus === status.value ? "bg-muted" : "hover:bg-muted/50"}`}>
                    <span className={`${status.color} text-white text-xs px-2 py-1 rounded`}>{status.count}</span>
                    <span className="text-sm">{status.label}</span>
                  </button>
                ))}
                <button onClick={() => setSelectedStatus("all")} className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${selectedStatus === "all" ? "bg-muted" : "hover:bg-muted/50"}`}>
                  <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded">{mappedData.length}</span>
                  <span className="text-sm">الكل</span>
                </button>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
            <ProjectsTable data={filteredData} actionType="manage" actionLabel="إدارة" actionColor="blue" onAction={(id) => toast.info(`إدارة المشروع: ${id}`)} onPreview={(id) => toast.info(`معاينة المشروع: ${id}`)} />
          </div>
        </div>
      )}
    </InnerPageLayout>
  );
}
