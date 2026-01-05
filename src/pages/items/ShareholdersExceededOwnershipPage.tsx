import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ShareholdersExceededOwnershipPage = () => {
  const columns = [
    { key: "accountNumber", label: "رقم الحساب" },
    { key: "preview", label: "معاينة" },
    { key: "name", label: "الإسم" },
    { key: "membershipNumber", label: "رقم العضوية" },
    { key: "stockCount", label: "عدد الأسهم" },
    { key: "ownershipPercentage", label: "نسبة الملكية" },
    { key: "allowedLimit", label: "الحد المسموح" },
  ];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="مساهمين تعدوا نسبة الملكية"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-yellow-600" />
          </div>
          <h1 className="text-xl font-bold">مساهمين تعدوا نسبة الملكية</h1>
        </div>

        {/* Alert */}
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <p className="text-amber-800">
            يظهر هذا الجدول المساهمين الذين يمتلكون نسبة أكبر من 10% من الأسهم
          </p>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((col) => (
                      <TableHead key={col.key} className="text-right whitespace-nowrap">
                        {col.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                      لا توجد بيانات متوفرة في الجدول
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ShareholdersExceededOwnershipPage;
