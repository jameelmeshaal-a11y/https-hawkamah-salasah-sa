import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Task {
  id: string;
  org_id: string | null;
  title: string;
  description: string | null;
  assigned_to: string | null;
  assigned_to_name: string | null;
  created_by: string | null;
  department: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useTasks = (filters?: { status?: string; department?: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('tasks').select('*').order('created_at', { ascending: false }).limit(500);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.department) query = query.eq('department', filters.department);
    const { data, error } = await query;
    if (error) toast.error('فشل في تحميل المهام');
    setTasks((data || []) as Task[]);
    setLoading(false);
  }, [filters?.status, filters?.department]);

  const addTask = async (task: Partial<Task>) => {
    const { error } = await supabase.from('tasks').insert(task as any);
    if (error) { toast.error('فشل في إنشاء المهمة'); return false; }
    toast.success('تم إنشاء المهمة بنجاح');
    await fetchTasks();
    return true;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { error } = await supabase.from('tasks').update(updates as any).eq('id', id);
    if (error) { toast.error('فشل في تحديث المهمة'); return false; }
    toast.success('تم تحديث المهمة');
    await fetchTasks();
    return true;
  };

  const completeTask = async (id: string) => {
    return updateTask(id, { status: 'completed', completed_at: new Date().toISOString() } as any);
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف المهمة'); return false; }
    toast.success('تم حذف المهمة');
    await fetchTasks();
    return true;
  };

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  return { tasks, loading, fetchTasks, addTask, updateTask, completeTask, deleteTask };
};
