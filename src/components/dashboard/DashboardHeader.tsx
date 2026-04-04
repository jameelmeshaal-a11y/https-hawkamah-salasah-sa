import { Bell, Globe, User, ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddPostBar from "@/components/shared/AddPostBar";
import TasksPopover from "@/components/dashboard/TasksPopover";
import AdminNavMenu from "@/components/dashboard/AdminNavMenu";
import salasahLogo from "@/assets/salasah-logo.jpeg";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {

  return (
    <header className="bg-header text-header-foreground">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Right side - Brand with Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg overflow-hidden flex-shrink-0">
            <img src={salasahLogo} alt="سلاسة" className="w-full h-full object-cover" />
          </div>
          <div className="text-right">
            <div className="text-sm font-bold">سلاسة لأنظمة وحوكمة القطاع غير الربحي</div>
            <div className="text-xs opacity-70">نظام سلاسة الإلكتروني</div>
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

          <AddPostBar />

          <TasksPopover />

          <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3 relative">
            <span className="text-sm">التنبيهات</span>
            <Bell className="h-4 w-4" />
            <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded font-bold min-w-[32px]">155</span>
          </Button>

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
