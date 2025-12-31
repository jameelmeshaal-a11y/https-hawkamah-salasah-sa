import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AttendanceAlert = () => {
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
