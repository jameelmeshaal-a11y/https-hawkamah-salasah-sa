import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserX, Search, RotateCcw, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";

interface DeletedDependent {
  id: string;
  name: string;
  idNumber: string;
  guardianName: string;
  relation: string;
  deletedAt: string;
  reason: string;
}

const DeletedDependentsFilesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [files, setFiles] = useState<DeletedDependent[]>([
    { id: "1", name: "خالد أحمد", idNumber: "1234567890", guardianName: "أحمد محمد", relation: "ابن", deletedAt: "2024-01-15", reason: "بلوغ السن القانوني" },
    { id: "2", name: "سارة علي", idNumber: "1234567891", guardianName: "علي سالم", relation: "ابنة", deletedAt: "2024-01-10", reason: "زواج" },
  ]);

  const handleRestore = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
    toast.success("تم استعادة ملف التابع بنجاح");
  };

  const filteredFiles = files.filter(f => 
    f.name.includes(searchValue) || f.idNumber.includes(searchValue) || f.guardianName.includes(searchValue)
  );

  return (
    <InnerPageLayout
      moduleId="beneficiary-accounts"
      title="ملفات التابعين المحذوفين"
      sectionTitle="إدارة ملفات المستفيدين"
      moduleTitle="إدارة حسابات المستفيدين"
    >
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 rounded-lg">
            <UserX className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold">ملفات التابعين المحذوفين</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>التابعين المحذوفين ({files.length})</CardTitle>
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
            {filteredFiles.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم التابع</TableHead>
                    <TableHead className="text-right">رقم الهوية</TableHead>
                    <TableHead className="text-right">اسم الوصي</TableHead>
                    <TableHead className="text-right">صلة القرابة</TableHead>
                    <TableHead className="text-right">تاريخ الحذف</TableHead>
                    <TableHead className="text-right">السبب</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>{file.idNumber}</TableCell>
                      <TableCell>{file.guardianName}</TableCell>
                      <TableCell>{file.relation}</TableCell>
                      <TableCell>{file.deletedAt}</TableCell>
                      <TableCell>{file.reason}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleRestore(file.id)}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState message="لا توجد ملفات تابعين محذوفة" />
            )}
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default DeletedDependentsFilesPage;
