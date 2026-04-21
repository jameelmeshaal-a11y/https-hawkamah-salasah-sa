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
  sectionPath?: string;
  moduleTitle?: string;
}

const InnerPageLayout = ({ children, moduleId, itemSlug, title, sectionTitle, sectionPath, moduleTitle }: InnerPageLayoutProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />
      <div className="flex flex-1 w-full">
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="bg-muted/30 border-b border-border px-4 py-2">
            <nav className="flex items-center gap-2 text-sm">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-primary hover:bg-primary/10 gap-1 p-1 h-auto">
                <ArrowRight className="h-4 w-4" />رجوع
              </Button>
              <span className="text-muted-foreground">|</span>
              <Link to="/" className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
                <Home className="h-4 w-4" /><span>الرئيسية</span>
              </Link>
              {moduleTitle && (
                <>
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                  <Link to={`/module/${moduleId}`} className="text-primary hover:text-primary/80 transition-colors">
                    {moduleTitle}
                  </Link>
                </>
              )}
              {sectionTitle && (
                <>
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                  {sectionPath ? (
                    <Link to={sectionPath} className="text-primary hover:text-primary/80 transition-colors">
                      {sectionTitle}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="text-primary hover:text-primary/80 transition-colors cursor-pointer bg-transparent border-0 p-0"
                    >
                      {sectionTitle}
                    </button>
                  )}
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
          <main className="flex-1 p-4">{children}</main>
          <footer className="bg-muted/30 border-t border-border py-3 px-4 text-center text-sm text-muted-foreground">
            جميع الحقوق محفوظة © {new Date().getFullYear()} - نظام حوكمة
          </footer>
        </div>
      </div>
    </div>
  );
};

export default InnerPageLayout;
