import InnerPageLayout from "@/components/layout/InnerPageLayout";
import RecordsTable from "@/components/records/RecordsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

const columns = [
  { key: "indicatorName", label: "اسم المؤشر" },
  { key: "target", label: "المستهدف" },
  { key: "actual", label: "المحقق" },
  { key: "percentage", label: "نسبة الإنجاز" },
  { 
    key: "status", 
    label: "الحالة",
    render: (value: unknown) => {
      const status = value as string;
      const variants: Record<string, "default" | "secondary" | "destructive"> = {
        "متحقق": "default",
        "قيد التنفيذ": "secondary",
        "متأخر": "destructive",
      };
      return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
    }
  },
];

const AssignedIndicatorsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="assigned-indicators"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="مؤشرات الخطة المسندة"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            مؤشرات الخطة المسندة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecordsTable
            columns={columns}
            records={[]}
            emptyMessage="لا توجد مؤشرات مسندة"
            emptyIcon={Target}
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default AssignedIndicatorsPage;
