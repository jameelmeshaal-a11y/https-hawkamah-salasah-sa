import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: string;
  notes: string | null;
  org_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useAttendance = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .order('date', { ascending: false })
      .limit(200);
    if (error) { toast.error('فشل في تحميل سجلات الحضور'); }
    setRecords((data || []) as AttendanceRecord[]);
    setLoading(false);
  }, []);

  const addRecord = async (record: Partial<AttendanceRecord>) => {
    const { error } = await supabase.from('attendance').insert(record as any);
    if (error) { toast.error('فشل في تسجيل الحضور'); return false; }
    toast.success('تم تسجيل الحضور بنجاح');
    await fetchRecords();
    return true;
  };

  const updateRecord = async (id: string, updates: Partial<AttendanceRecord>) => {
    const { error } = await supabase.from('attendance').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث السجل'); return false; }
    toast.success('تم تحديث السجل بنجاح');
    await fetchRecords();
    return true;
  };

  const deleteRecord = async (id: string) => {
    const { error } = await supabase.from('attendance').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف السجل'); return false; }
    toast.success('تم حذف السجل بنجاح');
    await fetchRecords();
    return true;
  };

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  return { records, loading, fetchRecords, addRecord, updateRecord, deleteRecord };
};
