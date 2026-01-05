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

// معيار الالتزام والامتثال - البيانات الكاملة
const complianceData = [
  { id: "1", name: "التزام الجمعية بالضوابط والإجراءات المنظمة للائحة الأساسية للجمعية", maxScore: 5, achievedScore: 0, isMain: true },
  { id: "1.1", name: "وجود واعتماد اللائحة الأساسية للجمعية", maxScore: 3, achievedScore: 0, isMain: false },
  { id: "1.2", name: "تحديد فئات وشروط وأحكام العضوية في الجمعية", maxScore: 1, achievedScore: 0, isMain: false },
  { id: "1.3", name: "إجراءات التعديل على اللائحة الأساسية للجمعية", maxScore: 1, achievedScore: 0, isMain: false },
  { id: "2", name: "قدرة الجمعية على إدارة ملف الجمعية العمومية بكفاءة عالية وتطبيق كافة الأحكام والضوابط لزيادة فاعليتها", maxScore: 26, achievedScore: 0, isMain: true },
  { id: "2.4", name: "حالة اشتراكات أعضاء الجمعية العمومية", maxScore: 3, achievedScore: 0, isMain: false },
  { id: "2.5", name: "حالة اشتراكات أعضاء الجمعية العمومية (سجل الأعضاء)", maxScore: 3, achievedScore: 0, isMain: false },
  { id: "2.6", name: "أحكام عامة للجمعية العمومية", maxScore: 15, achievedScore: 0, isMain: false },
  { id: "2.7", name: "قرارات الجمعية العمومية غير العادية", maxScore: 5, achievedScore: 0, isMain: false },
  { id: "3", name: "التزام الجمعية بالأحكام والضوابط المنظمة لمجلس الإدارة وزيادة فاعليته", maxScore: 30.75, achievedScore: 0, isMain: true },
  { id: "3.8", name: "اختصاصات مجلس الإدارة في التخطيط والرقابة والمتابعة", maxScore: 3, achievedScore: 0, isMain: false },
  { id: "3.9", name: "اعتماد وتفعيل سياسات وأسس الحوكمة", maxScore: 7.75, achievedScore: 0, isMain: false },
  { id: "3.10", name: "المسؤوليات المالية والصلاحيات الممنوحة", maxScore: 2, achievedScore: 0, isMain: false },
  { id: "3.11", name: "انتظام اجتماعات مجلس الإدارة", maxScore: 3, achievedScore: 0, isMain: false },
  { id: "3.12", name: "1- عدم الجمع بين عضوية المجلس والوظيفة في الجمعية 2- عدم الجمع بين عضوية المجلس والعمل في المركز أو الجهة المشرفة 3- عدم العضوية في المجلس لأكثر من دورتين 4- عدم عضوية أحد أعضاء السلك القضائي في مجلس الإدارة", maxScore: 4, achievedScore: 0, isMain: false },
  { id: "3.13", name: "تعريف المجلس الجديد بعمل الجمعية وخاصة الجوانب المالية والقانونية", maxScore: 2, achievedScore: 0, isMain: false },
  { id: "3.14", name: "تعيين المسؤول التنفيذي والمدير المالي", maxScore: 6.5, achievedScore: 0, isMain: false },
  { id: "3.15", name: "انتخاب أعضاء مجلس الإدارة", maxScore: 2.5, achievedScore: 0, isMain: false },
  { id: "4", name: "التزام الجمعية بإنشاء فروعها ومكاتبها وفق ما تحدده الأنظمة واللوائح", maxScore: 2, achievedScore: 0, isMain: true },
  { id: "4.16", name: "إنشاء الفروع داخل المملكة", maxScore: 2, achievedScore: 0, isMain: false },
  { id: "5", name: "التزام الجمعية بإعداد التقارير الدورية المطلوبة ورفعها للمركز خلال الفترات المحددة", maxScore: 6.5, achievedScore: 0, isMain: true },
  { id: "5.17", name: "1- إعداد ورفع التقرير السنوي المعتمد وصورة من الميزانية التقديرية للعام الجديد إلى المركز 2- رفع التقارير المالية للسنة المنتهية إلى المركز خلال 4 أشهر", maxScore: 6.5, achievedScore: 0, isMain: false },
  { id: "6", name: "التزام الجمعية بكافة مستوياتها الإدارية بمكافحة جرائم الإرهاب وتمويله وغسل الأموال من خلال المؤشرات والسياسات والإجراءات الداخلية", maxScore: 7, achievedScore: 0, isMain: true },
  { id: "6.18", name: "وضع التدابير لتحديد وفهم مخاطر جرائم الإرهاب وتمويله والتقييم والتوثيق والتحديث بشكل مستمر", maxScore: 1, achievedScore: 0, isMain: false },
  { id: "6.19", name: "1- التقيد بنظام مكافحة غسل الأموال 2- وضع المؤشرات الدالة على وجود شبهة عمليات غسل أموال", maxScore: 2, achievedScore: 0, isMain: false },
  { id: "6.20", name: "1- الإجراءات المطلوبة عند الاشتباه بجريمة غسل أموال 2- حظر إبلاغ أو تنبيه العميل أو أي شخص آخر ذو علاقة بشبهة غسل الأموال بالعمليات الجارية", maxScore: 2, achievedScore: 0, isMain: false },
  { id: "6.21", name: "تنفيذ البرامج التوعوية الداخلية الوقائية من جرائم الإرهاب وتمويله", maxScore: 2, achievedScore: 0, isMain: false },
  { id: "7", name: "التزام الجمعية بالأنظمة والضوابط عند تنفيذ البرامج والأنشطة داخل نطاقها الإداري أو داخل المملكة أو خارجه", maxScore: 4.5, achievedScore: 0, isMain: true },
  { id: "7.22", name: "1- الحصول على الترخيص وممارسة الأنشطة وفق الأهداف 2- ممارسة الجمعية للأنشطة خارج نطاقها الإداري", maxScore: 4, achievedScore: 0, isMain: false },
  { id: "7.23", name: "1- المشاركة في الفعاليات والعضويات خارج المملكة 2- الحصول على الموافقة للتعاقدات الدولية", maxScore: 0.5, achievedScore: 0, isMain: false },
  { id: "8", name: "التزام الجمعية بالأنظمة والضوابط المنظمة للإيرادات والمصروفات وامتلاك العقارات", maxScore: 7.5, achievedScore: 0, isMain: true },
  { id: "8.24", name: "1- حملات جمع التبرعات واستخدام جزء منها في نشاط آخر غير الغرض الذي جُمعت من أجله 2- صرف أموال الجمعية لتحقيق أغراضها 3- التصرف في فائض الإيرادات لدى الجمعية ووضعها في أوقاف أو استثمارات", maxScore: 5, achievedScore: 0, isMain: false },
  { id: "8.25", name: "استقبال الإعانات من خارج المملكة دون طلب", maxScore: 0.5, achievedScore: 0, isMain: false },
  { id: "8.26", name: "موافقة الجمعية العمومية على التملك", maxScore: 2, achievedScore: 0, isMain: false },
  { id: "9", name: "التزام الجمعية بالأنظمة والضوابط المنظمة للوثائق والسجلات", maxScore: 2.75, achievedScore: 0, isMain: true },
  { id: "9.27", name: "1- حفظ الوثائق والمكاتبات في مقر الجمعية 2- حفظ الوثائق المرتبطة بالمستفيدين 3- حفظ السجلات والمستندات المالية للتقيد بنظام مكافحة غسل الأموال", maxScore: 0.5, achievedScore: 0, isMain: false },
  { id: "9.28", name: "التدوين في سجلات الجمعية العمومية ومجلس الإدارة", maxScore: 1.25, achievedScore: 0, isMain: false },
  { id: "9.29", name: "إصدار بطاقات عضوية الجمعية العمومية", maxScore: 1, achievedScore: 0, isMain: false },
  { id: "10", name: "التزام الجمعية بضوابط تكوين وتنظيم عمل اللجان الدائمة والمؤقتة", maxScore: 8, achievedScore: 0, isMain: true },
  { id: "10.30", name: "قرارات تكوين اللجان الدائمة والمؤقتة وتحديد اختصاصاتها", maxScore: 8, achievedScore: 0, isMain: false },
];

