import { useEffect, useMemo, useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Search, Download, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface EmployeeOption { id: string; full_name: string; department: string | null; }
interface AttendanceRow {
  id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: string;
  employee_id: string;
  employee_name: string;
  employee_department: string | null;
  net_hours: string;
}

const formatTime = (iso: string | null) =>
  iso ? new Date(iso).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }) : "-";

const calcNet = (ci: string | null, co: string | null) => {
  if (!ci || !co) return "-";
  const ms = new Date(co).getTime() - new Date(ci).getTime();
  if (ms <= 0) return "-";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}س ${m}د`;
};

const today = new Date().toISOString().split("T")[0];
const monthStart = (() => { const d = new Date(); d.setDate(1); return d.toISOString().split("T")[0]; })();

const AttendanceRecordsPage = () => {
  const { isAdmin } = useAuth();
  const [fromDate, setFromDate] = useState(monthStart);
  const [toDate, setToDate] = useState(today);
  const [employeeId, setEmployeeId] = useState<string>("all");
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from("employees")
      .select("id, full_name, department")
      .eq("status", "active")
      .order("full_name")
      .then(({ data, error }) => {
        if (!error) setEmployees((data as EmployeeOption[]) || []);
      });
  }, [isAdmin]);

  const handleSearch = async () => {
    if (fromDate > toDate) { toast.error("الفترة غير صحيحة"); return; }
    setLoading(true);
    let query = supabase
      .from("attendance")
      .select("id, date, check_in, check_out, status, employee_id, employees:employee_id(full_name, department)")
      .gte("date", fromDate)
      .lte("date", toDate)
      .order("date", { ascending: false });
    if (isAdmin && employeeId !== "all") query = query.eq("employee_id", employeeId);

    const { data, error } = await query;
    setLoading(false);
    if (error) { toast.error("فشل في جلب البيانات"); return; }

    const mapped: AttendanceRow[] = (data || []).map((r: any) => ({
      id: r.id,
      date: r.date,
      check_in: r.check_in,
      check_out: r.check_out,
      status: r.status,
      employee_id: r.employee_id,
      employee_name: r.employees?.full_name ?? "—",
      employee_department: r.employees?.department ?? null,
      net_hours: calcNet(r.check_in, r.check_out),
    }));
    setRows(mapped);
    setShown(true);
  };

  const exportCSV = () => {
    if (rows.length === 0) { toast.info("لا توجد بيانات للتصدير"); return; }
    const headers = ["الموظف", "الإدارة", "التاريخ", "الحضور", "الانصراف", "صافي الساعات", "الحالة"];
    const lines = [headers.join(",")];
    rows.forEach((r) => {
      lines.push([
        `"${r.employee_name}"`,
        `"${r.employee_department ?? ""}"`,
        r.date,
        formatTime(r.check_in),
        formatTime(r.check_out),
        r.net_hours,
        r.status,
      ].join(","));
    });
    const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `attendance_${fromDate}_${toDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تصدير الملف بنجاح");
  };

  const exportPDF = () => {
    if (rows.length === 0) { toast.info("لا توجد بيانات للتصدير"); return; }
    const win = window.open("", "_blank");
    if (!win) { toast.error("فشل فتح نافذة الطباعة"); return; }
    const html = `
      <html dir="rtl"><head><meta charset="utf-8"><title>كشف الدوام</title>
      <style>
        body{font-family:Arial,sans-serif;padding:20px}
        h1{text-align:center;font-size:20px}
        table{width:100%;border-collapse:collapse;margin-top:12px;font-size:12px}
        th,td{border:1px solid #888;padding:6px;text-align:center}
        th{background:#f0f0f0}
      </style></head><body>
        <h1>كشف الدوام</h1>
        <p>الفترة: من ${fromDate} إلى ${toDate}</p>
        <table>
          <thead><tr>
            <th>الموظف</th><th>الإدارة</th><th>التاريخ</th>
            <th>الحضور</th><th>الانصراف</th><th>صافي الساعات</th><th>الحالة</th>
          </tr></thead>
          <tbody>
            ${rows.map(r => `<tr>
              <td>${r.employee_name}</td>
              <td>${r.employee_department ?? "-"}</td>
              <td>${r.date}</td>
              <td>${formatTime(r.check_in)}</td>
              <td>${formatTime(r.check_out)}</td>
              <td>${r.net_hours}</td>
              <td>${r.status}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </body></html>
    `;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  };

  const summary = useMemo(() => ({
    total: rows.length,
    employees: new Set(rows.map(r => r.employee_id)).size,
  }), [rows]);

  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="attendance-records"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      sectionPath="/module/office?section=reports-records"
      title="سجلات الحضور والانصراف"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" /> فلترة وتصدير كشف الدوام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">من تاريخ</label>
                <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">إلى تاريخ</label>
                <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
              </div>
              {isAdmin && (
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">الموظف</label>
                  <Select value={employeeId} onValueChange={setEmployeeId}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل الموظفين</SelectItem>
                      {employees.map((e) => (
                        <SelectItem key={e.id} value={e.id}>{e.full_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button onClick={handleSearch} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Search className="h-4 w-4 ml-1" /> {loading ? "جاري..." : "عرض البيانات"}
              </Button>
            </div>

            {shown && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" onClick={exportCSV} disabled={rows.length === 0}>
                  <Download className="h-4 w-4 ml-1" /> تصدير Excel/CSV
                </Button>
                <Button variant="outline" onClick={exportPDF} disabled={rows.length === 0}>
                  <FileText className="h-4 w-4 ml-1" /> تصدير PDF / طباعة
                </Button>
                <div className="ms-auto text-sm text-muted-foreground self-center">
                  {summary.total} سجل · {summary.employees} موظف
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {shown && (
          <Card>
            <CardHeader><CardTitle className="text-lg">النتائج</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-center">الموظف</TableHead>
                      <TableHead className="text-center">الإدارة</TableHead>
                      <TableHead className="text-center">التاريخ</TableHead>
                      <TableHead className="text-center">الحضور</TableHead>
                      <TableHead className="text-center">الانصراف</TableHead>
                      <TableHead className="text-center">صافي الساعات</TableHead>
                      <TableHead className="text-center">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                          لا توجد سجلات للفترة المحددة
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="text-center">{r.employee_name}</TableCell>
                          <TableCell className="text-center">{r.employee_department ?? "-"}</TableCell>
                          <TableCell className="text-center">{r.date}</TableCell>
                          <TableCell className="text-center">{formatTime(r.check_in)}</TableCell>
                          <TableCell className="text-center">{formatTime(r.check_out)}</TableCell>
                          <TableCell className="text-center">{r.net_hours}</TableCell>
                          <TableCell className="text-center">{r.status}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default AttendanceRecordsPage;
