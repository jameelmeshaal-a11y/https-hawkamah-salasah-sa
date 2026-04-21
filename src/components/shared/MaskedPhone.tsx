import { ReactNode, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lock } from "lucide-react";
import { usePhonePermission, SAUDI_PHONE_REGEX } from "@/hooks/usePhonePermission";

interface MaskedPhoneProps {
  value?: string | null;
  className?: string;
  fallback?: ReactNode;
}

/**
 * Renders a phone value while protecting Saudi mobile numbers (05XXXXXXXX)
 * for users without the `view_phone_numbers` permission.
 *
 * - With permission: renders the raw phone normally (LTR).
 * - Without permission: matches occurrences of /05\d{8}/g and replaces each
 *   with a non-selectable, non-copyable solid black bar of equivalent width,
 *   plus a tooltip explaining the privacy policy.
 */
const MaskedBar = ({ length }: { length: number }) => (
  <span
    aria-label="رقم محجوب"
    className="phone-masked inline-block align-middle rounded-sm bg-foreground select-none"
    style={{
      width: `${Math.max(length, 8) * 0.6}em`,
      height: "1em",
      // Ensure no readable text leaks into copy/inspect
      color: "transparent",
      userSelect: "none",
      WebkitUserSelect: "none",
      pointerEvents: "auto",
    }}
    onCopy={(e) => { e.preventDefault(); e.stopPropagation(); }}
    onCut={(e) => { e.preventDefault(); e.stopPropagation(); }}
    onContextMenu={(e) => e.preventDefault()}
    onDragStart={(e) => e.preventDefault()}
  >
    {/* zero-width content; bar is the background */}
    &nbsp;
  </span>
);

export const MaskedPhone = ({ value, className, fallback }: MaskedPhoneProps) => {
  const { canViewPhones, loading } = usePhonePermission();

  const parts = useMemo(() => {
    if (!value) return null;
    const text = String(value);
    const segments: { type: "text" | "phone"; value: string }[] = [];
    let lastIndex = 0;
    const regex = new RegExp(SAUDI_PHONE_REGEX.source, "g");
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: "text", value: text.slice(lastIndex, match.index) });
      }
      segments.push({ type: "phone", value: match[0] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      segments.push({ type: "text", value: text.slice(lastIndex) });
    }
    return segments;
  }, [value]);

  if (!value) return <>{fallback ?? "—"}</>;

  // While permission is loading, default to masking (privacy-first)
  const showRaw = canViewPhones && !loading;

  if (showRaw) {
    return <span dir="ltr" className={className}>{value}</span>;
  }

  // Nothing matched a phone → render as-is
  if (!parts?.some((p) => p.type === "phone")) {
    return <span className={className}>{value}</span>;
  }

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span dir="ltr" className={className}>
            {parts!.map((p, i) =>
              p.type === "phone" ? (
                <MaskedBar key={i} length={p.value.length} />
              ) : (
                <span key={i}>{p.value}</span>
              )
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-2 max-w-xs text-right">
          <Lock className="h-3 w-3 shrink-0" />
          <span>ليس لديك صلاحية الاطلاع على رقم التواصل لحفظ الخصوصية</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MaskedPhone;
