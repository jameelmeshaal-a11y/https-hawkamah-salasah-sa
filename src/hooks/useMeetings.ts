import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Meeting {
  id: string;
  title: string;
  meeting_type: string;
  meeting_date: string;
  location: string | null;
  agenda: string | null;
  minutes: string | null;
  attendees_count: number | null;
  status: string;
  hijri_date: string | null;
  created_at: string;
}

export const useMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('meetings').select('*').order('meeting_date', { ascending: false });
    if (error) toast.error('فشل تحميل الاجتماعات');
    else setMeetings(data || []);
    setLoading(false);
  }, []);

  const addMeeting = async (payload: Partial<Meeting>) => {
    const { data, error } = await supabase.from('meetings').insert([payload]).select().single();
    if (error) { toast.error('فشل إضافة الاجتماع'); return null; }
    toast.success('تم إضافة الاجتماع بنجاح');
    await fetchMeetings();
    return data;
  };

  const updateMeeting = async (id: string, updates: Partial<Meeting>) => {
    const { error } = await supabase.from('meetings').update(updates).eq('id', id);
    if (error) { toast.error('فشل تحديث الاجتماع'); return false; }
    toast.success('تم تحديث الاجتماع');
    await fetchMeetings();
    return true;
  };

  const deleteMeeting = async (id: string) => {
    const { error } = await supabase.from('meetings').delete().eq('id', id);
    if (error) { toast.error('فشل حذف الاجتماع'); return false; }
    toast.success('تم حذف الاجتماع');
    await fetchMeetings();
    return true;
  };

  useEffect(() => { fetchMeetings(); }, [fetchMeetings]);
  return { meetings, loading, addMeeting, updateMeeting, deleteMeeting, refetch: fetchMeetings };
};
