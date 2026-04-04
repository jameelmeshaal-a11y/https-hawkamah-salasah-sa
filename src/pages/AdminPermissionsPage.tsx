import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { logAuditEvent } from "@/services/auditService";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

const ROLE_LABELS: Record<AppRole, string> = {
  system_admin: "مدير النظام",
  admin: "مدير",
  supervisor: "مشرف",
  user: "مستخدم",
  auditor: "مدقق",
};

const ACTION_LABELS: Record<string, string> = {
  view: "عرض",
  create: "إضافة",
  edit: "تعديل",
  delete: "حذف",
  approve: "اعتماد",
  export: "تصدير",
};

interface ModulePerms {
  moduleId: string;
  moduleKey: string;
  moduleName: string;
  permissions: { id: string; action: string; granted: boolean }[];
}

const AdminPermissionsPage = () => {
  const [selectedRole, setSelectedRole] = useState<AppRole>("user");
  const [modulePerms, setModulePerms] = useState<ModulePerms[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPermissions = async (role: AppRole) => {
    setLoading(true);
    const { data: modules } = await supabase.from("modules").select("id, key, name").order("sort_order");
    const { data: permissions } = await supabase.from("permissions").select("id, module_id, action");
    const { data: rolePerms } = await supabase.from("role_permissions").select("permission_id").eq("role", role);

    const grantedIds = new Set((rolePerms || []).map((rp) => rp.permission_id));

    const result: ModulePerms[] = (modules || []).map((mod) => ({
      moduleId: mod.id,
      moduleKey: mod.key,
      moduleName: mod.name,
      permissions: (permissions || [])
        .filter((p) => p.module_id === mod.id)
        .map((p) => ({ id: p.id, action: p.action, granted: grantedIds.has(p.id) })),
    }));

    setModulePerms(result);
    setLoading(false);
  };

  useEffect(() => { fetchPermissions(selectedRole); }, [selectedRole]);

  const togglePermission = (moduleIdx: number, permIdx: number) => {
    setModulePerms((prev) => {
      const next = [...prev];
      next[moduleIdx] = {
        ...next[moduleIdx],
        permissions: next[moduleIdx].permissions.map((p, i) =>
          i === permIdx ? { ...p, granted: !p.granted } : p
        ),
      };
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    // Remove all existing role_permissions for this role
    await supabase.from("role_permissions").delete().eq("role", selectedRole);

    // Insert granted ones
    const toInsert = modulePerms
      .flatMap((mp) => mp.permissions.filter((p) => p.granted).map((p) => ({
        role: selectedRole,
        permission_id: p.id,
      })));

    if (toInsert.length > 0) {
      const { error } = await supabase.from("role_permissions").insert(toInsert);
      if (error) {
        toast.error("فشل حفظ الصلاحيات");
        setSaving(false);
        return;
      }
    }

    await logAuditEvent({
      action: "update_role_permissions",
      moduleKey: "admin",
      entityType: "role_permissions",
      metadata: { role: selectedRole, permissions_count: toInsert.length },
    });

    toast.success("تم حفظ الصلاحيات بنجاح");
    setSaving(false);
  };

  return (
    <InnerPageLayout moduleId="admin" title="مصفوفة الصلاحيات" sectionTitle="إدارة النظام" moduleTitle="لوحة التحكم">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                مصفوفة الصلاحيات حسب الدور
              </CardTitle>
              <div className="flex items-center gap-3">
                <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
                  <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(Object.entries(ROLE_LABELS) as [AppRole, string][]).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="h-4 w-4 ml-2" />
                  {saving ? "جاري الحفظ..." : "حفظ الصلاحيات"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">جاري التحميل...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right min-w-[200px]">الوحدة</TableHead>
                      {Object.entries(ACTION_LABELS).map(([key, label]) => (
                        <TableHead key={key} className="text-center w-24">{label}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modulePerms.map((mp, mIdx) => (
                      <TableRow key={mp.moduleId}>
                        <TableCell className="font-medium">{mp.moduleName}</TableCell>
                        {["view", "create", "edit", "delete", "approve", "export"].map((action) => {
                          const pIdx = mp.permissions.findIndex((p) => p.action === action);
                          const perm = pIdx >= 0 ? mp.permissions[pIdx] : null;
                          return (
                            <TableCell key={action} className="text-center">
                              {perm ? (
                                <Checkbox
                                  checked={perm.granted}
                                  onCheckedChange={() => togglePermission(mIdx, pIdx)}
                                  disabled={selectedRole === "system_admin"}
                                />
                              ) : "-"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default AdminPermissionsPage;
