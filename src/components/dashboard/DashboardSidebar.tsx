import { useState } from "react";
import {
  ChevronDown,
  Laptop,
  Users,
  Heart,
  GraduationCap,
  FileEdit,
  Wrench,
  UserCheck,
  Award,
  Radio,
  Shield,
  BarChart3,
  FileStack,
  Settings,
  Monitor,
  UsersRound,
  Star,
  Wallet,
  Coins,
  Hand,
  FolderKanban,
} from "lucide-react";
import salasahLogo from "@/assets/salasah-logo.jpeg";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: Laptop, label: "المكتب الإلكتروني" },
  { icon: Users, label: "الإدارة الإشرافية و التنفيذية" },
  { icon: UsersRound, label: "إدارة الأعضاء المشاركين" },
  { icon: Star, label: "إدارة التميز المؤسسي" },
  { icon: UserCheck, label: "إدارة حسابات المستفيدين" },
  { icon: Heart, label: "إدارة خدمات المستفيدين" },
  { icon: FileEdit, label: "إدارة التقييم و المتابعة" },
  { icon: Settings, label: "إدارة المشاريع" },
  { icon: Wrench, label: "إدارة البرامج و التطوير" },
  { icon: GraduationCap, label: "إدارة الشؤون التعليمية" },
  { icon: Award, label: "إدارة إكرام الموتى" },
  { icon: Wallet, label: "إدارة الشؤون المالية" },
  { icon: Coins, label: "إدارة الموارد المالية" },
  { icon: Users, label: "إدارة الموارد البشرية" },
  { icon: FolderKanban, label: "إدارة المخازن و المستودعات" },
  { icon: Radio, label: "إدارة العلاقات العامة و الإعلام" },
  { icon: Shield, label: "إدارة الحركة و الصيانة" },
  { icon: Hand, label: "إدارة التطوع" },
  { icon: FileStack, label: "إدارة التوثيق و المستندات" },
  { icon: BarChart3, label: "إدارة التقارير و الإحصائيات" },
  { icon: Monitor, label: "إدارة التمكين التقني" },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container - On RIGHT side for RTL */}
      <aside
        className={`fixed top-0 right-0 h-full bg-sidebar text-sidebar-foreground z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-row-reverse ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Quick Access Icons - Far RIGHT (vertical icon bar) */}
        <div className="w-12 bg-[hsl(215,40%,22%)] flex flex-col items-center py-4 gap-1 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-9 h-9 rounded-lg hover:bg-sidebar-hover flex items-center justify-center transition-colors"
                title={item.label}
              >
                <Icon className="h-4 w-4 text-sidebar-foreground/80" />
              </button>
            );
          })}
        </div>

        {/* Main Sidebar */}
        <div className="w-64 flex flex-col border-r border-sidebar-foreground/10">
          {/* Logo Section */}
          <div className="p-4 border-b border-sidebar-foreground/10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-accent rounded-lg overflow-hidden">
                <img src={salasahLogo} alt="سلاسة" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <div className="font-bold text-base">سلاسة للخدمات المؤسسية</div>
                <div className="text-xs opacity-70">Salasah for Corporate Services</div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;

              return (
                <button
                  key={index}
                  onClick={() => setActiveItem(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-right ${
                    isActive ? "bg-sidebar-active" : "hover:bg-sidebar-hover"
                  }`}
                >
                  <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                  <span className="text-sm flex-1">{item.label}</span>
                  <Icon className="h-4 w-4 flex-shrink-0 opacity-70" />
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-foreground/10 text-center">
            <div className="text-xs opacity-60 mb-2">نظام سلاسة الإلكتروني</div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">سلاسة</div>
              <div className="text-xs opacity-70">SALASAH</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
