import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  org_id: string | null;
  transaction_number: string;
  title: string;
  description: string | null;
  from_department: string | null;
  to_department: string | null;
  sender_id: string | null;
  sender_name: string | null;
  status: string;
  priority: string;
  attachments: any;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useTransactions = (filters?: { status?: string }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('transactions').select('*').order('created_at', { ascending: false }).limit(500);
    if (filters?.status) query = query.eq('status', filters.status);
    const { data, error } = await query;
    if (error) toast.error('فشل في تحميل المعاملات');
    setTransactions((data || []) as Transaction[]);
    setLoading(false);
  }, [filters?.status]);

  const addTransaction = async (txn: Partial<Transaction>) => {
    const { error } = await supabase.from('transactions').insert(txn as any);
    if (error) { toast.error('فشل في إنشاء المعاملة'); return false; }
    toast.success('تم إنشاء المعاملة بنجاح');
    await fetchTransactions();
    return true;
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    const { error } = await supabase.from('transactions').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث المعاملة'); return false; }
    toast.success('تم تحديث المعاملة');
    await fetchTransactions();
    return true;
  };

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف المعاملة'); return false; }
    toast.success('تم حذف المعاملة');
    await fetchTransactions();
    return true;
  };

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  return { transactions, loading, fetchTransactions, addTransaction, updateTransaction, deleteTransaction };
};
