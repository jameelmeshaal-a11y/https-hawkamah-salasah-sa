import { useState } from "react";
import { Bell, Globe, User, ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [postContent, setPostContent] = useState("");

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

      {/* Add Post Bar with Shadow */}
      <div className="bg-muted border-b border-border shadow-md">
        <div className="flex justify-end px-4 py-3">
          <Button 
            onClick={() => setIsPostDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded px-6 py-2 shadow-sm"
          >
            إضافة منشور
          </Button>
        </div>
      </div>

      {/* Add Post Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-center">إضافة منشور</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="قم بكتابة محتوى المنشور"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="text-right"
            />
          </div>
          <DialogFooter className="flex gap-2 sm:justify-start">
            <Button 
              onClick={() => {
                setPostContent("");
                setIsPostDialogOpen(false);
              }}
              className="bg-primary hover:bg-primary/90"
            >
              إضافة
            </Button>
            <DialogClose asChild>
              <Button variant="outline">
                إلغاء
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default DashboardHeader;
