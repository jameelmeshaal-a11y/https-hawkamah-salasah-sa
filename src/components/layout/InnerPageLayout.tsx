import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-bold hover:opacity-80 transition-opacity">
            نظام سلاسة الإلكتروني
          </Link>
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
  );
};

export default InnerPageLayout;
