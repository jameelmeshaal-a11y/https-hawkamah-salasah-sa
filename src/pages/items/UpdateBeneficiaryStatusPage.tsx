import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RefreshCw, FileDown, Eye, FileText, Copy } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BeneficiaryRecord {
  id: string;
  name: string;
  fileStatus: "معتمد" | "قيد المراجعة" | "مرفوض" | "غير مستحق" | "مؤرشف";
  dataStatus: "محدثة سليمة" | "غير محدثة";
  fileCategory: "أ" | "ب" | "ج" | "غير مستحق";
  fileNumber: string;
  dataModel: "النموذج الافتراضي" | "التأهيل";
  gender: "ذكر" | "أنثى";
  dependentsCount: number | null;
  wivesCount: number | null;
  childrenCount: number | null;
  orphansCount: number | null;
}

const beneficiariesData: BeneficiaryRecord[] = [
  { id: "1", name: "خالد مسفر العازمي", fileStatus: "قيد المراجعة", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "150001277", dataModel: "النموذج الافتراضي", gender: "ذكر", dependentsCount: null, wivesCount: null, childrenCount: null, orphansCount: null },
  { id: "2", name: "تهاني خالد جبران", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "540001195", dataModel: "النموذج الافتراضي", gender: "أنثى", dependentsCount: 2, wivesCount: null, childrenCount: 2, orphansCount: 0 },
  { id: "3", name: "فيحان فرج مفلح", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "ج", fileNumber: "580001047", dataModel: "التأهيل", gender: "ذكر", dependentsCount: 2, wivesCount: 1, childrenCount: 2, orphansCount: 0 },
  { id: "4", name: "فيحان عتيق ضاري", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "830000919", dataModel: "النموذج الافتراضي", gender: "ذكر", dependentsCount: null, wivesCount: null, childrenCount: null, orphansCount: null },
  { id: "5", name: "نوير ملفي مبارك", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "غير مستحق", fileNumber: "890000850", dataModel: "النموذج الافتراضي", gender: "أنثى", dependentsCount: 1, wivesCount: null, childrenCount: 1, orphansCount: 0 },
  { id: "6", name: "هيفاء حاتم بركة", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "ب", fileNumber: "840000778", dataModel: "النموذج الافتراضي", gender: "أنثى", dependentsCount: 2, wivesCount: null, childrenCount: 2, orphansCount: 0 },
  { id: "7", name: "إسماعيل حسني لاحق", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "620000681", dataModel: "النموذج الافتراضي", gender: "ذكر", dependentsCount: null, wivesCount: null, childrenCount: null, orphansCount: null },
  { id: "8", name: "مسند صالح لاحق", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "970000537", dataModel: "النموذج الافتراضي", gender: "ذكر", dependentsCount: null, wivesCount: null, childrenCount: null, orphansCount: null },
  { id: "9", name: "مريم مسفر احمد", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "810000495", dataModel: "النموذج الافتراضي", gender: "أنثى", dependentsCount: 2, wivesCount: null, childrenCount: 2, orphansCount: 0 },
  { id: "10", name: "محمد عيسى اللاحم", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "850000315", dataModel: "النموذج الافتراضي", gender: "ذكر", dependentsCount: null, wivesCount: null, childrenCount: null, orphansCount: null },
  { id: "11", name: "عبدالله محمد فيصل", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "أ", fileNumber: "950000216", dataModel: "النموذج الافتراضي", gender: "ذكر", dependentsCount: 2, wivesCount: 1, childrenCount: 2, orphansCount: 0 },
  { id: "12", name: "مجاهد احمد الصواف", fileStatus: "معتمد", dataStatus: "محدثة سليمة", fileCategory: "ب", fileNumber: "180000160", dataModel: "النموذج الافتراضي", gender: "ذكر", dependentsCount: 2, wivesCount: 1, childrenCount: 2, orphansCount: 0 },
];

const UpdateBeneficiaryStatusPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState("20");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");

  const getFileStatusBadge = (status: string) => {
    switch (status) {
      case "معتمد":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">معتمد</Badge>;
      case "قيد المراجعة":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">قيد المراجعة</Badge>;
      case "مرفوض":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">مرفوض</Badge>;
      case "غير مستحق":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">غير مستحق</Badge>;
      case "مؤرشف":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">مؤرشف</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredData = beneficiariesData.filter((record) => {
    return record.name.includes(searchValue) || record.fileNumber.includes(searchValue);
  });

  const copyFileNumber = (fileNumber: string) => {
    navigator.clipboard.writeText(fileNumber);
    toast.success("تم نسخ رقم الملف");
  };

  const handleUpdateStatus = (beneficiary: BeneficiaryRecord) => {
    setSelectedBeneficiary(beneficiary);
    setNewStatus(beneficiary.fileStatus);
    setNotes("");
    setIsDialogOpen(true);
  };

  const handleSaveStatus = () => {
    if (!newStatus) {
      toast.error("يرجى اختيار الحالة الجديدة");
      return;
    }
    toast.success(`تم تحديث حالة ملف ${selectedBeneficiary?.name} إلى ${newStatus}`);
    setIsDialogOpen(false);
    setSelectedBeneficiary(null);
    setNewStatus("");
    setNotes("");
  };

  return (
    <InnerPageLayout
      title="تحديث حالة ملف مستفيد"
      moduleId="beneficiaries"
      sectionTitle="إدارة حسابات المستفيدين"
      moduleTitle="إدارة ملفات المستفيدين"
    >
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">سجلات الصفحة</span>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pr-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <FileDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">تحديث الحالة</TableHead>
                    <TableHead className="text-right">ملف المستفيد</TableHead>
                    <TableHead className="text-right">الإسم</TableHead>
                    <TableHead className="text-right">حالة الملف</TableHead>
                    <TableHead className="text-right">حالة البيانات</TableHead>
                    <TableHead className="text-right">فئة الملف</TableHead>
                    <TableHead className="text-right">رقم الملف</TableHead>
                    <TableHead className="text-right">نموذج البيانات</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">عدد التابعين</TableHead>
                    <TableHead className="text-right">عدد الزوجات</TableHead>
                    <TableHead className="text-right">عدد الأطفال</TableHead>
                    <TableHead className="text-right">عدد الأيتام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleUpdateStatus(record)}
                        >
                          تحديث الحالة
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <Eye className="h-4 w-4 ml-1" />
                            معاينة
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell>{getFileStatusBadge(record.fileStatus)}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {record.dataStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.fileCategory}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{record.fileNumber}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyFileNumber(record.fileNumber)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{record.dataModel}</TableCell>
                      <TableCell>{record.gender}</TableCell>
                      <TableCell>{record.dependentsCount ?? "غير متاح"}</TableCell>
                      <TableCell>{record.wivesCount ?? "غير متاح"}</TableCell>
                      <TableCell>{record.childrenCount ?? "غير متاح"}</TableCell>
                      <TableCell>{record.orphansCount ?? "غير متاح"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Info */}
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>عرض {filteredData.length} من {beneficiariesData.length} سجل</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Update Status Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تحديث حالة الملف</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>المستفيد</Label>
              <Input value={selectedBeneficiary?.name || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>رقم الملف</Label>
              <Input value={selectedBeneficiary?.fileNumber || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>الحالة الحالية</Label>
              <div>{selectedBeneficiary && getFileStatusBadge(selectedBeneficiary.fileStatus)}</div>
            </div>
            <div className="space-y-2">
              <Label>الحالة الجديدة</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة الجديدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="معتمد">معتمد</SelectItem>
                  <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                  <SelectItem value="مرفوض">مرفوض</SelectItem>
                  <SelectItem value="غير مستحق">غير مستحق</SelectItem>
                  <SelectItem value="مؤرشف">مؤرشف</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ملاحظات</Label>
              <Textarea 
                placeholder="أضف ملاحظات حول تغيير الحالة..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveStatus} className="bg-green-600 hover:bg-green-700">
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </InnerPageLayout>
  );
};

export default UpdateBeneficiaryStatusPage;
