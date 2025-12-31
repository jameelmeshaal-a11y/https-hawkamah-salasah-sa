import { FileX } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ 
  message = "لا توجد بيانات متوفرة في الجدول",
  icon
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      {icon || <FileX className="h-12 w-12 mb-4 opacity-50" />}
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default EmptyState;
