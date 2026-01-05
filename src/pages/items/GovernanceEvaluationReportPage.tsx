import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const yearOptions = ["2024", "2023", "2022", "2021", "2020"];

// بيانات معيار الالتزام والامتثال
const complianceData = [
  { id: "1", name: "التزام الجمعية بالضوابط والإجراءات للائحة الأساسية", maxScore: 5, achievedScore: 5, isMain: true },
  { id: "1.1", name: "وجود واعتماد اللائحة الأساسية للجمعية", maxScore: 3, achievedScore: 3, isMain: false },
  { id: "1.2", name: "تحديد فئات وشروط وأحكام العضوية", maxScore: 1, achievedScore: 1, isMain: false },
  { id: "1.3", name: "إجراءات التعديل على اللائحة", maxScore: 1, achievedScore: 1, isMain: false },
  { id: "2", name: "قدرة الجمعية على إدارة ملف الجمعية العمومية بكفاءة", maxScore: 26, achievedScore: 20, isMain: true },
  { id: "2.1", name: "حالة اشتراكات أعضاء الجمعية العمومية", maxScore: 3, achievedScore: 3, isMain: false },
  { id: "2.2", name: "الالتزام بعقد اجتماع الجمعية العمومية العادية", maxScore: 5, achievedScore: 5, isMain: false },
  { id: "2.3", name: "الالتزام بإجراءات الدعوة للجمعية العمومية", maxScore: 3, achievedScore: 2, isMain: false },
  { id: "2.4", name: "توثيق محاضر اجتماعات الجمعية العمومية", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "2.5", name: "الالتزام بالنصاب القانوني للجمعية العمومية", maxScore: 5, achievedScore: 3, isMain: false },
  { id: "2.6", name: "آلية التصويت في الجمعية العمومية", maxScore: 5, achievedScore: 3, isMain: false },
  { id: "3", name: "قدرة الجمعية على إدارة ملف مجلس الإدارة بكفاءة", maxScore: 30, achievedScore: 25, isMain: true },
  { id: "3.1", name: "الالتزام بالحد الأدنى لعدد أعضاء مجلس الإدارة", maxScore: 3, achievedScore: 3, isMain: false },
  { id: "3.2", name: "الالتزام بشروط عضوية مجلس الإدارة", maxScore: 5, achievedScore: 5, isMain: false },
  { id: "3.3", name: "توزيع المهام والمسؤوليات بين أعضاء المجلس", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "3.4", name: "انتظام اجتماعات مجلس الإدارة", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "3.5", name: "توثيق محاضر اجتماعات مجلس الإدارة", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "3.6", name: "وجود لجان منبثقة من مجلس الإدارة", maxScore: 7, achievedScore: 5, isMain: false },
  { id: "4", name: "التزام الجمعية بالأنظمة واللوائح ذات العلاقة", maxScore: 20, achievedScore: 15, isMain: true },
  { id: "4.1", name: "الالتزام بنظام الجمعيات والمؤسسات الأهلية", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "4.2", name: "الالتزام باللائحة التنفيذية للنظام", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "4.3", name: "الالتزام بالأدلة والسياسات الصادرة من الجهة المشرفة", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "4.4", name: "الالتزام بمتطلبات الترخيص والتجديد", maxScore: 5, achievedScore: 3, isMain: false },
  { id: "5", name: "إدارة الموارد البشرية بكفاءة", maxScore: 19, achievedScore: 14, isMain: true },
  { id: "5.1", name: "وجود هيكل تنظيمي معتمد", maxScore: 4, achievedScore: 3, isMain: false },
  { id: "5.2", name: "وجود لوائح وسياسات للموارد البشرية", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "5.3", name: "الالتزام بنظام العمل", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "5.4", name: "وجود برامج تطوير للموظفين", maxScore: 5, achievedScore: 3, isMain: false },
];

