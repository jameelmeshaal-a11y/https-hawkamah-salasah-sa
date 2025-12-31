import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import EmptyState from "@/components/shared/EmptyState";
import { Mail, LucideIcon } from "lucide-react";

export interface MailRecord {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
  hasAttachment?: boolean;
  tags?: string[];
}

interface MailTableProps {
  mails: MailRecord[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onMailClick?: (mail: MailRecord) => void;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
}

const MailTable = ({ 
  mails, 
  selectedIds, 
  onSelectionChange, 
  onMailClick,
  emptyMessage = "لا توجد رسائل",
  emptyIcon = Mail
}: MailTableProps) => {
  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((i) => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const toggleAll = () => {
    if (selectedIds.length === mails.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(mails.map((m) => m.id));
    }
  };

  if (mails.length === 0) {
    return <EmptyState icon={emptyIcon} message={emptyMessage} />;
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedIds.length === mails.length && mails.length > 0}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead className="text-right">المرسل</TableHead>
            <TableHead className="text-right">الموضوع</TableHead>
            <TableHead className="text-right">العلامات</TableHead>
            <TableHead className="text-right">التاريخ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mails.map((mail) => (
            <TableRow 
              key={mail.id} 
              className={`cursor-pointer ${!mail.isRead ? 'bg-primary/5' : ''}`}
              onClick={() => onMailClick?.(mail)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox 
                  checked={selectedIds.includes(mail.id)}
                  onCheckedChange={() => toggleSelection(mail.id)}
                />
              </TableCell>
              <TableCell className={`text-right ${!mail.isRead ? 'font-semibold' : ''}`}>
                {mail.sender}
              </TableCell>
              <TableCell className="text-right">
                <div className={!mail.isRead ? 'font-semibold' : ''}>{mail.subject}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[300px]">
                  {mail.preview}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-1 flex-wrap">
                  {mail.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground text-sm">
                {mail.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MailTable;
