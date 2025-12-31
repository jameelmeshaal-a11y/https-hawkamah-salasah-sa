import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RecordsTable from "@/components/records/RecordsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

const columns = [
  { key: "date", label: "التاريخ" },
  { key: "type", label: "النوع" },
  { key: "reason", label: "سبب الرفض" },
  { key: "rejectedBy", label: "رفض بواسطة" },
  { key: "notes", label: "ملاحظات" },
];

const RejectedAttendancePage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="rejected-attendance"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="سجلات الحضور المرفوضة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            سجلات الحضور المرفوضة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecordsTable
            columns={columns}
            records={[]}
            emptyMessage="لا توجد سجلات حضور مرفوضة"
            emptyIcon={XCircle}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default RejectedAttendancePage;