// بيانات معيار الشفافية والإفصاح
const transparencyData = [
  { id: "1", name: "نشر اللوائح والأنظمة والسياسات المعتمدة", maxScore: 25, achievedScore: 20, isMain: true },
  { id: "1.1", name: "تملك الجمعية موقعاً إلكترونياً", maxScore: 5, achievedScore: 5, isMain: false },
  { id: "1.2", name: "نشر اللائحة الأساسية على الموقع", maxScore: 5, achievedScore: 5, isMain: false },
  { id: "1.3", name: "نشر التقارير السنوية", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "1.4", name: "نشر القوائم المالية المعتمدة", maxScore: 5, achievedScore: 3, isMain: false },
  { id: "1.5", name: "نشر معلومات التواصل", maxScore: 5, achievedScore: 3, isMain: false },
  { id: "2", name: "الإفصاح عن المعلومات المالية", maxScore: 30, achievedScore: 22, isMain: true },
  { id: "2.1", name: "إعداد القوائم المالية وفق المعايير المحاسبية", maxScore: 10, achievedScore: 8, isMain: false },
  { id: "2.2", name: "مراجعة القوائم المالية من مراجع خارجي", maxScore: 10, achievedScore: 8, isMain: false },
  { id: "2.3", name: "الإفصاح عن مصادر التمويل", maxScore: 10, achievedScore: 6, isMain: false },
  { id: "3", name: "الإفصاح عن الأنشطة والبرامج", maxScore: 20, achievedScore: 15, isMain: true },
  { id: "3.1", name: "نشر تقارير الأنشطة والبرامج", maxScore: 10, achievedScore: 8, isMain: false },
  { id: "3.2", name: "الإفصاح عن أثر البرامج والمشاريع", maxScore: 10, achievedScore: 7, isMain: false },
  { id: "4", name: "الإفصاح عن العلاقات والشراكات", maxScore: 15, achievedScore: 10, isMain: true },
  { id: "4.1", name: "الإفصاح عن الشركاء الاستراتيجيين", maxScore: 8, achievedScore: 5, isMain: false },
  { id: "4.2", name: "الإفصاح عن الداعمين والممولين", maxScore: 7, achievedScore: 5, isMain: false },
  { id: "5", name: "آليات التواصل مع أصحاب المصلحة", maxScore: 10, achievedScore: 7, isMain: true },
  { id: "5.1", name: "وجود قنوات تواصل فعالة", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "5.2", name: "الاستجابة للاستفسارات والشكاوى", maxScore: 5, achievedScore: 3, isMain: false },
];

// بيانات معيار السلامة المالية
const financialData = [
  { id: "1", name: "التزام الجمعية بإعداد الهيكل التنظيمي المالي", maxScore: 17, achievedScore: 14, isMain: true },
  { id: "1.1", name: "وجود إدارة مالية متخصصة", maxScore: 5, achievedScore: 5, isMain: false },
  { id: "1.2", name: "فصل المهام المالية", maxScore: 4, achievedScore: 3, isMain: false },
  { id: "1.3", name: "وجود لجنة مراجعة داخلية", maxScore: 4, achievedScore: 3, isMain: false },
  { id: "1.4", name: "وجود سياسات وإجراءات مالية معتمدة", maxScore: 4, achievedScore: 3, isMain: false },
  { id: "2", name: "إدارة الموارد المالية بكفاءة", maxScore: 25, achievedScore: 18, isMain: true },
  { id: "2.1", name: "إعداد الموازنة التقديرية السنوية", maxScore: 7, achievedScore: 5, isMain: false },
  { id: "2.2", name: "متابعة تنفيذ الموازنة", maxScore: 6, achievedScore: 5, isMain: false },
  { id: "2.3", name: "إدارة التدفقات النقدية", maxScore: 6, achievedScore: 4, isMain: false },
  { id: "2.4", name: "إدارة الاستثمارات", maxScore: 6, achievedScore: 4, isMain: false },
  { id: "3", name: "الرقابة المالية الداخلية", maxScore: 25, achievedScore: 19, isMain: true },
  { id: "3.1", name: "وجود نظام رقابة داخلية فعال", maxScore: 8, achievedScore: 6, isMain: false },
  { id: "3.2", name: "إجراء المراجعة الداخلية الدورية", maxScore: 9, achievedScore: 7, isMain: false },
  { id: "3.3", name: "معالجة الملاحظات والتوصيات", maxScore: 8, achievedScore: 6, isMain: false },
  { id: "4", name: "حماية الأصول والممتلكات", maxScore: 18, achievedScore: 13, isMain: true },
  { id: "4.1", name: "جرد الأصول الثابتة دورياً", maxScore: 6, achievedScore: 5, isMain: false },
  { id: "4.2", name: "التأمين على الأصول", maxScore: 6, achievedScore: 4, isMain: false },
  { id: "4.3", name: "إجراءات حفظ المستندات المالية", maxScore: 6, achievedScore: 4, isMain: false },
  { id: "5", name: "الالتزام بالمتطلبات الضريبية والزكوية", maxScore: 15, achievedScore: 11, isMain: true },
  { id: "5.1", name: "التسجيل في الجهات الضريبية", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "5.2", name: "تقديم الإقرارات في مواعيدها", maxScore: 5, achievedScore: 4, isMain: false },
  { id: "5.3", name: "الاحتفاظ بالسجلات الضريبية", maxScore: 5, achievedScore: 3, isMain: false },
];

const GovernanceEvaluationReportPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [showReport, setShowReport] = useState(false);

  const calculateTotal = (data: typeof complianceData) => {
    const mainItems = data.filter(item => item.isMain);
    const maxTotal = mainItems.reduce((sum, item) => sum + item.maxScore, 0);
    const achievedTotal = mainItems.reduce((sum, item) => sum + item.achievedScore, 0);
    const percentage = maxTotal > 0 ? Math.round((achievedTotal / maxTotal) * 100) : 0;
    return { maxTotal, achievedTotal, percentage };
  };

  const complianceTotal = calculateTotal(complianceData);
  const transparencyTotal = calculateTotal(transparencyData);
  const financialTotal = calculateTotal(financialData);

  const renderCriteriaTable = (
    title: string,
    data: typeof complianceData,
    totals: { maxTotal: number; achievedTotal: number; percentage: number }
  ) => (
    <div className="mb-6">
      <div className="bg-gray-700 text-white p-3 font-bold text-right">
        {title}
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center border w-16">#</TableHead>
            <TableHead className="text-right border">المؤشر / الممارسة</TableHead>
            <TableHead className="text-center border w-28">الدرجة القصوى</TableHead>
            <TableHead className="text-center border w-28">الدرجة المحققة</TableHead>
            <TableHead className="text-center border w-24">النسبة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const percentage = item.maxScore > 0 ? Math.round((item.achievedScore / item.maxScore) * 100) : 0;
            return (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="text-center border font-medium">{item.id}</TableCell>
                <TableCell className={`text-right border ${item.isMain ? 'font-bold' : 'pr-8'}`}>
                  {item.name}
                </TableCell>
                <TableCell className="text-center border">{item.maxScore}</TableCell>
                <TableCell className="text-center border">{item.achievedScore}</TableCell>
                <TableCell className="text-center border">{percentage}%</TableCell>
              </TableRow>
            );
          })}
          <TableRow className="bg-gray-200 font-bold">
            <TableCell className="text-center border" colSpan={2}>المجموع</TableCell>
            <TableCell className="text-center border">{totals.maxTotal}</TableCell>
            <TableCell className="text-center border">{totals.achievedTotal}</TableCell>
            <TableCell className="text-center border">{totals.percentage}%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );

  if (!showReport) {
    return (
      <InnerPageLayout
        moduleId="excellence"
        itemSlug="governance-evaluation-report"
        moduleTitle="إدارة التميز المؤسسي"
        sectionTitle="إدارة الحوكمة"
        title="تقرير تقييم الحوكمة"
      >
        <Card className="max-w-md mx-auto mt-8">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                العام: <span className="text-red-500">*</span>
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر العام" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => setShowReport(true)}
            >
              استمرار
            </Button>
          </CardContent>
        </Card>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="governance-evaluation-report"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الحوكمة"
      title={`تقرير الحوكمة لعام ${selectedYear}`}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setShowReport(false)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للاختيار
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            تصدير اكسيل
          </Button>
        </div>

        {renderCriteriaTable("معيار الالتزام والامتثال", complianceData, complianceTotal)}
        {renderCriteriaTable("معيار الشفافية والإفصاح", transparencyData, transparencyTotal)}
        {renderCriteriaTable("معيار السلامة المالية", financialData, financialTotal)}

        {/* ملخص النتائج الإجمالية */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 text-right">ملخص النتائج الإجمالية</h3>
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-right border">المعيار</TableHead>
                  <TableHead className="text-center border w-28">الدرجة القصوى</TableHead>
                  <TableHead className="text-center border w-28">الدرجة المحققة</TableHead>
                  <TableHead className="text-center border w-24">النسبة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-right border font-medium">الالتزام والامتثال</TableCell>
                  <TableCell className="text-center border">{complianceTotal.maxTotal}</TableCell>
                  <TableCell className="text-center border">{complianceTotal.achievedTotal}</TableCell>
                  <TableCell className="text-center border">{complianceTotal.percentage}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-right border font-medium">الشفافية والإفصاح</TableCell>
                  <TableCell className="text-center border">{transparencyTotal.maxTotal}</TableCell>
                  <TableCell className="text-center border">{transparencyTotal.achievedTotal}</TableCell>
                  <TableCell className="text-center border">{transparencyTotal.percentage}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-right border font-medium">السلامة المالية</TableCell>
                  <TableCell className="text-center border">{financialTotal.maxTotal}</TableCell>
                  <TableCell className="text-center border">{financialTotal.achievedTotal}</TableCell>
                  <TableCell className="text-center border">{financialTotal.percentage}%</TableCell>
                </TableRow>
                <TableRow className="bg-gray-200 font-bold">
                  <TableCell className="text-right border">الإجمالي</TableCell>
                  <TableCell className="text-center border">
                    {complianceTotal.maxTotal + transparencyTotal.maxTotal + financialTotal.maxTotal}
                  </TableCell>
                  <TableCell className="text-center border">
                    {complianceTotal.achievedTotal + transparencyTotal.achievedTotal + financialTotal.achievedTotal}
                  </TableCell>
                  <TableCell className="text-center border">
                    {Math.round(
                      ((complianceTotal.achievedTotal + transparencyTotal.achievedTotal + financialTotal.achievedTotal) /
                        (complianceTotal.maxTotal + transparencyTotal.maxTotal + financialTotal.maxTotal)) * 100
                    )}%
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

export default GovernanceEvaluationReportPage;
