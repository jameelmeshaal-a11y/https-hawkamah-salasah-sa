import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Plus, Eye, MapPin, Trash2, Paperclip, RefreshCw, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ExportDropdown from "@/components/shared/ExportDropdown";

const ManageEntitiesAccountsPage = () => {
  const [entities] = useState([
    { id: "1", name: "ابو بكر", type: "مسجد", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح", unifiedId: "غير متاح" },
    { id: "2", name: "جمعي البر", type: "جمعية", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح", unifiedId: "غير متاح" },
    { id: "3", name: "الجامع الكبير", type: "مسجد", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح", unifiedId: "غير متاح" },
    { id: "4", name: "مستشفى الناصر", type: "مستشفى", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح", unifiedId: "غير متاح" },
    { id: "5", name: "جمعية البر بمحفل", type: "جمعية", sector: "محافظة الرياض", district: "أخرى", regNumber: "غير متاح", unifiedId: "غير متاح" },
  ]);

  const [representatives, setRepresentatives] = useState<{ mobile: string; name: string; id: string }[]>([]);
  const [newRep, setNewRep] = useState({ mobile: "", name: "", id: "" });

  const handleAddRepresentative = () => {
    if (!newRep.mobile || !newRep.name) {
      toast.error("يرجى إدخال رقم الجوال والاسم");
      return;
    }
    setRepresentatives([...representatives, { ...newRep, id: newRep.id || "غير محدد" }]);
    setNewRep({ mobile: "", name: "", id: "" });
    toast.success("تم إضافة الممثل");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم إضافة السجل بنجاح");
  };

  const exportColumns = [
    { key: "name", label: "ملف الجهة" },
    { key: "type", label: "نوع الجهة" },
    { key: "sector", label: "القطاع - المحافظة" },
    { key: "district", label: "القرية - الحي" },
    { key: "regNumber", label: "رقم التسجيل" },
    { key: "unifiedId", label: "رقم الهوية" },
  ];

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="إدارة حسابات الجهات" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><Building2 className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">إدارة حسابات الجهات</h1>
        </div>

        {/* Form Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>نموذج البيانات</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Data Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>نموذج البيانات <span className="text-destructive">*</span></Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mosque">مسجد</SelectItem>
                      <SelectItem value="association">جمعية</SelectItem>
                      <SelectItem value="hospital">مستشفى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>اسم الجهة</Label>
                  <Input placeholder="أدخل اسم الجهة" />
                </div>
                <div className="space-y-2">
                  <Label>القطاع - المحافظة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="riyadh">محافظة الرياض</SelectItem>
                      <SelectItem value="jeddah">محافظة جدة</SelectItem>
                      <SelectItem value="dammam">محافظة الدمام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>القرية - الحي</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="-- اختر --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>رقم التسجيل</Label>
                  <Input placeholder="رقم التسجيل" />
                </div>
                <div className="space-y-2">
                  <Label>رقم الهوية الموحد (700)</Label>
                  <Input placeholder="رقم الهوية الموحد" />
                </div>
                <div className="space-y-2">
                  <Label>رقم الآيبان</Label>
                  <Input placeholder="رقم الآيبان" />
                </div>
                <div className="space-y-2">
                  <Label>إحداثيات العنوان</Label>
                  <div className="flex gap-2">
                    <Input placeholder="إحداثيات العنوان" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <Label>المرفقات</Label>
                <Button type="button" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                  <Paperclip className="h-4 w-4 ml-2" />
                  إضافة مرفقات
                </Button>
              </div>

              {/* Representatives Section */}
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">الأشخاص الممثلين</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                      <Label>الجوال</Label>
                      <Input 
                        placeholder="05xxxxxxxx" 
                        value={newRep.mobile}
                        onChange={(e) => setNewRep({ ...newRep, mobile: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>الاسم</Label>
                      <Input 
                        placeholder="اسم الممثل"
                        value={newRep.name}
                        onChange={(e) => setNewRep({ ...newRep, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>الهوية</Label>
                      <Input 
                        placeholder="رقم الهوية"
                        value={newRep.id}
                        onChange={(e) => setNewRep({ ...newRep, id: e.target.value })}
                      />
                    </div>
                    <Button type="button" onClick={handleAddRepresentative} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة ممثل
                    </Button>
                  </div>
                  {representatives.length > 0 && (
                    <div className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-right">الجوال</TableHead>
                            <TableHead className="text-right">الاسم</TableHead>
                            <TableHead className="text-right">الهوية</TableHead>
                            <TableHead className="text-right">إجراء</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {representatives.map((rep, index) => (
                            <TableRow key={index}>
                              <TableCell>{rep.mobile}</TableCell>
                              <TableCell>{rep.name}</TableCell>
                              <TableCell>{rep.id}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-destructive"
                                  onClick={() => setRepresentatives(representatives.filter((_, i) => i !== index))}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة سجل
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Table Section */}
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
                  <TableHead className="text-right">ملف الجهة</TableHead>
                  <TableHead className="text-right">نوع الجهة</TableHead>
                  <TableHead className="text-right">القطاع - المحافظة</TableHead>
                  <TableHead className="text-right">القرية - الحي</TableHead>
                  <TableHead className="text-right">رقم التسجيل</TableHead>
                  <TableHead className="text-right">رقم الهوية</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entities.map((entity) => (
                  <TableRow key={entity.id}>
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
                    <TableCell className="text-muted-foreground">{entity.unifiedId}</TableCell>
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

export default ManageEntitiesAccountsPage;
