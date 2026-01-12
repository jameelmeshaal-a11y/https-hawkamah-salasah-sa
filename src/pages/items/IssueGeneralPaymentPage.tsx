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
import { Send, Save, Printer, User } from "lucide-react";
import { toast } from "sonner";

const IssueGeneralPaymentPage = () => {
  const [paidTo, setPaidTo] = useState("");
  const [amount, setAmount] = useState("");
  const [amountInWords, setAmountInWords] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const accounts = [
    { code: "1101", name: "النقدية في الصندوق" },
    { code: "1102", name: "البنك الأهلي" },
    { code: "1103", name: "مصرف الراجحي" },
  ];

  const expenseAccounts = [
    { code: "5101", name: "مصروفات الرواتب" },
    { code: "5102", name: "مصروفات إدارية" },
    { code: "5103", name: "مصروفات صيانة" },
    { code: "5104", name: "مصروفات تشغيلية" },
    { code: "5105", name: "مصروفات مشاريع" },
  ];

  const costCenters = [
    { code: "CC01", name: "الإدارة العامة" },
    { code: "CC02", name: "قسم المشاريع" },
    { code: "CC03", name: "قسم الكفالات" },
    { code: "CC04", name: "قسم التسويق" },
  ];

  const handleSubmit = () => {
    if (!paidTo || !amount || !paymentMethod || !fromAccount || !toAccount) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    toast.success("تم إصدار سند الصرف بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="إصدار سند صرف عام"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  بيانات سند الصرف
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="voucherNumber">رقم السند</Label>
                    <Input
                      id="voucherNumber"
                      value="PV-2024-0156"
                      disabled
                      className="bg-muted font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="voucherDate">التاريخ</Label>
                    <Input
                      id="voucherDate"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paidTo">صرف إلى *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="paidTo"
                      placeholder="اسم المستفيد من الصرف"
                      value={paidTo}
                      onChange={(e) => setPaidTo(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">المبلغ (ريال) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      dir="ltr"
                      className="text-left text-lg font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amountInWords">المبلغ كتابة</Label>
                    <Input
                      id="amountInWords"
                      placeholder="المبلغ بالحروف"
                      value={amountInWords}
                      onChange={(e) => setAmountInWords(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">طريقة الدفع *</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger id="paymentMethod">
                        <SelectValue placeholder="اختر طريقة الدفع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">نقداً</SelectItem>
                        <SelectItem value="check">شيك</SelectItem>
                        <SelectItem value="transfer">تحويل بنكي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromAccount">من حساب *</Label>
                    <Select value={fromAccount} onValueChange={setFromAccount}>
                      <SelectTrigger id="fromAccount">
                        <SelectValue placeholder="اختر الحساب" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((acc) => (
                          <SelectItem key={acc.code} value={acc.code}>
                            {acc.code} - {acc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="toAccount">إلى حساب *</Label>
                    <Select value={toAccount} onValueChange={setToAccount}>
                      <SelectTrigger id="toAccount">
                        <SelectValue placeholder="اختر حساب المصروف" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseAccounts.map((acc) => (
                          <SelectItem key={acc.code} value={acc.code}>
                            {acc.code} - {acc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costCenter">مركز التكلفة</Label>
                    <Select value={costCenter} onValueChange={setCostCenter}>
                      <SelectTrigger id="costCenter">
                        <SelectValue placeholder="اختر مركز التكلفة" />
                      </SelectTrigger>
                      <SelectContent>
                        {costCenters.map((cc) => (
                          <SelectItem key={cc.code} value={cc.code}>
                            {cc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وذلك مقابل *</Label>
                  <Textarea
                    id="description"
                    placeholder="أدخل سبب الصرف..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea
                    id="notes"
                    placeholder="أي ملاحظات إضافية..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">معاينة السند</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center border-b pb-4">
                  <div className="text-sm text-muted-foreground">سند صرف</div>
                  <div className="text-2xl font-bold text-red-800">
                    {amount ? parseFloat(amount).toLocaleString("ar-SA") : "0"} ر.س
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">رقم السند:</span>
                    <span className="font-mono">PV-2024-0156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">التاريخ:</span>
                    <span>{new Date().toLocaleDateString("ar-SA")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">صرف إلى:</span>
                    <span>{paidTo || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">طريقة الدفع:</span>
                    <span>
                      {paymentMethod === "cash"
                        ? "نقداً"
                        : paymentMethod === "check"
                        ? "شيك"
                        : paymentMethod === "transfer"
                        ? "تحويل"
                        : "-"}
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
                حفظ السند
              </Button>
              <Button variant="outline" className="w-full">
                <Printer className="h-4 w-4 ml-2" />
                طباعة السند
              </Button>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default IssueGeneralPaymentPage;
