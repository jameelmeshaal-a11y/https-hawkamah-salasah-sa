import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
}

interface NotesTableProps {
  notes?: Note[];
}

const NotesTable = ({ notes = [] }: NotesTableProps) => {
  if (notes.length === 0) {
    return (
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right">العنوان</TableHead>
              <TableHead className="text-right">المحتوى</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">الوقت</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-right">العنوان</TableHead>
            <TableHead className="text-right">المحتوى</TableHead>
            <TableHead className="text-right">التاريخ</TableHead>
            <TableHead className="text-right">الوقت</TableHead>
            <TableHead className="text-right">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>{note.title}</TableCell>
              <TableCell className="max-w-xs truncate">{note.content}</TableCell>
              <TableCell>{note.date}</TableCell>
              <TableCell>{note.time}</TableCell>
              <TableCell>
                {/* Actions will be added later */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotesTable;