// معيار الشفافية والإفصاح - البيانات الكاملة
const transparencyData = [
  { id: "1", name: "نشر اللوائح والأنظمة والسياسات المعتمدة وإتاحتها للمستهدفين منها", maxScore: 25, achievedScore: 0, isMain: true },
  { id: "1.1", name: "تملك الجمعية موقعاً إلكترونياً وتُنشر فيه جميع بيانات التواصل معها وعناوين منصاتها الإلكترونية الأخرى -إن وُجدت- بما فيها فروعها ومكاتبها", maxScore: 5, achievedScore: 0, isMain: false },
  { id: "1.2", name: "تنشر الجمعية لائحتها الأساسية المعتمدة في موقعها الإلكتروني", maxScore: 6, achievedScore: 0, isMain: false },
  { id: "1.3", name: "تنشر الجمعية لوائحها وسياساتها المعتمدة على موقعها الإلكتروني ومنصاتها المختلفة وتتأكد من قدرة المستهدفين من الوصول إليها", maxScore: 14, achievedScore: 0, isMain: false },
  { id: "2", name: "الإفصاح عن بيانات القائمين على شؤون الجمعية", maxScore: 16, achievedScore: 0, isMain: true },
  { id: "2.4", name: "تفصح الجمعية في موقعها الإلكتروني عن بيانات الجمعية العمومية", maxScore: 4, achievedScore: 0, isMain: false },
  { id: "2.5", name: "تفصح الجمعية في موقعها الإلكتروني عن: 1. أسماء أعضاء مجلس الإدارة ومدة دورة المجلس والمدة المتاحة للأعضاء 2. أسماء اللجان الدائمة وأعضائها واختصاصاتها كما تفصح الجمعية في نموذج الإفصاح عن: 1. العلاقات العائلية أو التجارية بين أعضاء المجلس والقياديين التنفيذيين أو الموظفين في الجمعية 2. تعاقدات الجمعية مع شركة لعضو مجلس إدارة أو أحد من أقاربه من الدرجة الأولى", maxScore: 7, achievedScore: 0, isMain: false },
  { id: "2.6", name: "تفصح الجمعية في موقعها الإلكتروني عن بيانات الموظفين القياديين في الجمعية ومنهم: 1. اسم المدير التنفيذي 2. أسماء مديري الفروع والمكاتب وبيانات التواصل معهم. أسماء نواب المديرين ومديري الإدارات العامة ومن في حكمهم وبيانات التواصل معهم", maxScore: 5, achievedScore: 0, isMain: false },
  { id: "3", name: "نشر بيانات الجمعية وفروعها ومكاتبها والحصول على التغذية الراجعة من أصحاب العلاقة", maxScore: 13, achievedScore: 0, isMain: true },
  { id: "3.7", name: "تتلقى الجمعية الاستفسارات والمقترحات والشكاوى من العاملين والمستفيدين والعملاء لديها ومن كافة أفراد المجتمع من خلال موقعها الإلكتروني ومنصاتها الإلكترونية الأخرى -إن وُجدت- وتزودهم بالتغذية الراجعة", maxScore: 5, achievedScore: 0, isMain: false },
  { id: "3.8", name: "تنشر الجمعية استبيانات محددة ومتنوعة لتقييم أدائها وقياس مدى رضا العاملين والمستفيدين والعملاء والزوار لديها، ثم تقوم باتخاذ التوصيات والقرارات من مجلس الإدارة وتنشر التغذية الراجعة على منصاتها الإلكترونية المناسبة", maxScore: 8, achievedScore: 0, isMain: false },
  { id: "4", name: "نشر أهداف الجمعية وتقارير البرامج والأنشطة المنفذة في جميع فروعها ومكاتبها", maxScore: 22, achievedScore: 0, isMain: true },
  { id: "4.9", name: "تنشر الجمعية رؤيتها ورسالتها وأهدافها الاستراتيجية والتشغيلية على موقعها الإلكتروني", maxScore: 7, achievedScore: 0, isMain: false },
  { id: "4.10", name: "تنشر الجمعية تقارير البرامج والأنشطة بما في ذلك البرامج الاستثمارية أو العقارية وقراراتها في منصاتها الإلكترونية بما فيها موقعها الإلكتروني", maxScore: 6, achievedScore: 0, isMain: false },
  { id: "4.11", name: "تنشر الجمعية الإحصائيات الدقيقة المتعلقة بالمساعدات النقدية والعينية وأعداد وفئات المستفيدين منها في منصاتها الإلكترونية بما فيها موقعها الإلكتروني", maxScore: 7, achievedScore: 0, isMain: false },
  { id: "4.12", name: "تقوم الجمعية بإبلاغ المستهدفين من الأنظمة واللوائح والسياسات عند القيام بنشرها أو تحديثها", maxScore: 2, achievedScore: 0, isMain: false },
  { id: "5", name: "نشر القوائم المالية المدققة والمعتمدة من مجلس الإدارة", maxScore: 13, achievedScore: 0, isMain: true },
  { id: "5.13", name: "تنشر الجمعية التقرير المالي السنوي المعتمد من مراجع الحسابات ومن الجمعية العمومية على موقعها الإلكتروني", maxScore: 13, achievedScore: 0, isMain: false },
  { id: "6", name: "توفير بيانات نموذج الإفصاح وتطابقه مع واقع الجمعية", maxScore: 11, achievedScore: 0, isMain: true },
  { id: "6.14", name: "توفر الجمعية البيانات المطلوبة في نموذج الإفصاح في الوقت المحدد وتتأكد من تطابقها ودقتها وتعتمدها من رئيس مجلس الإدارة", maxScore: 11, achievedScore: 0, isMain: false },
];

