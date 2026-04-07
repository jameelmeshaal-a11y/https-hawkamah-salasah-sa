import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Shareholder {
  id: string;
  org_id: string | null;
  full_name: string;
  phone: string | null;
  email: string | null;
  national_id_hash: string | null;
  shares_count: number;
  share_value: number;
  total_value: number;
  status: string;
  join_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useShareholders = () => {
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShareholders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('shareholders').select('*').order('created_at', { ascending: false });
    if (error) toast.error('فشل في تحميل المساهمين');
    setShareholders((data || []) as Shareholder[]);
    setLoading(false);
  }, []);

  const addShareholder = async (sh: Partial<Shareholder>) => {
    const { error } = await supabase.from('shareholders').insert(sh as any);
    if (error) { toast.error('فشل في إضافة المساهم'); return false; }
    toast.success('تم إضافة المساهم بنجاح');
    await fetchShareholders();
    return true;
  };

  const updateShareholder = async (id: string, updates: Partial<Shareholder>) => {
    const { error } = await supabase.from('shareholders').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث المساهم'); return false; }
    toast.success('تم تحديث المساهم');
    await fetchShareholders();
    return true;
  };

  const deleteShareholder = async (id: string) => {
    const { error } = await supabase.from('shareholders').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف المساهم'); return false; }
    toast.success('تم حذف المساهم');
    await fetchShareholders();
    return true;
  };

  useEffect(() => { fetchShareholders(); }, [fetchShareholders]);

  return { shareholders, loading, fetchShareholders, addShareholder, updateShareholder, deleteShareholder };
};
