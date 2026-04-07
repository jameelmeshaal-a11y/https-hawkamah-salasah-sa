import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Dependent {
  id: string;
  org_id: string | null;
  full_name: string;
  beneficiary_id: string | null;
  relationship: string | null;
  birth_date: string | null;
  gender: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useDependents = () => {
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDependents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('dependents').select('*').order('created_at', { ascending: false });
    if (error) toast.error('فشل في تحميل التابعين');
    setDependents((data || []) as Dependent[]);
    setLoading(false);
  }, []);

  const addDependent = async (dep: Partial<Dependent>) => {
    const { error } = await supabase.from('dependents').insert(dep as any);
    if (error) { toast.error('فشل في إضافة التابع'); return false; }
    toast.success('تم إضافة التابع بنجاح');
    await fetchDependents();
    return true;
  };

  const updateDependent = async (id: string, updates: Partial<Dependent>) => {
    const { error } = await supabase.from('dependents').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث التابع'); return false; }
    toast.success('تم تحديث التابع');
    await fetchDependents();
    return true;
  };

  const deleteDependent = async (id: string) => {
    const { error } = await supabase.from('dependents').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف التابع'); return false; }
    toast.success('تم حذف التابع');
    await fetchDependents();
    return true;
  };

  useEffect(() => { fetchDependents(); }, [fetchDependents]);

  return { dependents, loading, fetchDependents, addDependent, updateDependent, deleteDependent };
};
