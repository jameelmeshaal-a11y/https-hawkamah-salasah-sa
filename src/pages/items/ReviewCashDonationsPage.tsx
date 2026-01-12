import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, CheckCircle, XCircle, Clock, HandCoins } from "lucide-react";
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

interface Donation {
  id: string;
  receiptNumber: string;
  date: string;
  donorName: string;
  amount: number;
  purpose: string;
  paymentMethod: string;
  status: "pending" | "approved" | "rejected";
  collector: string;
}

const ReviewCashDonationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  
  const donations: Donation[] = [
    {
      id: "1",
      receiptNumber: "DON-2024-0156",
      date: "2024-01-20",
      donorName: "عبدالله محمد الشمري",
      amount: 5000,
      purpose: "كفالة الأيتام",
      paymentMethod: "نقداً",
      status: "pending",
      collector: "أحمد علي",
    },
    {
      id: "2",
      receiptNumber: "DON-2024-0157",
      date: "2024-01-20",
      donorName: "شركة التقنية المتقدمة",
      amount: 25000,
      purpose: "تبرع عام",
      paymentMethod: "تحويل",
      status: "pending",
      collector: "محمد سعد",
    },
    {
      id: "3",
      receiptNumber: "DON-2024-0158",
      date: "2024-01-19",
      donorName: "خالد العتيبي",
      amount: 10000,
      purpose: "مشروع بناء",
      paymentMethod: "بطاقة",
      status: "approved",
      collector: "أحمد علي",
    },
    {
      id: "4",
      receiptNumber: "DON-2024-0159",
      date: "2024-01-19",
      donorName: "متبرع مجهول",
      amount: 2000,
      purpose: "زكاة",
      paymentMethod: "نقداً",
      status: "rejected",
      collector: "سعد الغامدي",
    },
  ];

  const getStatusBadge = (status: Donation["status"]) => {
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
    return new Intl.NumberFormat("ar-SA").format(amount) + " ر.س";
  };

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.receiptNumber.includes(searchQuery) ||
      donation.donorName.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    toast.success("تم اعتماد التبرع بنجاح");
  };

  const handleReject = (id: string) => {
    toast.error("تم رفض التبرع");
  };

  return (
    <InnerPageLayout
      moduleId="financial-affairs"
      title="مراجعة التبرعات النقدية"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">قيد المراجعة</div>
              <div className="text-2xl font-bold text-yellow-600">
                {donations.filter((d) => d.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المعتمدة</div>
              <div className="text-2xl font-bold text-green-600">
                {donations.filter((d) => d.status === "approved").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">المرفوضة</div>
              <div className="text-2xl font-bold text-red-600">
                {donations.filter((d) => d.status === "rejected").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">إجمالي المبالغ المعلقة</div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(
                  donations
                    .filter((d) => d.status === "pending")
                    .reduce((sum, d) => sum + d.amount, 0)
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <HandCoins className="h-5 w-5" />
              التبرعات النقدية
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
                  <TableHead className="text-right">رقم الإيصال</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">اسم المتبرع</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">الغرض</TableHead>
                  <TableHead className="text-right">طريقة الدفع</TableHead>
                  <TableHead className="text-right">المحصّل</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-mono font-medium">
                      {donation.receiptNumber}
                    </TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>{donation.donorName}</TableCell>
                    <TableCell className="font-mono font-bold">
                      {formatCurrency(donation.amount)}
                    </TableCell>
                    <TableCell>{donation.purpose}</TableCell>
                    <TableCell>{donation.paymentMethod}</TableCell>
                    <TableCell>{donation.collector}</TableCell>
                    <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("عرض التفاصيل")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {donation.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600"
                              onClick={() => handleApprove(donation.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600"
                              onClick={() => handleReject(donation.id)}
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

export default ReviewCashDonationsPage;
