import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserPlus, Edit, Shield, Check, X } from "lucide-react";
import { toast } from "sonner";
import { logAuditEvent } from "@/services/auditService";
import AddUserDialog from "@/components/dialogs/AddUserDialog";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface UserWithRoles {
  id: string;
  user_id: string;
  full_name: string;
  email: string | null;
  department: string | null;
  job_title: string | null;
  status: string;
  last_login_at: string | null;
  is_protected?: boolean;
  roles: AppRole[];
}

const ROLE_LABELS: Record<AppRole, string> = {
  system_admin: "مدير النظام",
  admin: "مدير",
  supervisor: "مشرف",
  user: "مستخدم",
  auditor: "مدقق",
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<UserWithRoles | null>(null);
  const [selectedRole, setSelectedRole] = useState<AppRole>("user");
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const fetchUsers = async () => {
    const { data: profiles } = await supabase.from("profiles").select("*");
    const { data: allRoles } = await supabase.from("user_roles").select("user_id, role");

    if (profiles) {
      const usersWithRoles: UserWithRoles[] = profiles.map((p: any) => ({
        ...p,
        roles: (allRoles || []).filter((r) => r.user_id === p.user_id).map((r) => r.role as AppRole),
      }));
      setUsers(usersWithRoles);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAssignRole = async () => {
    if (!editingUser) return;
    if (editingUser.is_protected) {
      toast.error("لا يمكن تعديل صلاحية حساب محمي");
      return;
    }
    const { error } = await supabase.from("user_roles").upsert({
      user_id: editingUser.user_id,
      role: selectedRole,
    }, { onConflict: "user_id,role" });

    if (error) {
      toast.error("فشل تعيين الدور");
    } else {
      toast.success(`تم تعيين دور "${ROLE_LABELS[selectedRole]}" بنجاح`);
      await logAuditEvent({
        action: "assign_role", moduleKey: "admin", entityType: "user_role",
        metadata: { target_user: editingUser.user_id, role: selectedRole },
      });
      setEditOpen(false);
      fetchUsers();
    }
  };

  const handleToggleStatus = async (user: UserWithRoles) => {
    if (user.is_protected) {
      toast.error("لا يمكن تعطيل حساب محمي");
      return;
    }
    const newStatus = user.status === "active" ? "inactive" : "active";
    const { error } = await supabase.from("profiles").update({ status: newStatus }).eq("id", user.id);
    if (error) {
      toast.error("فشل تحديث الحالة");
    } else {
      toast.success(`تم تحديث حالة المستخدم إلى: ${newStatus === "active" ? "نشط" : "غير نشط"}`);
      await logAuditEvent({
        action: "toggle_user_status", moduleKey: "admin", entityType: "profile",
        metadata: { target_user: user.user_id, new_status: newStatus },
      });
      fetchUsers();
    }
  };

  const filteredUsers = users.filter(
    (u) => u.full_name?.includes(searchQuery) || u.email?.includes(searchQuery) || u.department?.includes(searchQuery)
  );

  return (
    <InnerPageLayout moduleId="admin" title="إدارة المستخدمين" sectionTitle="إدارة النظام" moduleTitle="لوحة التحكم">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                إدارة المستخدمين والأدوار
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="بحث..." className="pr-9 w-64" />
                </div>
                <Button onClick={() => setAddOpen(true)} className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  إضافة مستخدم جديد
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">البريد</TableHead>
                    <TableHead className="text-right">القسم</TableHead>
                    <TableHead className="text-right">الوظيفة</TableHead>
                    <TableHead className="text-right">الأدوار</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">آخر دخول</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={8} className="text-center py-8">جاري التحميل...</TableCell></TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">لا يوجد مستخدمون</TableCell></TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.full_name || "-"}
                          {user.is_protected && <Shield className="inline h-3 w-3 text-primary mr-1" />}
                        </TableCell>
                        <TableCell>{user.email || "-"}</TableCell>
                        <TableCell>{user.department || "-"}</TableCell>
                        <TableCell>{user.job_title || "-"}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {user.roles.length > 0 ? user.roles.map((r) => (
                              <Badge key={r} variant="secondary" className="text-xs">{ROLE_LABELS[r]}</Badge>
                            )) : <span className="text-muted-foreground text-xs">بدون دور</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={user.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}>
                            {user.status === "active" ? "نشط" : "غير نشط"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">{user.last_login_at ? new Date(user.last_login_at).toLocaleDateString("ar-SA") : "-"}</TableCell>
                        <TableCell>
                          {!user.is_protected && (
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" onClick={() => { setEditingUser(user); setSelectedRole(user.roles[0] || "user"); setEditOpen(true); }}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(user)}>
                                {user.status === "active" ? <X className="h-4 w-4 text-destructive" /> : <Check className="h-4 w-4 text-emerald-500" />}
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle>تعيين دور - {editingUser?.full_name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.entries(ROLE_LABELS) as [AppRole, string][]).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAssignRole} className="w-full">تعيين الدور</Button>
            </div>
          </DialogContent>
        </Dialog>

        <AddUserDialog open={addOpen} onOpenChange={setAddOpen} onSuccess={fetchUsers} />
      </div>
    </InnerPageLayout>
  );
};

export default AdminUsersPage;
