import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";
import AdvancedTable from "@/components/shared/AdvancedTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Clock, UserX, Filter, RefreshCw, Loader2 } from "lucide-react";
import { useAttendance } from "@/hooks/useAttendance";
import ViewDetailsDialog from "@/components/dialogs/ViewDetailsDialog";

const departments = ["جميع الأقسام", "تقنية المعلومات", "الموارد البشرية", "المالية", "خدمة العملاء", "التسويق"];
const statuses = ["جميع الحالات", "present", "late", "absent", "leave"];

const columns = [
  { key: "employee_id", label: "رقم الموظف" },
  { key: "date", label: "التاريخ", type: "date" as const },
  { key: "check_in", label: "وقت الحضور" },
  { key: "check_out", label: "وقت الانصراف" },
  { key: "status", label: "الحالة", type: "status" as const },
  { key: "notes", label: "ملاحظات" },
];

const AttendanceLogsPage = () => {
  const { records, loading, fetchRecords } = useAttendance();
  const [selectedStatus, setSelectedStatus] = useState("جميع الحالات");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record<string, string> | null>(null);

  const mappedRecords = records.map(r => ({
    ...r,
    check_in: r.check_in ? new Date(r.check_in).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }) : "—",
    check_out: r.check_out ? new Date(r.check_out).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }) : "—",
  }));

  const filteredLogs = mappedRecords.filter(log => {
    const statusMatch = selectedStatus === "جميع الحالات" || log.status === selectedStatus;
    return statusMatch;
  });

  const stats = {
    total: records.length,
    present: records.filter(l => l.status === "present").length,
    late: records.filter(l => l.status === "late").length,
    absent: records.filter(l => l.status === "absent").length,
  };

  const handleReset = () => { setSelectedStatus("جميع الحالات"); setStartDate(""); setEndDate(""); };

  const actions = [{
    icon: "view" as const,
    label: "عرض التفاصيل",
    onClick: (row: Record<string, unknown>) => {
      setSelectedRecord({
        "الموظف": String(row.employee_id || "—"),
        "التاريخ": String(row.date || "—"),
        "الحضور": String(row.check_in || "—"),
        "الانصراف": String(row.check_out || "—"),
        "الحالة": String(row.status || "—"),
        "ملاحظات": String(row.notes || "—"),
      });
      setViewOpen(true);
    },
  }];

  return (
    <InnerPageLayout moduleId="human-resources" title="سجلات الحضور والانصراف" moduleTitle="إدارة الموارد البشرية">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="إجمالي السجلات" value={stats.total} icon={Users} variant="info" />
          <StatCard title="الحاضرون" value={stats.present} icon={UserCheck} variant="success" />
          <StatCard title="المتأخرون" value={stats.late} icon={Clock} variant="warning" />
          <StatCard title="الغائبون" value={stats.absent} icon={UserX} variant="danger" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Filter className="h-5 w-5" />فلاتر البحث</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">من تاريخ</label>
                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">إلى تاريخ</label>
                <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الحالة</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" onClick={handleReset} className="w-full"><RefreshCw className="h-4 w-4 ml-2" />إعادة تعيين</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <AdvancedTable columns={columns} data={filteredLogs} actions={actions} searchable exportable />
            )}
          </CardContent>
        </Card>
      </div>
      {selectedRecord && <ViewDetailsDialog open={viewOpen} onOpenChange={setViewOpen} title="تفاصيل الحضور" data={selectedRecord} />}
    </InnerPageLayout>
  );
};

export default AttendanceLogsPage;
