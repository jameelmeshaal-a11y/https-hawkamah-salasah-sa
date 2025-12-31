import { Bell, MessageSquare, CheckCircle, XCircle, AlertTriangle, FileText } from "lucide-react";

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}

const KpiCard = ({ icon, label, value, color, bgColor }: KpiCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4">
      <div className="flex flex-col items-center text-center gap-2">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}>
          <div className={color}>{icon}</div>
        </div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <button className="text-xs text-primary hover:underline mt-1">
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
};

const KpiCards = () => {
  const kpiData = [
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      label: "التنبيهات الداخلية",
      value: 0,
      color: "text-amber-500",
      bgColor: "bg-amber-500/20",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      label: "المهام الجديدة",
      value: 10,
      color: "text-sky-500",
      bgColor: "bg-sky-500/20",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      label: "المهام المكتملة",
      value: 0,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/20",
    },
    {
      icon: <XCircle className="h-6 w-6" />,
      label: "المهام المعلقة",
      value: 0,
      color: "text-slate-500",
      bgColor: "bg-slate-200",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      label: "المهام الحرجة",
      value: 0,
      color: "text-rose-500",
      bgColor: "bg-rose-500/20",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      label: "التحديثات",
      value: 0,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <KpiCard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default KpiCards;
