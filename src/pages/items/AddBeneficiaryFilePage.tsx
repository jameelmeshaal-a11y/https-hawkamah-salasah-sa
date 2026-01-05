import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  User, FileText, Building2, Landmark, Phone, GraduationCap, 
  Home, Heart, Users, Paperclip, CheckCircle, Upload
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "basic", label: "البيانات الأساسية", icon: User },
  { id: "additional", label: "البيانات الإضافية", icon: FileText },
  { id: "membership", label: "بيانات الانضمام للجمعية", icon: Building2 },
  { id: "bank", label: "البيانات البنكية", icon: Landmark },
  { id: "contact", label: "بيانات الاتصال", icon: Phone },
  { id: "qualification", label: "المؤهل و الوظيفة", icon: GraduationCap },
  { id: "housing", label: "بيانات السكن", icon: Home },
  { id: "health", label: "البيانات الصحية", icon: Heart },
  { id: "dependents", label: "بيانات التابعين", icon: Users },
  { id: "attachments", label: "المرفقات", icon: Paperclip },
];

const AddBeneficiaryFilePage = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم إضافة ملف المستفيد بنجاح");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>الاسم <span className="text-destructive">*</span></Label>
              <div className="flex gap-2">
                <Input placeholder="أدخل الاسم الكامل" className="flex-1" />
                <Button variant="outline" size="icon" className="shrink-0">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>رقم الهوية <span className="text-destructive">*</span></Label>
              <Input placeholder="أدخل رقم الهوية (10 أرقام)" maxLength={10} />
            </div>
            <div className="space-y-2">
              <Label>نموذج البيانات</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نموذج البيانات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">النموذج الافتراضي</SelectItem>
                  <SelectItem value="rehabilitation">نموذج التأهيل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>النوع <span className="text-destructive">*</span></Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>رقم الجوال <span className="text-destructive">*</span></Label>
              <Input placeholder="05xxxxxxxx" maxLength={10} />
            </div>
            <div className="space-y-2">
              <Label>دولة الجنسية</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجنسية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sa">المملكة العربية السعودية</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>تاريخ الميلاد</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>الحالة الاجتماعية</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة الاجتماعية" />
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
        );

      case "additional":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>العمر</Label>
              <Input type="number" placeholder="أدخل العمر" />
            </div>
            <div className="space-y-2">
              <Label>الصفات</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصفة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orphan">يتيم</SelectItem>
                  <SelectItem value="widow">أرملة</SelectItem>
                  <SelectItem value="disabled">ذوي احتياجات خاصة</SelectItem>
                  <SelectItem value="elderly">مسن</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الاحتياجات</Label>
              <Textarea placeholder="أدخل الاحتياجات" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>لديه دورات تدريبية</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">نعم</SelectItem>
                  <SelectItem value="no">لا</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "membership":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>تاريخ الانضمام</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>نوع العضوية</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع العضوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">عضوية عادية</SelectItem>
                  <SelectItem value="special">عضوية خاصة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ملف خارجي</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">نعم</SelectItem>
                  <SelectItem value="no">لا</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "bank":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>رقم الآيبان</Label>
              <Input placeholder="SA..." maxLength={24} />
            </div>
            <div className="space-y-2">
              <Label>اسم البنك</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البنك" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rajhi">مصرف الراجحي</SelectItem>
                  <SelectItem value="ahli">البنك الأهلي</SelectItem>
                  <SelectItem value="riyad">بنك الرياض</SelectItem>
                  <SelectItem value="inma">بنك الإنماء</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>رقم الجوال البديل</Label>
              <Input placeholder="05xxxxxxxx" maxLength={10} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>العنوان التفصيلي</Label>
              <Textarea placeholder="أدخل العنوان التفصيلي" rows={3} />
            </div>
          </div>
        );

      case "qualification":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>المستوى التعليمي</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستوى التعليمي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">بدون تعليم</SelectItem>
                  <SelectItem value="primary">ابتدائي</SelectItem>
                  <SelectItem value="middle">متوسط</SelectItem>
                  <SelectItem value="high">ثانوي</SelectItem>
                  <SelectItem value="diploma">دبلوم</SelectItem>
                  <SelectItem value="bachelor">بكالوريوس</SelectItem>
                  <SelectItem value="master">ماجستير</SelectItem>
                  <SelectItem value="phd">دكتوراه</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>المهنة الحالية</Label>
              <Input placeholder="أدخل المهنة الحالية" />
            </div>
          </div>
        );

      case "housing":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>نوع السكن</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع السكن" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owned">ملك</SelectItem>
                  <SelectItem value="rented">إيجار</SelectItem>
                  <SelectItem value="family">مع الأهل</SelectItem>
                  <SelectItem value="charity">سكن خيري</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>الحي الوطني</Label>
              <Input placeholder="أدخل الحي الوطني" />
            </div>
            <div className="space-y-2">
              <Label>القرية أو الحي</Label>
              <Input placeholder="أدخل القرية أو الحي" />
            </div>
          </div>
        );

      case "health":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>حالة الصحة</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر حالة الصحة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">جيدة</SelectItem>
                  <SelectItem value="moderate">متوسطة</SelectItem>
                  <SelectItem value="poor">ضعيفة</SelectItem>
                  <SelectItem value="chronic">مرض مزمن</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>يحتاج لتأهيل</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">نعم</SelectItem>
                  <SelectItem value="no">لا</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>يحتاج لكفالة</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">نعم</SelectItem>
                  <SelectItem value="no">لا</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>يحتاج لقسيمة</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">نعم</SelectItem>
                  <SelectItem value="no">لا</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "dependents":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>عدد التابعين</Label>
              <Input type="number" placeholder="0" min={0} />
            </div>
            <div className="space-y-2">
              <Label>عدد الزوجات</Label>
              <Input type="number" placeholder="0" min={0} />
            </div>
            <div className="space-y-2">
              <Label>عدد الأطفال</Label>
              <Input type="number" placeholder="0" min={0} />
            </div>
            <div className="space-y-2">
              <Label>عدد الأيتام</Label>
              <Input type="number" placeholder="0" min={0} />
            </div>
          </div>
        );

      case "attachments":
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">اسحب الملفات هنا أو انقر للرفع</p>
              <Button variant="outline">
                <Paperclip className="h-4 w-4 ml-2" />
                اختر ملفات
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>الملفات المدعومة: PDF, JPG, PNG, DOC, DOCX</p>
              <p>الحد الأقصى لحجم الملف: 10 ميجابايت</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="إضافة ملف مستفيد"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="flex gap-6 min-h-[600px]">
        {/* Vertical Tabs */}
        <div className="w-56 shrink-0">
          <Card className="sticky top-4">
            <CardContent className="p-2">
              <nav className="flex flex-col gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-right w-full",
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Form Content */}
        <div className="flex-1">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    أدخل البيانات المطلوبة في الحقول أدناه
                  </p>
                </div>

                {renderTabContent()}

                <div className="flex justify-start gap-3 mt-8 pt-6 border-t">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    إضافة سجل
                  </Button>
                  <Button type="button" variant="outline">
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default AddBeneficiaryFilePage;
