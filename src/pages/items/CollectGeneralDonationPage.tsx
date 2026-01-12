import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HandCoins, Save, Printer, User, CreditCard, Banknote, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CollectGeneralDonationPage = () => {
  const [donorType, setDonorType] = useState("individual");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorId, setDonorId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!amount || !donorName) {
      toast.error("يرجى تعبئة الحقول المطلوبة");
      return;
    }
    toast.success("تم تسجيل التبرع بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="تحصيل تبرع عام"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donor Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  بيانات المتبرع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>نوع المتبرع</Label>
                  <RadioGroup
                    value={donorType}
                    onValueChange={setDonorType}
                    className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">فرد</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="company" id="company" />
                      <Label htmlFor="company">شركة / مؤسسة</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="anonymous" id="anonymous" />
                      <Label htmlFor="anonymous">متبرع مجهول</Label>
                    </div>
                  </RadioGroup>
                </div>

                {donorType !== "anonymous" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="donorName">
                        {donorType === "company" ? "اسم الشركة" : "اسم المتبرع"} *
                      </Label>
                      <Input
                        id="donorName"
                        placeholder={donorType === "company" ? "أدخل اسم الشركة" : "أدخل اسم المتبرع"}
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donorPhone">رقم الجوال</Label>
                      <Input
                        id="donorPhone"
                        placeholder="05XXXXXXXX"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        dir="ltr"
                        className="text-left"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donorId">
                        {donorType === "company" ? "رقم السجل التجاري" : "رقم الهوية"}
                      </Label>
                      <Input
                        id="donorId"
                        placeholder={donorType === "company" ? "أدخل رقم السجل" : "أدخل رقم الهوية"}
                        value={donorId}
                        onChange={(e) => setDonorId(e.target.value)}
                        dir="ltr"
                        className="text-left"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Donation Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HandCoins className="h-5 w-5" />
                  تفاصيل التبرع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">مبلغ التبرع (ريال) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      dir="ltr"
                      className="text-left text-xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">الغرض من التبرع</Label>
                    <Select value={purpose} onValueChange={setPurpose}>
                      <SelectTrigger id="purpose">
                        <SelectValue placeholder="اختر الغرض" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">تبرع عام</SelectItem>
                        <SelectItem value="orphans">كفالة الأيتام</SelectItem>
                        <SelectItem value="education">التعليم</SelectItem>
                        <SelectItem value="health">الصحة</SelectItem>
                        <SelectItem value="emergency">الطوارئ</SelectItem>
                        <SelectItem value="zakat">زكاة</SelectItem>
                        <SelectItem value="sadaqah">صدقة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>طريقة الدفع</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <div className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="cash" id="cash" />
                      <Banknote className="h-4 w-4" />
                      <Label htmlFor="cash" className="cursor-pointer">نقداً</Label>
                    </div>
                    <div className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-4 w-4" />
                      <Label htmlFor="card" className="cursor-pointer">بطاقة</Label>
                    </div>
                    <div className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Smartphone className="h-4 w-4" />
                      <Label htmlFor="transfer" className="cursor-pointer">تحويل</Label>
                    </div>
                    <div className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="check" id="check" />
                      <CreditCard className="h-4 w-4" />
                      <Label htmlFor="check" className="cursor-pointer">شيك</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea
                    id="notes"
                    placeholder="أي ملاحظات إضافية..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>ملخص التبرع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">رقم الإيصال</span>
                  <span className="font-mono">DON-2024-0156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">التاريخ</span>
                  <span>{new Date().toLocaleDateString("ar-SA")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">المتبرع</span>
                  <span>{donorName || "-"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">طريقة الدفع</span>
                  <span>
                    {paymentMethod === "cash"
                      ? "نقداً"
                      : paymentMethod === "card"
                      ? "بطاقة"
                      : paymentMethod === "transfer"
                      ? "تحويل"
                      : "شيك"}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>المبلغ الإجمالي</span>
                    <span className="text-primary">
                      {amount ? parseFloat(amount).toLocaleString("ar-SA") : "0"} ر.س
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 w-full"
                size="lg"
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ وإصدار إيصال
              </Button>
              <Button variant="outline" className="w-full">
                <Printer className="h-4 w-4 ml-2" />
                طباعة الإيصال
              </Button>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default CollectGeneralDonationPage;
