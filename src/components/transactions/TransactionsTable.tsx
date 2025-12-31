import { LucideIcon, Eye, XCircle } from "lucide-react";
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
import EmptyState from "@/components/shared/EmptyState";
import TransactionsToolbar from "./TransactionsToolbar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface TransactionRecord {
  id: string;
  number: string;
  type: string;
  title: string;
  details: string;
  sender: string;
  recipient: string;
  status: "pending" | "ongoing" | "completed" | "rejected" | "cancelled" | "archived";
  date: string;
  notes?: string;
}

interface TransactionsTableProps {
  transactions: TransactionRecord[];
  showActions?: boolean;
  showCancelAction?: boolean;
  showToolbar?: boolean;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
}

const statusConfig: Record<
  TransactionRecord["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pending: { label: "قيد الانتظار", variant: "secondary" },
  ongoing: { label: "جارية", variant: "default" },
  completed: { label: "مكتملة", variant: "outline" },
  rejected: { label: "مرفوضة", variant: "destructive" },
  cancelled: { label: "ملغاة", variant: "destructive" },
  archived: { label: "مؤرشفة", variant: "outline" },
};

const TransactionsTable = ({
  transactions,
  showActions = true,
  showCancelAction = false,
  showToolbar = true,
  emptyMessage = "لا توجد بيانات متوفرة في الجدول",
  emptyIcon,
}: TransactionsTableProps) => {
  if (transactions.length === 0) {
    return (
      <div className="space-y-4">
        {showToolbar && <TransactionsToolbar />}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                {showActions && <TableHead className="text-right w-32">إدارة</TableHead>}
                <TableHead className="text-right">رقم المعاملة</TableHead>
                <TableHead className="text-right">نوع المعاملة</TableHead>
                <TableHead className="text-right">عنوان المعاملة</TableHead>
                <TableHead className="text-right">المرسل</TableHead>
                <TableHead className="text-right">المستلم</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={showActions ? 8 : 7} className="text-center py-8">
                  {emptyIcon ? (
                    <EmptyState message={emptyMessage} icon={emptyIcon} />
                  ) : (
                    <span className="text-muted-foreground">{emptyMessage}</span>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>إظهار السجلات 0 إلى 0 من 0</span>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="pointer-events-none opacity-50">
                  السابق
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="pointer-events-none opacity-50">
                  التالي
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showToolbar && <TransactionsToolbar />}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {showActions && <TableHead className="text-right w-32">إدارة</TableHead>}
              <TableHead className="text-right">رقم المعاملة</TableHead>
              <TableHead className="text-right">نوع المعاملة</TableHead>
              <TableHead className="text-right">عنوان المعاملة</TableHead>
              <TableHead className="text-right">المرسل</TableHead>
              <TableHead className="text-right">المستلم</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                {showActions && (
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {showCancelAction && (
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <XCircle className="h-4 w-4 ml-1" />
                          إلغاء
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        معاينة
                      </Button>
                    </div>
                  </TableCell>
                )}
                <TableCell className="font-medium">{transaction.number}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.sender}</TableCell>
                <TableCell>{transaction.recipient}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[transaction.status].variant}>
                    {statusConfig[transaction.status].label}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>إظهار السجلات 1 إلى {transactions.length} من {transactions.length}</span>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#">السابق</PaginationPrevious>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#">التالي</PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TransactionsTable;
