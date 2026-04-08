import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Pin } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import { usePersonalNotes, PersonalNote } from "@/hooks/usePersonalNotes";
import ViewDetailsDialog from "@/components/dialogs/ViewDetailsDialog";
import ConfirmDeleteDialog from "@/components/dialogs/ConfirmDeleteDialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const LABELS: Record<string, string> = {
  title: "العنوان", content: "المحتوى", priority: "الأولوية", is_pinned: "مثبتة",
};

const NotesTable = () => {
  const { notes, loading, deleteNote, togglePin } = usePersonalNotes();
  const [viewNote, setViewNote] = useState<PersonalNote | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (loading) {
    return <div className="space-y-2">{[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div>;
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-right">العنوان</TableHead>
            <TableHead className="text-right">المحتوى</TableHead>
            <TableHead className="text-right">الأولوية</TableHead>
            <TableHead className="text-right">التاريخ</TableHead>
            <TableHead className="text-right">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.length === 0 ? (
            <EmptyState asTableRow colSpan={5} message="لا توجد مذكرات بعد" />
          ) : (
            notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell className="font-medium">
                  {note.is_pinned && <Pin className="inline h-3 w-3 text-primary ml-1" />}
                  {note.title}
                </TableCell>
                <TableCell className="max-w-xs truncate">{note.content || "-"}</TableCell>
                <TableCell>
                  <Badge variant={note.priority === "high" ? "destructive" : "secondary"}>
                    {note.priority === "high" ? "عالية" : note.priority === "low" ? "منخفضة" : "عادية"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">{new Date(note.created_at).toLocaleDateString("ar-SA")}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setViewNote(note)}><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => togglePin(note.id, note.is_pinned)}>
                      <Pin className={`h-4 w-4 ${note.is_pinned ? "text-primary" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteId(note.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ViewDetailsDialog open={!!viewNote} onOpenChange={() => setViewNote(null)} title="تفاصيل المذكرة" data={viewNote} labels={LABELS} />
      <ConfirmDeleteDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={async () => { if (deleteId) await deleteNote(deleteId); }} />
    </div>
  );
};

export default NotesTable;
