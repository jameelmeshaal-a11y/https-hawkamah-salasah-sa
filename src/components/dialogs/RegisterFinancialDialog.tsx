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

interface RegisterFinancialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "expense" | "revenue";
  projectName?: string;
  onSuccess?: () => void;
}

const RegisterFinancialDialog = ({ open, onOpenChange, type, projectName, onSuccess }: RegisterFinancialDialogProps) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isExpense = type === "expense";
  const title = isExpense ? "تسجيل مصروف" : "تسجيل إيراد";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      toast.error("الرجاء إدخال مبلغ صحيح");
      return;
    }
    if (!description.trim()) {
      toast.error("الرجاء إدخال الوصف");
      return;
    }
    setSubmitting(true);
    const fullDescription = `${isExpense ? "مصروف" : "إيراد"}${projectName ? ` - ${projectName}` : ""} - ${description} - المبلغ: ${amount}`;
    const { error } = await supabase.from("journal_entries").insert({
      description: fullDescription,
      reference: reference || null,
      status: "draft",
      created_by: user?.id || null,
    } as any);
    setSubmitting(false);
    if (error) {
      toast.error("فشل في تسجيل العملية: " + error.message);
      return;
    }
    toast.success(isExpense ? "تم تسجيل المصروف بنجاح" : "تم تسجيل الإيراد بنجاح");
    setAmount("");
    setDescription("");
    setReference("");
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>{title}{projectName ? ` - ${projectName}` : ""}</DialogTitle>
          <DialogDescription>
            سيتم حفظ العملية في دفتر القيود اليومية
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">المبلغ <span className="text-destructive">*</span></Label>
            <Input id="amount" type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">الوصف <span className="text-destructive">*</span></Label>
            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder={isExpense ? "وصف المصروف..." : "وصف الإيراد..."} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">المرجع (اختياري)</Label>
            <Input id="reference" value={reference} onChange={e => setReference(e.target.value)} placeholder="رقم الفاتورة أو المرجع" />
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
              {isExpense ? "تسجيل المصروف" : "تسجيل الإيراد"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterFinancialDialog;
