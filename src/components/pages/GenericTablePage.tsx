import { LucideIcon, Search, Download, Filter, Plus } from "lucide-react";
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
import EmptyState from "@/components/shared/EmptyState";

interface GenericTablePageProps {
  title: string;
  moduleId: string;
  itemSlug: string;
  sectionTitle: string;
  moduleTitle: string;
  icon: LucideIcon;
  columns: string[];
  emptyMessage?: string;
  showAddButton?: boolean;
  addButtonLabel?: string;
}

const GenericTablePage = ({
  title,
  moduleId,
  itemSlug,
  sectionTitle,
  moduleTitle,
  icon: Icon,
  columns,
  emptyMessage = "لا توجد بيانات حالياً",
  showAddButton = false,
  addButtonLabel = "إضافة جديد",
}: GenericTablePageProps) => {
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
          {showAddButton && (
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {addButtonLabel}
            </Button>
          )}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="بحث..." className="pr-10" />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index} className="text-right">
                    {column}
                  </TableHead>
                ))}
                <TableHead className="text-right w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  <EmptyState
                    icon={Icon}
                    message={emptyMessage}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default GenericTablePage;
