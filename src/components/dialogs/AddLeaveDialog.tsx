import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useEmployees } from '@/hooks/useEmployees';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<unknown>;
}

export const AddLeaveDialog = ({ open, onClose, onSubmit }: Props) => {
  const { employees } = useEmployees();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    employee_id: '', leave_type: '', start_date: '', end_date: '', reason: '',
  });

  const handleSubmit = async () => {
    if (!form.employee_id || !form.leave_type || !form.start_date || !form.end_date) return;
    setLoading(true);
    const result = await onSubmit(form);
    setLoading(false);
    if (result) {
      setForm({ employee_id: '', leave_type: '', start_date: '', end_date: '', reason: '' });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader><DialogTitle>تقديم طلب إجازة</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>الموظف *</Label>
            <Select value={form.employee_id} onValueChange={v => setForm({...form, employee_id: v})}>
              <SelectTrigger><SelectValue placeholder="اختر الموظف" /></SelectTrigger>
              <SelectContent>
                {employees.map(emp => (
                  <SelectItem key={emp.id} value={emp.id}>{emp.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>نوع الإجازة *</Label>
            <Select value={form.leave_type} onValueChange={v => setForm({...form, leave_type: v})}>
              <SelectTrigger><SelectValue placeholder="اختر النوع" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">سنوية</SelectItem>
                <SelectItem value="sick">مرضية</SelectItem>
                <SelectItem value="emergency">طارئة</SelectItem>
                <SelectItem value="unpaid">بدون راتب</SelectItem>
                <SelectItem value="maternity">أمومة</SelectItem>
                <SelectItem value="hajj">حج</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>من تاريخ *</Label><Input type="date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} /></div>
            <div><Label>إلى تاريخ *</Label><Input type="date" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} /></div>
          </div>
          <div>
            <Label>السبب</Label>
            <Textarea value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} placeholder="سبب الإجازة..." rows={3} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={loading || !form.employee_id || !form.leave_type || !form.start_date || !form.end_date}>
            {loading ? 'جارٍ الإرسال...' : 'تقديم الطلب'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
