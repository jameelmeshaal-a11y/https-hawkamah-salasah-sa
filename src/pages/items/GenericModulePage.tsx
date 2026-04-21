import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { modulesDataMap } from "@/data/allModulesData";
import { moduleSlugToId } from "@/utils/itemRoutes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, RefreshCw, Eye, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ViewDetailsDialog from "@/components/dialogs/ViewDetailsDialog";
import ConfirmDeleteDialog from "@/components/dialogs/ConfirmDeleteDialog";
import ExportDropdown from "@/components/shared/ExportDropdown";
import GenericAddRecordDialog from "@/components/dialogs/GenericAddRecordDialog";

interface PageInfo {
  itemTitle: string;
  sectionTitle: string;
  moduleTitle: string;
  pageType: "table" | "form" | "database" | "settings" | "report";
}

// Map slugs to DB tables and their display columns
const slugToTable: Record<string, { table: string; columns: { key: string; label: string }[]; formFields?: { key: string; label: string; required?: boolean }[] }> = {
  "beneficiaries-database": { table: "beneficiaries", columns: [{ key: "full_name", label: "الاسم" }, { key: "category", label: "الفئة" }, { key: "city", label: "المدينة" }, { key: "phone", label: "الجوال" }, { key: "status", label: "الحالة" }], formFields: [{ key: "full_name", label: "الاسم الكامل", required: true }, { key: "category", label: "الفئة" }, { key: "city", label: "المدينة" }, { key: "phone", label: "رقم الجوال" }] },
  "volunteers-database": { table: "volunteers", columns: [{ key: "full_name", label: "الاسم" }, { key: "phone", label: "الجوال" }, { key: "email", label: "البريد" }, { key: "skills", label: "المهارات" }, { key: "status", label: "الحالة" }], formFields: [{ key: "full_name", label: "الاسم الكامل", required: true }, { key: "phone", label: "الجوال" }, { key: "email", label: "البريد" }] },
  "sponsors-list": { table: "donors", columns: [{ key: "full_name", label: "الاسم" }, { key: "donor_type", label: "النوع" }, { key: "phone", label: "الجوال" }, { key: "email", label: "البريد" }, { key: "city", label: "المدينة" }, { key: "total_donations", label: "إجمالي التبرعات" }, { key: "status", label: "الحالة" }], formFields: [{ key: "full_name", label: "الاسم", required: true }, { key: "phone", label: "الجوال" }, { key: "email", label: "البريد" }, { key: "city", label: "المدينة" }] },
  "board-members-database": { table: "board_members", columns: [{ key: "full_name", label: "الاسم" }, { key: "position", label: "المنصب" }, { key: "phone", label: "الجوال" }, { key: "email", label: "البريد" }, { key: "status", label: "الحالة" }] },
  "employees-list": { table: "employees", columns: [{ key: "full_name", label: "الاسم" }, { key: "employee_number", label: "الرقم الوظيفي" }, { key: "department", label: "القسم" }, { key: "position", label: "المنصب" }, { key: "phone", label: "الجوال" }, { key: "status", label: "الحالة" }] },
  "tasks-database": { table: "tasks", columns: [{ key: "title", label: "العنوان" }, { key: "assigned_to_name", label: "المسند إليه" }, { key: "department", label: "القسم" }, { key: "priority", label: "الأولوية" }, { key: "due_date", label: "تاريخ الاستحقاق" }, { key: "status", label: "الحالة" }], formFields: [{ key: "title", label: "عنوان المهمة", required: true }, { key: "description", label: "الوصف" }, { key: "assigned_to_name", label: "المسند إليه" }, { key: "department", label: "القسم" }] },
  "projects-database": { table: "projects", columns: [{ key: "name", label: "اسم المشروع" }, { key: "manager_name", label: "المدير" }, { key: "budget", label: "الميزانية" }, { key: "status", label: "الحالة" }, { key: "completion_percentage", label: "الإنجاز %" }] },
  "manage-donations": { table: "donations", columns: [{ key: "amount", label: "المبلغ" }, { key: "donation_date", label: "التاريخ" }, { key: "payment_method", label: "طريقة الدفع" }, { key: "purpose", label: "الغرض" }, { key: "status", label: "الحالة" }] },
  "manage-grants": { table: "grants", columns: [{ key: "program_name", label: "البرنامج" }, { key: "grantor", label: "الجهة المانحة" }, { key: "amount", label: "المبلغ" }, { key: "status", label: "الحالة" }] },
  "manage-meetings": { table: "meetings", columns: [{ key: "title", label: "العنوان" }, { key: "meeting_type", label: "النوع" }, { key: "meeting_date", label: "التاريخ" }, { key: "location", label: "المكان" }, { key: "status", label: "الحالة" }] },
  "manage-decisions": { table: "decisions", columns: [{ key: "title", label: "العنوان" }, { key: "decision_number", label: "رقم القرار" }, { key: "responsible_person", label: "المسؤول" }, { key: "status", label: "الحالة" }] },
  "manage-sponsorships": { table: "sponsorships", columns: [{ key: "program_name", label: "البرنامج" }, { key: "sponsor_name", label: "الكفيل" }, { key: "monthly_amount", label: "المبلغ الشهري" }, { key: "status", label: "الحالة" }] },
  "attendance-records": { table: "attendance", columns: [{ key: "employee_id", label: "الموظف" }, { key: "date", label: "التاريخ" }, { key: "check_in", label: "الحضور" }, { key: "check_out", label: "الانصراف" }, { key: "status", label: "الحالة" }] },
  "leaves-management": { table: "leaves", columns: [{ key: "leave_type", label: "نوع الإجازة" }, { key: "start_date", label: "من" }, { key: "end_date", label: "إلى" }, { key: "days_count", label: "الأيام" }, { key: "status", label: "الحالة" }] },
  "manage-requests": { table: "requests", columns: [{ key: "title", label: "العنوان" }, { key: "request_type", label: "النوع" }, { key: "priority", label: "الأولوية" }, { key: "submitter_name", label: "مقدم الطلب" }, { key: "status", label: "الحالة" }] },
  "pending-requests": { table: "requests", columns: [{ key: "title", label: "العنوان" }, { key: "request_type", label: "النوع" }, { key: "priority", label: "الأولوية" }, { key: "submitter_name", label: "مقدم الطلب" }, { key: "status", label: "الحالة" }] },
  "approved-requests": { table: "requests", columns: [{ key: "title", label: "العنوان" }, { key: "request_type", label: "النوع" }, { key: "submitter_name", label: "مقدم الطلب" }, { key: "status", label: "الحالة" }] },
  "notifications-management": { table: "notifications", columns: [{ key: "title", label: "العنوان" }, { key: "message", label: "الرسالة" }, { key: "type", label: "النوع" }, { key: "is_read", label: "مقروء" }] },
  "manage-journal-entries": { table: "journal_entries", columns: [{ key: "entry_number", label: "رقم القيد" }, { key: "entry_date", label: "التاريخ" }, { key: "description", label: "الوصف" }, { key: "reference", label: "المرجع" }, { key: "status", label: "الحالة" }] },
  "manage-bank-accounts": { table: "bank_accounts", columns: [{ key: "bank_name", label: "البنك" }, { key: "account_number", label: "رقم الحساب" }, { key: "account_type", label: "النوع" }, { key: "balance", label: "الرصيد" }, { key: "is_active", label: "نشط" }] },
  "manage-budgets": { table: "budgets", columns: [{ key: "name", label: "الاسم" }, { key: "fiscal_year", label: "السنة" }, { key: "total_amount", label: "المبلغ" }, { key: "spent_amount", label: "المصروف" }, { key: "status", label: "الحالة" }] },
  "financial-accounts": { table: "financial_accounts", columns: [{ key: "code", label: "الكود" }, { key: "name", label: "الاسم" }, { key: "type", label: "النوع" }, { key: "balance", label: "الرصيد" }, { key: "is_active", label: "نشط" }] },
};

