import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Employee {
  id: string;
  employee_number: string | null;
  full_name: string;
  national_id: string | null;
  email: string | null;
  phone: string | null;
  department: string | null;
  position: string | null;
  hire_date: string | null;
  salary: number | null;
  status: string;
  created_at: string;
}

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('فشل تحميل الموظفين');
    } else {
      setEmployees(data || []);
    }
    setLoading(false);
  }, []);

  const addEmployee = async (payload: Omit<Employee, 'id' | 'created_at'>) => {
    const employee_number = `EMP-${Date.now().toString().slice(-6)}`;
    const { data, error } = await supabase
      .from('employees')
      .insert([{ ...payload, employee_number }])
      .select()
      .single();
    if (error) {
      toast.error('فشل إضافة الموظف');
      return null;
    }
    toast.success('تم إضافة الموظف بنجاح');
    await fetchEmployees();
    return data;
  };

  const updateEmployee = async (id: string, updates: Partial<Employee>) => {
    const { error } = await supabase.from('employees').update(updates).eq('id', id);
    if (error) {
      toast.error('فشل تحديث بيانات الموظف');
      return false;
    }
    toast.success('تم تحديث بيانات الموظف');
    await fetchEmployees();
    return true;
  };

  const deleteEmployee = async (id: string) => {
    const { error } = await supabase.from('employees').delete().eq('id', id);
    if (error) {
      toast.error('فشل حذف الموظف');
      return false;
    }
    toast.success('تم حذف الموظف');
    await fetchEmployees();
    return true;
  };

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);
  return { employees, loading, addEmployee, updateEmployee, deleteEmployee, refetch: fetchEmployees };
};
