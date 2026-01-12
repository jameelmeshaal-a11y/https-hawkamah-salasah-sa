import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HijriGregorianDatePickerProps {
  label: string;
  hijriDate: string;
  gregorianDate: string;
  required?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onClick?: () => void;
  className?: string;
}

const HijriGregorianDatePicker = ({
  label,
  hijriDate,
  gregorianDate,
  required = false,
  onPrevious,
  onNext,
  onClick,
  className,
}: HijriGregorianDatePickerProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      <label className="block text-sm font-medium text-right">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <div className="flex items-center border rounded-md bg-white overflow-hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-full rounded-none border-l"
          onClick={onNext}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div 
          className="flex-1 px-3 py-2 text-center cursor-pointer hover:bg-gray-50"
          onClick={onClick}
        >
          <div className="text-sm font-medium">{hijriDate}</div>
          <div className="text-xs text-muted-foreground">{gregorianDate}</div>
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
          onClick={onPrevious}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HijriGregorianDatePicker;
