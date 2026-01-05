import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreditCard, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IssueMembersCardsPage = () => {
  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="إصدار بطاقات الأعضاء"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <CreditCard className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">إصدار بطاقات الأعضاء</h1>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>ملف الأعضاء *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="بدون" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">بدون</SelectItem>
                  <SelectItem value="all">جميع الأعضاء</SelectItem>
                  <SelectItem value="active">الأعضاء النشطين</SelectItem>
                  <SelectItem value="new">الأعضاء الجدد</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-start">
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                <Download className="h-4 w-4" />
                تصدير
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default IssueMembersCardsPage;
