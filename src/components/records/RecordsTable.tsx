import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import type { LucideIcon } from "lucide-react";

export interface RecordColumn {
  key: string;
  label: string;
  render?: (value: unknown, record: Record<string, unknown>) => React.ReactNode;
}

interface RecordsTableProps {
  columns: RecordColumn[];
  records: Record<string, unknown>[];
  showActions?: boolean;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
  onView?: (record: Record<string, unknown>) => void;
}

const RecordsTable = ({
  columns,
  records,
  showActions = true,
  emptyMessage = "لا توجد سجلات",
  emptyIcon = FileText,
  onView,
}: RecordsTableProps) => {
  if (records.length === 0) {
    return (
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((col) => (
                <TableHead key={col.key} className="text-right">
                  {col.label}
                </TableHead>
              ))}
              {showActions && <TableHead className="text-right">الإجراءات</TableHead>}
            </TableRow>
          </TableHeader>
        </Table>
        <EmptyState message={emptyMessage} icon={emptyIcon} />
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {columns.map((col) => (
              <TableHead key={col.key} className="text-right">
                {col.label}
              </TableHead>
            ))}
            {showActions && <TableHead className="text-right">الإجراءات</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={record.id as string || index}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render 
                    ? col.render(record[col.key], record)
                    : (record[col.key] as React.ReactNode)}
                </TableCell>
              ))}
              {showActions && (
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => onView?.(record)}>
                    <Eye className="h-4 w-4 ml-1" />
                    عرض
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecordsTable;
