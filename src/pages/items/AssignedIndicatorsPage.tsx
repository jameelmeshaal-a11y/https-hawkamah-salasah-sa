import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Target } from "lucide-react";

const tableColumns = [
  "الخطة الإستراتيجية",
  "المنظور",
  "الهدف الإستراتيجي",
  "عنوان المؤشر",
  "نوع المؤشر",
  "دورية القياس",
  "نوع القياس",
  "الإجمالي الإستراتيجي",
  "الإجمالي المتحقق",
  "تاريخ البداية",
  "تاريخ النهاية",
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
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5" />
            مؤشرات الخطة المسندة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {tableColumns.map((column, index) => (
                    <TableHead key={index} className="text-center whitespace-nowrap">
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={tableColumns.length} className="text-center py-12 text-muted-foreground">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    لا تملك مؤشرات
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default AssignedIndicatorsPage;
