import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import FormRow from "@/components/shared/FormRow";
import { usePersonalNotes } from "@/hooks/usePersonalNotes";

const NoteForm = () => {
  const { addNote } = usePersonalNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [loading, setLoading] = useState(false);

  const getHijriDate = (gregorianDate: Date) => {
    return gregorianDate.toLocaleDateString('ar-SA', {
      calendar: 'islamic-umalqura', day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  const formatTime = (h: number, m: number) => {
    const period = h >= 12 ? "م" : "ص";
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    const success = await addNote({ title: title.trim(), content: content.trim() || undefined });
    if (success) {
      setTitle("");
      setContent("");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6">
      <FormRow label="عنوان المذكرة" required>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="أدخل عنوان المذكرة" className="w-full" required />
      </FormRow>
      <FormRow label="محتوى المذكرة" required>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="أدخل محتوى المذكرة" className="w-full min-h-[120px]" />
      </FormRow>
      <FormRow label="تاريخ المذكرة" required>
        <div className="space-y-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-right font-normal">
                <CalendarIcon className="ml-2 h-4 w-4" />
                {date ? format(date, "yyyy/MM/dd", { locale: ar }) : "اختر التاريخ"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          {date && <div className="text-sm text-muted-foreground">التاريخ الهجري: {getHijriDate(date)}</div>}
        </div>
      </FormRow>
      <FormRow label="وقت المذكرة" required>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">الساعة</label>
              <Slider value={[hour]} onValueChange={(v) => setHour(v[0])} min={0} max={23} step={1} />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">الدقيقة</label>
              <Slider value={[minute]} onValueChange={(v) => setMinute(v[0])} min={0} max={59} step={5} />
            </div>
          </div>
          <div className="text-center text-lg font-medium bg-muted/50 rounded-md py-2">{formatTime(hour, minute)}</div>
        </div>
      </FormRow>
      <div className="flex justify-end pt-4 border-t border-border">
        <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 gap-2">
          <Plus className="h-4 w-4" />
          {loading ? "جاري الحفظ..." : "إضافة السجل"}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
