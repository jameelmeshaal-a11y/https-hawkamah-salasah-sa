import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import { Search, Download, Eye } from "lucide-react";

export interface ProjectData {
  id: string;
  projectNumber: string;
  projectName: string;
  balance: number;
  status: "جاري" | "مكتمل" | "جديد";
  sector: string;
  village: string;
  targetCategory: string;
  supportType: string;
  currency: string;
}

interface ProjectsTableProps {
  data: ProjectData[];
  actionType: "delete" | "open" | "complete" | "transfer" | "manage";
  actionLabel: string;
  actionColor: "red" | "green" | "blue";
  onAction?: (id: string) => void;
  onPreview?: (id: string) => void;
}

const actionColorClasses = {
  red: "bg-red-500 hover:bg-red-600 text-white",
  green: "bg-emerald-600 hover:bg-emerald-700 text-white",
  blue: "bg-blue-500 hover:bg-blue-600 text-white",
};

export function ProjectsTable({
  data,
  actionType,
  actionLabel,
  actionColor,
  onAction,
  onPreview,
}: ProjectsTableProps) {
  const getStatusType = (status: string) => {
    switch (status) {
      case "جاري":
        return "warning";
      case "مكتمل":
        return "success";
      case "جديد":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="بحث..." className="pr-10 text-right" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          تصدير
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right">{actionLabel}</TableHead>
              <TableHead className="text-right">رقم المشروع</TableHead>
              <TableHead className="text-right">ملف المشروع</TableHead>
              <TableHead className="text-right">اسم المشروع</TableHead>
              <TableHead className="text-right">رصيد المشروع</TableHead>
              <TableHead className="text-right">حالة المشروع</TableHead>
              <TableHead className="text-right">القطاع - المحافظة</TableHead>
              <TableHead className="text-right">القرية - الحي</TableHead>
              <TableHead className="text-right">الفئة المستهدفة</TableHead>
              <TableHead className="text-right">نوع الدعم</TableHead>
              <TableHead className="text-right">ملة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11}>
                  <EmptyState message="لا توجد بيانات متوفرة في الجدول" />
                </TableCell>
              </TableRow>
            ) : (
              data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Button
                      size="sm"
                      className={actionColorClasses[actionColor]}
                      onClick={() => onAction?.(project.id)}
                    >
                      {actionLabel}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">{project.projectNumber}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-blue-600"
                      onClick={() => onPreview?.(project.id)}
                    >
                      <Eye className="h-3 w-3" />
                      معاينة
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">{project.projectName}</TableCell>
                  <TableCell className="text-right">{project.balance.toLocaleString()}</TableCell>
                  <TableCell>
                    <StatusBadge status={project.status} type={getStatusType(project.status)} />
                  </TableCell>
                  <TableCell className="text-right">{project.sector}</TableCell>
                  <TableCell className="text-right">{project.village}</TableCell>
                  <TableCell className="text-right">{project.targetCategory}</TableCell>
                  <TableCell className="text-right">{project.supportType}</TableCell>
                  <TableCell className="text-right">{project.currency}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>عرض 1 إلى {data.length} من {data.length} سجل</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>السابق</Button>
          <Button variant="outline" size="sm" className="bg-emerald-600 text-white">1</Button>
          <Button variant="outline" size="sm" disabled>التالي</Button>
        </div>
      </div>
    </div>
  );
}
