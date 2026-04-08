import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const DEPARTMENTS = [
  "تقنية المعلومات", "الشؤون المالية", "الموارد البشرية",
  "خدمات المستفيدين", "إدارة المشاريع", "العلاقات العامة",
  "الإدارة العامة", "التطوع", "الخدمات العامة",
];

const ROLE_LABELS: Record<AppRole, string> = {
  system_admin: "مدير النظام",
  admin: "مدير",
  supervisor: "مشرف",
  user: "مستخدم",
  auditor: "مدقق",
};

const AddUserDialog = ({ open, onOpenChange, onSuccess }: AddUserDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AppRole>("user");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    if (password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("bootstrap-admin", {
        body: { email, password, full_name: fullName, role, department },
      });

      if (error || data?.error) {
        toast.error(data?.error || error?.message || "فشل إنشاء المستخدم");
        return;
      }

      toast.success("تم إنشاء المستخدم بنجاح");
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setDepartment("");
      onOpenChange(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إضافة مستخدم جديد</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>الاسم الكامل <span className="text-destructive">*</span></Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="أدخل الاسم الكامل" required />
          </div>
          <div className="space-y-2">
            <Label>البريد الإلكتروني <span className="text-destructive">*</span></Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@domain.com" required dir="ltr" />
          </div>
          <div className="space-y-2">
            <Label>كلمة المرور الابتدائية <span className="text-destructive">*</span></Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="6 أحرف على الأقل" required dir="ltr" />
          </div>
          <div className="space-y-2">
            <Label>الصلاحية</Label>
            <Select value={role} onValueChange={(v) => setRole(v as AppRole)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.entries(ROLE_LABELS) as [AppRole, string][]).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>القسم</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger><SelectValue placeholder="اختر القسم" /></SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "جاري الإنشاء..." : "إنشاء المستخدم"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
