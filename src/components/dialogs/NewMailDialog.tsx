import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NewMailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const NewMailDialog = ({ open, onOpenChange, onSuccess }: NewMailDialogProps) => {
  const { user, profile } = useAuth();
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("يجب تسجيل الدخول لإرسال الرسائل");
      return;
    }
    if (!subject.trim()) {
      toast.error("الرجاء إدخال موضوع الرسالة");
      return;
    }
    if (!recipientName.trim()) {
      toast.error("الرجاء إدخال المستلم");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("mail_messages").insert({
      sender_id: user.id,
      sender_name: profile?.full_name || null,
      recipient_name: recipientName,
      subject,
      body,
      is_draft: false,
      is_read: false,
    } as any);
    setSubmitting(false);
    if (error) {
      toast.error("فشل في إرسال الرسالة: " + error.message);
      return;
    }
    toast.success("تم إرسال الرسالة بنجاح");
    setRecipientName("");
    setSubject("");
    setBody("");
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>رسالة جديدة</DialogTitle>
          <DialogDescription>إنشاء وإرسال رسالة بريد داخلي</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">المستلم <span className="text-destructive">*</span></Label>
            <Input id="recipient" value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="اسم المستلم" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">الموضوع <span className="text-destructive">*</span></Label>
            <Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="موضوع الرسالة" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">المحتوى</Label>
            <Textarea id="body" value={body} onChange={e => setBody(e.target.value)} placeholder="نص الرسالة..." rows={8} />
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
              إرسال
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewMailDialog;
