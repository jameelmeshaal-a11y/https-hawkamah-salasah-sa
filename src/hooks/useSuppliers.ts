import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Supplier {
  id: string;
  org_id: string | null;
  name: string;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  category: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('suppliers').select('*').order('created_at', { ascending: false });
    if (error) toast.error('فشل في تحميل الموردين');
    setSuppliers((data || []) as Supplier[]);
    setLoading(false);
  }, []);

  const addSupplier = async (supplier: Partial<Supplier>) => {
    const { error } = await supabase.from('suppliers').insert(supplier as any);
    if (error) { toast.error('فشل في إضافة المورد'); return false; }
    toast.success('تم إضافة المورد بنجاح');
    await fetchSuppliers();
    return true;
  };

  const updateSupplier = async (id: string, updates: Partial<Supplier>) => {
    const { error } = await supabase.from('suppliers').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث المورد'); return false; }
    toast.success('تم تحديث المورد');
    await fetchSuppliers();
    return true;
  };

  const deleteSupplier = async (id: string) => {
    const { error } = await supabase.from('suppliers').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف المورد'); return false; }
    toast.success('تم حذف المورد');
    await fetchSuppliers();
    return true;
  };

  useEffect(() => { fetchSuppliers(); }, [fetchSuppliers]);

  return { suppliers, loading, fetchSuppliers, addSupplier, updateSupplier, deleteSupplier };
};
