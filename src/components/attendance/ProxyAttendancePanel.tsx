import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCog, Clock, LogOut, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAttendance } from "@/hooks/useAttendance";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface EmployeeOption {
  id: string;
  full_name: string;
  department: string | null;
}

const ProxyAttendancePanel = () => {
  const { isAdmin } = useAuth();
  const { records, recordAttendanceForEmployee } = useAttendance();
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    supabase
      .from("employees")
      .select("id, full_name, department")
      .eq("status", "active")
      .order("full_name", { ascending: true })
      .then(({ data, error }) => {
        if (error) toast.error("تعذر تحميل قائمة الموظفين");
        else setEmployees((data as EmployeeOption[]) || []);
        setLoading(false);
      });
  }, [isAdmin]);

  const todayStr = new Date().toISOString().split("T")[0];
  const todayRecord = useMemo(() => {
    if (!selectedEmployeeId) return null;
    return records.find((r) => r.employee_id === selectedEmployeeId && r.date === todayStr) || null;
  }, [records, selectedEmployeeId, todayStr]);

  if (!isAdmin) return null;

  const isCheckOut = !!todayRecord?.check_in && !todayRecord?.check_out;
  const isDone = !!todayRecord?.check_in && !!todayRecord?.check_out;

  const handleProxyAction = async () => {
    if (!selectedEmployeeId) { toast.error("اختر موظفاً أولاً"); return; }
    setSubmitting(true);
    try {
      await recordAttendanceForEmployee(selectedEmployeeId);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <UserCog className="h-5 w-5 text-primary" />
          تحضير الموظفين بالنيابة (للمدير/الأدمن)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[260px]">
            <label className="text-sm text-muted-foreground mb-1 block">اختر الموظف</label>
            <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder={loading ? "جاري التحميل..." : "اختر موظفاً"} />
              </SelectTrigger>
              <SelectContent>
                {employees.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.full_name}{e.department ? ` — ${e.department}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEmployeeId && (
            <div className="text-sm">
              {isDone ? (
                <Badge className="bg-emerald-600 hover:bg-emerald-600 gap-1">
                  <CheckCircle2 className="h-3 w-3" /> مكتمل اليوم
                </Badge>
              ) : isCheckOut ? (
                <Badge className="bg-amber-600 hover:bg-amber-600">حاضر — لم ينصرف</Badge>
              ) : (
                <Badge variant="destructive">لم يحضر اليوم</Badge>
              )}
            </div>
          )}

          <Button
            onClick={handleProxyAction}
            disabled={!selectedEmployeeId || submitting || isDone}
            className={`${isCheckOut ? "bg-orange-600 hover:bg-orange-700" : "bg-emerald-600 hover:bg-emerald-700"} text-white`}
          >
            {isCheckOut ? <LogOut className="h-4 w-4 ml-2" /> : <Clock className="h-4 w-4 ml-2" />}
            {submitting ? "جاري التسجيل..." : isDone ? "تم التسجيل" : isCheckOut ? "تسجيل انصراف بالنيابة" : "تسجيل حضور بالنيابة"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProxyAttendancePanel;
