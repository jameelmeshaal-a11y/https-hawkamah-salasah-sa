import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  Search,
  RefreshCw,
  Filter,
  SlidersHorizontal,
  Edit,
  Eye,
} from "lucide-react";
import ExportDropdown from "@/components/shared/ExportDropdown";

const demoData = [
  {
    id: "1",
    accountCode: "680000564",
    accountType: "عضو مجلس إدارة",
    name: "علي مسعود خالد",
    idNumber: "1025478569",
    mobile: "0555874569",
  },
];

const UpdateBoardMemberPage = () => {
  return (
    <InnerPageLayout
      moduleId="members"
      title="تحديث بيانات عضو"
      moduleTitle="إدارة الأعضاء المشاركين"
      sectionTitle="أعضاء مجلس الإدارة"
    >
      <Card className="shadow-sm">
        <CardContent className="p-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عام..."
                  className="pr-10 w-64"
                />
              </div>
              
              {/* Action Buttons */}
              <Button variant="outline" size="icon" title="تحديث">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="بحث متقدم">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="فلتر">
                <Filter className="h-4 w-4" />
              </Button>
              <ExportDropdown columns={[
                { key: "accountCode", label: "كود الحساب" },
                { key: "accountType", label: "نوع الحساب" },
                { key: "name", label: "الإسم" },
                { key: "idNumber", label: "رقم الهوية" },
                { key: "mobile", label: "رقم الجوال" },
              ]} />
            </div>

            {/* Page Size */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">سجلات الصفحة:</span>
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
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12 text-center">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-12 text-center">تعديل</TableHead>
                  <TableHead className="text-right">كود الحساب</TableHead>
                  <TableHead className="text-right">معاينة الحساب</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center gap-2">
                      نوع الحساب
                      <Filter className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">الإسم</TableHead>
                  <TableHead className="text-right">رقم الهوية</TableHead>
                  <TableHead className="text-right">رقم الجوال</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{row.accountCode}</TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white h-7 px-3">
                        <Eye className="h-3 w-3 ml-1" />
                        معاينة
                      </Button>
                    </TableCell>
                    <TableCell>{row.accountType}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.idNumber}</TableCell>
                    <TableCell dir="ltr" className="text-right">{row.mobile}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>إظهار السجلات 1 لـ 1 من 1</span>
          </div>
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default UpdateBoardMemberPage;
