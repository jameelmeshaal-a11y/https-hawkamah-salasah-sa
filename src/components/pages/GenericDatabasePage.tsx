import { LucideIcon, Search, Download, Filter, RefreshCw, Eye, Edit, Trash2 } from "lucide-react";
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

interface GenericDatabasePageProps {
  title: string;
  moduleId: string;
  itemSlug: string;
  sectionTitle: string;
  moduleTitle: string;
  icon: LucideIcon;
  columns: string[];
  filters?: { name: string; options: { value: string; label: string }[] }[];
  emptyMessage?: string;
}

const GenericDatabasePage = ({
  title,
  moduleId,
  itemSlug,
  sectionTitle,
  moduleTitle,
  icon: Icon,
  columns,
  filters = [],
  emptyMessage = "لا توجد بيانات في قاعدة البيانات",
}: GenericDatabasePageProps) => {
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
            <div>
              <h1 className="text-xl font-bold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground">إجمالي السجلات: 0</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              تحديث
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              تصدير Excel
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap p-4 bg-muted/30 rounded-lg">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="بحث في قاعدة البيانات..." className="pr-10 bg-background" />
          </div>
          {filters.map((filter) => (
            <Select key={filter.name}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder={filter.name} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            المزيد من الفلاتر
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-right w-[50px]">#</TableHead>
                {columns.map((column, index) => (
                  <TableHead key={index} className="text-right">
                    {column}
                  </TableHead>
                ))}
                <TableHead className="text-right w-[150px]">الإجراءات</TableHead>
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
            <span>عدد السجلات:</span>
            <Select defaultValue="20">
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default GenericDatabasePage;
