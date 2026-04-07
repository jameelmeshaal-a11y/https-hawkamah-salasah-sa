import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Guardian {
  id: string;
  org_id: string | null;
  full_name: string;
  national_id_hash: string | null;
  phone: string | null;
  email: string | null;
  beneficiary_id: string | null;
  relationship: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useGuardians = () => {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuardians = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('guardians').select('*').order('created_at', { ascending: false });
    if (error) toast.error('فشل في تحميل الأوصياء');
    setGuardians((data || []) as Guardian[]);
    setLoading(false);
  }, []);

  const addGuardian = async (guardian: Partial<Guardian>) => {
    const { error } = await supabase.from('guardians').insert(guardian as any);
    if (error) { toast.error('فشل في إضافة الوصي'); return false; }
    toast.success('تم إضافة الوصي بنجاح');
    await fetchGuardians();
    return true;
  };

  const updateGuardian = async (id: string, updates: Partial<Guardian>) => {
    const { error } = await supabase.from('guardians').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث الوصي'); return false; }
    toast.success('تم تحديث الوصي');
    await fetchGuardians();
    return true;
  };

  const deleteGuardian = async (id: string) => {
    const { error } = await supabase.from('guardians').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف الوصي'); return false; }
    toast.success('تم حذف الوصي');
    await fetchGuardians();
    return true;
  };

  useEffect(() => { fetchGuardians(); }, [fetchGuardians]);

  return { guardians, loading, fetchGuardians, addGuardian, updateGuardian, deleteGuardian };
};
