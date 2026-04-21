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

export const AddEmployeeDialog = ({ open, onClose, onSubmit }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '', national_id: '', email: '', phone: '',
    department: '', position: '', hire_date: '', salary: 0, status: 'active',
  });

  const handleSubmit = async () => {
    if (!form.full_name || !form.department) return;
    setLoading(true);
    const result = await onSubmit(form);
    setLoading(false);
    if (result) {
      setForm({ full_name: '', national_id: '', email: '', phone: '', department: '', position: '', hire_date: '', salary: 0, status: 'active' });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader><DialogTitle>إضافة موظف جديد</DialogTitle></DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>الاسم الكامل *</Label><Input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} /></div>
          <div><Label>رقم الهوية</Label><Input value={form.national_id} onChange={e => setForm({...form, national_id: e.target.value})} /></div>
          <div><Label>رقم الجوال</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          <div><Label>البريد الإلكتروني</Label><Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div>
            <Label>القسم *</Label>
            <Select value={form.department} onValueChange={v => setForm({...form, department: v})}>
              <SelectTrigger><SelectValue placeholder="اختر القسم" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="الإدارة العامة">الإدارة العامة</SelectItem>
                <SelectItem value="المالية">المالية</SelectItem>
                <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                <SelectItem value="البرامج والمشاريع">البرامج والمشاريع</SelectItem>
                <SelectItem value="العلاقات العامة">العلاقات العامة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>المسمى الوظيفي</Label><Input value={form.position} onChange={e => setForm({...form, position: e.target.value})} /></div>
          <div><Label>تاريخ التوظيف</Label><Input type="date" value={form.hire_date} onChange={e => setForm({...form, hire_date: e.target.value})} /></div>
          <div><Label>الراتب (﷼)</Label><Input type="number" value={form.salary} onChange={e => setForm({...form, salary: Number(e.target.value)})} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={loading || !form.full_name || !form.department}>
            {loading ? 'جارٍ الحفظ...' : 'إضافة الموظف'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
