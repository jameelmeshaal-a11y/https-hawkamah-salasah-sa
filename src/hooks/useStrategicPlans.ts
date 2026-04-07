import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface StrategicPlan {
  id: string;
  org_id: string | null;
  name: string;
  vision: string | null;
  mission: string | null;
  start_year: number;
  end_year: number;
  status: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useStrategicPlans = () => {
  const [plans, setPlans] = useState<StrategicPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('strategic_plans').select('*').order('start_year', { ascending: false });
    if (error) toast.error('فشل في تحميل الخطط الاستراتيجية');
    setPlans((data || []) as StrategicPlan[]);
    setLoading(false);
  }, []);

  const addPlan = async (plan: Partial<StrategicPlan>) => {
    const { error } = await supabase.from('strategic_plans').insert(plan as any);
    if (error) { toast.error('فشل في إنشاء الخطة'); return false; }
    toast.success('تم إنشاء الخطة بنجاح');
    await fetchPlans();
    return true;
  };

  const updatePlan = async (id: string, updates: Partial<StrategicPlan>) => {
    const { error } = await supabase.from('strategic_plans').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث الخطة'); return false; }
    toast.success('تم تحديث الخطة');
    await fetchPlans();
    return true;
  };

  const deletePlan = async (id: string) => {
    const { error } = await supabase.from('strategic_plans').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف الخطة'); return false; }
    toast.success('تم حذف الخطة');
    await fetchPlans();
    return true;
  };

  useEffect(() => { fetchPlans(); }, [fetchPlans]);

  return { plans, loading, fetchPlans, addPlan, updatePlan, deletePlan };
};
