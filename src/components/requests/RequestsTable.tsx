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
import RequestsToolbar from "./RequestsToolbar";
import { Eye, FileText, LucideIcon, XCircle } from "lucide-react";
import { useState } from "react";

export interface RequestRecord {
  id: string;
  requester: string;
  details: string;
  classification: string;
  requestType: string;
  approvalNotes?: string;
  title: string;
  status: "pending" | "approved" | "rejected" | "completed" | "cancelled" | "rejected_with_note";
  statusDescription?: string;
  startDate?: string;
  endDate?: string;
  date: string;
}

interface RequestsTableProps {
  requests: RequestRecord[];
  showActions?: boolean;
  showCancelAction?: boolean;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
  showToolbar?: boolean;
  onCancel?: (id: string) => void;
  onPreview?: (id: string) => void;
}

const statusLabels: Record<RequestRecord["status"], string> = {
  pending: "قيد الاعتماد",
  approved: "معتمد",
  rejected: "مرفوض نهائياً",
  completed: "مكتمل",
  cancelled: "ملغي",
  rejected_with_note: "مرفوض مع ملاحظة",
};

const statusColors: Record<RequestRecord["status"], string> = {
  pending: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-700 border-green-500/30",
  rejected: "bg-red-500/20 text-red-700 border-red-500/30",
  completed: "bg-blue-500/20 text-blue-700 border-blue-500/30",
  cancelled: "bg-muted text-muted-foreground border-border",
  rejected_with_note: "bg-orange-500/20 text-orange-700 border-orange-500/30",
};

const RequestsTable = ({ 
  requests, 
  showActions = true,
  showCancelAction = false,
  emptyMessage = "لا توجد طلبات حالياً",
  emptyIcon = FileText,
  showToolbar = true,
  onCancel,
  onPreview,
}: RequestsTableProps) => {
  const [pageSize, setPageSize] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = requests.filter((request) => {
    if (!searchQuery) return true;
    return (
      request.requester.includes(searchQuery) ||
      request.title.includes(searchQuery) ||
      request.details.includes(searchQuery)
    );
  });

  const displayedRequests = filteredRequests.slice(0, pageSize);
  const totalRecords = filteredRequests.length;

  return (
    <div className="space-y-4">
      {showToolbar && (
        <RequestsToolbar
          onSearch={setSearchQuery}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      )}

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {displayedRequests.length === 0 ? (
          <EmptyState icon={emptyIcon} message={emptyMessage} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {(showActions || showCancelAction) && (
                      <TableHead className="text-center w-[140px]">إدارة</TableHead>
                    )}
                    <TableHead className="text-right">مقدم الطلب</TableHead>
                    <TableHead className="text-right">التفاصيل</TableHead>
                    <TableHead className="text-right">تصنيف الطلب</TableHead>
                    <TableHead className="text-right">نوع الطلب</TableHead>
                    <TableHead className="text-right">ملاحظات الاعتماد</TableHead>
                    <TableHead className="text-right">عنوان الطلب</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">وصف الحالة</TableHead>
                    <TableHead className="text-right">تاريخ بداية الطلب</TableHead>
                    <TableHead className="text-right">تاريخ نهاية الطلب</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedRequests.map((request) => (
                    <TableRow key={request.id}>
                      {(showActions || showCancelAction) && (
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {showCancelAction && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive hover:text-destructive/80 text-xs px-2"
                                onClick={() => onCancel?.(request.id)}
                              >
                                <XCircle className="h-3 w-3 ml-1" />
                                إلغاء
                              </Button>
                            )}
                            {showActions && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-primary hover:text-primary/80 text-xs px-2"
                                onClick={() => onPreview?.(request.id)}
                              >
                                <Eye className="h-3 w-3 ml-1" />
                                معاينة
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      )}
                      <TableCell className="text-right font-medium">{request.requester}</TableCell>
                      <TableCell className="text-right text-muted-foreground max-w-[150px] truncate">
                        {request.details}
                      </TableCell>
                      <TableCell className="text-right">{request.classification}</TableCell>
                      <TableCell className="text-right">{request.requestType}</TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {request.approvalNotes || "-"}
                      </TableCell>
                      <TableCell className="text-right">{request.title}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={statusColors[request.status]}>
                          {statusLabels[request.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {request.statusDescription || "-"}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {request.startDate || "-"}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {request.endDate || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Info */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
              <span className="text-sm text-muted-foreground">
                إظهار السجلات {displayedRequests.length > 0 ? 1 : 0} إلى {displayedRequests.length} من {totalRecords}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestsTable;
