import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Archive, Search, RotateCcw, Eye, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import StatCard from "@/components/shared/StatCard";

interface DeletedFile {
  id: string;
  fileNumber: string;
  name: string;
  idNumber: string;
  deletedBy: string;
  deletedAt: string;
  reason: string;
}

const DeletedFilesLogPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [files, setFiles] = useState<DeletedFile[]>([
    { id: "1", fileNumber: "BEN-101", name: "عبدالله سعد", idNumber: "1234567890", deletedBy: "محمد أحمد", deletedAt: "2024-01-15", reason: "وفاة" },
    { id: "2", fileNumber: "BEN-102", name: "نورة خالد", idNumber: "1234567891", deletedBy: "سارة علي", deletedAt: "2024-01-10", reason: "سفر" },
    { id: "3", fileNumber: "BEN-103", name: "فهد محمد", idNumber: "1234567892", deletedBy: "أحمد سالم", deletedAt: "2024-01-05", reason: "تحسن الحالة" },
  ]);

  const handleRestore = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
    toast.success("تم استعادة الملف بنجاح");
  };

  const handlePermanentDelete = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
    toast.success("تم الحذف النهائي للملف");
  };

  const filteredFiles = files.filter(f => 
    f.name.includes(searchValue) || f.idNumber.includes(searchValue) || f.fileNumber.includes(searchValue)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="سجل الملفات المحذوفة"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Archive className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold">سجل الملفات المحذوفة</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="إجمالي الملفات المحذوفة" value={files.length} icon={Archive} />
          <StatCard title="محذوفة هذا الشهر" value={2} />
          <StatCard title="قابلة للاستعادة" value={files.length} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>الملفات المحذوفة</CardTitle>
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
                  <TableHead className="text-right">رقم الملف</TableHead>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">رقم الهوية</TableHead>
                  <TableHead className="text-right">حذف بواسطة</TableHead>
                  <TableHead className="text-right">تاريخ الحذف</TableHead>
                  <TableHead className="text-right">السبب</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">{file.fileNumber}</TableCell>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.idNumber}</TableCell>
                    <TableCell>{file.deletedBy}</TableCell>
                    <TableCell>{file.deletedAt}</TableCell>
                    <TableCell>{file.reason}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" title="عرض">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleRestore(file.id)}
                          title="استعادة"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handlePermanentDelete(file.id)}
                          title="حذف نهائي"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

export default DeletedFilesLogPage;
