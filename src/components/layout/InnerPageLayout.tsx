import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface InnerPageLayoutProps {
  children: ReactNode;
  moduleId: string;
  itemSlug?: string;
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
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header - Full Width Dashboard Header */}
      <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />

      {/* Main Layout - Sidebar + Content (Both start at same level) */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Breadcrumb */}
          <div className="bg-muted/30 border-b border-border px-4 py-2">
            <nav className="flex items-center gap-2 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-primary hover:bg-primary/10 gap-1 p-1 h-auto"
              >
                <ArrowRight className="h-4 w-4" />
                رجوع
              </Button>
              <span className="text-muted-foreground">|</span>
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
    </div>
  );
};

export default InnerPageLayout;
