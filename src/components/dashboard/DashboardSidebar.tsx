import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
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
  BarChart3,
  FolderKanban,
  UserCog,
  Package,
  Radio,
  MessageSquareWarning,
  Shield,
  FileStack,
  Headphones,
  Settings,
  HelpCircle,
} from "lucide-react";
import salasahLogo from "@/assets/salasah-logo.jpeg";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const sidebarItems: SidebarItem[] = [
  { icon: Laptop, label: "المكتب الإلكتروني" },
  { icon: Users, label: "إدارة الإشرافية و التنفيذية" },
  { icon: Heart, label: "إدارة شؤون المستفيدين" },
  { icon: UserCheck, label: "إدارة التصنيف المؤسسي" },
  { icon: BookOpen, label: "إدارة حسابات المستفيدين" },
  { icon: GraduationCap, label: "إدارة خدمات المستفيدين" },
  { icon: FileEdit, label: "إدارة المتابعة" },
  { icon: Building2, label: "إدارة المشاريع" },
  { icon: Wrench, label: "إدارة البرامج و التطوير" },
  { icon: ClipboardList, label: "إدارة الشؤون التعليمية" },
  { icon: UserCog, label: "إدارة إكرام العاملي" },
  { icon: Award, label: "إدارة الشؤون المالية" },
  { icon: Package, label: "إدارة الموارد المالية" },
  { icon: Users, label: "إدارة الموارد البشرية" },
  { icon: FolderKanban, label: "إدارة المخازن و المستودعات" },
  { icon: Radio, label: "إدارة العلاقات العامة و الإعلام" },
  { icon: Shield, label: "إدارة الحركة و الصيانة" },
  { icon: BarChart3, label: "إدارة التطوع" },
  { icon: FileStack, label: "إدارة التوثيق و المستندات" },
  { icon: MessageSquareWarning, label: "إدارة التقارير و الإحصائيات" },
  { icon: Settings, label: "إدارة التمكين التقني" },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

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
        className={`fixed top-0 right-0 h-full w-72 bg-sidebar text-sidebar-foreground z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-sidebar-foreground/10">
          <div className="flex items-center gap-3 justify-center">
            <div className="w-12 h-12 bg-accent rounded-lg overflow-hidden">
              <img src={salasahLogo} alt="سلاسة" className="w-full h-full object-cover" />
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">سلاسة</div>
              <div className="text-xs opacity-70">SALASAH</div>
            </div>
          </div>
          <div className="text-center mt-3 text-xs opacity-60">
            مدير النظام التقني
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 overflow-y-auto h-[calc(100%-180px)] scrollbar-thin">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.label);

            return (
              <div key={index} className="mb-1">
                <button
                  onClick={() => item.children && toggleItem(item.label)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-hover transition-colors text-right"
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm flex-1">{item.label}</span>
                  {item.children && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {item.children && isExpanded && (
                  <div className="mr-6 mt-1 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <a
                        key={childIndex}
                        href={child.href}
                        className="block px-3 py-2 text-sm rounded-lg hover:bg-sidebar-hover transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-foreground/10 text-center">
          <div className="text-xs opacity-60">الإصدار ٢.٠.٠</div>
          <div className="text-xs opacity-40 mt-1">© ٢٠٢٥ سلاسة</div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
