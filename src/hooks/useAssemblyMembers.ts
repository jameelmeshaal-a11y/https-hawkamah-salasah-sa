import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AssemblyMember {
  id: string;
  org_id: string | null;
  full_name: string;
  membership_number: string | null;
  phone: string | null;
  email: string | null;
  national_id_hash: string | null;
  status: string;
  join_date: string | null;
  membership_type: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useAssemblyMembers = () => {
  const [members, setMembers] = useState<AssemblyMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('assembly_members').select('*').order('created_at', { ascending: false });
    if (error) toast.error('فشل في تحميل أعضاء الجمعية');
    setMembers((data || []) as AssemblyMember[]);
    setLoading(false);
  }, []);

  const addMember = async (member: Partial<AssemblyMember>) => {
    const { error } = await supabase.from('assembly_members').insert(member as any);
    if (error) { toast.error('فشل في إضافة العضو'); return false; }
    toast.success('تم إضافة العضو بنجاح');
    await fetchMembers();
    return true;
  };

  const updateMember = async (id: string, updates: Partial<AssemblyMember>) => {
    const { error } = await supabase.from('assembly_members').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث العضو'); return false; }
    toast.success('تم تحديث العضو');
    await fetchMembers();
    return true;
  };

  const deleteMember = async (id: string) => {
    const { error } = await supabase.from('assembly_members').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف العضو'); return false; }
    toast.success('تم حذف العضو');
    await fetchMembers();
    return true;
  };

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  return { members, loading, fetchMembers, addMember, updateMember, deleteMember };
};
