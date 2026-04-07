import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Project {
  id: string;
  org_id: string | null;
  name: string;
  description: string | null;
  manager_id: string | null;
  manager_name: string | null;
  budget: number;
  spent_amount: number;
  start_date: string | null;
  end_date: string | null;
  status: string;
  completion_percentage: number;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export const useProjects = (filters?: { status?: string }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (filters?.status) query = query.eq('status', filters.status);
    const { data, error } = await query;
    if (error) toast.error('فشل في تحميل المشاريع');
    setProjects((data || []) as Project[]);
    setLoading(false);
  }, [filters?.status]);

  const addProject = async (project: Partial<Project>) => {
    const { error } = await supabase.from('projects').insert(project as any);
    if (error) { toast.error('فشل في إنشاء المشروع'); return false; }
    toast.success('تم إنشاء المشروع بنجاح');
    await fetchProjects();
    return true;
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { error } = await supabase.from('projects').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث المشروع'); return false; }
    toast.success('تم تحديث المشروع');
    await fetchProjects();
    return true;
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف المشروع'); return false; }
    toast.success('تم حذف المشروع');
    await fetchProjects();
    return true;
  };

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  return { projects, loading, fetchProjects, addProject, updateProject, deleteProject };
};
