import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Banknote, Heart, FileText, Activity, Shield, Search, Download, BarChart3, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { toast } from "sonner";

const AdminDashboardPage = () => {
  const { isAdmin } = useAuth();
  const [kpis, setKpis] = useState({ users: 0, beneficiaries: 0, sponsorships: 0, accounts: 0, journalEntries: 0, auditEvents: 0 });
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditSearch, setAuditSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const [usersRes, beneRes, sponsRes, accRes, jeRes, auditRes, auditLogsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("beneficiaries").select("id", { count: "exact", head: true }),
        supabase.from("sponsorships").select("id", { count: "exact", head: true }),
        supabase.from("financial_accounts").select("id", { count: "exact", head: true }),
        supabase.from("journal_entries").select("id", { count: "exact", head: true }),
        supabase.from("audit_events").select("id", { count: "exact", head: true }),
        supabase.from("audit_events").select("*").order("occurred_at", { ascending: false }).limit(50),
      ]);
      setKpis({
        users: usersRes.count || 0,
        beneficiaries: beneRes.count || 0,
        sponsorships: sponsRes.count || 0,
        accounts: accRes.count || 0,
        journalEntries: jeRes.count || 0,
        auditEvents: auditRes.count || 0,
      });
      setAuditLogs(auditLogsRes.data || []);
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  const kpiCards = [
    { icon: <Users className="h-6 w-6" />, label: "المستخدمون", value: kpis.users, color: "bg-blue-500" },
    { icon: <Heart className="h-6 w-6" />, label: "المستفيدون", value: kpis.beneficiaries, color: "bg-emerald-500" },
    { icon: <Banknote className="h-6 w-6" />, label: "الكفالات", value: kpis.sponsorships, color: "bg-amber-500" },
    { icon: <FileText className="h-6 w-6" />, label: "الحسابات المالية", value: kpis.accounts, color: "bg-purple-500" },
    { icon: <Activity className="h-6 w-6" />, label: "القيود المحاسبية", value: kpis.journalEntries, color: "bg-teal-500" },
    { icon: <Shield className="h-6 w-6" />, label: "سجلات المراجعة", value: kpis.auditEvents, color: "bg-red-500" },
  ];

  const monthlyData = [
    { month: "يناير", revenue: 45000, expenses: 32000 },
    { month: "فبراير", revenue: 52000, expenses: 38000 },
    { month: "مارس", revenue: 48000, expenses: 35000 },
    { month: "أبريل", revenue: 61000, expenses: 42000 },
    { month: "مايو", revenue: 55000, expenses: 39000 },
    { month: "يونيو", revenue: 67000, expenses: 45000 },
  ];

  const statusData = [
    { name: "نشط", value: 65, color: "#10b981" },
    { name: "متوقف", value: 20, color: "#f59e0b" },
    { name: "مكتمل", value: 15, color: "#6366f1" },
  ];

  const filteredLogs = auditLogs.filter(
    (log) => log.action?.includes(auditSearch) || log.module_key?.includes(auditSearch) || log.entity_type?.includes(auditSearch)
  );

  return (
    <InnerPageLayout moduleId="admin" title="لوحة تحكم المدير" sectionTitle="إدارة النظام" moduleTitle="لوحة التحكم">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiCards.map((kpi, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`${kpi.color} w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white`}>
                  {kpi.icon}
                </div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1">{loading ? "..." : kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                الإيرادات مقابل المصروفات (شهري)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" name="الإيرادات" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="المصروفات" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                توزيع حالات الكفالات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Audit Log */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                سجل المراجعة والأحداث
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    placeholder="بحث في السجلات..."
                    className="pr-9 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">الإجراء</TableHead>
                    <TableHead className="text-right">الوحدة</TableHead>
                    <TableHead className="text-right">نوع الكيان</TableHead>
                    <TableHead className="text-right">التفاصيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        {loading ? "جاري التحميل..." : "لا توجد سجلات"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(log.occurred_at).toLocaleString("ar-SA")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.action}</Badge>
                        </TableCell>
                        <TableCell>{log.module_key || "-"}</TableCell>
                        <TableCell>{log.entity_type || "-"}</TableCell>
                        <TableCell className="text-xs max-w-48 truncate">
                          {log.metadata ? JSON.stringify(log.metadata) : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default AdminDashboardPage;