// Additional slug aliases
const slugAliases: Record<string, string> = {
  "my-tasks": "tasks-database",
  "department-tasks": "tasks-database",
  "create-task": "tasks-database",
  "complete-task": "tasks-database",
  "manage-tasks": "tasks-database",
  "project-tasks": "tasks-database",
  "rejected-requests": "manage-requests",
  "completed-requests": "manage-requests",
  "cancelled-requests": "manage-requests",
  "ongoing-transactions": "manage-requests",
  "completed-transactions": "manage-requests",
  "manage-employee-tasks": "tasks-database",
  "donors-database": "sponsors-list",
  "manage-donors": "sponsors-list",
  "collect-general-donation": "manage-donations",
  "review-cash-donations": "manage-donations",
  "manage-salary-records": "employees-list",
  "employee-reviews": "employees-list",
  "leave-balances": "leaves-management",
  "manage-members-accounts": "board-members-database",
  "shareholders-accounts": "board-members-database",
  "manage-project-activities": "projects-database",
  "manage-project-reports": "projects-database",
  "manage-project-tasks": "projects-database",
  "strategic-plans-management": "projects-database",
};

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
        if (title.includes("إضافة") || title.includes("تقديم") || title.includes("إنشاء") || title.includes("تسجيل")) pageType = "form";
        else if (title.includes("قاعدة بيانات") || title.includes("سجل")) pageType = "database";
        else if (title.includes("إعدادات") || title.includes("إدارة")) pageType = "settings";
        else if (title.includes("تقارير") || title.includes("تقرير") || title.includes("إحصائيات")) pageType = "report";
        return { itemTitle: item.title, sectionTitle: section.title, moduleTitle, pageType };
      }
    }
  }
  return null;
};

