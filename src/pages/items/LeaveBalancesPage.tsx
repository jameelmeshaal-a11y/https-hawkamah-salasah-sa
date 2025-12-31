import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Palmtree, HeartPulse, Baby, Plane } from "lucide-react";

const leaveTypes = [
  { type: "الإجازة السنوية", balance: 21, used: 5, remaining: 16, icon: Palmtree, color: "text-green-600" },
  { type: "الإجازة المرضية", balance: 30, used: 2, remaining: 28, icon: HeartPulse, color: "text-red-600" },
  { type: "إجازة الأمومة", balance: 70, used: 0, remaining: 70, icon: Baby, color: "text-pink-600" },
  { type: "إجازة بدون راتب", balance: 0, used: 0, remaining: 0, icon: Plane, color: "text-blue-600" },
];

const LeaveBalancesPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="leave-balances"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="سجلات أرصدة الإجازات"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            أرصدة الإجازات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaveTypes.map((leave, index) => {
              const Icon = leave.icon;
              return (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-full bg-muted ${leave.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{leave.type}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">الرصيد</p>
                        <p className="text-lg font-bold">{leave.balance}</p>
                      </div>
                      <div className="p-2 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">المستخدم</p>
                        <p className="text-lg font-bold">{leave.used}</p>
                      </div>
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <p className="text-xs text-muted-foreground">المتبقي</p>
                        <p className="text-lg font-bold text-primary">{leave.remaining}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default LeaveBalancesPage;
