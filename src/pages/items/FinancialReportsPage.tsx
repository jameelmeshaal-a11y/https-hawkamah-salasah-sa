import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatCard from "@/components/shared/StatCard";
import { Banknote, TrendingUp, TrendingDown, PieChart, Download, FileText } from "lucide-react";
import { toast } from "sonner";

const FinancialReportsPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("");

  const stats = {
    totalIncome: 250000,
    totalExpenses: 180000,
    netBalance: 70000,
    sponsorshipsIncome: 120000,
    donationsIncome: 80000,
    aidExpenses: 150000,
    operationalExpenses: 30000,
  };

  const months = [
    { value: "1", label: "يناير" },
    { value: "2", label: "فبراير" },
    { value: "3", label: "مارس" },
    { value: "4", label: "أبريل" },
    { value: "5", label: "مايو" },
    { value: "6", label: "يونيو" },
    { value: "7", label: "يوليو" },
    { value: "8", label: "أغسطس" },
    { value: "9", label: "سبتمبر" },
    { value: "10", label: "أكتوبر" },
    { value: "11", label: "نوفمبر" },
    { value: "12", label: "ديسمبر" },
  ];

  const years = ["2024", "2023", "2022", "2021"];

  const reports = [
    { id: 1, name: "تقرير الإيرادات الشهري", type: "إيرادات", date: "2024-06-30" },
    { id: 2, name: "تقرير المصروفات الشهري", type: "مصروفات", date: "2024-06-30" },
    { id: 3, name: "تقرير الكفالات", type: "كفالات", date: "2024-06-30" },
    { id: 4, name: "تقرير التبرعات", type: "تبرعات", date: "2024-06-30" },
    { id: 5, name: "تقرير المساعدات المصروفة", type: "مساعدات", date: "2024-06-30" },
  ];

  return (
    <InnerPageLayout
      moduleId="financial"
      title="التقارير المالية"
      sectionTitle="التقارير"
      moduleTitle="إدارة الشؤون المالية"
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">السنة</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="اختر السنة" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">الشهر</label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="جميع الشهور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الشهور</SelectItem>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1" />
              <Button variant="outline" onClick={() => toast.info("تصدير التقرير")}>
                <Download className="h-4 w-4 ml-2" />
                تصدير Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي الإيرادات"
            value={`${stats.totalIncome.toLocaleString()} ﷼`}
            icon={TrendingUp}
            variant="success"
          />
          <StatCard
            title="إجمالي المصروفات"
            value={`${stats.totalExpenses.toLocaleString()} ﷼`}
            icon={TrendingDown}
            variant="danger"
          />
          <StatCard
            title="صافي الرصيد"
            value={`${stats.netBalance.toLocaleString()} ﷼`}
            icon={Banknote}
            variant="info"
          />
          <StatCard
            title="نسبة الإنفاق"
            value={`${Math.round((stats.totalExpenses / stats.totalIncome) * 100)}%`}
            icon={PieChart}
            variant="warning"
          />
        </div>

        {/* Income/Expense Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                تفصيل الإيرادات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span>إيرادات الكفالات</span>
                <span className="font-bold text-emerald-600">{stats.sponsorshipsIncome.toLocaleString()} ﷼</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span>التبرعات</span>
                <span className="font-bold text-emerald-600">{stats.donationsIncome.toLocaleString()} ﷼</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-100 rounded-lg font-bold">
                <span>الإجمالي</span>
                <span className="text-emerald-700">{stats.totalIncome.toLocaleString()} ﷼</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                تفصيل المصروفات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span>المساعدات المصروفة</span>
                <span className="font-bold text-red-600">{stats.aidExpenses.toLocaleString()} ﷼</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span>المصروفات التشغيلية</span>
                <span className="font-bold text-red-600">{stats.operationalExpenses.toLocaleString()} ﷼</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-100 rounded-lg font-bold">
                <span>الإجمالي</span>
                <span className="text-red-700">{stats.totalExpenses.toLocaleString()} ﷼</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              التقارير المتاحة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info(`فتح: ${report.name}`)}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">{report.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default FinancialReportsPage;
