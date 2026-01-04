import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Phone,
  Briefcase,
  Calendar,
  Plus,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  Upload,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "personal", label: "البيانات الشخصية", icon: User },
  { id: "contact", label: "بيانات الاتصال", icon: Phone },
  { id: "qualifications", label: "المؤهلات", icon: Briefcase },
  { id: "appointment", label: "بيانات التعيين", icon: Calendar },
  { id: "additional", label: "بيانات إضافية", icon: Plus },
  { id: "attachments", label: "المرفقات", icon: Paperclip },
];

const AddBoardMemberPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [gender, setGender] = useState("male");
  const [companyAssigned, setCompanyAssigned] = useState("no");

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  const goToPreviousTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                الاسم الثلاثي <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="أدخل الاسم الثلاثي"
                className="text-right"
              />
            </div>

            {/* Gender and Marital Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  النوع <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">ذكر</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">أنثى</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  الحالة الاجتماعية <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">أعزب</SelectItem>
                    <SelectItem value="married">متزوج</SelectItem>
                    <SelectItem value="divorced">مطلق</SelectItem>
                    <SelectItem value="widowed">أرمل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* ID Number and Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-sm font-medium">
                  رقم الهوية <span className="text-red-500">*</span>
                </Label>
                <Input id="idNumber" placeholder="أدخل رقم الهوية" className="text-right" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idSource" className="text-sm font-medium">
                  مصدر الهوية
                </Label>
                <Input id="idSource" placeholder="مصدر الهوية" className="text-right" />
              </div>
            </div>

            {/* Birth Date and Family Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  تاريخ الميلاد <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" placeholder="ميلادي" />
                  <Input placeholder="هجري" className="text-right" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyMembers" className="text-sm font-medium">
                  عدد أفراد الأسرة
                </Label>
                <Input id="familyMembers" type="number" placeholder="0" className="text-right" />
              </div>
            </div>

            {/* Photo and Signature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">الصورة الشخصية</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Image className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">اسحب الصورة هنا أو انقر للتحميل</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">نموذج التوقيع</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Image className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">اسحب الصورة هنا أو انقر للتحميل</p>
                </div>
              </div>
            </div>

            {/* Bank Accounts */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">الحسابات البنكية</Label>
              <Button type="button" variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
                <Plus className="h-4 w-4 ml-2" />
                إضافة حساب
              </Button>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            {/* Village/District and Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  القرية - الحي <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="أخرى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="other">أخرى</SelectItem>
                    <SelectItem value="district1">حي 1</SelectItem>
                    <SelectItem value="district2">حي 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  عنوان السكن
                </Label>
                <Input id="address" placeholder="أدخل العنوان" className="text-right" />
              </div>
            </div>

            {/* Mobile and Landline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium">
                  رقم الجوال <span className="text-red-500">*</span>
                </Label>
                <Input id="mobile" placeholder="05xxxxxxxx" className="text-right" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landline" className="text-sm font-medium">
                  تليفون أرضي
                </Label>
                <Input id="landline" placeholder="أدخل رقم الهاتف" className="text-right" dir="ltr" />
              </div>
            </div>

            {/* Email and Other */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  البريد الإلكتروني
                </Label>
                <Input id="email" type="email" placeholder="example@email.com" className="text-left" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other" className="text-sm font-medium">
                  أخرى
                </Label>
                <Input id="other" placeholder="معلومات إضافية" className="text-right" />
              </div>
            </div>
          </div>
        );

      case "qualifications":
        return (
          <div className="space-y-6">
            {/* Education Level */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                المستوى التعليمي <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستوى التعليمي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">ابتدائي</SelectItem>
                  <SelectItem value="middle">متوسط</SelectItem>
                  <SelectItem value="secondary">ثانوي</SelectItem>
                  <SelectItem value="bachelor">جامعي</SelectItem>
                  <SelectItem value="master">ماجستير</SelectItem>
                  <SelectItem value="phd">دكتوراه</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Specialization */}
            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-sm font-medium">
                التخصص
              </Label>
              <Input
                id="specialization"
                placeholder="تجارة، موارد بشرية، إدارة أعمال.. الخ"
                className="text-right"
              />
            </div>

            {/* Graduation Year and Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="graduationYear" className="text-sm font-medium">
                  سنة التخرج
                </Label>
                <Input id="graduationYear" placeholder="مثال: 2018" className="text-right" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm font-medium">
                  سنوات الخبرة الفعلية
                </Label>
                <Input id="experience" type="number" placeholder="0" className="text-right" />
              </div>
            </div>

            {/* Total Experience */}
            <div className="space-y-2">
              <Label htmlFor="totalExperience" className="text-sm font-medium">
                عدد سنوات الخبرة الإجمالية للموظف
              </Label>
              <Input id="totalExperience" type="number" placeholder="0" className="text-right" />
            </div>

            {/* Qualification Notes */}
            <div className="space-y-2">
              <Label htmlFor="qualificationNotes" className="text-sm font-medium">
                ملاحظات إضافية
              </Label>
              <Textarea
                id="qualificationNotes"
                placeholder="أدخل ملاحظات إضافية حول المؤهلات"
                className="text-right min-h-[100px]"
              />
            </div>

            {/* Experience Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button type="button" variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
                <Plus className="h-4 w-4 ml-2" />
                إضافة مكان
              </Button>
              <Button type="button" variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
                <Plus className="h-4 w-4 ml-2" />
                إضافة دورة
              </Button>
            </div>
          </div>
        );

      case "appointment":
        return (
          <div className="space-y-6">
            {/* Appointment Date and Insurance Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  تاريخ قرار التعيين <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" />
                  <Input placeholder="هجري" className="text-right" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceNumber" className="text-sm font-medium">
                  الرقم التأميني
                </Label>
                <Input id="insuranceNumber" placeholder="أدخل الرقم التأميني" className="text-right" />
              </div>
            </div>

            {/* Job Grade and Rank */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobGrade" className="text-sm font-medium">
                  الدرجة الوظيفية
                </Label>
                <Input id="jobGrade" placeholder="1-20" className="text-right" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobRank" className="text-sm font-medium">
                  الرتبة الوظيفية
                </Label>
                <Input id="jobRank" placeholder="1-20" className="text-right" />
              </div>
            </div>

            {/* Job Title and Main Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium">
                  المسمى الوظيفي <span className="text-red-500">*</span>
                </Label>
                <Input id="jobTitle" placeholder="أدخل المسمى الوظيفي" className="text-right" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  إدارة التعيين الرئيسية <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الإدارة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="management">الإدارة العامة</SelectItem>
                    <SelectItem value="board">مجلس الإدارة</SelectItem>
                    <SelectItem value="hr">الموارد البشرية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sub Departments */}
            <div className="space-y-2">
              <Label htmlFor="subDepartments" className="text-sm font-medium">
                إدارات تعيين فرعية
              </Label>
              <Input id="subDepartments" placeholder="أدخل الإدارات الفرعية" className="text-right" />
            </div>

            {/* Company Assigned */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">معين من شركة</Label>
              <RadioGroup
                value={companyAssigned}
                onValueChange={setCompanyAssigned}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="companyNo" />
                  <Label htmlFor="companyNo" className="cursor-pointer">لا</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="companyYes" />
                  <Label htmlFor="companyYes" className="cursor-pointer">نعم</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Contract Type and Hourly Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">نوع العقد</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="مرن" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">مرن</SelectItem>
                    <SelectItem value="permanent">دائم</SelectItem>
                    <SelectItem value="contract">عقد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="text-sm font-medium">
                  سعر الساعة <span className="text-red-500">*</span>
                </Label>
                <Input id="hourlyRate" type="number" placeholder="0" className="text-right" />
              </div>
            </div>
          </div>
        );

      case "additional":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="additionalNotes" className="text-sm font-medium">
                ملاحظات إضافية
              </Label>
              <Textarea
                id="additionalNotes"
                placeholder="أدخل أي ملاحظات إضافية"
                className="text-right min-h-[200px]"
              />
            </div>
          </div>
        );

      case "attachments":
        return (
          <div className="space-y-6">
            {/* ID Card Image */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">صورة البطاقة الشخصية</Label>
              <Button type="button" className="bg-blue-700 text-white hover:bg-blue-800">
                <Upload className="h-4 w-4 ml-2" />
                إضافة صور
              </Button>
            </div>

            {/* Work Contract */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">عقد العمل و قرار التعيين</Label>
              <Button type="button" className="bg-blue-700 text-white hover:bg-blue-800">
                <Upload className="h-4 w-4 ml-2" />
                إضافة صور
              </Button>
            </div>

            {/* Qualification Image */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">صورة المؤهل الدراسي</Label>
              <Button type="button" className="bg-blue-700 text-white hover:bg-blue-800">
                <Upload className="h-4 w-4 ml-2" />
                إضافة صور
              </Button>
            </div>

            {/* IBAN Image */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">صورة رقم الآيبان</Label>
              <Button type="button" className="bg-blue-700 text-white hover:bg-blue-800">
                <Upload className="h-4 w-4 ml-2" />
                إضافة صور
              </Button>
            </div>

            {/* Additional Attachments */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">مرفقات إضافية</Label>
              <Button type="button" className="bg-blue-700 text-white hover:bg-blue-800">
                <Paperclip className="h-4 w-4 ml-2" />
                إضافة مرفقات
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <InnerPageLayout
      moduleId="members"
      title="إضافة عضو مجلس إدارة"
      moduleTitle="إدارة الأعضاء المشاركين"
      sectionTitle="أعضاء مجلس الإدارة"
    >
      <Card className="shadow-sm">
        <CardContent className="p-6">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isPassed = currentTabIndex > index;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg transition-all min-w-[80px]",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isPassed
                      ? "bg-green-100 text-green-700"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      isActive
                        ? "bg-white/20"
                        : isPassed
                        ? "bg-green-200"
                        : "bg-background"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-center">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousTab}
              disabled={currentTabIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronRight className="h-4 w-4" />
              السابق
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={goToNextTab}
              disabled={currentTabIndex === tabs.length - 1}
              className="flex items-center gap-2"
            >
              التالي
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Tab Content */}
          <form className="space-y-6">
            {renderTabContent()}

            {/* Submit Button */}
            <div className="flex justify-center pt-6 border-t">
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8">
                إضافة السجل
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default AddBoardMemberPage;
