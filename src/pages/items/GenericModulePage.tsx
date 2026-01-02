import { useParams } from "react-router-dom";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { modulesDataMap } from "@/data/allModulesData";
import { moduleSlugToId } from "@/utils/itemRoutes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, Download, RefreshCw } from "lucide-react";

interface PageInfo {
  itemTitle: string;
  sectionTitle: string;
  moduleTitle: string;
  pageType: "table" | "form" | "database" | "settings" | "report";
}

const getPageInfo = (moduleId: string, itemSlug: string): PageInfo | null => {
  const moduleEntry = Object.entries(moduleSlugToId).find(([, id]) => id === moduleId);
  if (!moduleEntry) return null;

  const moduleTitle = moduleEntry[0];
  const sections = modulesDataMap[moduleTitle];
  if (!sections) return null;

  for (const section of sections) {
    for (const item of section.items) {
      if (item.slug === itemSlug) {
        let pageType: PageInfo["pageType"] = "table";
        const title = item.title.toLowerCase();
        
        if (title.includes("إضافة") || title.includes("تقديم") || title.includes("إنشاء") || title.includes("تسجيل")) {
          pageType = "form";
        } else if (title.includes("قاعدة بيانات") || title.includes("سجل") || title.includes("سجلات")) {
          pageType = "database";
        } else if (title.includes("إعدادات") || title.includes("إدارة")) {
          pageType = "settings";
        } else if (title.includes("تقارير") || title.includes("تقرير") || title.includes("إحصائيات")) {
          pageType = "report";
        }

        return {
          itemTitle: item.title,
          sectionTitle: section.title,
          moduleTitle,
          pageType,
        };
      }
    }
  }
  
  return null;
};

const GenericModulePage = () => {
  const { moduleId = "", itemSlug = "" } = useParams();
  const pageInfo = getPageInfo(moduleId, itemSlug);

  if (!pageInfo) {
    return (
      <InnerPageLayout title="صفحة غير موجودة" moduleId={moduleId}>
        <div className="text-center py-12 text-muted-foreground">
          الصفحة المطلوبة غير متوفرة حالياً
        </div>
      </InnerPageLayout>
    );
  }

  const renderTablePage = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">{pageInfo.itemTitle}</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 ml-2" />
            إضافة جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="بحث..." className="pr-10" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            فلترة
          </Button>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">العنوان</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                لا توجد بيانات للعرض
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderFormPage = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{pageInfo.itemTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الحقل الأول</label>
              <Input placeholder="أدخل البيانات" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الحقل الثاني</label>
              <Input placeholder="أدخل البيانات" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">الوصف</label>
            <Input placeholder="أدخل الوصف" />
          </div>
          <div className="flex gap-2 pt-4">
            <Button>حفظ</Button>
            <Button variant="outline">إلغاء</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDatabasePage = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">{pageInfo.itemTitle}</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            تصدير Excel
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            تصدير PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="بحث متقدم..." className="pr-10" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            فلترة متقدمة
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">الرقم المرجعي</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">تاريخ الإنشاء</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                لا توجد سجلات للعرض
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderSettingsPage = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{pageInfo.itemTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">الإعدادات العامة</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">تفعيل الخاصية</span>
                <Button variant="outline" size="sm">تعديل</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">إعدادات العرض</span>
                <Button variant="outline" size="sm">تعديل</Button>
              </div>
            </div>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">إعدادات متقدمة</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">الصلاحيات</span>
                <Button variant="outline" size="sm">إدارة</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderReportPage = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">{pageInfo.itemTitle}</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            تحميل التقرير
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">إجمالي العناصر</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">المكتمل</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">نسبة الإنجاز</p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          لا توجد بيانات كافية لعرض التقرير
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (pageInfo.pageType) {
      case "form":
        return renderFormPage();
      case "database":
        return renderDatabasePage();
      case "settings":
        return renderSettingsPage();
      case "report":
        return renderReportPage();
      default:
        return renderTablePage();
    }
  };

  return (
    <InnerPageLayout title={pageInfo.itemTitle} moduleId={moduleId}>
      <div className="mb-4 text-sm text-muted-foreground">
        {pageInfo.moduleTitle} / {pageInfo.sectionTitle}
      </div>
      {renderContent()}
    </InnerPageLayout>
  );
};

export default GenericModulePage;
