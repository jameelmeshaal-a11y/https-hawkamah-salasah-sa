import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface MailMessage {
  id: string;
  org_id: string | null;
  sender_id: string;
  sender_name: string | null;
  recipient_id: string | null;
  recipient_name: string | null;
  subject: string;
  body: string | null;
  is_read: boolean;
  is_draft: boolean;
  is_archived: boolean;
  is_starred: boolean;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useMailMessages = (folder: 'inbox' | 'sent' | 'drafts' | 'archived' = 'inbox') => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    let query = supabase.from('mail_messages').select('*').order('created_at', { ascending: false });

    switch (folder) {
      case 'inbox':
        query = query.eq('recipient_id', user.id).eq('is_draft', false).eq('is_archived', false);
        break;
      case 'sent':
        query = query.eq('sender_id', user.id).eq('is_draft', false);
        break;
      case 'drafts':
        query = query.eq('sender_id', user.id).eq('is_draft', true);
        break;
      case 'archived':
        query = query.or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`).eq('is_archived', true);
        break;
    }

    const { data, error } = await query;
    if (error) toast.error('فشل في تحميل الرسائل');
    setMessages((data || []) as MailMessage[]);
    setLoading(false);
  }, [user, folder]);

  const sendMessage = async (msg: { recipient_id: string; recipient_name?: string; subject: string; body?: string }) => {
    if (!user) return false;
    const { error } = await supabase.from('mail_messages').insert({
      sender_id: user.id,
      sender_name: user.email,
      recipient_id: msg.recipient_id,
      recipient_name: msg.recipient_name || null,
      subject: msg.subject,
      body: msg.body || null,
      is_draft: false,
    } as any);
    if (error) { toast.error('فشل في إرسال الرسالة'); return false; }
    toast.success('تم إرسال الرسالة بنجاح');
    await fetchMessages();
    return true;
  };

  const saveDraft = async (msg: { recipient_id?: string; subject: string; body?: string }) => {
    if (!user) return false;
    const { error } = await supabase.from('mail_messages').insert({
      sender_id: user.id,
      sender_name: user.email,
      subject: msg.subject,
      body: msg.body || null,
      is_draft: true,
    } as any);
    if (error) { toast.error('فشل في حفظ المسودة'); return false; }
    toast.success('تم حفظ المسودة');
    await fetchMessages();
    return true;
  };

  const markAsRead = async (id: string) => {
    await supabase.from('mail_messages').update({ is_read: true } as any).eq('id', id);
    await fetchMessages();
  };

  const archiveMessage = async (id: string) => {
    await supabase.from('mail_messages').update({ is_archived: true } as any).eq('id', id);
    toast.success('تم أرشفة الرسالة');
    await fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from('mail_messages').delete().eq('id', id);
    if (error) { toast.error('فشل في حذف الرسالة'); return false; }
    toast.success('تم حذف الرسالة');
    await fetchMessages();
    return true;
  };

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  return { messages, loading, fetchMessages, sendMessage, saveDraft, markAsRead, archiveMessage, deleteMessage };
};
