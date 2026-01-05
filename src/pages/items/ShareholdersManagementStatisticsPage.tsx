import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, Wallet, Building2 } from "lucide-react";
import StatCard from "@/components/shared/StatCard";

const ShareholdersManagementStatisticsPage = () => {
  const stats = [
    {
      title: "إجمالي المساهمين",
      value: "0",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "إجمالي الأسهم",
      value: "0",
      icon: TrendingUp,
      color: "bg-emerald-500",
    },
    {
      title: "قيمة السهم",
      value: "0 ريال",
      icon: Wallet,
      color: "bg-purple-500",
    },
    {
      title: "إجمالي رأس المال",
      value: "0 ريال",
      icon: Building2,
      color: "bg-orange-500",
    },
  ];

  return (
    <InnerPageLayout
      moduleId="members"
      moduleTitle="إدارة الأعضاء المشاركين"
      title="إحصائيات إدارة المساهمين"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold">إحصائيات إدارة المساهمين</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Placeholder */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">توزيع الأسهم</h2>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">لا توجد بيانات للعرض</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default ShareholdersManagementStatisticsPage;
