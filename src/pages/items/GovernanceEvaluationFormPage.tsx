import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { FileSpreadsheet } from "lucide-react";

const criteriaOptions = [
  { value: "commitment", label: "الالتزام و الامتثال" },
  { value: "transparency", label: "الشفافية والإفصاح" },
  { value: "financial", label: "السلامة المالية" },
];

const evaluationData = [
  {
    indicatorNo: 1,
    practiceNo: 1,
    questionNo: 1,
    question: "هل يوجد اعتماد اللائحة الأساسية للجمعية من قبل الجمعية العمومية؟",
    score: 3.00,
    evaluationMethod: "مكتبي",
    verificationMethod: "اللائحة الأساسية للجمعية معتمدة من الجمعية العمومية",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
  {
    indicatorNo: 1,
    practiceNo: 2,
    questionNo: 1,
    question: "هل يوجد تحديد فئات العضوية في اللائحة الأساسية؟",
    score: 0.50,
    evaluationMethod: "مكتبي",
    verificationMethod: "اللائحة الأساسية تتضمن فئات العضوية",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
  {
    indicatorNo: 1,
    practiceNo: 2,
    questionNo: 2,
    question: "هل يوجد تحديد شروط العضوية في اللائحة الأساسية؟",
    score: 0.50,
    evaluationMethod: "مكتبي",
    verificationMethod: "اللائحة الأساسية تتضمن شروط العضوية",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
  {
    indicatorNo: 1,
    practiceNo: 3,
    questionNo: 1,
    question: "هل يوجد تحديد إجراءات التعديل على اللائحة الأساسية؟",
    score: 1.00,
    evaluationMethod: "مكتبي",
    verificationMethod: "اللائحة الأساسية تتضمن إجراءات التعديل",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
  {
    indicatorNo: 2,
    practiceNo: 1,
    questionNo: 1,
    question: "هل يتم عقد اجتماع الجمعية العمومية العادية خلال الأشهر الأربعة الأولى من السنة المالية؟",
    score: 3.00,
    evaluationMethod: "مكتبي",
    verificationMethod: "محضر اجتماع الجمعية العمومية العادية",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
  {
    indicatorNo: 2,
    practiceNo: 2,
    questionNo: 1,
    question: "هل يتم إرسال الدعوة لاجتماع الجمعية العمومية قبل موعد الاجتماع بـ 15 يوماً على الأقل؟",
    score: 2.00,
    evaluationMethod: "مكتبي",
    verificationMethod: "خطاب الدعوة للاجتماع مؤرخ",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
  {
    indicatorNo: 2,
    practiceNo: 3,
    questionNo: 1,
    question: "هل يتم توثيق محاضر اجتماعات الجمعية العمومية؟",
    score: 3.00,
    evaluationMethod: "مكتبي",
    verificationMethod: "محاضر اجتماعات الجمعية العمومية موثقة",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
  {
    indicatorNo: 2,
    practiceNo: 4,
    questionNo: 1,
    question: "هل حالة اشتراكات أعضاء الجمعية العمومية محدثة؟",
    score: 3.00,
    evaluationMethod: "مكتبي",
    verificationMethod: "سجل اشتراكات الأعضاء محدث",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
  {
    indicatorNo: 3,
    practiceNo: 1,
    questionNo: 1,
    question: "هل يوجد نظام للرقابة الداخلية معتمد من مجلس الإدارة؟",
    score: 5.00,
    evaluationMethod: "مكتبي",
    verificationMethod: "نظام الرقابة الداخلية معتمد",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
  {
    indicatorNo: 3,
    practiceNo: 2,
    questionNo: 1,
    question: "هل يوجد آلية للتأكد من استحقاق المستفيد للخدمة؟",
    score: 4.00,
    evaluationMethod: "مكتبي",
    verificationMethod: "آلية التحقق من استحقاق المستفيد موثقة",
    pageNo: "",
    statusYes: false,
    statusNo: true,
    percentage: "صفر",
    questionPercentage: 0,
    questionScore: 0.00,
    practiceScore: 0.00,
    indicatorScore: 0.00,
  },
];

const GovernanceEvaluationFormPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedCriteria, setSelectedCriteria] = useState("commitment");
  const [showTable, setShowTable] = useState(false);

  const getCriteriaLabel = () => {
    return criteriaOptions.find(c => c.value === selectedCriteria)?.label || "";
  };

  if (!showTable) {
    return (
      <InnerPageLayout
        moduleId="excellence"
        itemSlug="governance-evaluation-form"
        moduleTitle="إدارة التميز المؤسسي"
        sectionTitle="إدارة الحوكمة"
        title="نموذج تقييم الحوكمة"
      >
        <Card className="max-w-md mx-auto mt-8">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                العام: <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                المعيار: <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedCriteria} onValueChange={setSelectedCriteria}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {criteriaOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => setShowTable(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              إستمرار
            </Button>
          </CardContent>
        </Card>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="governance-evaluation-form"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الحوكمة"
      title="نموذج تقييم الحوكمة"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            نموذج {getCriteriaLabel()} لعام {selectedYear}
          </h2>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            تصدير اكسيل
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center whitespace-nowrap min-w-[80px]">رقم المؤشر</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[80px]">رقم الممارسة</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[80px]">رقم السؤال</TableHead>
                  <TableHead className="text-right whitespace-nowrap min-w-[300px]">السؤال</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[60px]">الدرجة</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[80px]">آلية التقييم</TableHead>
                  <TableHead className="text-right whitespace-nowrap min-w-[200px]">آلية التحقق</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[120px]">رقم الصفحة في الشاهد المُرفق</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[50px]">نعم</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[50px]">لا</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[60px]">النسبة</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[100px]">النسبة المئوية للسؤال</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[80px]">درجة السؤال</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[80px]">درجة الممارسة</TableHead>
                  <TableHead className="text-center whitespace-nowrap min-w-[80px]">درجة المؤشر</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluationData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="text-center">{row.indicatorNo}</TableCell>
                    <TableCell className="text-center">{row.practiceNo}</TableCell>
                    <TableCell className="text-center">{row.questionNo}</TableCell>
                    <TableCell className="text-right text-sm">{row.question}</TableCell>
                    <TableCell className="text-center">{row.score.toFixed(2)}</TableCell>
                    <TableCell className="text-center">{row.evaluationMethod}</TableCell>
                    <TableCell className="text-right text-sm">{row.verificationMethod}</TableCell>
                    <TableCell className="text-center">{row.pageNo || "-"}</TableCell>
                    <TableCell className="text-center">
                      <div className={`w-4 h-4 mx-auto rounded border ${row.statusYes ? "bg-green-500 border-green-600" : "border-gray-300"}`} />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className={`w-4 h-4 mx-auto rounded border ${row.statusNo ? "bg-red-500 border-red-600" : "border-gray-300"}`} />
                    </TableCell>
                    <TableCell className="text-center">{row.percentage}</TableCell>
                    <TableCell className="text-center">{row.questionPercentage}</TableCell>
                    <TableCell className="text-center">{row.questionScore.toFixed(2)}</TableCell>
                    <TableCell className="text-center">{row.practiceScore.toFixed(2)}</TableCell>
                    <TableCell className="text-center">{row.indicatorScore.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-start">
          <Button
            variant="outline"
            onClick={() => setShowTable(false)}
          >
            رجوع للاختيار
          </Button>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default GovernanceEvaluationFormPage;