const GenericModulePage = () => {
  const { moduleId = "", itemSlug = "" } = useParams();
  const pageInfo = getPageInfo(moduleId, itemSlug);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Record<string, unknown> | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const resolvedSlug = slugAliases[itemSlug] || itemSlug;
  const tableConfig = slugToTable[resolvedSlug];

  const fetchData = useCallback(async () => {
    if (!tableConfig) { setLoading(false); return; }
    setLoading(true);
    try {
      const { data: rows, error } = await supabase
        .from(tableConfig.table as any)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      setData((rows || []) as unknown as Record<string, unknown>[]);
    } catch {
      toast.error("فشل في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }, [tableConfig]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async () => {
    if (!deleteTarget || !tableConfig) return;
    const { error } = await supabase.from(tableConfig.table as any).delete().eq("id", deleteTarget);
    if (error) { toast.error("فشل في الحذف"); return; }
    toast.success("تم الحذف بنجاح");
    setDeleteOpen(false);
    setDeleteTarget(null);
    fetchData();
  };

  const formatCellValue = (value: unknown): string => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "boolean") return value ? "نعم" : "لا";
    if (typeof value === "number") return new Intl.NumberFormat("ar-SA").format(value);
    return String(value);
  };

  if (!pageInfo) {
    return (
      <InnerPageLayout title="صفحة غير موجودة" moduleId={moduleId}>
        <div className="text-center py-12 text-muted-foreground">الصفحة المطلوبة غير متوفرة حالياً</div>
      </InnerPageLayout>
    );
  }

  const columns = tableConfig?.columns || [{ key: "id", label: "#" }];
  const filteredData = searchQuery
    ? data.filter(row => columns.some(col => String(row[col.key] || "").includes(searchQuery)))
    : data;

  return (
    <InnerPageLayout title={pageInfo.itemTitle} moduleId={moduleId} moduleTitle={pageInfo.moduleTitle} sectionTitle={pageInfo.sectionTitle}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-medium">{pageInfo.itemTitle}</CardTitle>
          <div className="flex items-center gap-2">
            {tableConfig && (
              <Button onClick={() => setAddOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة سجل جديد
              </Button>
            )}
            {tableConfig && <ExportDropdown columns={columns} />}
            <Button variant="outline" size="icon" onClick={fetchData} title="تحديث">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="بحث..." className="pr-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Button variant="outline" size="sm"><Filter className="h-4 w-4 ml-2" />فلترة</Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right w-12">#</TableHead>
                    {columns.map(col => (
                      <TableHead key={col.key} className="text-right">{col.label}</TableHead>
                    ))}
                    <TableHead className="text-right w-28">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length + 2} className="text-center py-8 text-muted-foreground">
                        لا توجد بيانات للعرض
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((row, idx) => (
                      <TableRow key={String(row.id || idx)}>
                        <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                        {columns.map(col => (
                          <TableCell key={col.key}>{formatCellValue(row[col.key])}</TableCell>
                        ))}
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => { setSelectedRecord(row); setViewOpen(true); }}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => { setDeleteTarget(String(row.id)); setDeleteOpen(true); }}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>إجمالي السجلات: {filteredData.length}</span>
          </div>
        </CardContent>
      </Card>

      {selectedRecord && (
        <ViewDetailsDialog
          open={viewOpen}
          onOpenChange={setViewOpen}
          title="تفاصيل السجل"
          data={columns.reduce((acc, col) => ({ ...acc, [col.label]: formatCellValue(selectedRecord[col.key]) }), {} as Record<string, string>)}
        />
      )}

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="تأكيد الحذف"
        description="هل أنت متأكد من حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء."
      />

      {tableConfig && (
        <GenericAddRecordDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          table={tableConfig.table}
          title={`إضافة - ${pageInfo.itemTitle}`}
          fields={tableConfig.formFields || tableConfig.columns.map(c => ({ key: c.key, label: c.label }))}
          onSuccess={fetchData}
        />
      )}
    </InnerPageLayout>
  );
};

export default GenericModulePage;
