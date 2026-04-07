import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Indicator {
  id: string;
  org_id: string | null;
  plan_id: string | null;
  name: string;
  description: string | null;
  type: string;
  target_value: number;
  actual_value: number;
  unit: string | null;
  owner_department: string | null;
  measurement_frequency: string | null;
  status: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useIndicators = (filters?: { type?: string; plan_id?: string }) => {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIndicators = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('indicators').select('*').order('created_at', { ascending: false });
    if (filters?.type) query = query.eq('type', filters.type);
    if (filters?.plan_id) query = query.eq('plan_id', filters.plan_id);
    const { data, error } = await query;
    if (error) toast.error('فشل في تحميل المؤشرات');
    setIndicators((data || []) as Indicator[]);
    setLoading(false);
  }, [filters?.type, filters?.plan_id]);

  const addIndicator = async (indicator: Partial<Indicator>) => {
    const { error } = await supabase.from('indicators').insert(indicator as any);
    if (error) { toast.error('فشل في إضافة المؤشر'); return false; }
    toast.success('تم إضافة المؤشر بنجاح');
    await fetchIndicators();
    return true;
  };

  const updateIndicator = async (id: string, updates: Partial<Indicator>) => {
    const { error } = await supabase.from('indicators').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث المؤشر'); return false; }
    toast.success('تم تحديث المؤشر');
    await fetchIndicators();
    return true;
  };

  const deleteIndicator = async (id: string) => {
    const { error } = await supabase.from('indicators').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف المؤشر'); return false; }
    toast.success('تم حذف المؤشر');
    await fetchIndicators();
    return true;
  };

  useEffect(() => { fetchIndicators(); }, [fetchIndicators]);

  return { indicators, loading, fetchIndicators, addIndicator, updateIndicator, deleteIndicator };
};
