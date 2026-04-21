import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, CheckCircle, XCircle, Clock, Receipt } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ReceiptRecord {
  id: string;
  receiptNumber: string;
  date: string;
  receivedFrom: string;
  amount: number;
  description: string;
  account: string;
  paymentMethod: string;
  status: "pending" | "approved" | "rejected";
  createdBy: string;
}

const ReviewCashReceiptsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  
  const receipts: ReceiptRecord[] = [
    {
      id: "1",
      receiptNumber: "RV-2024-0089",
      date: "2024-01-20",
      receivedFrom: "مؤسسة الخير للتجارة",
      amount: 15000,
      description: "دفعة إيجار المبنى",
      account: "إيرادات إيجارات",
      paymentMethod: "تحويل",
      status: "pending",
      createdBy: "أحمد محمد",
    },
    {
      id: "2",
      receiptNumber: "RV-2024-0090",
      date: "2024-01-20",
      receivedFrom: "شركة المستقبل",
      amount: 8500,
      description: "قسط مشروع تأهيلي",
      account: "أقساط المشاريع",
      paymentMethod: "شيك",
      status: "pending",
      createdBy: "سعد العتيبي",
    },
    {
      id: "3",
      receiptNumber: "RV-2024-0088",
      date: "2024-01-19",
      receivedFrom: "صندوق الاستثمار",
      amount: 25000,
      description: "عوائد استثمارية",
      account: "إيرادات استثمارات",
      paymentMethod: "تحويل",
      status: "approved",
      createdBy: "محمد علي",
    },
  ];

  const getStatusBadge = (status: ReceiptRecord["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 ml-1" />
            معتمد
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 ml-1" />
            قيد المراجعة
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 ml-1" />
            مرفوض
          </Badge>
        );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA").format(amount) + " ﷼";
  };

  const filteredReceipts = receipts.filter((receipt) => {
    const matchesSearch =
      receipt.receiptNumber.includes(searchQuery) ||
      receipt.receivedFrom.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || receipt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="مراجعة المقبوضات النقدية"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">قيد المراجعة</div>
              <div className="text-2xl font-bold text-yellow-600">
                {receipts.filter((r) => r.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المعتمدة</div>
              <div className="text-2xl font-bold text-green-600">
                {receipts.filter((r) => r.status === "approved").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المرفوضة</div>
              <div className="text-2xl font-bold text-red-600">
                {receipts.filter((r) => r.status === "rejected").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي المبالغ المعلقة</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(
                  receipts
                    .filter((r) => r.status === "pending")
                    .reduce((sum, r) => sum + r.amount, 0)
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              سندات القبض
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-9 w-48"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="pending">قيد المراجعة</SelectItem>
                  <SelectItem value="approved">معتمد</SelectItem>
                  <SelectItem value="rejected">مرفوض</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم السند</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">استلمنا من</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">البيان</TableHead>
                  <TableHead className="text-right">الحساب</TableHead>
                  <TableHead className="text-right">طريقة الدفع</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-mono font-medium">
                      {receipt.receiptNumber}
                    </TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.receivedFrom}</TableCell>
                    <TableCell className="font-mono font-bold text-green-600">
                      +{formatCurrency(receipt.amount)}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {receipt.description}
                    </TableCell>
                    <TableCell>{receipt.account}</TableCell>
                    <TableCell>{receipt.paymentMethod}</TableCell>
                    <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("عرض التفاصيل")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {receipt.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600"
                              onClick={() => toast.success("تم اعتماد السند")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600"
                              onClick={() => toast.error("تم رفض السند")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ReviewCashReceiptsPage;
