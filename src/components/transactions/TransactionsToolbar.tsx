import { Search, Download, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionsToolbarProps {
  onSearch?: (query: string) => void;
  onExport?: () => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  showFilters?: boolean;
}

const TransactionsToolbar = ({
  onSearch,
  onExport,
  pageSize = 20,
  onPageSizeChange,
  showFilters = true,
}: TransactionsToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              className="pr-9 w-64"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {showFilters && (
            <>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 ml-1" />
                فلتر متقدم
              </Button>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4 ml-1" />
                إزالة الفلتر
              </Button>
            </>
          )}
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange?.(parseInt(value))}
          >
            <SelectTrigger className="w-24">
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
  );
};

export default TransactionsToolbar;
