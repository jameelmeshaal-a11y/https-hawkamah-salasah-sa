import { cn } from "@/lib/utils";

type StatusType = 
  | "approved" | "pending" | "rejected" | "active" | "inactive" 
  | "deposit" | "withdraw" | "completed" | "cancelled" | "draft"
  | "success" | "warning" | "error" | "info";

interface StatusBadgeProps {
  status: string;
  type?: StatusType;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  approved: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  active: "bg-blue-100 text-blue-800 border-blue-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  deposit: "bg-green-100 text-green-800 border-green-200",
  withdraw: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  draft: "bg-slate-100 text-slate-800 border-slate-200",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

const getStatusType = (status: string): StatusType => {
  const statusMap: Record<string, StatusType> = {
    "معتمد": "approved",
    "مقبول": "approved",
    "موافق عليه": "approved",
    "مكتمل": "completed",
    "منتهي": "completed",
    "قيد المراجعة": "pending",
    "معلق": "pending",
    "جاري": "pending",
    "مرفوض": "rejected",
    "ملغي": "cancelled",
    "فعال": "active",
    "مفعل": "active",
    "نشط": "active",
    "غير فعال": "inactive",
    "معطل": "inactive",
    "إيداع": "deposit",
    "سحب": "withdraw",
    "مسودة": "draft",
  };
  return statusMap[status] || "info";
};

const StatusBadge = ({ status, type, className }: StatusBadgeProps) => {
  const statusType = type || getStatusType(status);
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[statusType],
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
