import { Bell, Clock, CheckCircle, XCircle, AlertTriangle, Timer } from "lucide-react";

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
}

const KpiCard = ({ icon, label, value, bgColor }: KpiCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="flex flex-col items-center text-center p-4">
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${bgColor} mb-3`}>
          <div className="text-white">{icon}</div>
        </div>
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
        <button className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
};

const KpiCards = () => {
  // Order from right to left matching reference exactly
  const kpiData = [
    {
      icon: <AlertTriangle className="h-7 w-7" />,
      label: "المهام الجديدة",
      value: 0,
      bgColor: "bg-purple-500",
    },
    {
      icon: <Timer className="h-7 w-7" />,
      label: "المهام الجارية",
      value: 0,
      bgColor: "bg-red-500",
    },
    {
      icon: <XCircle className="h-7 w-7" />,
      label: "المهام المتعثرة",
      value: 0,
      bgColor: "bg-slate-600",
    },
    {
      icon: <CheckCircle className="h-7 w-7" />,
      label: "المهام المنتهية",
      value: 0,
      bgColor: "bg-teal-500",
    },
    {
      icon: <Clock className="h-7 w-7" />,
      label: "المهام المنجزة",
      value: 10,
      bgColor: "bg-blue-500",
    },
    {
      icon: <Bell className="h-7 w-7" />,
      label: "التنبيهات الداخلية",
      value: 0,
      bgColor: "bg-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {kpiData.map((kpi, index) => (
        <KpiCard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default KpiCards;
