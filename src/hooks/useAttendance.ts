import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

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
  employee_name?: string | null;
  employee_department?: string | null;
}

export const useAttendance = () => {
  const { user, isAdmin } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentEmployeeId, setCurrentEmployeeId] = useState<string | null>(null);
  const [resolvingEmployee, setResolvingEmployee] = useState(false);

  const ensureCurrentEmployeeId = useCallback(async () => {
    if (!user) {
      setCurrentEmployeeId(null);
      return null;
    }

    setResolvingEmployee(true);
    const { data, error } = await supabase.rpc('ensure_employee_for_current_user');

    if (error || !data) {
      toast.error('تعذر تهيئة ملف الموظف المرتبط بالحساب');
      setResolvingEmployee(false);
      return null;
    }

    setCurrentEmployeeId(data);
    setResolvingEmployee(false);
    return data as string;
  }, [user]);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('attendance')
      .select('*, employees:employee_id(full_name, department)')
      .order('date', { ascending: false })
      .limit(500);
    if (error) {
      toast.error('فشل في تحميل سجلات الحضور');
      setLoading(false);
      return;
    }
    const mapped: AttendanceRecord[] = (data || []).map((r: any) => ({
      ...r,
      employee_name: r.employees?.full_name ?? null,
      employee_department: r.employees?.department ?? null,
    }));
    setRecords(mapped);
    setLoading(false);
  }, []);

  // Self check-in / check-out
  const recordSelfAttendance = async () => {
    const employeeId = currentEmployeeId || await ensureCurrentEmployeeId();
    if (!employeeId) {
      toast.error('لا يوجد ملف موظف مرتبط بهذا الحساب');
      return false;
    }
    return await recordAttendanceForEmployee(employeeId);
  };

  // Proxy check-in / check-out (admin/manager) — also used by self
  const recordAttendanceForEmployee = async (employeeId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    // Look for today's record (manager case may not have it in records)
    const { data: existing, error: existingErr } = await supabase
      .from('attendance')
      .select('*')
      .eq('employee_id', employeeId)
      .eq('date', todayStr)
      .maybeSingle();

    if (existingErr) {
      toast.error('فشل في قراءة سجل اليوم');
      return false;
    }

    const nowIso = new Date().toISOString();

    if (!existing) {
      // First insertion → check-in
      const { error } = await supabase.from('attendance').insert({
        employee_id: employeeId,
        date: todayStr,
        check_in: nowIso,
        status: 'present',
      } as any);
      if (error) { toast.error('فشل في تسجيل الحضور'); return false; }
      toast.success('تم تسجيل الحضور بنجاح');
      await fetchRecords();
      return true;
    }

    if (existing.check_in && !existing.check_out) {
      // Check-out
      const { error } = await supabase
        .from('attendance')
        .update({ check_out: nowIso })
        .eq('id', existing.id);
      if (error) { toast.error('فشل في تسجيل الانصراف'); return false; }
      toast.success('تم تسجيل الانصراف بنجاح');
      await fetchRecords();
      return true;
    }

    toast.info('تم تسجيل الحضور والانصراف لهذا اليوم بالفعل');
    return false;
  };

  const addRecord = async (record: Partial<AttendanceRecord>) => {
    const employeeId = record.employee_id || currentEmployeeId || await ensureCurrentEmployeeId();
    if (!employeeId) {
      toast.error('لا يوجد ملف موظف مرتبط بهذا الحساب');
      return false;
    }

    const { error } = await supabase.from('attendance').insert({
      ...record,
      employee_id: employeeId,
    } as any);

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
  useEffect(() => {
    if (!user) {
      setCurrentEmployeeId(null);
      return;
    }
    void ensureCurrentEmployeeId();
  }, [user, ensureCurrentEmployeeId]);

  return {
    records,
    loading,
    currentEmployeeId,
    resolvingEmployee,
    isAdmin,
    fetchRecords,
    addRecord,
    updateRecord,
    deleteRecord,
    recordSelfAttendance,
    recordAttendanceForEmployee,
  };
};
