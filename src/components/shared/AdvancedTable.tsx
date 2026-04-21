import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Filter, ChevronLeft, ChevronRight, FileText, Eye, Edit, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import MaskedPhone from "./MaskedPhone";
import MaskedEmail from "./MaskedEmail";

export interface TableColumn {
  key: string;
  label: string;
  type?: "text" | "status" | "date" | "number" | "link" | "actions";
  width?: string;
}

export interface TableAction {
  icon: "pdf" | "view" | "edit" | "delete";
  label?: string;
  onClick: (row: Record<string, unknown>) => void;
  variant?: "default" | "destructive" | "outline" | "ghost";
}

interface AdvancedTableProps {
  columns: TableColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  actions?: TableAction[];
  searchable?: boolean;
  exportable?: boolean;
  filterable?: boolean;
  pageSizes?: number[];
  emptyMessage?: string;
}

const AdvancedTable = ({
  columns,
  data,
  actions,
  searchable = true,
  exportable = true,
  filterable = true,
  pageSizes = [10, 20, 50, 100],
  emptyMessage = "لا توجد بيانات للعرض",
}: AdvancedTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(pageSizes[1]?.toString() || "20");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / parseInt(pageSize));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const paginatedData = filteredData.slice(startIndex, startIndex + parseInt(pageSize));

  const renderCellContent = (column: TableColumn, value: unknown) => {
    // Auto-mask any phone-like column
    if (column.key === "phone" || /phone|جوال|هاتف/i.test(column.key) || /phone|جوال|هاتف/.test(column.label)) {
      return <MaskedPhone value={value == null ? "" : String(value)} />;
    }
    // Auto-mask any email-like column (only personal addresses are hidden)
    if (column.key === "email" || /email|بريد/i.test(column.key) || /email|بريد/.test(column.label)) {
      return <MaskedEmail value={value == null ? "" : String(value)} />;
    }
    switch (column.type) {
      case "status":
        return <StatusBadge status={String(value)} />;
      case "date":
        return <span className="text-muted-foreground">{String(value)}</span>;
      case "number":
        return <span className="font-medium">{Number(value).toLocaleString()}</span>;
      case "link":
        return (
          <Button variant="link" className="text-primary p-0 h-auto">
            {String(value)}
          </Button>
        );
      default:
        return String(value);
    }
  };

  const renderActionButton = (action: TableAction, row: Record<string, unknown>) => {
    const icons = {
      pdf: <FileText className="h-4 w-4" />,
      view: <Eye className="h-4 w-4" />,
      edit: <Edit className="h-4 w-4" />,
      delete: <Trash2 className="h-4 w-4" />,
    };

    const colors = {
      pdf: "text-red-600 hover:text-red-700",
      view: "text-blue-600 hover:text-blue-700",
      edit: "text-yellow-600 hover:text-yellow-700",
      delete: "text-red-600 hover:text-red-700",
    };

    return (
      <Button
        key={action.icon}
        variant="ghost"
        size="sm"
        className={colors[action.icon]}
        onClick={() => action.onClick(row)}
      >
        {icons[action.icon]}
        {action.label && <span className="mr-1">{action.label}</span>}
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {searchable && (
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="بحث..."
                className="pr-9 w-64"
              />
            </div>
          )}
          {filterable && (
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {exportable && (
            <>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 ml-2" />
                Excel
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 ml-2" />
                PDF
              </Button>
            </>
          )}
          <Select value={pageSize} onValueChange={(v) => { setPageSize(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} سجل
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {actions && actions.length > 0 && (
                  <TableHead className="text-right w-[120px]">الإجراءات</TableHead>
                )}
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className="text-right"
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-muted/30">
                    {actions && actions.length > 0 && (
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {actions.map((action) => renderActionButton(action, row))}
                        </div>
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {renderCellContent(column, row[column.key])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          عرض {startIndex + 1} - {Math.min(startIndex + parseInt(pageSize), filteredData.length)} من {filteredData.length} سجل
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="px-3">
            {currentPage} / {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTable;
