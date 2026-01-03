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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/shared/EmptyState";
import { Upload, Trash2, Edit } from "lucide-react";

export interface ActivityRecord {
  id: string;
  activityOwnerType: string;
  attachments: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

interface ActivityFormProps {
  activityType: "داعم" | "كفالة" | "كافل" | "طلب إعانة" | "تابع";
  ownerLabel: string;
  showSecondDropdown?: boolean;
  secondDropdownLabel?: string;
  tableData: ActivityRecord[];
}

export function ActivityForm({
  activityType,
  ownerLabel,
  showSecondDropdown = false,
  secondDropdownLabel,
  tableData,
}: ActivityFormProps) {
  return (
    <div className="space-y-6">
      {/* Activity Settings Section */}
      <Card>
        <CardHeader className="bg-muted/50 py-3">
          <CardTitle className="text-base font-medium text-right">إعدادات النشاط</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-right block">نوع صاحب النشاط</Label>
              <Input value={activityType} readOnly className="bg-muted text-right" />
            </div>
            <div className="space-y-2">
              <Label className="text-right block">{ownerLabel} *</Label>
              <Select>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">خيار 1</SelectItem>
                  <SelectItem value="option2">خيار 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {showSecondDropdown && secondDropdownLabel && (
              <div className="space-y-2">
                <Label className="text-right block">{secondDropdownLabel} *</Label>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="request1">طلب 1</SelectItem>
                    <SelectItem value="request2">طلب 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Activity Data Section */}
      <Card>
        <CardHeader className="bg-muted/50 py-3">
          <CardTitle className="text-base font-medium text-right">بيانات النشاط</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-2">
            <Label className="text-right block">تفاصيل النشاط *</Label>
            <Textarea 
              placeholder="أدخل تفاصيل النشاط..." 
              className="min-h-[120px] text-right" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Attachments Section */}
      <Card>
        <CardHeader className="bg-muted/50 py-3">
          <CardTitle className="text-base font-medium text-right">المرفقات</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Button variant="outline" className="gap-2 text-blue-600 border-blue-600">
            <Upload className="h-4 w-4" />
            إضافة مرفقات
          </Button>
          <div className="mt-4 text-muted-foreground text-sm text-right">
            لا توجد مرفقات
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-start">
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
          إضافة سجل
        </Button>
      </div>

      {/* Records Table */}
      <Card>
        <CardHeader className="bg-muted/50 py-3">
          <CardTitle className="text-base font-medium text-right">السجلات</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right">حذف/تعديل</TableHead>
                  <TableHead className="text-right">حدث بواسطة</TableHead>
                  <TableHead className="text-right">تاريخ التحديث</TableHead>
                  <TableHead className="text-right">أنشأ بواسطة</TableHead>
                  <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                  <TableHead className="text-right">المرفقات</TableHead>
                  <TableHead className="text-right">نوع صاحب النشاط</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <EmptyState message="لا توجد بيانات متوفرة في الجدول" />
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="text-red-500 h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-blue-500 h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{record.updatedBy}</TableCell>
                      <TableCell className="text-right">{record.updatedAt}</TableCell>
                      <TableCell className="text-right">{record.createdBy}</TableCell>
                      <TableCell className="text-right">{record.createdAt}</TableCell>
                      <TableCell className="text-right">{record.attachments}</TableCell>
                      <TableCell className="text-right">{record.activityOwnerType}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
