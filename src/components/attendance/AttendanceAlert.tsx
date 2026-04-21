import { useMemo } from "react";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAttendance } from "@/hooks/useAttendance";

const AttendanceAlert = () => {
  const { records, currentEmployeeId, resolvingEmployee, loading } = useAttendance();
  const todayStr = new Date().toISOString().split("T")[0];

  const todayRecord = useMemo(() => {
    if (!currentEmployeeId) return null;
    return records.find((r) => r.employee_id === currentEmployeeId && r.date === todayStr);
  }, [records, currentEmployeeId, todayStr]);

  if (loading || resolvingEmployee) {
    return (
      <Alert className="border-muted">
        <Clock className="h-4 w-4" />
        <AlertDescription className="font-medium">جاري التحقق من حالة الحضور...</AlertDescription>
      </Alert>
    );
  }

  if (todayRecord?.check_in && todayRecord?.check_out) {
    return (
      <Alert className="border-emerald-500/50 bg-emerald-500/10">
        <CheckCircle2 className="h-4 w-4 text-emerald-700" />
        <AlertDescription className="text-emerald-800 font-medium">
          تم تسجيل الحضور والانصراف لهذا اليوم
        </AlertDescription>
      </Alert>
    );
  }

  if (todayRecord?.check_in && !todayRecord?.check_out) {
    return (
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <Clock className="h-4 w-4 text-amber-700" />
        <AlertDescription className="text-amber-800 font-medium">
          تم تسجيل الحضور — لم يتم تسجيل الانصراف بعد
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-destructive font-medium">
        لم تقم بتسجيل حضورك اليوم
      </AlertDescription>
    </Alert>
  );
};

export default AttendanceAlert;