// معيار السلامة المالية - البيانات الكاملة
const financialData = [
  { id: "1", name: "التزام الجمعية بإعداد الهيكل التنظيمي للجمعية وتحديد الصلاحيات والاختصاصات المالية", maxScore: 17, achievedScore: 0, isMain: true },
  { id: "1.1", name: "1- الهيكل التنظيمي 2- الوصف الوظيفي للوظائف المالية", maxScore: 8, achievedScore: 0, isMain: false },
  { id: "1.2", name: "الصلاحيات المالية والإدارية", maxScore: 5, achievedScore: 0, isMain: false },
  { id: "1.3", name: "اختصاصات مجلس الإدارة في الرقابة والمتابعة", maxScore: 4, achievedScore: 0, isMain: false },
  { id: "2", name: "التزام الجمعية بإعداد السياسات المالية وتفعيلها داخل الجمعية", maxScore: 51, achievedScore: 0, isMain: true },
  { id: "2.4", name: "لائحة السياسات المالية", maxScore: 7, achievedScore: 0, isMain: false },
  { id: "2.5", name: "دليل الإجراءات المالي", maxScore: 7, achievedScore: 0, isMain: false },
  { id: "2.6", name: "1- جمع التبرعات واستخدام جزء منها في نشاط آخر غير الغرض الذي جُمعت من أجله 2- استقبال الإعانات من خارج المملكة 3- اشتراكات الأعضاء 4- لائحة المشتريات 5- سياسات الصرف للبرامج", maxScore: 19, achievedScore: 0, isMain: false },
  { id: "2.7", name: "1- موافقة الجمعية العمومية على التملك 2- التصرف في فائض الإيرادات لدى الجمعية ووضعها في أوقاف أو استثمارات", maxScore: 18, achievedScore: 0, isMain: false },
  { id: "3", name: "التزام الجمعية بالأنظمة والضوابط المنظمة للسجلات والمستندات", maxScore: 6, achievedScore: 0, isMain: true },
  { id: "3.8", name: "تفعيل السجلات الإدارية والمحاسبية", maxScore: 6, achievedScore: 0, isMain: false },
  { id: "4", name: "التزام الجمعية بإعداد التقارير الدورية المطلوبة ورفعها للمركز خلال الفترات المحددة", maxScore: 4, achievedScore: 0, isMain: true },
  { id: "4.9", name: "إعداد التقارير المالية", maxScore: 4, achievedScore: 0, isMain: false },
  { id: "5", name: "التزام الجمعية بالأنظمة والضوابط المنظمة للإجراءات المالية والمحاسبية للجمعيات", maxScore: 22, achievedScore: 0, isMain: true },
  { id: "5.10", name: "تطبيق المعايير المحاسبية المعتمدة", maxScore: 6, achievedScore: 0, isMain: false },
  { id: "5.11", name: "1- استخدام البرنامج المحاسبي 2- الالتزام بدليل الحسابات الموحد", maxScore: 16, achievedScore: 0, isMain: false },
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
