import { LucideIcon, Search, Download, Eye, FileText, Calendar } from "lucide-react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmptyState from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";

interface GenericRecordsPageProps {
  title: string;
  moduleId: string;
  itemSlug: string;
  sectionTitle: string;
  moduleTitle: string;
  icon: LucideIcon;
  columns: string[];
  showDateFilter?: boolean;
  emptyMessage?: string;
}

const GenericRecordsPage = ({
  title,
  moduleId,
  itemSlug,
  sectionTitle,
  moduleTitle,
  icon: Icon,
  columns,
  showDateFilter = true,
  emptyMessage = "لا توجد سجلات",
}: GenericRecordsPageProps) => {
  return (
    <InnerPageLayout
      moduleId={moduleId}
      itemSlug={itemSlug}
      sectionTitle={sectionTitle}
      moduleTitle={moduleTitle}
      title={title}
    >
      <div className="space-y-4" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            تصدير PDF
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="بحث في السجلات..." className="pr-10" />
          </div>
          {showDateFilter && (
            <>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input type="date" className="w-[150px]" />
              </div>
              <span className="text-muted-foreground">إلى</span>
              <Input type="date" className="w-[150px]" />
            </>
          )}
        </div>

        {/* Table */}
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right w-[60px]">م</TableHead>
                {columns.map((column, index) => (
                  <TableHead key={index} className="text-right">
                    {column}
                  </TableHead>
                ))}
                <TableHead className="text-right w-[100px]">معاينة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 2}>
                  <EmptyState
                    icon={Icon}
                    message={emptyMessage}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>عرض 0 من 0 سجل</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>السابق</Button>
            <Button variant="outline" size="sm" disabled>التالي</Button>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default GenericRecordsPage;
