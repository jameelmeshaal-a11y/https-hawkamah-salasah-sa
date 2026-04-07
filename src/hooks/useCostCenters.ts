import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CostCenter {
  id: string;
  org_id: string | null;
  name: string;
  code: string;
  parent_id: string | null;
  budget: number;
  spent_amount: number;
  is_active: boolean;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useCostCenters = () => {
  const [costCenters, setCostCenters] = useState<CostCenter[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCostCenters = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('cost_centers').select('*').order('code', { ascending: true });
    if (error) toast.error('فشل في تحميل مراكز التكلفة');
    setCostCenters((data || []) as CostCenter[]);
    setLoading(false);
  }, []);

  const addCostCenter = async (cc: Partial<CostCenter>) => {
    const { error } = await supabase.from('cost_centers').insert(cc as any);
    if (error) { toast.error('فشل في إضافة مركز التكلفة'); return false; }
    toast.success('تم إضافة مركز التكلفة بنجاح');
    await fetchCostCenters();
    return true;
  };

  const updateCostCenter = async (id: string, updates: Partial<CostCenter>) => {
    const { error } = await supabase.from('cost_centers').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث مركز التكلفة'); return false; }
    toast.success('تم تحديث مركز التكلفة');
    await fetchCostCenters();
    return true;
  };

  const deleteCostCenter = async (id: string) => {
    const { error } = await supabase.from('cost_centers').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف مركز التكلفة'); return false; }
    toast.success('تم حذف مركز التكلفة');
    await fetchCostCenters();
    return true;
  };

  useEffect(() => { fetchCostCenters(); }, [fetchCostCenters]);

  return { costCenters, loading, fetchCostCenters, addCostCenter, updateCostCenter, deleteCostCenter };
};
