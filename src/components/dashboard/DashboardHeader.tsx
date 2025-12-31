import { useState, useEffect } from "react";
import { Bell, Globe, User, ChevronDown, Menu, Search, ListFilter } from "lucide-react";
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
    return date.toLocaleDateString("ar-SA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatHijriDate = (date: Date) => {
    return date.toLocaleDateString("ar-SA-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <header className="bg-header text-header-foreground">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-header-foreground/60" />
            <input
              type="search"
              placeholder="بحث..."
              className="bg-primary-foreground/10 border-0 rounded-full pr-10 pl-4 py-2 text-sm text-header-foreground placeholder:text-header-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 w-44"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3">
                <ListFilter className="h-4 w-4" />
                <span className="text-sm hidden sm:inline">المهام</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>جميع المهام</DropdownMenuItem>
              <DropdownMenuItem>المهام المعلقة</DropdownMenuItem>
              <DropdownMenuItem>المهام المكتملة</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3 relative">
            <Bell className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">التنبيهات</span>
            <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[28px]">155</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3">
            <Globe className="h-4 w-4" />
            <span className="text-sm hidden md:inline">الموقع الإلكتروني</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3">
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <User className="h-3 w-3" />
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-sm leading-tight">مدير النظام التقني</div>
                  <div className="text-xs opacity-60 leading-tight">مدير النظام التقني</div>
                </div>
                <ChevronDown className="h-3 w-3" />
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

      {/* Add Post Button Bar */}
      <div className="px-4 py-2 bg-[hsl(215,30%,28%)]">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded px-4 py-1.5 text-sm font-medium">
          إضافة منشور
        </Button>
      </div>

      {/* Main Header with Clock and Logo */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-[hsl(215,35%,32%)]">
        {/* Clock Section */}
        <div className="text-center py-6 px-4 order-2 md:order-1">
          <div className="text-sm opacity-80 mb-1">تاريخ اليوم</div>
          <div className="text-sm mb-3">{formatHijriDate(currentTime)}هـ، {formatArabicDate(currentTime)}</div>
          <div className="text-sm opacity-80 mb-1">الوقت الآن</div>
          <div className="text-4xl font-bold tracking-wider">{formatTime(currentTime)}</div>
        </div>

        {/* Logo Section */}
        <div className="bg-[hsl(212,55%,38%)] py-6 px-6 flex items-center justify-center gap-6 order-1 md:order-2">
          <div className="text-right">
            <div className="text-sm opacity-70 mb-1">مرحبا بك</div>
            <div className="text-xl font-bold">مدير النظام التقني</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-1">سلاسة</div>
            <div className="text-sm opacity-80 tracking-widest">SALASAH</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
