import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Donor {
  id: string;
  full_name: string;
  donor_type: string;
  phone: string | null;
  email: string | null;
  city: string | null;
  total_donations: number | null;
  status: string;
  notes: string | null;
  created_at: string;
}

export const useDonors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('donors').select('*').order('created_at', { ascending: false });
    if (error) toast.error('فشل تحميل المتبرعين');
    else setDonors(data || []);
    setLoading(false);
  }, []);

  const addDonor = async (payload: Partial<Donor>) => {
    const { data, error } = await supabase.from('donors').insert([payload]).select().single();
    if (error) { toast.error('فشل إضافة المتبرع'); return null; }
    toast.success('تم إضافة المتبرع بنجاح');
    await fetchDonors();
    return data;
  };

  const updateDonor = async (id: string, updates: Partial<Donor>) => {
    const { error } = await supabase.from('donors').update(updates).eq('id', id);
    if (error) { toast.error('فشل تحديث المتبرع'); return false; }
    toast.success('تم تحديث المتبرع');
    await fetchDonors();
    return true;
  };

  const deleteDonor = async (id: string) => {
    const { error } = await supabase.from('donors').delete().eq('id', id);
    if (error) { toast.error('فشل حذف المتبرع'); return false; }
    toast.success('تم حذف المتبرع');
    await fetchDonors();
    return true;
  };

  useEffect(() => { fetchDonors(); }, [fetchDonors]);
  return { donors, loading, addDonor, updateDonor, deleteDonor, refetch: fetchDonors };
};
