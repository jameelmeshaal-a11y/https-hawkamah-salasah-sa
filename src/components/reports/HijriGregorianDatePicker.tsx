import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getTodayHijri,
  addDaysToHijri,
  formatHijriDate,
  formatGregorianDate,
  hijriToGregorian,
} from "@/utils/hijriConverter";

interface HijriGregorianDatePickerProps {
  label: string;
  required?: boolean;
  className?: string;
  // New API - automatic date handling
  value?: { year: number; month: number; day: number };
  onChange?: (hijriDate: { year: number; month: number; day: number }, gregorianDate: Date) => void;
  // Legacy API - manual string display (for backward compatibility)
  hijriDate?: string;
  gregorianDate?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onClick?: () => void;
}

const HijriGregorianDatePicker = ({
  label,
  required = false,
  className,
  value,
  onChange,
  // Legacy props
  hijriDate: legacyHijriDate,
  gregorianDate: legacyGregorianDate,
  onPrevious,
  onNext,
  onClick,
}: HijriGregorianDatePickerProps) => {
  const [internalHijriDate, setInternalHijriDate] = useState(value || getTodayHijri());

  useEffect(() => {
    if (value) {
      setInternalHijriDate(value);
    }
  }, [value]);

  // Determine if using legacy mode (string-based) or new mode (auto-calculated)
  const isLegacyMode = legacyHijriDate !== undefined || legacyGregorianDate !== undefined;

  const computedGregorianDate = hijriToGregorian(internalHijriDate.year, internalHijriDate.month, internalHijriDate.day);

  const displayHijriDate = isLegacyMode 
    ? legacyHijriDate 
    : formatHijriDate(internalHijriDate.year, internalHijriDate.month, internalHijriDate.day);
  
  const displayGregorianDate = isLegacyMode 
    ? legacyGregorianDate 
    : formatGregorianDate(computedGregorianDate);

  const handlePrevious = () => {
    if (isLegacyMode && onPrevious) {
      onPrevious();
      return;
    }
    const newDate = addDaysToHijri(internalHijriDate.year, internalHijriDate.month, internalHijriDate.day, -1);
    setInternalHijriDate(newDate);
    const newGregorian = hijriToGregorian(newDate.year, newDate.month, newDate.day);
    onChange?.(newDate, newGregorian);
  };

  const handleNext = () => {
    if (isLegacyMode && onNext) {
      onNext();
      return;
    }
    const newDate = addDaysToHijri(internalHijriDate.year, internalHijriDate.month, internalHijriDate.day, 1);
    setInternalHijriDate(newDate);
    const newGregorian = hijriToGregorian(newDate.year, newDate.month, newDate.day);
    onChange?.(newDate, newGregorian);
  };

  const handleClick = () => {
    if (isLegacyMode && onClick) {
      onClick();
    }
  };

  return (
    <div className={cn("space-y-1", className)}>
      <label className="block text-sm font-medium text-right">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <div className="flex items-center border rounded-md bg-background overflow-hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-full rounded-none border-l"
          onClick={handleNext}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div 
          className="flex-1 px-3 py-2 text-center cursor-pointer hover:bg-muted/50"
          onClick={handleClick}
        >
          <div className="text-sm font-medium">{displayHijriDate}</div>
          <div className="text-xs text-muted-foreground">{displayGregorianDate}</div>
        </div>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-full rounded-none border-r"
        >
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-full rounded-none"
          onClick={handlePrevious}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HijriGregorianDatePicker;
