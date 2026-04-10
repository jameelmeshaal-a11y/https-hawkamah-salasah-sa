import { useState, useEffect } from "react";
import { Users, Heart, AlertTriangle, HandCoins, Timer, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  loading?: boolean;
  link: string;
}

const KpiCard = ({ icon, label, value, bgColor, loading, link }: KpiCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col items-center text-center p-4">
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${bgColor} mb-3`}>
          <div className="text-white">{icon}</div>
        </div>
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="text-3xl font-bold text-foreground mb-2">
          {loading ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : value}
        </div>
        <Link to={link} className="text-sm text-primary hover:underline transition-colors">
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};

const KpiCards = () => {
  const [stats, setStats] = useState({ beneficiaries: 0, volunteers: 0, donors: 0, donations: 0, requests_pending: 0, board_members: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [beneficiaries, volunteers, donors, donations, requests, boardMembers] = await Promise.all([
          supabase.from("beneficiaries").select("id", { count: "exact", head: true }),
          supabase.from("volunteers").select("id", { count: "exact", head: true }),
          supabase.from("donors").select("id", { count: "exact", head: true }),
          supabase.from("donations").select("amount"),
          supabase.from("requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("board_members").select("id", { count: "exact", head: true }).eq("status", "active"),
        ]);
        const totalDonations = donations.data?.reduce((sum, d) => sum + Number(d.amount || 0), 0) || 0;
        setStats({ beneficiaries: beneficiaries.count || 0, volunteers: volunteers.count || 0, donors: donors.count || 0, donations: totalDonations, requests_pending: requests.count || 0, board_members: boardMembers.count || 0 });
      } catch (err) {
        console.error("Error fetching KPIs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const kpiData: KpiCardProps[] = [
    { icon: <Users className="h-7 w-7" />, label: "أعضاء مجلس الإدارة", value: stats.board_members, bgColor: "bg-purple-500", link: "/module/members/board-members-database", loading },
    { icon: <Heart className="h-7 w-7" />, label: "المستفيدون", value: stats.beneficiaries, bgColor: "bg-red-500", link: "/module/beneficiary-accounts/beneficiaries-database", loading },
    { icon: <AlertTriangle className="h-7 w-7" />, label: "المتطوعون", value: stats.volunteers, bgColor: "bg-teal-500", link: "/module/volunteering/volunteers-database", loading },
    { icon: <HandCoins className="h-7 w-7" />, label: "المتبرعون", value: stats.donors, bgColor: "bg-blue-500", link: "/module/financial-resources/sponsors-list", loading },
    { icon: <Timer className="h-7 w-7" />, label: "الطلبات المعلقة", value: stats.requests_pending, bgColor: "bg-amber-400", link: "/module/office/pending-requests", loading },
    { icon: <CheckCircle className="h-7 w-7" />, label: "إجمالي التبرعات (ر.س)", value: stats.donations, bgColor: "bg-green-600", link: "/module/financial-resources/manage-donations", loading },
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
