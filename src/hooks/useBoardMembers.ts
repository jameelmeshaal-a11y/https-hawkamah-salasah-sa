import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface BoardMember {
  id: string;
  full_name: string;
  position: string;
  phone: string | null;
  email: string | null;
  national_id_hash: string | null;
  appointment_date: string | null;
  end_date: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

export const useBoardMembers = () => {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('board_members').select('*').order('created_at', { ascending: false });
    if (error) toast.error('فشل تحميل أعضاء مجلس الإدارة');
    else setMembers(data || []);
    setLoading(false);
  }, []);

  const addMember = async (payload: { full_name: string } & Partial<BoardMember>) => {
    const { data, error } = await supabase.from('board_members').insert([payload]).select().single();
    if (error) { toast.error('فشل إضافة العضو'); return null; }
    toast.success('تم إضافة العضو بنجاح');
    await fetchMembers();
    return data;
  };

  const updateMember = async (id: string, updates: Partial<BoardMember>) => {
    const { error } = await supabase.from('board_members').update(updates).eq('id', id);
    if (error) { toast.error('فشل تحديث العضو'); return false; }
    toast.success('تم تحديث العضو');
    await fetchMembers();
    return true;
  };

  const deleteMember = async (id: string) => {
    const { error } = await supabase.from('board_members').delete().eq('id', id);
    if (error) { toast.error('فشل حذف العضو'); return false; }
    toast.success('تم حذف العضو');
    await fetchMembers();
    return true;
  };

  useEffect(() => { fetchMembers(); }, [fetchMembers]);
  return { members, loading, addMember, updateMember, deleteMember, refetch: fetchMembers };
};
