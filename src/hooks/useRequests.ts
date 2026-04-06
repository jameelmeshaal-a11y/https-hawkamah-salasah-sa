import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export interface RequestRecord {
  id: string;
  title: string;
  description: string | null;
  request_type: string;
  status: string;
  priority: string;
  submitter_id: string | null;
  submitter_name: string | null;
  assigned_to: string | null;
  notes: string | null;
  hijri_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useRequests = (typeFilter?: string) => {
  const [requests, setRequests] = useState<RequestRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('requests').select('*').order('created_at', { ascending: false });
    if (typeFilter) query = query.eq('request_type', typeFilter);
    const { data, error } = await query;
    if (error) {
      toast.error('فشل تحميل الطلبات');
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  }, [typeFilter]);

  const addRequest = async (payload: {
    title: string;
    description?: string;
    request_type: string;
    priority?: string;
  }) => {
    const { data, error } = await supabase
      .from('requests')
      .insert([{
        ...payload,
        submitter_id: user?.id || null,
        submitter_name: profile?.full_name || null,
        status: 'pending',
        priority: payload.priority || 'medium',
      }])
      .select()
      .single();
    if (error) {
      toast.error('فشل إضافة الطلب');
      return null;
    }
    toast.success('تم إضافة الطلب بنجاح');
    await fetchRequests();
    return data;
  };

  const updateRequest = async (id: string, updates: Partial<RequestRecord>) => {
    const { error } = await supabase.from('requests').update(updates).eq('id', id);
    if (error) {
      toast.error('فشل تحديث الطلب');
      return false;
    }
    toast.success('تم تحديث الطلب بنجاح');
    await fetchRequests();
    return true;
  };

  const deleteRequest = async (id: string) => {
    const { error } = await supabase.from('requests').delete().eq('id', id);
    if (error) {
      toast.error('فشل حذف الطلب');
      return false;
    }
    toast.success('تم حذف الطلب');
    await fetchRequests();
    return true;
  };

  useEffect(() => { fetchRequests(); }, [fetchRequests]);
  return { requests, loading, addRequest, updateRequest, deleteRequest, refetch: fetchRequests };
};
