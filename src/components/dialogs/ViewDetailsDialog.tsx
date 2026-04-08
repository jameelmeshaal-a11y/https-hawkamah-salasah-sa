import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ViewDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: Record<string, any> | null;
  labels?: Record<string, string>;
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  active: { label: "نشط", color: "bg-emerald-100 text-emerald-800" },
  inactive: { label: "غير نشط", color: "bg-gray-100 text-gray-800" },
  pending: { label: "قيد الانتظار", color: "bg-yellow-100 text-yellow-800" },
  approved: { label: "معتمد", color: "bg-blue-100 text-blue-800" },
  completed: { label: "مكتمل", color: "bg-emerald-100 text-emerald-800" },
  in_progress: { label: "جاري", color: "bg-blue-100 text-blue-800" },
  rejected: { label: "مرفوض", color: "bg-red-100 text-red-800" },
  suspended: { label: "معلق", color: "bg-orange-100 text-orange-800" },
  draft: { label: "مسودة", color: "bg-gray-100 text-gray-800" },
  present: { label: "حاضر", color: "bg-emerald-100 text-emerald-800" },
  absent: { label: "غائب", color: "bg-red-100 text-red-800" },
  late: { label: "متأخر", color: "bg-yellow-100 text-yellow-800" },
};

const SKIP_KEYS = ["id", "org_id", "user_id", "created_at", "updated_at", "created_by"];

const ViewDetailsDialog = ({ open, onOpenChange, title, data, labels = {} }: ViewDetailsDialogProps) => {
  if (!data) return null;

  const formatValue = (key: string, value: any) => {
    if (value === null || value === undefined) return <span className="text-muted-foreground">-</span>;
    if (key === "status" || key === "priority") {
      const mapped = STATUS_MAP[value];
      return mapped ? <Badge className={mapped.color}>{mapped.label}</Badge> : <Badge variant="secondary">{value}</Badge>;
    }
    if (typeof value === "boolean") return value ? "نعم" : "لا";
    if (typeof value === "number") return value.toLocaleString("ar-SA");
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      return new Date(value).toLocaleDateString("ar-SA");
    }
    return String(value);
  };

  const entries = Object.entries(data).filter(([key]) => !SKIP_KEYS.includes(key));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="divide-y">
          {entries.map(([key, value]) => (
            <div key={key} className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-muted-foreground">{labels[key] || key}</span>
              <span className="text-sm font-medium">{formatValue(key, value)}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsDialog;
