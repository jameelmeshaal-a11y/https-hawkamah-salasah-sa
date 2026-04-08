
-- Add is_protected column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_protected boolean NOT NULL DEFAULT false;

-- Create trigger function to protect admin accounts
CREATE OR REPLACE FUNCTION public.protect_admin_account()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Prevent DELETE on protected profiles
  IF TG_OP = 'DELETE' THEN
    IF OLD.is_protected = true THEN
      RAISE EXCEPTION 'Cannot delete a protected admin account';
    END IF;
    RETURN OLD;
  END IF;

  -- Prevent changing is_protected from true to false
  IF TG_OP = 'UPDATE' THEN
    IF OLD.is_protected = true AND NEW.is_protected = false THEN
      RAISE EXCEPTION 'Cannot remove protection from admin account';
    END IF;
    -- Prevent changing status of protected accounts
    IF OLD.is_protected = true AND NEW.status != OLD.status THEN
      RAISE EXCEPTION 'Cannot change status of protected admin account';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger on profiles
DROP TRIGGER IF EXISTS trigger_protect_admin ON public.profiles;
CREATE TRIGGER trigger_protect_admin
  BEFORE DELETE OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_admin_account();

-- Also protect user_roles for protected users
CREATE OR REPLACE FUNCTION public.protect_admin_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _is_protected boolean;
BEGIN
  -- Check if the user is protected
  SELECT is_protected INTO _is_protected FROM public.profiles WHERE user_id = OLD.user_id;
  
  IF _is_protected = true THEN
    IF TG_OP = 'DELETE' THEN
      RAISE EXCEPTION 'Cannot remove role from a protected admin account';
    END IF;
    IF TG_OP = 'UPDATE' AND NEW.role != OLD.role THEN
      RAISE EXCEPTION 'Cannot change role of a protected admin account';
    END IF;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_protect_admin_role ON public.user_roles;
CREATE TRIGGER trigger_protect_admin_role
  BEFORE DELETE OR UPDATE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_admin_role();
