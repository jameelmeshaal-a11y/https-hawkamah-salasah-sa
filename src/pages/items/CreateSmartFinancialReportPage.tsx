import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Edit, Copy } from "lucide-react";

interface SmartReport {
  id: number;
  type: string;
  year: string;
  title: string;
}

const CreateSmartFinancialReportPage = () => {
  const [reportType, setReportType] = useState("");
  const [year, setYear] = useState("2026");

  const existingReports: SmartReport[] = [
    { id: 1, type: "مقارنة", year: "2023", title: "تقرير مقارنة 2023" },
    { id: 2, type: "حسابات مجمعة", year: "2023", title: "تقرير حسابات مجمعة حسب التصنيف الوظيفي 2023" },
    { id: 3, type: "حركة بند", year: "2023", title: "تقرير حركة بند الزكاة 2023" },
    { id: 4, type: "التزامات", year: "2023", title: "تقرير بالالتزامات ومتبقي الأصول 2023" },
    { id: 5, type: "صافيات مجمعة", year: "2023", title: "تقرير صافيات مجمعة حسب التصنيف الوظيفي 2023" },
    { id: 6, type: "حركة بند", year: "2022", title: "تقرير حركة بند الزكاة 2022" },
    { id: 7, type: "بيانات", year: "2022", title: "تقرير بيانات 2022" },
    { id: 8, type: "تبرعات", year: "2022", title: "تقرير التبرعات والإيرادات 2022" },
  ];

  const reportTypes = [
    "تقرير مقارنة",
    "تقرير حسابات مجمعة حسب التصنيف الوظيفي",
    "تقرير حركة بند الزكاة",
    "تقرير بالالتزامات ومتبقي الأصول",
    "تقرير صافيات مجمعة حسب التصنيف الوظيفي",
    "تقرير التبرعات والإيرادات",
    "تقرير المصروفات",
    "تقرير الأصول",
  ];

  const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"];

  return (
    <InnerPageLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold">إنشاء تقرير مالي ذكي</h1>
        </div>

        {/* Create Report Form */}
        <div className="bg-card border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>نوع التقرير *</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع التقرير" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type, index) => (
                    <SelectItem key={index} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>السنة *</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full">
                استمرار
              </Button>
            </div>
          </div>
        </div>

        {/* Existing Reports Table */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">التقارير الموجودة</h2>
          <div className="bg-card border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center font-bold w-12">#</TableHead>
                  <TableHead className="text-right font-bold">نوع</TableHead>
                  <TableHead className="text-right font-bold">العام</TableHead>
                  <TableHead className="text-right font-bold">عنوان التقرير</TableHead>
                  <TableHead className="text-center font-bold w-32">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {existingReports.map((report, index) => (
                  <TableRow key={report.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.year}</TableCell>
                    <TableCell className="text-primary hover:underline cursor-pointer">
                      {report.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-600 hover:bg-gray-50">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default CreateSmartFinancialReportPage;
