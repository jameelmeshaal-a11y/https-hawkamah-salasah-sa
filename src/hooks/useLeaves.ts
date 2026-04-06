import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Leave {
  id: string;
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days_count: number | null;
  reason: string | null;
  status: string;
  approved_by: string | null;
  approved_at: string | null;
  notes: string | null;
  created_at: string;
  employees?: { full_name: string; department: string | null } | null;
}

export const useLeaves = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leaves')
      .select('*, employees(full_name, department)')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('فشل تحميل الإجازات');
    } else {
      setLeaves(data || []);
    }
    setLoading(false);
  }, []);

  const addLeave = async (payload: {
    employee_id: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason?: string;
  }) => {
    const start = new Date(payload.start_date);
    const end = new Date(payload.end_date);
    const days_count = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const { data, error } = await supabase
      .from('leaves')
      .insert([{ ...payload, days_count, status: 'pending' }])
      .select()
      .single();
    if (error) {
      toast.error('فشل إضافة طلب الإجازة');
      return null;
    }
    toast.success('تم تقديم طلب الإجازة بنجاح');
    await fetchLeaves();
    return data;
  };

  const approveLeave = async (id: string) => {
    const { error } = await supabase
      .from('leaves')
      .update({ status: 'approved', approved_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      toast.error('فشل اعتماد الإجازة');
      return false;
    }
    toast.success('تم اعتماد الإجازة');
    await fetchLeaves();
    return true;
  };

  const rejectLeave = async (id: string, notes?: string) => {
    const { error } = await supabase
      .from('leaves')
      .update({ status: 'rejected', notes })
      .eq('id', id);
    if (error) {
      toast.error('فشل رفض الإجازة');
      return false;
    }
    toast.success('تم رفض طلب الإجازة');
    await fetchLeaves();
    return true;
  };

  useEffect(() => { fetchLeaves(); }, [fetchLeaves]);
  return { leaves, loading, addLeave, approveLeave, rejectLeave, refetch: fetchLeaves };
};
