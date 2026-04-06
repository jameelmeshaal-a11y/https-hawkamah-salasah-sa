import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<unknown>;
}

export const AddBeneficiaryDialog = ({ open, onClose, onSubmit }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: '', phone: '', city: '', category: '' });

  const handleSubmit = async () => {
    if (!form.full_name) return;
    setLoading(true);
    const result = await onSubmit(form);
    setLoading(false);
    if (result) { setForm({ full_name: '', phone: '', city: '', category: '' }); onClose(); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader><DialogTitle>إضافة مستفيد جديد</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>الاسم الكامل *</Label><Input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>الجوال</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
            <div><Label>المدينة</Label><Input value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
          </div>
          <div><Label>الفئة</Label><Input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="فئة المستفيد" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={loading || !form.full_name}>{loading ? 'جارٍ الحفظ...' : 'إضافة المستفيد'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
