import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportErrorAlertProps {
  title?: string;
  message: string;
  className?: string;
}

const ReportErrorAlert = ({
  title = "خطأ في البيانات المدخلة",
  message,
  className,
}: ReportErrorAlertProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-200 text-right",
        className
      )}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 justify-end">
          <span className="font-semibold text-red-700">{title}</span>
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <p className="text-sm text-red-600 mt-1">{message}</p>
      </div>
    </div>
  );
};

export default ReportErrorAlert;
