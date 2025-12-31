import { useState, useEffect } from "react";
import { Bell, Globe, User, ChevronDown, Menu } from "lucide-react";
import salasahLogo from "@/assets/salasah-logo.jpeg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatArabicDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("ar-SA", options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <header className="bg-header text-header-foreground">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-primary-foreground/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="search"
              placeholder="بحث..."
              className="bg-primary-foreground/10 border-0 rounded-md px-4 py-1.5 text-sm text-header-foreground placeholder:text-header-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 w-36"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-header-foreground hover:bg-sidebar-hover relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              5
            </span>
          </Button>

          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">YouTube</span>
            <span className="text-xs">التشغيلات</span>
          </div>

          <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">الموقع الإلكتروني</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2">
                <span className="text-sm">مدير النظام التقني</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
              <DropdownMenuItem>الإعدادات</DropdownMenuItem>
              <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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

      {/* Main Header */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Clock Section */}
        <div className="text-center">
          <div className="text-sm opacity-80">تاريخ اليوم</div>
          <div className="text-sm">{formatArabicDate(currentTime)}</div>
          <div className="text-2xl font-bold mt-1">{formatTime(currentTime)}</div>
          <div className="text-xs opacity-70">الوقت الآن</div>
        </div>

        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="text-left">
            <div className="text-2xl font-bold">سلاسة</div>
            <div className="text-sm opacity-80">SALASAH</div>
            <div className="text-xs opacity-60">نظام إدارة موارد المؤسسة</div>
          </div>
          <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center overflow-hidden">
            <img src={salasahLogo} alt="سلاسة" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
