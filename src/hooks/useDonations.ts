import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Donation {
  id: string;
  donor_id: string | null;
  amount: number;
  donation_date: string;
  hijri_date: string | null;
  payment_method: string | null;
  purpose: string | null;
  receipt_number: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  donors?: { full_name: string } | null;
}

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('donations').select('*, donors(full_name)').order('created_at', { ascending: false });
    if (error) toast.error('فشل تحميل التبرعات');
    else setDonations(data || []);
    setLoading(false);
  }, []);

  const addDonation = async (payload: Partial<Donation>) => {
    const { data, error } = await supabase.from('donations').insert([payload]).select().single();
    if (error) { toast.error('فشل إضافة التبرع'); return null; }
    toast.success('تم تسجيل التبرع بنجاح');
    await fetchDonations();
    return data;
  };

  useEffect(() => { fetchDonations(); }, [fetchDonations]);
  return { donations, loading, addDonation, refetch: fetchDonations };
};
