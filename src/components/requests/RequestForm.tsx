import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Paperclip } from "lucide-react";

export interface RequestField {
  name: string;
  label: string;
  type: "text" | "select" | "textarea" | "date" | "number";
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  colSpan?: 1 | 2;
}

interface RequestFormProps {
  title: string;
  fields: RequestField[];
  onSubmit?: (data: Record<string, string>) => void;
  submitLabel?: string;
}

const RequestForm = ({ title, fields, onSubmit, submitLabel = "إضافة السجل" }: RequestFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div 
            key={field.name} 
            className={field.colSpan === 2 ? "md:col-span-2" : ""}
          >
            <Label htmlFor={field.name} className="text-sm text-foreground mb-2 block">
              {field.label}
              {field.required && <span className="text-destructive mr-1">*</span>}
            </Label>
            
            {field.type === "select" ? (
              <Select name={field.name}>
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder={field.placeholder || "اختر..."} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "textarea" ? (
              <Textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                className="min-h-[100px] text-right"
                required={field.required}
              />
            ) : (
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="text-right"
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-end">
        <Button type="button" variant="outline" className="gap-2">
          <Paperclip className="h-4 w-4" />
          إضافة مرفقات
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default RequestForm;
