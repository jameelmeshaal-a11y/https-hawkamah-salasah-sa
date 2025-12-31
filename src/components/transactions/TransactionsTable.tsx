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

export interface TransactionRecord {
  id: string;
  number: string;
  subject: string;
  sender: string;
  recipient: string;
  status: "pending" | "approved" | "rejected" | "cancelled" | "completed" | "archived";
  date: string;
  type?: string;
}

interface TransactionsTableProps {
  transactions: TransactionRecord[];
  showActions?: boolean;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
}

const statusConfig: Record<TransactionRecord["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "قيد الانتظار", variant: "secondary" },
  approved: { label: "موافق عليها", variant: "default" },
  rejected: { label: "مرفوضة", variant: "destructive" },
  cancelled: { label: "ملغاة", variant: "outline" },
  completed: { label: "مكتملة", variant: "default" },
  archived: { label: "مؤرشفة", variant: "outline" },
};

const TransactionsTable = ({
  transactions,
  showActions = true,
  emptyMessage = "لا توجد معاملات",
  emptyIcon = FileText,
}: TransactionsTableProps) => {
  if (transactions.length === 0) {
    return (
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right">رقم المعاملة</TableHead>
              <TableHead className="text-right">الموضوع</TableHead>
              <TableHead className="text-right">المرسل</TableHead>
              <TableHead className="text-right">المستلم</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
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
            <TableHead className="text-right">رقم المعاملة</TableHead>
            <TableHead className="text-right">الموضوع</TableHead>
            <TableHead className="text-right">المرسل</TableHead>
            <TableHead className="text-right">المستلم</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-right">التاريخ</TableHead>
            {showActions && <TableHead className="text-right">الإجراءات</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const status = statusConfig[transaction.status];
            return (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.number}</TableCell>
                <TableCell>{transaction.subject}</TableCell>
                <TableCell>{transaction.sender}</TableCell>
                <TableCell>{transaction.recipient}</TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                {showActions && (
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 ml-1" />
                      عرض
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
