import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EmptyState from "@/components/shared/EmptyState";
import { Eye, FileText, LucideIcon } from "lucide-react";

export interface RequestRecord {
  id: string;
  requester: string;
  details: string;
  classification: string;
  requestType: string;
  title: string;
  status: "pending" | "approved" | "rejected" | "completed" | "cancelled";
  statusDescription?: string;
  date: string;
}

interface RequestsTableProps {
  requests: RequestRecord[];
  showActions?: boolean;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
}

const statusLabels: Record<RequestRecord["status"], string> = {
  pending: "قيد الاعتماد",
  approved: "معتمد",
  rejected: "مرفوض",
  completed: "مكتمل",
  cancelled: "ملغي",
};

const statusColors: Record<RequestRecord["status"], string> = {
  pending: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-700 border-green-500/30",
  rejected: "bg-red-500/20 text-red-700 border-red-500/30",
  completed: "bg-blue-500/20 text-blue-700 border-blue-500/30",
  cancelled: "bg-muted text-muted-foreground border-border",
};

const RequestsTable = ({ 
  requests, 
  showActions = true, 
  emptyMessage = "لا توجد طلبات حالياً",
  emptyIcon = FileText
}: RequestsTableProps) => {
  if (requests.length === 0) {
    return <EmptyState icon={emptyIcon} message={emptyMessage} />;
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-right">مقدم الطلب</TableHead>
            <TableHead className="text-right">التفاصيل</TableHead>
            <TableHead className="text-right">التصنيف</TableHead>
            <TableHead className="text-right">نوع الطلب</TableHead>
            <TableHead className="text-right">عنوان الطلب</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-right">وصف الحالة</TableHead>
            <TableHead className="text-right">التاريخ</TableHead>
            {showActions && <TableHead className="text-center">الإجراءات</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="text-right font-medium">{request.requester}</TableCell>
              <TableCell className="text-right text-muted-foreground max-w-[200px] truncate">
                {request.details}
              </TableCell>
              <TableCell className="text-right">{request.classification}</TableCell>
              <TableCell className="text-right">{request.requestType}</TableCell>
              <TableCell className="text-right">{request.title}</TableCell>
              <TableCell className="text-right">
                <Badge variant="outline" className={statusColors[request.status]}>
                  {statusLabels[request.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {request.statusDescription || "-"}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">{request.date}</TableCell>
              {showActions && (
                <TableCell className="text-center">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    <Eye className="h-4 w-4 ml-1" />
                    معاينة
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

export default RequestsTable;
