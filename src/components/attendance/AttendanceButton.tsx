import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AttendanceButton = () => {
  const handleAttendance = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("ar-SA", { 
      hour: "2-digit", 
      minute: "2-digit",
      hour12: true 
    });
    toast.success(`تم تسجيل حضورك في الساعة ${time}`);
  };

  return (
    <div className="flex justify-center">
      <Button 
        onClick={handleAttendance}
        size="lg"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <Clock className="h-6 w-6 ml-2" />
        تسجيل الحضور
      </Button>
    </div>
  );
};

export default AttendanceButton;
