import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Search, Check, X, Eye, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import StatCard from "@/components/shared/StatCard";

interface JoinRequest {
  id: string;
  name: string;
  idNumber: string;
  phone: string;
  email: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

const WebsiteJoinRequestsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [requests, setRequests] = useState<JoinRequest[]>([
    { id: "1", name: "محمد أحمد سالم", idNumber: "1234567890", phone: "0512345678", email: "m.ahmed@email.com", requestDate: "2024-01-20", status: "pending" },
    { id: "2", name: "فاطمة علي محمد", idNumber: "1234567891", phone: "0512345679", email: "f.ali@email.com", requestDate: "2024-01-19", status: "pending" },
    { id: "3", name: "خالد سعد العتيبي", idNumber: "1234567892", phone: "0512345670", email: "k.saad@email.com", requestDate: "2024-01-18", status: "approved" },
    { id: "4", name: "نورة عبدالله", idNumber: "1234567893", phone: "0512345671", email: "n.abdullah@email.com", requestDate: "2024-01-17", status: "rejected" },
  ]);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: "approved" as const } : r));
    toast.success("تم قبول الطلب بنجاح");
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: "rejected" as const } : r));
    toast.success("تم رفض الطلب");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700">قيد الانتظار</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-700">مقبول</Badge>;
      case "rejected":
        return <Badge variant="destructive">مرفوض</Badge>;
      default:
        return null;
    }
  };

  const filteredRequests = requests.filter(r => 
    r.name.includes(searchValue) || r.idNumber.includes(searchValue) || r.phone.includes(searchValue)
  );

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const approvedCount = requests.filter(r => r.status === "approved").length;
  const rejectedCount = requests.filter(r => r.status === "rejected").length;

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="طلبات الانضمام من الموقع"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">طلبات الانضمام من الموقع</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="إجمالي الطلبات" value={requests.length} icon={Globe} />
          <StatCard title="قيد الانتظار" value={pendingCount} icon={Clock} />
          <StatCard title="مقبولة" value={approvedCount} />
          <StatCard title="مرفوضة" value={rejectedCount} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>طلبات الانضمام</CardTitle>
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="بحث..."
                  className="w-64"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">رقم الهوية</TableHead>
                  <TableHead className="text-right">رقم الجوال</TableHead>
                  <TableHead className="text-right">البريد الإلكتروني</TableHead>
                  <TableHead className="text-right">تاريخ الطلب</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.idNumber}</TableCell>
                    <TableCell>{request.phone}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" title="عرض">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {request.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(request.id)}
                              title="قبول"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleReject(request.id)}
                              title="رفض"
                            >
                              <X className="h-4 w-4" />
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

export default WebsiteJoinRequestsPage;
