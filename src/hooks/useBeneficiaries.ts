import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Beneficiary {
  id: string;
  full_name: string;
  national_id_hash: string | null;
  phone: string | null;
  city: string | null;
  category: string | null;
  status: string;
  created_at: string;
}

export const useBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBeneficiaries = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('beneficiaries').select('*').order('created_at', { ascending: false });
    if (error) toast.error('فشل تحميل المستفيدين');
    else setBeneficiaries(data || []);
    setLoading(false);
  }, []);

  const addBeneficiary = async (payload: { full_name: string } & Partial<Beneficiary>) => {
    const { data, error } = await supabase.from('beneficiaries').insert([payload]).select().single();
    if (error) { toast.error('فشل إضافة المستفيد'); return null; }
    toast.success('تم إضافة المستفيد بنجاح');
    await fetchBeneficiaries();
    return data;
  };

  const updateBeneficiary = async (id: string, updates: Partial<Beneficiary>) => {
    const { error } = await supabase.from('beneficiaries').update(updates).eq('id', id);
    if (error) { toast.error('فشل تحديث المستفيد'); return false; }
    toast.success('تم تحديث المستفيد');
    await fetchBeneficiaries();
    return true;
  };

  const deleteBeneficiary = async (id: string) => {
    const { error } = await supabase.from('beneficiaries').delete().eq('id', id);
    if (error) { toast.error('فشل حذف المستفيد'); return false; }
    toast.success('تم حذف المستفيد');
    await fetchBeneficiaries();
    return true;
  };

  useEffect(() => { fetchBeneficiaries(); }, [fetchBeneficiaries]);
  return { beneficiaries, loading, addBeneficiary, updateBeneficiary, deleteBeneficiary, refetch: fetchBeneficiaries };
};
