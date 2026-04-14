
-- Temporarily disable triggers
DROP TRIGGER trigger_protect_admin ON public.profiles;
DROP TRIGGER trigger_protect_admin_role ON public.user_roles;

-- Remove the broken account
DELETE FROM public.user_roles WHERE user_id = (SELECT id FROM auth.users WHERE email = 'ceo@salasah.sa');
UPDATE public.profiles SET is_protected = false WHERE user_id = (SELECT id FROM auth.users WHERE email = 'ceo@salasah.sa');
DELETE FROM public.profiles WHERE user_id = (SELECT id FROM auth.users WHERE email = 'ceo@salasah.sa');
DELETE FROM auth.users WHERE email = 'ceo@salasah.sa';

-- Recreate triggers
CREATE TRIGGER trigger_protect_admin
  BEFORE UPDATE OR DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION protect_admin_account();

CREATE TRIGGER trigger_protect_admin_role
  BEFORE UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION protect_admin_role();
