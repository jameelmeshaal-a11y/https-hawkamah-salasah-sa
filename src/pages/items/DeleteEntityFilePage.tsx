import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Eye, RefreshCw, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import ExportDropdown from "@/components/shared/ExportDropdown";

const DeleteEntityFilePage = () => {
  const [entities, setEntities] = useState([
    { id: "1", name: "ابو بكر", type: "مسجد", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح" },
    { id: "2", name: "جمعي البر", type: "جمعية", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح" },
    { id: "3", name: "الجامع الكبير", type: "مسجد", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح" },
    { id: "4", name: "مستشفى الناصر", type: "مستشفى", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح" },
    { id: "5", name: "جمعية البر بمحفل", type: "جمعية", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح" },
  ]);

  const handleDelete = (id: string) => {
    setEntities(entities.filter(e => e.id !== id));
    toast.success("تم حذف الجهة بنجاح");
  };

  const exportColumns = [
    { key: "name", label: "ملف الجهة" },
    { key: "type", label: "نوع الجهة" },
    { key: "sector", label: "القطاع - المحافظة" },
    { key: "district", label: "القرية - الحي" },
    { key: "regNumber", label: "رقم التسجيل" },
  ];

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="حذف ملف جهة" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-destructive/10 rounded-lg"><Trash2 className="h-6 w-6 text-destructive" /></div>
          <h1 className="text-2xl font-bold">حذف ملف جهة</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>سجلات الجهات ({entities.length})</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>سجلات الصفحة</span>
                  <Select defaultValue="20">
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
                <Input placeholder="بحث عام..." className="w-48" />
                <ExportDropdown columns={exportColumns} onExport={(type, cols) => toast.success(`تصدير ${type} - ${cols.length} أعمدة`)} />
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><RefreshCw className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right w-24">حذف</TableHead>
                  <TableHead className="text-right">ملف الجهة</TableHead>
                  <TableHead className="text-right">نوع الجهة</TableHead>
                  <TableHead className="text-right">القطاع - المحافظة</TableHead>
                  <TableHead className="text-right">القرية - الحي</TableHead>
                  <TableHead className="text-right">رقم التسجيل</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entities.map((entity) => (
                  <TableRow key={entity.id}>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(entity.id)}
                      >
                        <Trash2 className="h-4 w-4 ml-1" />
                        حذف
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{entity.name}</span>
                        <Button variant="outline" size="sm" className="h-7 px-2">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{entity.type}</TableCell>
                    <TableCell>{entity.sector}</TableCell>
                    <TableCell>{entity.district}</TableCell>
                    <TableCell className="text-muted-foreground">{entity.regNumber}</TableCell>
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

export default DeleteEntityFilePage;
