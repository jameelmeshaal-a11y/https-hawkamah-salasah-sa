import { useState, useMemo } from "react";
import { Clock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAttendance } from "@/hooks/useAttendance";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AttendanceButton = () => {
  const { records, addRecord, updateRecord, currentEmployeeId, resolvingEmployee } = useAttendance();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  // Find today's open record for this user (check_in set, check_out null)
  const todayRecord = useMemo(() => {
    if (!user || !currentEmployeeId) return null;
    return records.find(
      (r) => r.employee_id === currentEmployeeId && r.date === todayStr
    );
  }, [records, user, currentEmployeeId, todayStr]);

  const isCheckOut = !!todayRecord && !!todayRecord.check_in && !todayRecord.check_out;
  const isDoneForToday = !!todayRecord && !!todayRecord.check_in && !!todayRecord.check_out;

  const handleAttendance = async () => {
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً");
      return;
    }
    if (!currentEmployeeId) {
      toast.error("جاري تهيئة ملف الموظف، حاول مرة أخرى خلال لحظات");
      return;
    }
    if (isDoneForToday) {
      toast.info("تم تسجيل الحضور والانصراف لهذا اليوم بالفعل");
      return;
    }
    setLoading(true);
    try {
      if (isCheckOut && todayRecord) {
        await updateRecord(todayRecord.id, { check_out: new Date().toISOString() });
      } else {
        await addRecord({
          employee_id: currentEmployeeId,
          date: todayStr,
          check_in: new Date().toISOString(),
          status: "present",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const label = loading
    ? "جاري التسجيل..."
    : resolvingEmployee
    ? "جاري التهيئة..."
    : isDoneForToday
    ? "تم التسجيل اليوم"
    : isCheckOut
    ? "تسجيل الانصراف"
    : "تسجيل الحضور";

  const Icon = isCheckOut ? LogOut : Clock;

  return (
    <div className="flex justify-center">
      <Button
        onClick={handleAttendance}
        disabled={loading || resolvingEmployee || isDoneForToday || !currentEmployeeId}
        size="lg"
        className={`text-white px-12 py-6 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all ${
          isCheckOut ? "bg-orange-600 hover:bg-orange-700" : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        <Icon className="h-6 w-6 ml-2" />
        {label}
      </Button>
    </div>
  );
};

export default AttendanceButton;
