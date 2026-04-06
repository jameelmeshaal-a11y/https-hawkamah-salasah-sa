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

export const AddBoardMemberDialog = ({ open, onClose, onSubmit }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: '', position: 'عضو', phone: '', email: '', appointment_date: '', notes: '' });

  const handleSubmit = async () => {
    if (!form.full_name) return;
    setLoading(true);
    const result = await onSubmit(form);
    setLoading(false);
    if (result) { setForm({ full_name: '', position: 'عضو', phone: '', email: '', appointment_date: '', notes: '' }); onClose(); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader><DialogTitle>إضافة عضو مجلس إدارة</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>الاسم الكامل *</Label><Input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} /></div>
          <div>
            <Label>المنصب</Label>
            <Select value={form.position} onValueChange={v => setForm({...form, position: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="رئيس">رئيس</SelectItem>
                <SelectItem value="نائب رئيس">نائب رئيس</SelectItem>
                <SelectItem value="أمين">أمين</SelectItem>
                <SelectItem value="عضو">عضو</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>الجوال</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
            <div><Label>البريد</Label><Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          </div>
          <div><Label>تاريخ التعيين</Label><Input type="date" value={form.appointment_date} onChange={e => setForm({...form, appointment_date: e.target.value})} /></div>
          <div><Label>ملاحظات</Label><Textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={loading || !form.full_name}>{loading ? 'جارٍ الحفظ...' : 'إضافة العضو'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
