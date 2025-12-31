import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ChevronLeft, ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface InnerPageLayoutProps {
  children: ReactNode;
  moduleId: string;
  itemSlug: string;
  title?: string;
  sectionTitle?: string;
  moduleTitle?: string;
}

const InnerPageLayout = ({ 
  children, 
  moduleId, 
  itemSlug,
  title,
  sectionTitle,
  moduleTitle 
}: InnerPageLayoutProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full" dir="rtl">
      {/* Sidebar - on RIGHT for RTL */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-primary text-primary-foreground px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="text-primary-foreground hover:bg-primary-foreground/10 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ArrowRight className="h-5 w-5 ml-1" />
                رجوع
              </Button>
              <span className="text-muted-foreground/50">|</span>
              <Link to="/" className="text-lg font-bold hover:opacity-80 transition-opacity">
                نظام سلاسة الإلكتروني
              </Link>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border px-4 py-2">
          <nav className="flex items-center gap-2 text-sm">
            <Link 
              to="/" 
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>الرئيسية</span>
            </Link>
            
            {moduleTitle && (
              <>
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{moduleTitle}</span>
              </>
            )}
            
            {sectionTitle && (
              <>
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{sectionTitle}</span>
              </>
            )}
            
            {title && (
              <>
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-medium">{title}</span>
              </>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-muted/30 border-t border-border py-3 px-4 text-center text-sm text-muted-foreground">
          جميع الحقوق محفوظة © {new Date().getFullYear()} - نظام سلاسة
        </footer>
      </div>
    </div>
  );
};

export default InnerPageLayout;
