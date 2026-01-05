import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Search,
  RefreshCw,
  Filter,
  SlidersHorizontal,
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
    gender: "ذكر",
    maritalStatus: "متزوج",
    birthDateHijri: "الثلاثاء 26 محرم 1412هـ",
    birthDateGregorian: "06 أغسطس 1991",
    idSource: "غير متاح",
    landline: "غير متاح",
    email: "غير متاح",
    iban: "غير متاح",
    additionalContacts: "غير متاح",
    district: "أخرى",
    address: "غير متاح",
    educationLevel: "ماجستير",
    specialization: "غير متاح",
    jobTitle: "رئيس مجلس الإدارة",
    graduationYear: "غير متاح",
    jobGrade: "غير متاح",
    jobRank: "غير متاح",
    department: "إدارة المستفيدين، مجلس الإدارة و لجنة المساعدات",
    experienceYears: "غير متاح",
    qualificationNotes: "غير متاح",
    additionalNotes: "غير متاح",
    appointmentDateHijri: "الخميس 25 صفر 1446هـ",
    appointmentDateGregorian: "29 أغسطس 2024 01:32 ص",
    createdDateHijri: "الخميس 25 صفر 1446هـ",
    createdDateGregorian: "29 أغسطس 2024 11:56 ص",
    createdBy: "مدير النظام التقني",
    updatedDateHijri: "السبت 27 صفر 1446هـ",
    updatedDateGregorian: "31 أغسطس 2024 01:32 ص",
    updatedBy: "مدير النظام التقني",
  },
];

const columns = [
  { key: "accountCode", label: "كود الحساب", width: "120px" },
  { key: "preview", label: "معاينة الحساب", width: "100px" },
  { key: "accountType", label: "نوع الحساب", width: "140px", hasFilter: true },
  { key: "name", label: "الإسم", width: "160px" },
  { key: "idNumber", label: "رقم الهوية", width: "120px" },
  { key: "mobile", label: "رقم الجوال", width: "120px" },
  { key: "gender", label: "النوع", width: "80px", hasFilter: true },
  { key: "maritalStatus", label: "الحالة الإجتماعية", width: "120px", hasFilter: true },
  { key: "birthDate", label: "تاريخ الميلاد", width: "200px" },
  { key: "idSource", label: "مصدر الهوية", width: "100px" },
  { key: "landline", label: "هاتف أرضي", width: "100px" },
  { key: "email", label: "بريد إلكتروني", width: "140px" },
  { key: "iban", label: "رقم الآيبان", width: "120px" },
  { key: "additionalContacts", label: "جهات إتصال إضافية", width: "140px" },
  { key: "district", label: "القرية - الحي", width: "120px", hasFilter: true },
  { key: "address", label: "العنوان", width: "140px" },
  { key: "educationLevel", label: "المستوى التعليمي", width: "120px" },
  { key: "specialization", label: "التخصص", width: "120px" },
  { key: "jobTitle", label: "المسمى الوظيفي", width: "140px" },
  { key: "graduationYear", label: "سنة التخرج", width: "100px" },
  { key: "jobGrade", label: "الدرجة الوظيفية", width: "120px" },
  { key: "jobRank", label: "الرتبة الوظيفية", width: "120px" },
  { key: "department", label: "الإدارة", width: "200px" },
  { key: "experienceYears", label: "سنوات الخبرة", width: "100px" },
  { key: "qualificationNotes", label: "ملاحظات المؤهل", width: "140px" },
  { key: "additionalNotes", label: "ملاحظات إضافية", width: "140px" },
  { key: "appointmentDate", label: "تاريخ التعيين", width: "220px" },
  { key: "createdDate", label: "تاريخ الإنشاء", width: "220px" },
  { key: "createdBy", label: "أنشأ بواسطة", width: "140px" },
  { key: "updatedDate", label: "تاريخ التحديث", width: "220px" },
  { key: "updatedBy", label: "حدث بواسطة", width: "140px" },
];

const BoardMembersDatabasePage = () => {
  const renderCellContent = (row: typeof demoData[0], key: string) => {
    switch (key) {
      case "preview":
        return (
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white h-7 px-3">
            <Eye className="h-3 w-3 ml-1" />
            معاينة
          </Button>
        );
      case "birthDate":
        return (
          <div className="text-xs">
            <div>{row.birthDateHijri}</div>
            <div className="text-muted-foreground">{row.birthDateGregorian}</div>
          </div>
        );
      case "appointmentDate":
        return (
          <div className="text-xs">
            <div>{row.appointmentDateHijri}</div>
            <div className="text-muted-foreground">{row.appointmentDateGregorian}</div>
          </div>
        );
      case "createdDate":
        return (
          <div className="text-xs">
            <div>{row.createdDateHijri}</div>
            <div className="text-muted-foreground">{row.createdDateGregorian}</div>
          </div>
        );
      case "updatedDate":
        return (
          <div className="text-xs">
            <div>{row.updatedDateHijri}</div>
            <div className="text-muted-foreground">{row.updatedDateGregorian}</div>
          </div>
        );
      case "mobile":
        return <span dir="ltr">{row.mobile}</span>;
      default:
        return row[key as keyof typeof row] || "غير متاح";
    }
  };

  return (
    <InnerPageLayout
      moduleId="members"
      title="قاعدة بيانات الأعضاء"
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
              <ExportDropdown columns={columns} />
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

          {/* Scrollable Table */}
          <ScrollArea className="w-full whitespace-nowrap border rounded-lg">
            <div className="min-w-max">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {columns.map((col) => (
                      <TableHead
                        key={col.key}
                        className="text-right"
                        style={{ minWidth: col.width }}
                      >
                        <div className="flex items-center gap-2">
                          {col.label}
                          {col.hasFilter && (
                            <Filter className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoData.map((row) => (
                    <TableRow key={row.id}>
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          style={{ minWidth: col.width }}
                        >
                          {renderCellContent(row, col.key)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>إظهار السجلات 1 لـ 1 من 1</span>
          </div>
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default BoardMembersDatabasePage;
