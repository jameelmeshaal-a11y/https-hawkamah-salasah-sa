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
  onSubmit: (data: { title: string; description?: string; request_type: string; priority?: string }) => Promise<unknown>;
  requestType?: string;
  dialogTitle?: string;
}

export const AddRequestDialog = ({ open, onClose, onSubmit, requestType, dialogTitle = 'إضافة طلب جديد' }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', type: requestType || '', priority: 'medium' });

  const handleSubmit = async () => {
    if (!form.title || !form.type) return;
    setLoading(true);
    const result = await onSubmit({ title: form.title, description: form.description, request_type: form.type, priority: form.priority });
    setLoading(false);
    if (result) {
      setForm({ title: '', description: '', type: requestType || '', priority: 'medium' });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>عنوان الطلب *</Label>
            <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="أدخل عنوان الطلب" />
          </div>
          {!requestType && (
            <div>
              <Label>نوع الطلب *</Label>
              <Select value={form.type} onValueChange={(v) => setForm({...form, type: v})}>
                <SelectTrigger><SelectValue placeholder="اختر نوع الطلب" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="إداري">إداري</SelectItem>
                  <SelectItem value="مالي">مالي</SelectItem>
                  <SelectItem value="تقني">تقني</SelectItem>
                  <SelectItem value="شراء">شراء</SelectItem>
                  <SelectItem value="إجازة">إجازة</SelectItem>
                  <SelectItem value="صيانة">صيانة</SelectItem>
                  <SelectItem value="أخرى">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Label>الأولوية</Label>
            <Select value={form.priority} onValueChange={(v) => setForm({...form, priority: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">منخفضة</SelectItem>
                <SelectItem value="medium">متوسطة</SelectItem>
                <SelectItem value="high">عالية</SelectItem>
                <SelectItem value="urgent">عاجلة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>الوصف</Label>
            <Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="وصف الطلب..." rows={3} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={loading || !form.title || !form.type}>
            {loading ? 'جارٍ الحفظ...' : 'حفظ الطلب'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
