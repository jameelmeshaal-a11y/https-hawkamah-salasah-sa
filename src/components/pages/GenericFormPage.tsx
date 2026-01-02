import { LucideIcon, Save, X } from "lucide-react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "textarea" | "file";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface GenericFormPageProps {
  title: string;
  moduleId: string;
  itemSlug: string;
  sectionTitle: string;
  moduleTitle: string;
  icon: LucideIcon;
  fields: FormField[];
  submitLabel?: string;
}

const GenericFormPage = ({
  title,
  moduleId,
  itemSlug,
  sectionTitle,
  moduleTitle,
  icon: Icon,
  fields,
  submitLabel = "حفظ",
}: GenericFormPageProps) => {
  return (
    <InnerPageLayout
      moduleId={moduleId}
      itemSlug={itemSlug}
      sectionTitle={sectionTitle}
      moduleTitle={moduleTitle}
      title={title}
    >
      <div className="space-y-4" dir="rtl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">بيانات النموذج</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                    <Label htmlFor={field.name}>
                      {field.label}
                      {field.required && <span className="text-destructive mr-1">*</span>}
                    </Label>
                    {field.type === "text" && (
                      <Input
                        id={field.name}
                        placeholder={field.placeholder}
                        className="mt-1"
                      />
                    )}
                    {field.type === "number" && (
                      <Input
                        id={field.name}
                        type="number"
                        placeholder={field.placeholder}
                        className="mt-1"
                      />
                    )}
                    {field.type === "date" && (
                      <Input
                        id={field.name}
                        type="date"
                        className="mt-1"
                      />
                    )}
                    {field.type === "select" && (
                      <Select>
                        <SelectTrigger className="mt-1">
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
                    )}
                    {field.type === "textarea" && (
                      <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        className="mt-1 min-h-[100px]"
                      />
                    )}
                    {field.type === "file" && (
                      <Input
                        id={field.name}
                        type="file"
                        className="mt-1"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  {submitLabel}
                </Button>
                <Button type="button" variant="outline" className="gap-2">
                  <X className="h-4 w-4" />
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GenericFormPage;
