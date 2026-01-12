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
import { Receipt, Save, Printer, User } from "lucide-react";
import { toast } from "sonner";

const IssueGeneralReceiptPage = () => {
  const [receivedFrom, setReceivedFrom] = useState("");
  const [amount, setAmount] = useState("");
  const [amountInWords, setAmountInWords] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [account, setAccount] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const accounts = [
    { code: "1101", name: "النقدية في الصندوق" },
    { code: "1102", name: "البنك الأهلي" },
    { code: "1103", name: "مصرف الراجحي" },
    { code: "4101", name: "إيرادات متنوعة" },
    { code: "4102", name: "إيرادات خدمات" },
  ];

  const handleSubmit = () => {
    if (!receivedFrom || !amount || !paymentMethod || !account) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    toast.success("تم إصدار سند القبض بنجاح");
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="إصدار سند قبض عام"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  بيانات سند القبض
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="receiptNumber">رقم السند</Label>
                    <Input
                      id="receiptNumber"
                      value="RV-2024-0089"
                      disabled
                      className="bg-muted font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiptDate">التاريخ</Label>
                    <Input
                      id="receiptDate"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receivedFrom">استلمنا من *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="receivedFrom"
                      placeholder="اسم الشخص أو الجهة"
                      value={receivedFrom}
                      onChange={(e) => setReceivedFrom(e.target.value)}
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
                        <SelectItem value="card">بطاقة ائتمان</SelectItem>
                        <SelectItem value="pos">نقاط البيع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account">الحساب *</Label>
                    <Select value={account} onValueChange={setAccount}>
                      <SelectTrigger id="account">
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

                <div className="space-y-2">
                  <Label htmlFor="description">وذلك مقابل *</Label>
                  <Textarea
                    id="description"
                    placeholder="أدخل وصف السبب أو المقابل..."
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
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">معاينة السند</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center border-b pb-4">
                  <div className="text-sm text-muted-foreground">سند قبض</div>
                  <div className="text-2xl font-bold text-green-800">
                    {amount ? parseFloat(amount).toLocaleString("ar-SA") : "0"} ر.س
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">رقم السند:</span>
                    <span className="font-mono">RV-2024-0089</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">التاريخ:</span>
                    <span>{new Date().toLocaleDateString("ar-SA")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">استلمنا من:</span>
                    <span>{receivedFrom || "-"}</span>
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
                        : paymentMethod === "card"
                        ? "بطاقة"
                        : paymentMethod === "pos"
                        ? "نقاط البيع"
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

export default IssueGeneralReceiptPage;
