
-- Fix permissive audit_events INSERT policy
DROP POLICY "System can insert audit events" ON public.audit_events;
CREATE POLICY "Authenticated can insert own audit events" ON public.audit_events 
  FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = actor_user_id);
