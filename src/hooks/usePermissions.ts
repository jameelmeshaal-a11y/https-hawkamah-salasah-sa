import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ModulePermissions {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
  export: boolean;
}

export const usePermissions = (moduleKey?: string) => {
  const { roles, user } = useAuth();
  const [permissions, setPermissions] = useState<ModulePermissions>({
    view: false, create: false, edit: false, delete: false, approve: false, export: false,
  });
  const [loading, setLoading] = useState(true);

  const isSystemAdmin = roles.includes("system_admin");

  useEffect(() => {
    if (isSystemAdmin) {
      setPermissions({ view: true, create: true, edit: true, delete: true, approve: true, export: true });
      setLoading(false);
      return;
    }

    if (!user || !moduleKey || roles.length === 0) {
      setLoading(false);
      return;
    }

    const fetchPermissions = async () => {
      const { data } = await supabase
        .from("role_permissions")
        .select("permission_id, permissions(action, modules(key))")
        .in("role", roles);

      if (data) {
        const modulePerms: ModulePermissions = {
          view: false, create: false, edit: false, delete: false, approve: false, export: false,
        };
        data.forEach((rp: any) => {
          const perm = rp.permissions;
          if (perm?.modules?.key === moduleKey) {
            const action = perm.action as keyof ModulePermissions;
            if (action in modulePerms) modulePerms[action] = true;
          }
        });
        setPermissions(modulePerms);
      }
      setLoading(false);
    };

    fetchPermissions();
  }, [user, roles, moduleKey, isSystemAdmin]);

  return { permissions, loading, isSystemAdmin };
};
