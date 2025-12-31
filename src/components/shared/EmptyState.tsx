import { FileX } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";

export interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
  colSpan?: number;
}

const EmptyState = ({ 
  message = "لا توجد بيانات متوفرة في الجدول",
  icon,
  colSpan = 1
}: EmptyStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          {icon || <FileX className="h-12 w-12 mb-4 opacity-50" />}
          <p className="text-sm">{message}</p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyState;
