import { useState } from "react";
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
import { toast } from "sonner";

interface TransactionFormProps {
  transactionTypes?: string[];
  onSubmit?: (data: TransactionFormData) => void;
}

export interface TransactionFormData {
  type: string;
  title: string;
  details: string;
  attachments: File[];
}

const defaultTypes = [
  "معاملة صادرة",
  "معاملة واردة",
  "معاملة داخلية",
  "إحالة",
  "طلب اعتماد",
];

const TransactionForm = ({
  transactionTypes = defaultTypes,
  onSubmit,
}: TransactionFormProps) => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !details.trim()) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    onSubmit?.({
      type,
      title,
      details,
      attachments,
    });

    toast.success("تم إضافة السجل بنجاح");
    
    // Reset form
    setType("");
    setTitle("");
    setDetails("");
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">نوع المعاملة</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="اختر" />
            </SelectTrigger>
            <SelectContent>
              {transactionTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">
            عنوان المعاملة <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="أدخل عنوان المعاملة"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">
          تفاصيل المعاملة <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="أدخل تفاصيل المعاملة"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>المرفقات</Label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="attachments"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("attachments")?.click()}
          >
            <Paperclip className="h-4 w-4 ml-1" />
            إضافة مرفقات
          </Button>
          {attachments.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {attachments.length} ملف مرفق
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-start">
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          إضافة سجل
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
