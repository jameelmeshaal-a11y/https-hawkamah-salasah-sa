import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormRow from "@/components/shared/FormRow";
import { Send, Paperclip } from "lucide-react";

interface TransactionFormProps {
  transactionTypes?: { value: string; label: string }[];
  recipients?: { value: string; label: string }[];
  onSubmit?: (data: TransactionFormData) => void;
}

export interface TransactionFormData {
  type: string;
  subject: string;
  recipient: string;
  details: string;
  attachments: File[];
}

const defaultTypes = [
  { value: "inquiry", label: "استفسار" },
  { value: "request", label: "طلب" },
  { value: "complaint", label: "شكوى" },
  { value: "suggestion", label: "اقتراح" },
  { value: "report", label: "تقرير" },
];

const defaultRecipients = [
  { value: "hr", label: "الموارد البشرية" },
  { value: "finance", label: "الشؤون المالية" },
  { value: "admin", label: "الشؤون الإدارية" },
  { value: "it", label: "تقنية المعلومات" },
  { value: "management", label: "الإدارة العليا" },
];

const TransactionForm = ({
  transactionTypes = defaultTypes,
  recipients = defaultRecipients,
  onSubmit,
}: TransactionFormProps) => {
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      type,
      subject,
      recipient,
      details,
      attachments: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormRow label="نوع المعاملة" required>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع المعاملة" />
          </SelectTrigger>
          <SelectContent>
            {transactionTypes.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormRow>

      <FormRow label="الموضوع" required>
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="أدخل موضوع المعاملة"
        />
      </FormRow>

      <FormRow label="الجهة المستلمة" required>
        <Select value={recipient} onValueChange={setRecipient}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الجهة المستلمة" />
          </SelectTrigger>
          <SelectContent>
            {recipients.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormRow>

      <FormRow label="تفاصيل المعاملة" required>
        <Textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="أدخل تفاصيل المعاملة..."
          rows={5}
        />
      </FormRow>

      <FormRow label="المرفقات">
        <Button type="button" variant="outline" className="w-full justify-start">
          <Paperclip className="h-4 w-4 ml-2" />
          إضافة مرفقات
        </Button>
      </FormRow>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="min-w-[140px]">
          <Send className="h-4 w-4 ml-2" />
          إرسال المعاملة
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
