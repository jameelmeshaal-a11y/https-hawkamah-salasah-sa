import { supabase } from "@/integrations/supabase/client";

interface AuditEventInput {
  action: string;
  moduleKey?: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}

export const logAuditEvent = async (event: AuditEventInput) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("audit_events").insert({
    actor_user_id: user.id,
    action: event.action,
    module_key: event.moduleKey,
    entity_type: event.entityType,
    entity_id: event.entityId,
    metadata: event.metadata as any,
    user_agent: navigator.userAgent,
  });
};
