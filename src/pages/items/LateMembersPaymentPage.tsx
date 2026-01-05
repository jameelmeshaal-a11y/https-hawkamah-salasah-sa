import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, RefreshCw, Filter, Eye, SlidersHorizontal } from "lucide-react";
import ExportDropdown from "@/components/shared/ExportDropdown";

const demoData = [
  {
    accountNumber: "20000018",
    name: "لافي",
    gender: "ذكر",
    birthDate: "الاثنين 24 صفر 1446هـ، 28 أغسطس 2024",
    idNumber: "1023634659",
    mobile: "0555874569",
    membershipNumber: "001",
    email: "lafi@example.com",
    province: "الرياض",
    city: "الرياض",
    district: "النزهة",
    street: "شارع الملك فهد",
    buildingNumber: "123",
    unitNumber: "5",
    postalCode: "12345",
    additionalNumber: "6789",
    membershipCategory: "مشترك عامل",
    subscriptionValue: "100",
    votesCount: "1",
  },
];

const columns = [
  { key: "accountNumber", label: "رقم الحساب", width: "100px" },
  { key: "preview", label: "معاينة", width: "80px" },
  { key: "name", label: "الإسم", width: "150px" },
  { key: "gender", label: "النوع", width: "80px", filterable: true },
  { key: "birthDate", label: "تاريخ الميلاد", width: "220px" },
  { key: "idNumber", label: "رقم الهوية", width: "120px" },
  { key: "mobile", label: "رقم الجوال", width: "120px" },
  { key: "membershipNumber", label: "رقم العضوية", width: "100px" },
  { key: "email", label: "البريد الإلكتروني", width: "180px" },
  { key: "province", label: "المحافظة", width: "100px", filterable: true },
  { key: "city", label: "المدينة", width: "100px" },
  { key: "district", label: "الحي", width: "100px" },
  { key: "street", label: "الشارع", width: "150px" },
  { key: "buildingNumber", label: "رقم المبنى", width: "80px" },
  { key: "unitNumber", label: "رقم الوحدة", width: "80px" },
  { key: "postalCode", label: "الرمز البريدي", width: "100px" },
  { key: "additionalNumber", label: "الرقم الإضافي", width: "100px" },
  { key: "membershipCategory", label: "فئة العضوية", width: "120px", filterable: true },
  { key: "subscriptionValue", label: "قيمة الاشتراك", width: "100px" },
  { key: "votesCount", label: "عدد الأصوات", width: "80px" },
];

const LateMembersPaymentPage = () => {
  const [pageSize, setPageSize] = useState("20");

  const renderCellContent = (row: typeof demoData[0], columnKey: string) => {
    if (columnKey === "preview") {
      return (
        <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          <Eye className="h-4 w-4 ml-1" />
          معاينة
        </Button>
      );
    }
    return row[columnKey as keyof typeof row] || "—";
  };

  return (
    <InnerPageLayout
      moduleId="members"
      title="المتأخرين عن السداد"
      moduleTitle="إدارة الأعضاء المشاركين"
      sectionTitle="أعضاء الجمعية العمومية"
    >
      <div className="p-6">
        <Card>
          <CardContent className="p-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث عام..." className="pr-10" />
                </div>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <ExportDropdown columns={columns} />
              </div>
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
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {columns.map((column) => (
                      <TableHead
                        key={column.key}
                        className="text-right whitespace-nowrap"
                        style={{ minWidth: column.width }}
                      >
                        <div className="flex items-center gap-1">
                          {column.label}
                          {column.filterable && <Filter className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoData.map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.key} className="whitespace-nowrap">
                          {renderCellContent(row, column.key)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>إظهار السجلات 1 لـ 1 من 1</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default LateMembersPaymentPage;
