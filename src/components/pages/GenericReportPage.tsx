import { LucideIcon, Download, FileText, Calendar, Filter, Printer } from "lucide-react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmptyState from "@/components/shared/EmptyState";

interface GenericReportPageProps {
  title: string;
  moduleId: string;
  itemSlug: string;
  sectionTitle: string;
  moduleTitle: string;
  icon: LucideIcon;
  filters?: { name: string; placeholder: string; options: { value: string; label: string }[] }[];
  showChart?: boolean;
}

const GenericReportPage = ({
  title,
  moduleId,
  itemSlug,
  sectionTitle,
  moduleTitle,
  icon: Icon,
  filters = [],
  showChart = false,
}: GenericReportPageProps) => {
  return (
    <InnerPageLayout
      moduleId={moduleId}
      itemSlug={itemSlug}
      sectionTitle={sectionTitle}
      moduleTitle={moduleTitle}
      title={title}
    >
      <div className="space-y-4" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              طباعة
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              PDF
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Excel
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-4 w-4" />
              فلاتر التقرير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">من تاريخ</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">إلى تاريخ</label>
                <Input type="date" />
              </div>
              {filters.map((filter) => (
                <div key={filter.name} className="space-y-2">
                  <label className="text-sm font-medium">{filter.name}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={filter.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <div className="flex items-end">
                <Button className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  عرض التقرير
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Area */}
        {showChart && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">الرسم البياني</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">سيتم عرض الرسم البياني هنا</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Report Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">نتائج التقرير</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={Icon}
              message="اختر معايير التقرير ثم اضغط على عرض التقرير"
            />
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default GenericReportPage;
