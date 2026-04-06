import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Volunteer {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  skills: string | null;
  city: string | null;
  volunteer_hours: number | null;
  status: string;
  join_date: string | null;
  notes: string | null;
  created_at: string;
}

export const useVolunteers = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVolunteers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false });
    if (error) toast.error('فشل تحميل المتطوعين');
    else setVolunteers(data || []);
    setLoading(false);
  }, []);

  const addVolunteer = async (payload: { full_name: string } & Partial<Volunteer>) => {
    const { data, error } = await supabase.from('volunteers').insert([payload]).select().single();
    if (error) { toast.error('فشل إضافة المتطوع'); return null; }
    toast.success('تم إضافة المتطوع بنجاح');
    await fetchVolunteers();
    return data;
  };

  const updateVolunteer = async (id: string, updates: Partial<Volunteer>) => {
    const { error } = await supabase.from('volunteers').update(updates).eq('id', id);
    if (error) { toast.error('فشل تحديث المتطوع'); return false; }
    toast.success('تم تحديث المتطوع');
    await fetchVolunteers();
    return true;
  };

  const deleteVolunteer = async (id: string) => {
    const { error } = await supabase.from('volunteers').delete().eq('id', id);
    if (error) { toast.error('فشل حذف المتطوع'); return false; }
    toast.success('تم حذف المتطوع');
    await fetchVolunteers();
    return true;
  };

  useEffect(() => { fetchVolunteers(); }, [fetchVolunteers]);
  return { volunteers, loading, addVolunteer, updateVolunteer, deleteVolunteer, refetch: fetchVolunteers };
};
