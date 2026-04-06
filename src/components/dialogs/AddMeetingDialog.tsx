import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<unknown>;
}

export const AddMeetingDialog = ({ open, onClose, onSubmit }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', meeting_type: 'board', meeting_date: '', location: '', agenda: '' });

  const handleSubmit = async () => {
    if (!form.title || !form.meeting_date) return;
    setLoading(true);
    const result = await onSubmit(form);
    setLoading(false);
    if (result) { setForm({ title: '', meeting_type: 'board', meeting_date: '', location: '', agenda: '' }); onClose(); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader><DialogTitle>إضافة اجتماع جديد</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>عنوان الاجتماع *</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
          <div>
            <Label>نوع الاجتماع</Label>
            <Select value={form.meeting_type} onValueChange={v => setForm({...form, meeting_type: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="board">مجلس إدارة</SelectItem>
                <SelectItem value="general">جمعية عمومية</SelectItem>
                <SelectItem value="committee">لجنة</SelectItem>
                <SelectItem value="department">إداري</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>التاريخ والوقت *</Label><Input type="datetime-local" value={form.meeting_date} onChange={e => setForm({...form, meeting_date: e.target.value})} /></div>
            <div><Label>المكان</Label><Input value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
          </div>
          <div><Label>جدول الأعمال</Label><Textarea value={form.agenda} onChange={e => setForm({...form, agenda: e.target.value})} placeholder="بنود جدول الأعمال..." rows={3} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={loading || !form.title || !form.meeting_date}>{loading ? 'جارٍ الحفظ...' : 'إضافة الاجتماع'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
