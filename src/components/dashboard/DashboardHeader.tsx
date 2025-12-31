import { useState, useEffect } from "react";
import { Bell, Globe, User, ChevronDown, Menu, Search } from "lucide-react";
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

  const formatFullDate = (date: Date) => {
    const weekday = date.toLocaleDateString("ar-SA", { weekday: "long" });
    const day = date.getDate();
    const hijriMonth = date.toLocaleDateString("ar-SA-u-ca-islamic", { month: "long" });
    const hijriYear = date.toLocaleDateString("ar-SA-u-ca-islamic", { year: "numeric" });
    const gregorianDay = date.getDate();
    const gregorianMonth = date.toLocaleDateString("ar-SA", { month: "long" });
    const gregorianYear = date.getFullYear();
    
    return `${weekday}، ${day} ${hijriMonth} ${hijriYear}هـ، ${gregorianDay} ${gregorianMonth} ${gregorianYear}م`;
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
        {/* Right side - Brand */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs opacity-70">نظام سلاسة الإلكتروني</div>
            <div className="text-sm font-bold">سلاسة للخدمات المؤسسية</div>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3">
                <span className="text-sm">المهام</span>
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
            <span className="text-sm">التنبيهات</span>
            <Bell className="h-4 w-4" />
            <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded font-bold min-w-[32px]">155</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3">
            <span className="text-sm hidden md:inline">الموقع الإلكتروني</span>
            <Globe className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm leading-tight">مدير النظام التقني</div>
                  <div className="text-xs opacity-60 leading-tight">مدير النظام التقني</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
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

      {/* Two Cards Section */}
      <div className="flex gap-0">
        {/* LEFT Card - Date & Time (Light/Gray) */}
        <div className="flex-1 bg-secondary text-foreground py-6 px-8 text-center">
          <div className="text-sm text-muted-foreground mb-1">تاريخ اليوم</div>
          <div className="text-base font-medium mb-4">{formatFullDate(currentTime)}</div>
          <div className="text-sm text-muted-foreground mb-1">الوقت الآن</div>
          <div className="text-4xl font-bold tracking-wider">{formatTime(currentTime)}</div>
        </div>

        {/* RIGHT Card - Logo & Welcome (Dark Teal) */}
        <div className="bg-primary text-primary-foreground py-6 px-8 flex items-center gap-6 min-w-[350px]">
          {/* Welcome Text */}
          <div className="text-right flex-1">
            <div className="text-sm opacity-80 mb-1">مرحبا بك</div>
            <div className="text-xl font-bold">مدير النظام التقني</div>
          </div>
          
          {/* Logo */}
          <div className="text-center border-r border-primary-foreground/20 pr-6">
            <div className="text-4xl font-bold mb-1">سلاسة</div>
            <div className="text-sm opacity-80 tracking-widest">SALASAH</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
