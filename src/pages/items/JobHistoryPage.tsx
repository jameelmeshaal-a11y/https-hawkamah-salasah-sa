import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RecordsTable from "@/components/records/RecordsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

const columns = [
  { key: "date", label: "التاريخ" },
  { key: "action", label: "الإجراء" },
  { key: "previousValue", label: "القيمة السابقة" },
  { key: "newValue", label: "القيمة الجديدة" },
  { key: "approvedBy", label: "اعتمد بواسطة" },
];

const JobHistoryPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="job-history"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="السجل الوظيفي"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            السجل الوظيفي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecordsTable
            columns={columns}
            records={[]}
            emptyMessage="لا يوجد سجل وظيفي"
            emptyIcon={History}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default JobHistoryPage;
