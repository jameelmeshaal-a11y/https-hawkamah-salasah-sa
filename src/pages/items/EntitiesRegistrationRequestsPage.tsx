import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter, RefreshCw, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import ExportDropdown from "@/components/shared/ExportDropdown";
import EmptyState from "@/components/shared/EmptyState";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const EntitiesRegistrationRequestsPage = () => {
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const requests = [
    { id: "1", entityName: "لايوجد", type: "مستشفى", sector: "سكاكا", district: "أخرى" },
    { id: "2", entityName: "مستشفى الغفالي", type: "مستشفى", sector: "وادي الدواسر", district: "أخرى" },
    { id: "3", entityName: "مستشفى العام", type: "مستشفى", sector: "محافظة الرياض", district: "أخرى" },
  ];

  const typeCounts = {
    "مستشفى": 3,
    "جمعية": 5,
    "مسجد": 4,
    "النموذج الافتراضي": 0,
  };

  const filteredRequests = typeFilter 
    ? requests.filter(r => r.type === typeFilter)
    : requests;

  const exportColumns = [
    { key: "entityName", label: "اسم الجهة" },
    { key: "type", label: "نوع الجهة" },
    { key: "sector", label: "القطاع - المحافظة" },
    { key: "district", label: "القرية - الحي" },
  ];

  return (
    <InnerPageLayout moduleId="beneficiary-accounts" title="طلبات تسجيل الجهات" sectionTitle="إدارة الجهات المستفيدة" moduleTitle="إدارة حسابات المستفيدين">
      <div className="p-6" dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><FileText className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">طلبات تسجيل الجهات</h1>
        </div>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <CardTitle className="text-lg">الطلبات ({filteredRequests.length})</CardTitle>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      {typeFilter || "نوع الجهة"}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="start">
                    <div className="space-y-1">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between"
                        onClick={() => setTypeFilter(null)}
                      >
                        <span>الكل</span>
                        <span className="text-muted-foreground">{requests.length}</span>
                      </Button>
                      {Object.entries(typeCounts).map(([type, count]) => (
                        <Button 
                          key={type}
                          variant={typeFilter === type ? "secondary" : "ghost"}
                          className="w-full justify-between"
                          onClick={() => setTypeFilter(type)}
                        >
                          <span>{type}</span>
                          <span className="text-muted-foreground">{count}</span>
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
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
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث..." className="w-48 pr-9" />
                </div>
                <ExportDropdown columns={exportColumns} />
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><RefreshCw className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredRequests.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">إدارة</TableHead>
                      <TableHead className="text-right">اسم الجهة</TableHead>
                      <TableHead className="text-right">نوع الجهة</TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center gap-1">
                          القطاع - المحافظة
                          <Filter className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">القرية - الحي</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button className="bg-green-600 hover:bg-green-700 text-white gap-1">
                                إدارة الجهة
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem>تعديل</DropdownMenuItem>
                              <DropdownMenuItem>حذف</DropdownMenuItem>
                              <DropdownMenuItem>موافقة</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell className="font-medium">{request.entityName}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.sector}</TableCell>
                        <TableCell>{request.district}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-sm text-muted-foreground text-center">
                  إظهار السجلات 1 ل {filteredRequests.length} من {filteredRequests.length}
                </div>
              </>
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
