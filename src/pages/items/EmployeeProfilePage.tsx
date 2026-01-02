import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import EmployeeProfileHeader from "@/components/records/EmployeeProfileHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Phone,
  GraduationCap,
  Briefcase,
  Building,
  CreditCard,
  Clock,
  Calendar,
  TrendingUp,
  Award,
  Paperclip,
  BarChart3,
} from "lucide-react";

const sampleEmployee = {
  name: "أحمد محمد العلي",
  position: "مدير تقنية المعلومات",
  createdAt: "2020-03-15",
  updatedAt: "2024-01-10",
  createdBy: "مدير الموارد البشرية",
  updatedBy: "مشرف النظام",
  systemManager: "خالد السعيد",
  accountType: "موظف دائم",
  jobGrade: "الدرجة السابعة",
  jobRank: "المرتبة الثانية عشر",
  employeeNumber: "EMP-2020-0045",
  avatarUrl: "",
};

const personalData = [
  { label: "الاسم الكامل", value: "أحمد محمد علي العلي" },
  { label: "تاريخ الميلاد", value: "1985-06-20" },
  { label: "مكان الميلاد", value: "الرياض" },
  { label: "الجنسية", value: "سعودي" },
  { label: "رقم الهوية", value: "1234567890" },
  { label: "تاريخ انتهاء الهوية", value: "2028-05-15" },
  { label: "الحالة الاجتماعية", value: "متزوج" },
  { label: "عدد الأبناء", value: "3" },
  { label: "فصيلة الدم", value: "O+" },
];

const contactData = [
  { label: "رقم الجوال", value: "0501234567" },
  { label: "رقم الهاتف", value: "0112345678" },
  { label: "البريد الإلكتروني", value: "ahmed.ali@company.com" },
  { label: "العنوان", value: "الرياض - حي النخيل" },
  { label: "الرمز البريدي", value: "12345" },
  { label: "جوال الطوارئ", value: "0509876543" },
  { label: "صلة قرابة الطوارئ", value: "الأخ" },
];

const qualifications = [
  { degree: "بكالوريوس علوم الحاسب", institution: "جامعة الملك سعود", year: "2007", gpa: "4.2/5" },
  { degree: "ماجستير إدارة نظم المعلومات", institution: "جامعة الملك فهد", year: "2012", gpa: "4.5/5" },
  { degree: "شهادة PMP", institution: "PMI", year: "2015", gpa: "-" },
];

const experiences = [
  { company: "شركة التقنية المتقدمة", position: "مطور برمجيات", period: "2007 - 2012", duration: "5 سنوات" },
  { company: "مجموعة الاتصالات", position: "محلل أنظمة", period: "2012 - 2018", duration: "6 سنوات" },
  { company: "الشركة الحالية", position: "مدير تقنية المعلومات", period: "2018 - حتى الآن", duration: "6 سنوات" },
];

const employmentData = [
  { label: "تاريخ التعيين", value: "2018-03-01" },
  { label: "نوع العقد", value: "دائم" },
  { label: "الراتب الأساسي", value: "18,000 ريال" },
  { label: "بدل السكن", value: "4,500 ريال" },
  { label: "بدل النقل", value: "1,500 ريال" },
  { label: "إجمالي الراتب", value: "24,000 ريال" },
  { label: "القسم", value: "تقنية المعلومات" },
  { label: "المسمى الوظيفي", value: "مدير القسم" },
];

const bankAccounts = [
  { bank: "البنك الأهلي", accountNumber: "SA1234567890123456789012", iban: "SA1234567890123456789012", primary: true },
  { bank: "بنك الراجحي", accountNumber: "SA9876543210987654321098", iban: "SA9876543210987654321098", primary: false },
];

const attendanceSummary = [
  { month: "يناير 2024", workDays: 22, present: 20, absent: 1, late: 1, leaves: 0 },
  { month: "ديسمبر 2023", workDays: 21, present: 19, absent: 0, late: 2, leaves: 0 },
  { month: "نوفمبر 2023", workDays: 22, present: 21, absent: 0, late: 1, leaves: 0 },
];

const leavesSummary = [
  { type: "إجازة سنوية", balance: 30, used: 15, remaining: 15 },
  { type: "إجازة مرضية", balance: 15, used: 2, remaining: 13 },
  { type: "إجازة اضطرارية", balance: 5, used: 1, remaining: 4 },
];

const evaluations = [
  { year: "2023", score: 92, rating: "ممتاز", evaluator: "المدير العام" },
  { year: "2022", score: 88, rating: "جيد جداً", evaluator: "المدير العام" },
  { year: "2021", score: 85, rating: "جيد جداً", evaluator: "المدير العام" },
];

const promotions = [
  { date: "2022-01-01", fromGrade: "الدرجة السادسة", toGrade: "الدرجة السابعة", type: "ترقية استثنائية" },
  { date: "2020-07-01", fromGrade: "الدرجة الخامسة", toGrade: "الدرجة السادسة", type: "ترقية دورية" },
];

const attachments = [
  { name: "صورة الهوية.pdf", type: "وثيقة رسمية", uploadDate: "2020-03-15", size: "1.2 MB" },
  { name: "شهادة البكالوريوس.pdf", type: "مؤهل علمي", uploadDate: "2020-03-15", size: "2.5 MB" },
  { name: "شهادة الماجستير.pdf", type: "مؤهل علمي", uploadDate: "2020-03-15", size: "2.1 MB" },
  { name: "عقد العمل.pdf", type: "عقد", uploadDate: "2018-03-01", size: "0.8 MB" },
];

