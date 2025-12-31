import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Save } from "lucide-react";
import FormRow from "@/components/shared/FormRow";
import { useToast } from "@/hooks/use-toast";

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Handle password change
    toast({
      title: "تم بنجاح",
      description: "تم تغيير كلمة المرور بنجاح",
    });
    
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6">
      <FormRow label="معرف الدخول">
        <Input
          value="admin"
          disabled
          className="w-full bg-muted"
        />
      </FormRow>

      <FormRow label="كلمة المرور الحالية" required>
        <div className="relative">
          <Input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="أدخل كلمة المرور الحالية"
            className="w-full pl-10"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showCurrentPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </FormRow>

      <FormRow label="كلمة المرور الجديدة" required>
        <div className="relative">
          <Input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="أدخل كلمة المرور الجديدة"
            className="w-full pl-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showNewPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </FormRow>

      <FormRow label="الصلاحيات">
        <div className="py-2 px-3 bg-muted rounded-md text-sm text-muted-foreground">
          مديرين النظام (فضلاً لا تقم بالتعديل)
        </div>
      </FormRow>

      <div className="flex justify-end pt-4 border-t border-border">
        <Button type="submit" className="bg-green-600 hover:bg-green-700 gap-2">
          <Save className="h-4 w-4" />
          حفظ التغيرات
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
