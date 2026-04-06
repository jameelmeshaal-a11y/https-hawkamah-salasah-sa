import { Globe, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import TasksPopover from "@/components/dashboard/TasksPopover";
import AdminNavMenu from "@/components/dashboard/AdminNavMenu";
import { NotificationBell } from "@/components/notifications/NotificationBell";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
  return (
    <header className="bg-header text-header-foreground">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Right side - Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold">ح</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold">نظام حوكمة</div>
            <div className="text-xs opacity-70">منصة حوكمة القطاع غير الربحي</div>
          </div>
        </div>

        {/* Left side - Actions */}
        <div className="flex items-center gap-1">
          <div className="relative">
            <input
              type="search"
              placeholder="بحث..."
              className="bg-primary-foreground/10 border-0 rounded-full px-4 py-2 text-sm text-header-foreground placeholder:text-header-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 w-32"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-header-foreground/60" />
          </div>

          <TasksPopover />

          <NotificationBell />

          <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3">
            <span className="text-sm hidden md:inline">الموقع الإلكتروني</span>
            <Globe className="h-4 w-4" />
          </Button>
          
          <AdminNavMenu />

          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden text-header-foreground hover:bg-sidebar-hover"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
