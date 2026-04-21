import { ReactNode, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lock } from "lucide-react";
import { useEmailPermission, EMAIL_REGEX, isPersonalEmail } from "@/hooks/useEmailPermission";

interface MaskedEmailProps {
  value?: string | null;
  className?: string;
  fallback?: ReactNode;
}

const MaskedBar = ({ length }: { length: number }) => (
  <span
    aria-label="بريد محجوب"
    className="email-masked inline-block align-middle rounded-sm bg-foreground select-none"
    style={{
      width: `${Math.max(length, 10) * 0.55}em`,
      height: "1em",
      color: "transparent",
      userSelect: "none",
      WebkitUserSelect: "none",
    }}
    onCopy={(e) => { e.preventDefault(); e.stopPropagation(); }}
    onCut={(e) => { e.preventDefault(); e.stopPropagation(); }}
    onContextMenu={(e) => e.preventDefault()}
    onDragStart={(e) => e.preventDefault()}
  >
    &nbsp;
  </span>
);

/**
 * Masks PERSONAL email addresses (gmail/hotmail/yahoo/...) for users without
 * the `view_email_addresses` permission. Company/organization emails are
 * always rendered as-is.
 */
export const MaskedEmail = ({ value, className, fallback }: MaskedEmailProps) => {
  const { canViewEmails, loading } = useEmailPermission();

  const segments = useMemo(() => {
    if (!value) return null;
    const text = String(value);
    const out: { type: "text" | "email"; value: string; personal?: boolean }[] = [];
    let lastIndex = 0;
    const regex = new RegExp(EMAIL_REGEX.source, "g");
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        out.push({ type: "text", value: text.slice(lastIndex, match.index) });
      }
      out.push({ type: "email", value: match[0], personal: isPersonalEmail(match[0]) });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      out.push({ type: "text", value: text.slice(lastIndex) });
    }
    return out;
  }, [value]);

  if (!value) return <>{fallback ?? "—"}</>;

  const showRaw = canViewEmails && !loading;
  const hasPersonal = segments?.some((s) => s.type === "email" && s.personal);

  if (showRaw || !hasPersonal) {
    return <span dir="ltr" className={className}>{value}</span>;
  }

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span dir="ltr" className={className}>
            {segments!.map((s, i) =>
              s.type === "email" && s.personal ? (
                <MaskedBar key={i} length={s.value.length} />
              ) : (
                <span key={i}>{s.value}</span>
              )
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-2 max-w-xs text-right">
          <Lock className="h-3 w-3 shrink-0" />
          <span>ليس لديك صلاحية الاطلاع على البريد الشخصي لحفظ الخصوصية</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MaskedEmail;
