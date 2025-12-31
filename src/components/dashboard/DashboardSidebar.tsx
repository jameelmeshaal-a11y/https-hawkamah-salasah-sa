import { useState } from "react";
import {
  ChevronDown,
  Laptop,
  Users,
  Heart,
  BookOpen,
  GraduationCap,
  FileEdit,
  Building2,
  Wrench,
  ClipboardList,
  UserCheck,
  Award,
  Package,
  Radio,
  Shield,
  BarChart3,
  FileStack,
  MessageSquareWarning,
  Settings,
  Monitor,
  UsersRound,
  Star,
  Wallet,
  Coins,
  Hand,
  Lightbulb,
  LayoutDashboard,
  MessageCircle,
  ChartBar,
  HelpCircle,
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

const quickAccessItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم" },
  { icon: ChartBar, label: "الإحصائيات" },
  { icon: MessageCircle, label: "الرسائل" },
  { icon: Lightbulb, label: "الأفكار" },
  { icon: Star, label: "المفضلة" },
  { icon: Heart, label: "المستفيدين" },
  { icon: FileEdit, label: "الطلبات" },
  { icon: HelpCircle, label: "المساعدة" },
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

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-sidebar text-sidebar-foreground z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Quick Access Icons */}
        <div className="w-14 bg-[hsl(215,40%,22%)] flex flex-col items-center py-4 gap-2">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-10 h-10 rounded-lg hover:bg-sidebar-hover flex items-center justify-center transition-colors"
                title={item.label}
              >
                <Icon className="h-5 w-5 text-sidebar-foreground/80" />
              </button>
            );
          })}
        </div>

        {/* Main Sidebar */}
        <div className="w-64 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-sidebar-foreground/10 text-center">
            <div className="text-xs text-sidebar-foreground/60 mb-1">نظام سلاسة الإلكتروني</div>
            <div className="text-sm font-bold text-primary-foreground">سلاسة للخدمات المؤسسية</div>
          </div>

          {/* Logo Section */}
          <div className="p-4 border-b border-sidebar-foreground/10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-accent rounded-lg overflow-hidden">
                <img src={salasahLogo} alt="سلاسة" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">سلاسة للخدمات المؤسسية</div>
                <div className="text-xs opacity-70">Salasah for Corporate Services</div>
              </div>
            </div>
          </div>

          {/* Welcome */}
          <div className="px-4 py-3 border-b border-sidebar-foreground/10">
            <div className="text-xs opacity-60">مرحباً</div>
            <div className="text-sm font-semibold">مدير</div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin p-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;

              return (
                <button
                  key={index}
                  onClick={() => setActiveItem(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-right mb-1 ${
                    isActive ? "bg-sidebar-active" : "hover:bg-sidebar-hover"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0 opacity-70" />
                  <span className="text-sm flex-1">{item.label}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
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
