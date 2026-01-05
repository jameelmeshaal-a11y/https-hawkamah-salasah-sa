import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Eye, Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";

const EntitiesRegistrationRequestsPage = () => {
  const [requests, setRequests] = useState([
    { id: "1", entityName: "جمعية الأمل", type: "جمعية خيرية", representativeName: "محمد سالم", phone: "0512345678", requestDate: "2024-01-20", status: "pending" },
    { id: "2", entityName: "مؤسسة النور", type: "مؤسسة", representativeName: "سارة أحمد", phone: "0512345679", requestDate: "2024-01-19", status: "pending" },
  ]);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: "approved" } : r));
    toast.success("تم قبول طلب التسجيل");
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: "rejected" } : r));
    toast.success("تم رفض طلب التسجيل");
  };

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="طلبات تسجيل الجهات" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><FileText className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">طلبات تسجيل الجهات</h1>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>الطلبات</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="بحث..." className="w-64" />
                <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {requests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم الجهة</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">اسم الممثل</TableHead>
                    <TableHead className="text-right">الجوال</TableHead>
                    <TableHead className="text-right">تاريخ الطلب</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.entityName}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{request.representativeName}</TableCell>
                      <TableCell>{request.phone}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <Badge variant={request.status === "approved" ? "default" : request.status === "rejected" ? "destructive" : "secondary"}>
                          {request.status === "pending" ? "قيد الانتظار" : request.status === "approved" ? "مقبول" : "مرفوض"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                          {request.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(request.id)}><Check className="h-4 w-4" /></Button>
                              <Button variant="destructive" size="sm" onClick={() => handleReject(request.id)}><X className="h-4 w-4" /></Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد طلبات تسجيل" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default EntitiesRegistrationRequestsPage;
