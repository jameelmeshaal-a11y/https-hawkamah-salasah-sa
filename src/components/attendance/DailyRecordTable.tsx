import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DailyRecordTable = () => {
  // Empty state for today's records
  const dailyRecords: Array<{
    id: number;
    operation: string;
    time: string;
    type: string;
  }> = [];

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
              {dailyRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    لا توجد سجلات حضور أو انصراف اليوم
                  </TableCell>
                </TableRow>
              ) : (
                dailyRecords.map((record) => (
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
