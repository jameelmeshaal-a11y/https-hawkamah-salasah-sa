import { FileX, LucideIcon } from "lucide-react";

export interface EmptyStateProps {
  message?: string;
  icon?: LucideIcon;
  colSpan?: number;
  asTableRow?: boolean;
}

const EmptyState = ({ 
  message = "لا توجد بيانات متوفرة في الجدول",
  icon: Icon,
  colSpan = 1,
  asTableRow = false
}: EmptyStateProps) => {
  const IconComponent = Icon || FileX;
  
  const content = (
    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
      <IconComponent className="h-12 w-12 mb-4 opacity-50" />
      <p className="text-sm">{message}</p>
    </div>
  );

  if (asTableRow) {
    const { TableRow, TableCell } = require("@/components/ui/table");
    return (
      <TableRow>
        <TableCell colSpan={colSpan} className="h-32">
          {content}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px] bg-card rounded-lg border border-border">
      {content}
    </div>
  );
};

export default EmptyState;
