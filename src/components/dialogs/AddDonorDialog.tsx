import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<unknown>;
}

export const AddDonorDialog = ({ open, onClose, onSubmit }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: '', donor_type: 'individual', phone: '', email: '', city: '' });

  const handleSubmit = async () => {
    if (!form.full_name) return;
    setLoading(true);
    const result = await onSubmit(form);
    setLoading(false);
    if (result) { setForm({ full_name: '', donor_type: 'individual', phone: '', email: '', city: '' }); onClose(); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader><DialogTitle>إضافة متبرع جديد</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>الاسم *</Label><Input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} /></div>
          <div>
            <Label>النوع</Label>
            <Select value={form.donor_type} onValueChange={v => setForm({...form, donor_type: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">فرد</SelectItem>
                <SelectItem value="company">شركة</SelectItem>
                <SelectItem value="government">حكومي</SelectItem>
                <SelectItem value="international">دولي</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>الجوال</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
            <div><Label>البريد</Label><Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          </div>
          <div><Label>المدينة</Label><Input value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={loading || !form.full_name}>{loading ? 'جارٍ الحفظ...' : 'إضافة المتبرع'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
