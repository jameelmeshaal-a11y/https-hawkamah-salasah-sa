import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Returns whether the current user can view raw personal email addresses.
 * - system_admin → always true
 * - other roles → must have the `view_email_addresses` permission granted
 */
export const useEmailPermission = () => {
  const { roles, user, loading: authLoading } = useAuth();
  const [canViewEmails, setCanViewEmails] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      if (authLoading) return;
      if (!user) {
        setCanViewEmails(false);
        setLoading(false);
        return;
      }
      if (roles.includes("system_admin")) {
        if (!cancelled) {
          setCanViewEmails(true);
          setLoading(false);
        }
        return;
      }
      try {
        const { data: perm } = await supabase
          .from("permissions")
          .select("id")
          .eq("action", "view_email_addresses")
          .maybeSingle();

        if (!perm?.id || roles.length === 0) {
          if (!cancelled) {
            setCanViewEmails(false);
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
          setCanViewEmails((rp?.length ?? 0) > 0);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setCanViewEmails(false);
          setLoading(false);
        }
      }
    };

    check();
    return () => { cancelled = true; };
  }, [authLoading, user, roles.join(",")]);

  return { canViewEmails, loading };
};

/** Standard email regex */
export const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Heuristic: detect if an email belongs to a personal account (vs a company).
 * Personal: known free providers (gmail, hotmail, yahoo, outlook, icloud, ...).
 * Company emails are NOT masked.
 */
const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "hotmail.com", "outlook.com", "live.com", "msn.com",
  "yahoo.com", "yahoo.co.uk", "ymail.com",
  "icloud.com", "me.com", "mac.com",
  "aol.com", "protonmail.com", "proton.me",
  "zoho.com", "yandex.com", "mail.ru",
  "qq.com", "163.com", "126.com",
]);

export const isPersonalEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return PERSONAL_EMAIL_DOMAINS.has(domain);
};
