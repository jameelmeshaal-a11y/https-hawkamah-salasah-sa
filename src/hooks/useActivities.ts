import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Activity {
  id: string;
  org_id: string | null;
  project_id: string | null;
  name: string;
  description: string | null;
  assigned_to: string | null;
  assigned_to_name: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  completion_percentage: number;
  budget: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useActivities = (projectId?: string) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('activities').select('*').order('created_at', { ascending: false });
    if (projectId) query = query.eq('project_id', projectId);
    const { data, error } = await query;
    if (error) toast.error('فشل في تحميل الأنشطة');
    setActivities((data || []) as Activity[]);
    setLoading(false);
  }, [projectId]);

  const addActivity = async (activity: Partial<Activity>) => {
    const { error } = await supabase.from('activities').insert(activity as any);
    if (error) { toast.error('فشل في إضافة النشاط'); return false; }
    toast.success('تم إضافة النشاط بنجاح');
    await fetchActivities();
    return true;
  };

  const updateActivity = async (id: string, updates: Partial<Activity>) => {
    const { error } = await supabase.from('activities').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث النشاط'); return false; }
    toast.success('تم تحديث النشاط');
    await fetchActivities();
    return true;
  };

  const deleteActivity = async (id: string) => {
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف النشاط'); return false; }
    toast.success('تم حذف النشاط');
    await fetchActivities();
    return true;
  };

  useEffect(() => { fetchActivities(); }, [fetchActivities]);

  return { activities, loading, fetchActivities, addActivity, updateActivity, deleteActivity };
};
