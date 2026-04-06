import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<unknown>;
}

export const AddVolunteerDialog = ({ open, onClose, onSubmit }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', city: '', skills: '' });

  const handleSubmit = async () => {
    if (!form.full_name) return;
    setLoading(true);
    const result = await onSubmit(form);
    setLoading(false);
    if (result) { setForm({ full_name: '', phone: '', email: '', city: '', skills: '' }); onClose(); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader><DialogTitle>إضافة متطوع جديد</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>الاسم الكامل *</Label><Input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>الجوال</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
            <div><Label>البريد</Label><Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          </div>
          <div><Label>المدينة</Label><Input value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
          <div><Label>المهارات</Label><Textarea value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder="المهارات والخبرات..." rows={2} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={loading || !form.full_name}>{loading ? 'جارٍ الحفظ...' : 'إضافة المتطوع'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
