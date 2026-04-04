import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const AdminNavMenu = () => {
  const { isAdmin, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("تم تسجيل الخروج بنجاح");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-white/10 gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
            {profile?.full_name?.[0] || "U"}
          </div>
          <span className="hidden sm:inline text-sm">{profile?.full_name || "مستخدم"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent dir="rtl" align="start" className="w-56">
        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/admin/dashboard" className="flex items-center gap-2 cursor-pointer">
                <LayoutDashboard className="h-4 w-4" />
                لوحة تحكم المدير
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/users" className="flex items-center gap-2 cursor-pointer">
                <Users className="h-4 w-4" />
                إدارة المستخدمين
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/permissions" className="flex items-center gap-2 cursor-pointer">
                <Shield className="h-4 w-4" />
                مصفوفة الصلاحيات
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
          <LogOut className="h-4 w-4 ml-2" />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminNavMenu;
