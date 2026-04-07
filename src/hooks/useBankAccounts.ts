import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface BankAccount {
  id: string;
  org_id: string | null;
  bank_name: string;
  account_number: string;
  iban: string | null;
  currency: string | null;
  balance: number;
  account_type: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useBankAccounts = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('bank_accounts').select('*').order('bank_name', { ascending: true });
    if (error) toast.error('فشل في تحميل الحسابات البنكية');
    setAccounts((data || []) as BankAccount[]);
    setLoading(false);
  }, []);

  const addAccount = async (account: Partial<BankAccount>) => {
    const { error } = await supabase.from('bank_accounts').insert(account as any);
    if (error) { toast.error('فشل في إضافة الحساب'); return false; }
    toast.success('تم إضافة الحساب بنجاح');
    await fetchAccounts();
    return true;
  };

  const updateAccount = async (id: string, updates: Partial<BankAccount>) => {
    const { error } = await supabase.from('bank_accounts').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث الحساب'); return false; }
    toast.success('تم تحديث الحساب');
    await fetchAccounts();
    return true;
  };

  const deleteAccount = async (id: string) => {
    const { error } = await supabase.from('bank_accounts').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف الحساب'); return false; }
    toast.success('تم حذف الحساب');
    await fetchAccounts();
    return true;
  };

  useEffect(() => { fetchAccounts(); }, [fetchAccounts]);

  return { accounts, loading, fetchAccounts, addAccount, updateAccount, deleteAccount };
};
