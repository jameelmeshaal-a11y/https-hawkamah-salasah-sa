import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tags, Plus, Trash2, Pencil, Info, RefreshCw, Search, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageMembershipCategoriesPage = () => {
  const categories = [
    { id: 1, name: "مشترك منتسب", amount: 100 },
    { id: 2, name: "مشترك عامل", amount: 100 },
  ];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="إدارة فئات العضويات"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Tags className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">إدارة فئات العضويات</h1>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">إسم العضوية *</Label>
                <Input id="name" placeholder="أدخل إسم العضوية" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">مبلغ الإشتراك *</Label>
                <Input id="amount" type="number" placeholder="أدخل مبلغ الإشتراك" />
              </div>
            </div>

            <div className="flex justify-start">
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                <Plus className="h-4 w-4" />
                إضافة سجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Toolbar */}
        <Card>
          <CardContent className="p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" title="معلومات">
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="تحديث">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Search className="h-4 w-4" />
                  بحث متقدم
                </Button>
                <Button variant="outline" size="icon" title="فلتر">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="بحث..." className="w-48" />
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
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right w-24">إدارة</TableHead>
                  <TableHead className="text-right">إسم العضوية</TableHead>
                  <TableHead className="text-right">مبلغ الإشتراك</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.amount}</TableCell>
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

export default ManageMembershipCategoriesPage;
