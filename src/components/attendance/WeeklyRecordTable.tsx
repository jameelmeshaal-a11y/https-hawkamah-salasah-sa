import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAttendance } from "@/hooks/useAttendance";
import { useAuth } from "@/contexts/AuthContext";

const ARABIC_DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const formatTime = (iso: string | null) =>
  iso ? new Date(iso).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }) : "-";

const calcNetHours = (checkIn: string | null, checkOut: string | null) => {
  if (!checkIn || !checkOut) return "-";
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  if (ms <= 0) return "-";
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return `${hours}س ${minutes}د`;
};

const WeeklyRecordTable = () => {
  const { records, loading, currentEmployeeId, resolvingEmployee } = useAttendance();
  const { user } = useAuth();

  const weeklyData = useMemo(() => {
    const data: Array<{
      day: string;
      gregorianDate: string;
      hijriDate: string;
      firstAttendance: string;
      lastDeparture: string;
      netHours: string;
      isToday: boolean;
    }> = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const userRecord = user && currentEmployeeId
        ? records.find((r) => r.employee_id === currentEmployeeId && r.date === dateStr)
        : null;

      data.push({
        day: ARABIC_DAYS[date.getDay()],
        gregorianDate: date.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" }),
        hijriDate: date.toLocaleDateString("ar-SA-u-ca-islamic", { year: "numeric", month: "long", day: "numeric" }),
        firstAttendance: formatTime(userRecord?.check_in ?? null),
        lastDeparture: formatTime(userRecord?.check_out ?? null),
        netHours: calcNetHours(userRecord?.check_in ?? null, userRecord?.check_out ?? null),
        isToday: i === 0,
      });
    }
    return data;
  }, [records, user, currentEmployeeId]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold">السجل الأسبوعي للحضور والانصراف</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-right font-bold">اليوم</TableHead>
                <TableHead className="text-right font-bold">التاريخ الميلادي</TableHead>
                <TableHead className="text-right font-bold">التاريخ الهجري</TableHead>
                <TableHead className="text-center font-bold">أول حضور</TableHead>
                <TableHead className="text-center font-bold">آخر انصراف</TableHead>
                <TableHead className="text-center font-bold">صافي ساعات العمل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading || resolvingEmployee ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">جاري التحميل...</TableCell>
                </TableRow>
              ) : (
                weeklyData.map((row, index) => (
                  <TableRow key={index} className={row.isToday ? "bg-primary/5" : ""}>
                    <TableCell className="font-medium">{row.day}</TableCell>
                    <TableCell>{row.gregorianDate}</TableCell>
                    <TableCell>{row.hijriDate}</TableCell>
                    <TableCell className="text-center">{row.firstAttendance}</TableCell>
                    <TableCell className="text-center">{row.lastDeparture}</TableCell>
                    <TableCell className="text-center">{row.netHours}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyRecordTable;
