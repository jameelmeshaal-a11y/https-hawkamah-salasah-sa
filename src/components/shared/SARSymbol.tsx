import sarSymbol from "@/assets/sar-symbol.png";
import { cn } from "@/lib/utils";

interface SARSymbolProps {
  className?: string;
  size?: number;
}

/**
 * Official Saudi Riyal symbol (replaces "ريال" / "ر.س" / "$" across the platform).
 * Use as inline icon next to numeric amounts.
 */
export const SARSymbol = ({ className, size = 14 }: SARSymbolProps) => (
  <img
    src={sarSymbol}
    alt="ر.س"
    width={size}
    height={size}
    className={cn("inline-block align-[-0.15em] mx-0.5 select-none", className)}
    style={{ width: size, height: size }}
    draggable={false}
  />
);

interface SARAmountProps {
  value: number | string;
  className?: string;
  symbolClassName?: string;
  symbolSize?: number;
  locale?: string;
}

/** Renders a number followed by the SAR symbol. */
export const SARAmount = ({
  value,
  className,
  symbolClassName,
  symbolSize = 14,
  locale = "ar-SA",
}: SARAmountProps) => {
  const num = typeof value === "number" ? value : Number(value);
  const formatted = Number.isFinite(num) ? num.toLocaleString(locale) : String(value);
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span>{formatted}</span>
      <SARSymbol size={symbolSize} className={symbolClassName} />
    </span>
  );
};

export default SARSymbol;
