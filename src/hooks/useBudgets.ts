import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Budget {
  id: string;
  org_id: string | null;
  name: string;
  fiscal_year: number;
  total_amount: number;
  spent_amount: number;
  remaining_amount: number;
  status: string;
  approved_by: string | null;
  approved_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('budgets').select('*').order('fiscal_year', { ascending: false });
    if (error) toast.error('فشل في تحميل الميزانيات');
    setBudgets((data || []) as Budget[]);
    setLoading(false);
  }, []);

  const addBudget = async (budget: Partial<Budget>) => {
    const { error } = await supabase.from('budgets').insert(budget as any);
    if (error) { toast.error('فشل في إنشاء الميزانية'); return false; }
    toast.success('تم إنشاء الميزانية بنجاح');
    await fetchBudgets();
    return true;
  };

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    const { error } = await supabase.from('budgets').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث الميزانية'); return false; }
    toast.success('تم تحديث الميزانية');
    await fetchBudgets();
    return true;
  };

  const deleteBudget = async (id: string) => {
    const { error } = await supabase.from('budgets').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف الميزانية'); return false; }
    toast.success('تم حذف الميزانية');
    await fetchBudgets();
    return true;
  };

  useEffect(() => { fetchBudgets(); }, [fetchBudgets]);

  return { budgets, loading, fetchBudgets, addBudget, updateBudget, deleteBudget };
};
