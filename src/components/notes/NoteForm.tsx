import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { CalendarIcon, Upload, Plus } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import FormRow from "@/components/shared/FormRow";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [alertBefore, setAlertBefore] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, content, date, hour, minute, alertBefore });
  };

  // Simple Hijri date approximation (for display purposes)
  const getHijriDate = (gregorianDate: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      calendar: 'islamic-umalqura',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return gregorianDate.toLocaleDateString('ar-SA', options);
  };

  const formatTime = (h: number, m: number) => {
    const period = h >= 12 ? "م" : "ص";
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6">
      <FormRow label="عنوان المذكرة" required>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان المذكرة"
          className="w-full"
        />
      </FormRow>

      <FormRow label="محتوى المذكرة" required>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="أدخل محتوى المذكرة"
          className="w-full min-h-[120px]"
        />
      </FormRow>

      <FormRow label="تاريخ المذكرة" required>
        <div className="space-y-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right font-normal"
              >
                <CalendarIcon className="ml-2 h-4 w-4" />
                {date ? format(date, "yyyy/MM/dd", { locale: ar }) : "اختر التاريخ"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {date && (
            <div className="text-sm text-muted-foreground">
              التاريخ الهجري: {getHijriDate(date)}
            </div>
          )}
        </div>
      </FormRow>

      <FormRow label="وقت المذكرة" required>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">الساعة</label>
              <Slider
                value={[hour]}
                onValueChange={(value) => setHour(value[0])}
                min={0}
                max={23}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">الدقيقة</label>
              <Slider
                value={[minute]}
                onValueChange={(value) => setMinute(value[0])}
                min={0}
                max={59}
                step={5}
                className="w-full"
              />
            </div>
          </div>
          <div className="text-center text-lg font-medium bg-muted/50 rounded-md py-2">
            {formatTime(hour, minute)}
          </div>
        </div>
      </FormRow>

      <FormRow label="التنبيه قبل الوقت (دقائق)">
        <Input
          type="number"
          value={alertBefore}
          onChange={(e) => setAlertBefore(parseInt(e.target.value) || 0)}
          min={0}
          className="w-32"
        />
      </FormRow>

      <FormRow label="مرفقات إضافية">
        <Button type="button" variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          إضافة ملف
        </Button>
      </FormRow>

      <div className="flex justify-end pt-4 border-t border-border">
        <Button type="submit" className="bg-green-600 hover:bg-green-700 gap-2">
          <Plus className="h-4 w-4" />
          إضافة السجل
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
