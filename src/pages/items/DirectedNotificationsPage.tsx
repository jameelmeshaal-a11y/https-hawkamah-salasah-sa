import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RecordsTable from "@/components/records/RecordsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const columns = [
  { key: "date", label: "التاريخ" },
  { key: "title", label: "العنوان" },
  { key: "sender", label: "المرسل" },
  { key: "type", label: "النوع" },
  { key: "status", label: "الحالة" },
];

const DirectedNotificationsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="directed-notifications"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="الإشعارات الموجهة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            الإشعارات الموجهة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecordsTable
            columns={columns}
            records={[]}
            emptyMessage="لا توجد إشعارات موجهة"
            emptyIcon={Bell}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default DirectedNotificationsPage;
