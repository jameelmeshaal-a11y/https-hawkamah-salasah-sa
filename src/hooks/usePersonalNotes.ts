import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface PersonalNote {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  priority: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export const usePersonalNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('personal_notes')
      .select('*')
      .eq('user_id', user.id)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
    if (error) toast.error('فشل في تحميل المذكرات');
    setNotes((data || []) as PersonalNote[]);
    setLoading(false);
  }, [user]);

  const addNote = async (note: { title: string; content?: string; priority?: string }) => {
    if (!user) return false;
    const { error } = await supabase.from('personal_notes').insert({
      user_id: user.id,
      title: note.title,
      content: note.content || null,
      priority: note.priority || 'normal',
    } as any);
    if (error) { toast.error('فشل في حفظ المذكرة'); return false; }
    toast.success('تم حفظ المذكرة بنجاح');
    await fetchNotes();
    return true;
  };

  const updateNote = async (id: string, updates: Partial<PersonalNote>) => {
    const { error } = await supabase.from('personal_notes').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث المذكرة'); return false; }
    toast.success('تم تحديث المذكرة');
    await fetchNotes();
    return true;
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase.from('personal_notes').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف المذكرة'); return false; }
    toast.success('تم حذف المذكرة');
    await fetchNotes();
    return true;
  };

  const togglePin = async (id: string, currentPinned: boolean) => {
    return updateNote(id, { is_pinned: !currentPinned } as any);
  };

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  return { notes, loading, fetchNotes, addNote, updateNote, deleteNote, togglePin };
};
