import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RecordsTable from "@/components/records/RecordsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const columns = [
  { key: "date", label: "التاريخ" },
  { key: "title", label: "العنوان" },
  { key: "type", label: "النوع" },
  { key: "priority", label: "الأولوية" },
  { key: "status", label: "الحالة" },
];

const InternalAlertsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="internal-alerts"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="التنبيهات الداخلية"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            التنبيهات الداخلية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecordsTable
            columns={columns}
            records={[]}
            emptyMessage="لا توجد تنبيهات داخلية"
            emptyIcon={AlertTriangle}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default InternalAlertsPage;
