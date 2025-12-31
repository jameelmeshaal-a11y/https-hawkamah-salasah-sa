import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Generate last 7 days data
const generateWeeklyData = () => {
  const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  const data = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const dayName = days[date.getDay()];
    const gregorianDate = date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    // Hijri date (approximate)
    const hijriDate = date.toLocaleDateString("ar-SA-u-ca-islamic", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    data.push({
      day: dayName,
      gregorianDate,
      hijriDate,
      firstAttendance: "-",
      lastDeparture: "-",
      netHours: "-",
    });
  }
  
  return data;
};

const WeeklyRecordTable = () => {
  const weeklyData = generateWeeklyData();

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
              {weeklyData.map((row, index) => (
                <TableRow key={index} className={index === 0 ? "bg-primary/5" : ""}>
                  <TableCell className="font-medium">{row.day}</TableCell>
                  <TableCell>{row.gregorianDate}</TableCell>
                  <TableCell>{row.hijriDate}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.firstAttendance}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.lastDeparture}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.netHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyRecordTable;
