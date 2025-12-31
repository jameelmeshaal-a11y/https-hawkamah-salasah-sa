import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormRowProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

const FormRow = ({ label, required = false, children, className = "" }: FormRowProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 items-start ${className}`}>
      <Label className="text-sm font-medium text-foreground md:text-left pt-2">
        {label}
        {required && <span className="text-destructive mr-1">*</span>}
      </Label>
      <div className="md:col-span-3">
        {children}
      </div>
    </div>
  );
};

export default FormRow;
