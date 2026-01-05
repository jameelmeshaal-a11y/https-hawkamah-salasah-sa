import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Upload, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";

const ShareReportWithMembersPage = () => {
  const columns = ["العنوان", "الملف", "تاريخ المشاركة", "عدد المستلمين"];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="مشاركة تقرير مع الأعضاء"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Share2 className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">مشاركة تقرير مع الأعضاء</h1>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">العنوان *</Label>
              <Input id="title" placeholder="أدخل عنوان التقرير" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">الملف *</Label>
              <div className="flex gap-2">
                <Input id="file" placeholder="اختر ملف" className="flex-1" readOnly />
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  إضافة مرفقات
                </Button>
              </div>
            </div>

            <div className="flex justify-start">
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                <Plus className="h-4 w-4" />
                إضافة سجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col} className="text-right">{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <EmptyState message="لا توجد تقارير مشاركة" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ShareReportWithMembersPage;
