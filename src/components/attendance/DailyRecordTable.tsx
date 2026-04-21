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

const formatTime = (iso: string | null) =>
  iso ? new Date(iso).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }) : "-";

const DailyRecordTable = () => {
  const { records, loading, currentEmployeeId, resolvingEmployee } = useAttendance();
  const { user } = useAuth();

  const todayStr = new Date().toISOString().split("T")[0];

  const rows = useMemo(() => {
    if (!user || !currentEmployeeId) return [];
    const todayRecords = records.filter(
      (r) => r.employee_id === currentEmployeeId && r.date === todayStr
    );
    const ops: { id: number; operation: string; time: string; type: string }[] = [];
    let counter = 1;
    todayRecords.forEach((r) => {
      if (r.check_in) ops.push({ id: counter++, operation: "تسجيل حضور", time: formatTime(r.check_in), type: "حضور" });
      if (r.check_out) ops.push({ id: counter++, operation: "تسجيل انصراف", time: formatTime(r.check_out), type: "انصراف" });
    });
    return ops;
  }, [records, user, currentEmployeeId, todayStr]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold">سجل الحضور والانصراف اليومي</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-center font-bold w-16">#</TableHead>
                <TableHead className="text-right font-bold">العملية</TableHead>
                <TableHead className="text-center font-bold">الوقت</TableHead>
                <TableHead className="text-center font-bold">نوع العملية</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading || resolvingEmployee ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">جاري التحميل...</TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    لا توجد سجلات حضور أو انصراف اليوم
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="text-center">{record.id}</TableCell>
                    <TableCell>{record.operation}</TableCell>
                    <TableCell className="text-center">{record.time}</TableCell>
                    <TableCell className="text-center">{record.type}</TableCell>
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

export default DailyRecordTable;
