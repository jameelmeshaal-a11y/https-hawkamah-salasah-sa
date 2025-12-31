import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Upload,
  Bell,
  Bold,
  Italic,
  Underline,
  AlignRight,
  AlignCenter,
  AlignLeft,
  List,
  ListOrdered,
} from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

const NotificationsManagementPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [requiresSignature, setRequiresSignature] = useState(false);
  const [records] = useState<any[]>([]);

  const handleAddRecord = () => {
    console.log("Adding notification:", {
      title,
      content,
      targetAudience,
      requiresSignature,
    });
  };

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="إدارة الإشعارات"
      sectionTitle="إدارة الإشعارات"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        {/* Add Notification Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إنشاء إشعار جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>
                  العنوان <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="أدخل عنوان الإشعار"
                />
              </div>

              <div className="space-y-2">
                <Label>المحتوى</Label>
                {/* Rich Text Editor Toolbar */}
                <div className="border rounded-t-md p-2 bg-muted/50 flex items-center gap-1 flex-wrap">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="أدخل محتوى الإشعار..."
                  rows={6}
                  className="rounded-t-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>موجهة إلى</Label>
                  <Select
                    value={targetAudience}
                    onValueChange={setTargetAudience}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة المستهدفة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كافة العاملين</SelectItem>
                      <SelectItem value="managers">المدراء فقط</SelectItem>
                      <SelectItem value="employees">الموظفين فقط</SelectItem>
                      <SelectItem value="department">قسم محدد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>المرفقات</Label>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 ml-2" />
                    إضافة مرفقات
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={requiresSignature}
                  onCheckedChange={setRequiresSignature}
                />
                <Label>يتطلب التوقيع</Label>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleAddRecord}
                className="bg-green-600 hover:bg-green-700"
              >
                إضافة سجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الإشعارات المرسلة</CardTitle>
          </CardHeader>
          <CardContent>
            {records.length === 0 ? (
              <EmptyState
                icon={Bell}
                message="لا توجد بيانات متوفرة في الجدول"
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">العنوان</TableHead>
                    <TableHead className="text-right">موجهة إلى</TableHead>
                    <TableHead className="text-right">يتطلب توقيع</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">أنشأ بواسطة</TableHead>
                    <TableHead className="text-right">إدارة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record: any) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.title}</TableCell>
                      <TableCell>{record.targetAudience}</TableCell>
                      <TableCell>
                        {record.requiresSignature ? "نعم" : "لا"}
                      </TableCell>
                      <TableCell>{record.createdAt}</TableCell>
                      <TableCell>{record.createdBy}</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default NotificationsManagementPage;
