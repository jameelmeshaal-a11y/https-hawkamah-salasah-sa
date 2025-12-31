import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Filter, X } from "lucide-react";

interface RequestsToolbarProps {
  onSearch?: (query: string) => void;
  onExport?: () => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  showFilters?: boolean;
}

const RequestsToolbar = ({
  onSearch,
  onExport,
  pageSize = 20,
  onPageSizeChange,
  showFilters = true,
}: RequestsToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border border-border">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="بحث..."
          className="pr-10 text-right"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">عرض</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange?.(parseInt(value))}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">سجل</span>
      </div>

      {showFilters && (
        <>
          {/* Filter Button */}
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            فلتر متقدم
          </Button>

          {/* Clear Filter Button */}
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <X className="h-4 w-4" />
            إزالة الفلتر
          </Button>
        </>
      )}

      {/* Export Button */}
      <Button variant="outline" size="sm" className="gap-2" onClick={onExport}>
        <Download className="h-4 w-4" />
        تصدير
      </Button>
    </div>
  );
};

export default RequestsToolbar;
