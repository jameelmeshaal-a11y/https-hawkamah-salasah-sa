import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RecordsTable from "@/components/records/RecordsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing } from "lucide-react";

const columns = [
  { key: "date", label: "التاريخ" },
  { key: "noteTitle", label: "عنوان المذكرة" },
  { key: "alertTime", label: "وقت التنبيه" },
  { key: "status", label: "الحالة" },
];

const NotesAlertsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="notes-alerts"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="تنبيهات المذكرات الشخصية"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            تنبيهات المذكرات الشخصية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecordsTable
            columns={columns}
            records={[]}
            emptyMessage="لا توجد تنبيهات للمذكرات"
            emptyIcon={BellRing}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default NotesAlertsPage;