const tabs = [
  { id: "personal", label: "البيانات الشخصية", icon: User },
  { id: "contact", label: "بيانات الاتصال", icon: Phone },
  { id: "qualifications", label: "المؤهلات العلمية", icon: GraduationCap },
  { id: "experience", label: "الخبرات السابقة", icon: Briefcase },
  { id: "employment", label: "بيانات التعيين", icon: Building },
  { id: "bank", label: "الحسابات البنكية", icon: CreditCard },
  { id: "attendance", label: "سجل الحضور", icon: Clock },
  { id: "leaves", label: "سجل الإجازات", icon: Calendar },
  { id: "evaluations", label: "سجل التقييمات", icon: TrendingUp },
  { id: "promotions", label: "سجل الترقيات", icon: Award },
  { id: "attachments", label: "المرفقات", icon: Paperclip },
  { id: "statistics", label: "الإحصائيات", icon: BarChart3 },
];

const EmployeeProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <InnerPageLayout
      moduleId="human-resources"
      title="ملف الموظف"
      moduleTitle="إدارة الموارد البشرية"
    >
      <div className="space-y-6">
        <EmployeeProfileHeader employee={sampleEmployee} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-2 rounded-lg">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Personal Data Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>البيانات الشخصية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {personalData.map((item, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Data Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>بيانات الاتصال</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactData.map((item, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Qualifications Tab */}
          <TabsContent value="qualifications">
            <Card>
              <CardHeader>
                <CardTitle>المؤهلات العلمية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualifications.map((qual, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{qual.degree}</h4>
                          <p className="text-muted-foreground">{qual.institution}</p>
                        </div>
                        <div className="text-left">
                          <Badge variant="secondary">{qual.year}</Badge>
                          {qual.gpa !== "-" && (
                            <p className="text-sm text-muted-foreground mt-1">المعدل: {qual.gpa}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>الخبرات السابقة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{exp.position}</h4>
                          <p className="text-muted-foreground">{exp.company}</p>
                        </div>
                        <div className="text-left">
                          <Badge variant="outline">{exp.period}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">{exp.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employment Tab */}
          <TabsContent value="employment">
            <Card>
              <CardHeader>
                <CardTitle>بيانات التعيين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {employmentData.map((item, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bank Accounts Tab */}
          <TabsContent value="bank">
            <Card>
              <CardHeader>
                <CardTitle>الحسابات البنكية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bankAccounts.map((account, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {account.bank}
                            {account.primary && <Badge>أساسي</Badge>}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">IBAN: {account.iban}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>سجل الحضور</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-3">الشهر</th>
                        <th className="text-right p-3">أيام العمل</th>
                        <th className="text-right p-3">الحضور</th>
                        <th className="text-right p-3">الغياب</th>
                        <th className="text-right p-3">التأخير</th>
                        <th className="text-right p-3">الإجازات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceSummary.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3">{row.month}</td>
                          <td className="p-3">{row.workDays}</td>
                          <td className="p-3 text-green-600">{row.present}</td>
                          <td className="p-3 text-red-600">{row.absent}</td>
                          <td className="p-3 text-yellow-600">{row.late}</td>
                          <td className="p-3">{row.leaves}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaves Tab */}
          <TabsContent value="leaves">
            <Card>
              <CardHeader>
                <CardTitle>سجل الإجازات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {leavesSummary.map((leave, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{leave.type}</span>
                        <span className="text-sm text-muted-foreground">
                          {leave.remaining} / {leave.balance} يوم متبقي
                        </span>
                      </div>
                      <Progress value={(leave.used / leave.balance) * 100} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>المستخدم: {leave.used} يوم</span>
                        <span>المتبقي: {leave.remaining} يوم</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations">
            <Card>
              <CardHeader>
                <CardTitle>سجل التقييمات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evaluations.map((evaluation, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">تقييم {evaluation.year}</h4>
                          <p className="text-sm text-muted-foreground">المقيّم: {evaluation.evaluator}</p>
                        </div>
                        <div className="text-left">
                          <Badge variant={evaluation.score >= 90 ? "default" : "secondary"}>
                            {evaluation.rating}
                          </Badge>
                          <p className="text-2xl font-bold mt-1">{evaluation.score}%</p>
                        </div>
                      </div>
                      <Progress value={evaluation.score} className="mt-3 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions">
            <Card>
              <CardHeader>
                <CardTitle>سجل الترقيات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promotions.map((promotion, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="mb-2">{promotion.type}</Badge>
                          <p className="text-muted-foreground">
                            من {promotion.fromGrade} إلى {promotion.toGrade}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">{promotion.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments">
            <Card>
              <CardHeader>
                <CardTitle>المرفقات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.type}</p>
                        </div>
                      </div>
                      <div className="text-left text-sm text-muted-foreground">
                        <p>{file.uploadDate}</p>
                        <p>{file.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle>الإحصائيات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-3xl font-bold text-primary">6</p>
                    <p className="text-sm text-muted-foreground">سنوات الخدمة</p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-600">95%</p>
                    <p className="text-sm text-muted-foreground">معدل الحضور</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg text-center">
                    <p className="text-3xl font-bold text-blue-600">88%</p>
                    <p className="text-sm text-muted-foreground">متوسط التقييم</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-600">2</p>
                    <p className="text-sm text-muted-foreground">عدد الترقيات</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InnerPageLayout>
  );
};

export default EmployeeProfilePage;
