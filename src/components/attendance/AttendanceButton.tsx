import { useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAttendance } from "@/hooks/useAttendance";
import { useAuth } from "@/contexts/AuthContext";

const AttendanceButton = () => {
  const { addRecord } = useAttendance();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    if (!user) return;
    setLoading(true);
    await addRecord({
      employee_id: user.id,
      date: new Date().toISOString().split('T')[0],
      check_in: new Date().toISOString(),
      status: 'present',
    });
    setLoading(false);
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={handleAttendance}
        disabled={loading}
        size="lg"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <Clock className="h-6 w-6 ml-2" />
        {loading ? "جاري التسجيل..." : "تسجيل الحضور"}
      </Button>
    </div>
  );
};

export default AttendanceButton;
