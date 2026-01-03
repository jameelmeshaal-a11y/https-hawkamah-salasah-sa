import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function AddNewProjectPage() {
  return (
    <InnerPageLayout
      moduleId="projects-management"
      title="إضافة مشروع جديد"
      moduleTitle="إدارة المشاريع"
      sectionTitle="مرحلة التخطيط"
    >
      <div className="space-y-6">
        {/* Project Data Section */}
        <Card>
          <CardHeader className="bg-muted/50 py-3">
            <CardTitle className="text-base font-medium text-right">بيانات المشروع</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-right block">اسم المشروع *</Label>
                <Input placeholder="أدخل اسم المشروع" className="text-right" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-right block">وصف المشروع</Label>
                <Textarea placeholder="أدخل وصف المشروع" className="text-right min-h-[80px]" />
              </div>

              <div className="space-y-2">
                <Label className="text-right block">القطاع - المحافظة *</Label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riyadh">محافظة الرياض</SelectItem>
                    <SelectItem value="makkah">محافظة مكة</SelectItem>
                    <SelectItem value="eastern">المنطقة الشرقية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-right block">القرية - الحي *</Label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="other">أخرى</SelectItem>
                    <SelectItem value="riyadh-city">الرياض</SelectItem>
                    <SelectItem value="jeddah">جدة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-right block">نوع الدعم *</Label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="housing">تمليك سكن</SelectItem>
                    <SelectItem value="financial">دعم مالي</SelectItem>
                    <SelectItem value="inkind">عيني</SelectItem>
                    <SelectItem value="training">تدريب</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-right block">الحالة المستهدفة *</Label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="married">متزوج</SelectItem>
                    <SelectItem value="single">أعزب</SelectItem>
                    <SelectItem value="widow">أرمل</SelectItem>
                    <SelectItem value="divorced">مطلق</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-right block">فئة المشروع *</Label>
                <RadioGroup defaultValue="beneficiary" className="flex flex-wrap gap-6 justify-end">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="awareness" className="cursor-pointer">مشاريع لتوعية</Label>
                    <RadioGroupItem value="awareness" id="awareness" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="beneficiary" className="cursor-pointer">مشاريع دعم مستفيدة</Label>
                    <RadioGroupItem value="beneficiary" id="beneficiary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="community" className="cursor-pointer">مشاريع لتنمية المجتمع</Label>
                    <RadioGroupItem value="community" id="community" />
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-right block">النوع الداخلي</Label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="other">أخرى</SelectItem>
                    <SelectItem value="type1">نوع 1</SelectItem>
                    <SelectItem value="type2">نوع 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Data Section */}
        <Card>
          <CardHeader className="bg-muted/50 py-3">
            <CardTitle className="text-base font-medium text-right">بيانات إضافية</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-6 justify-end">
              <div className="flex items-center gap-2">
                <Label htmlFor="financial" className="cursor-pointer text-sm">الشؤون المالية</Label>
                <Checkbox id="financial" />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="admin" className="cursor-pointer text-sm">الشؤون الإدارية</Label>
                <Checkbox id="admin" />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="plan" className="cursor-pointer text-sm">مخطط المشروع</Label>
                <Checkbox id="plan" />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="swot" className="cursor-pointer text-sm">تحليل SWOT (القوى و الضعف)</Label>
                <Checkbox id="swot" />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="vision" className="cursor-pointer text-sm">الرؤية و الرسالة و الأهداف</Label>
                <Checkbox id="vision" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attachments Section */}
        <Card>
          <CardHeader className="bg-muted/50 py-3">
            <CardTitle className="text-base font-medium text-right">المرفقات</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm">اسحب الملفات هنا أو انقر للتحميل</p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-start">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            إضافة سجل
          </Button>
        </div>
      </div>
    </InnerPageLayout>
  );
}
