import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RecordsTable from "@/components/records/RecordsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const columns = [
  { key: "date", label: "التاريخ" },
  { key: "day", label: "اليوم" },
  { key: "checkIn", label: "وقت الحضور" },
  { key: "checkOut", label: "وقت الانصراف" },
  { key: "workHours", label: "ساعات العمل" },
  { key: "status", label: "الحالة" },
];

const AttendanceRecordsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="attendance-records"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="سجلات الحضور والانصراف"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            سجلات الحضور والانصراف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecordsTable
            columns={columns}
            records={[]}
            emptyMessage="لا توجد سجلات حضور"
            emptyIcon={Clock}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default AttendanceRecordsPage;
