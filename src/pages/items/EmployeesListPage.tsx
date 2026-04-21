import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdvancedTable, { TableColumn, TableAction } from "@/components/shared/AdvancedTable";
import StatCard from "@/components/shared/StatCard";
import { Users, Briefcase, Building, UserCheck, Plus } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { AddEmployeeDialog } from "@/components/dialogs/AddEmployeeDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const EmployeesListPage = () => {
  const { employees, loading, addEmployee, deleteEmployee } = useEmployees();
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: TableColumn[] = [
    { key: "employee_number", label: "رقم الموظف", type: "link" },
    { key: "full_name", label: "الاسم" },
    { key: "national_id", label: "رقم الهوية" },
    { key: "department", label: "القسم" },
    { key: "position", label: "المسمى الوظيفي" },
    { key: "hire_date", label: "تاريخ التعيين", type: "date" },
    { key: "phone", label: "الجوال" },
    { key: "salary", label: "الراتب", type: "number" },
    { key: "status", label: "الحالة", type: "status" },
  ];

  const actions: TableAction[] = [
    { icon: "view", onClick: () => {} },
    { icon: "edit", onClick: () => {} },
    { icon: "delete", onClick: (row) => setDeleteId(row.id as string) },
  ];

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((r) => r.status === "active").length;
  const departments = new Set(employees.map((r) => r.department).filter(Boolean)).size;

  return (
    <InnerPageLayout moduleId="hr" title="قائمة الموظفين" sectionTitle="بيانات الموظفين" moduleTitle="إدارة الموارد البشرية">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            <StatCard title="إجمالي الموظفين" value={totalEmployees} icon={Users} variant="info" />
            <StatCard title="موظفون نشطون" value={activeEmployees} icon={UserCheck} variant="success" />
            <StatCard title="عدد الأقسام" value={departments} icon={Building} variant="warning" />
            <StatCard title="إجمالي الرواتب" value={`${employees.reduce((s, e) => s + (e.salary || 0), 0).toLocaleString()} ﷼`} icon={Briefcase} variant="default" />
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">سجل الموظفين</CardTitle>
            <Button onClick={() => setShowAdd(true)} className="gap-2 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4" /> إضافة موظف
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">جارٍ التحميل...</div>
            ) : (
              <AdvancedTable columns={columns} data={employees} actions={actions} />
            )}
          </CardContent>
        </Card>
      </div>

      <AddEmployeeDialog open={showAdd} onClose={() => setShowAdd(false)} onSubmit={addEmployee} />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>هل أنت متأكد من حذف هذا الموظف؟ لا يمكن التراجع عن هذا الإجراء.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) { deleteEmployee(deleteId); setDeleteId(null); } }} className="bg-destructive text-destructive-foreground">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </InnerPageLayout>
  );
};

export default EmployeesListPage;
