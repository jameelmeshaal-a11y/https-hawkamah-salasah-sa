import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Returns whether the current user is allowed to view raw phone numbers.
 * - system_admin → always true
 * - other roles → must have the `view_phone_numbers` permission granted
 */
export const usePhonePermission = () => {
  const { roles, user, loading: authLoading } = useAuth();
  const [canViewPhones, setCanViewPhones] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      if (authLoading) return;
      if (!user) {
        setCanViewPhones(false);
        setLoading(false);
        return;
      }
      // System admin always has access
      if (roles.includes("system_admin")) {
        if (!cancelled) {
          setCanViewPhones(true);
          setLoading(false);
        }
        return;
      }

      try {
        // Find permission id for view_phone_numbers
        const { data: perm } = await supabase
          .from("permissions")
          .select("id")
          .eq("action", "view_phone_numbers")
          .maybeSingle();

        if (!perm?.id || roles.length === 0) {
          if (!cancelled) {
            setCanViewPhones(false);
            setLoading(false);
          }
          return;
        }

        const { data: rp } = await supabase
          .from("role_permissions")
          .select("role")
          .eq("permission_id", perm.id)
          .in("role", roles);

        if (!cancelled) {
          setCanViewPhones((rp?.length ?? 0) > 0);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setCanViewPhones(false);
          setLoading(false);
        }
      }
    };

    check();
    return () => { cancelled = true; };
  }, [authLoading, user, roles.join(",")]);

  return { canViewPhones, loading };
};

/** Regex for Saudi mobile numbers starting with 05 and exactly 10 digits. */
export const SAUDI_PHONE_REGEX = /05\d{8}/g;
