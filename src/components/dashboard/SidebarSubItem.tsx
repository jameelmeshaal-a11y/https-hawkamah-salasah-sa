import { Link, useLocation } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

interface SidebarSubItemProps {
  title: string;
  icon: LucideIcon;
  moduleId?: string;
  slug?: string;
  onClick?: () => void;
}

const SidebarSubItem = ({ title, icon: Icon, moduleId, slug, onClick }: SidebarSubItemProps) => {
  const location = useLocation();
  const itemPath = slug && moduleId ? `/module/${moduleId}/${slug}` : null;
  const isActive = itemPath && location.pathname === itemPath;

  const baseClasses = "w-full flex items-center gap-3 px-4 py-2.5 text-right transition-all duration-200 border-b border-border/10";
  const activeClasses = isActive 
    ? "bg-primary/15 text-primary font-medium" 
    : "text-foreground hover:bg-muted/50";

  const content = (
    <>
      <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-primary/70"}`} />
      <span className={`text-xs ${isActive ? "font-medium" : ""}`}>{title}</span>
    </>
  );

  // If slug and moduleId exist, use Link for navigation
  if (slug && moduleId) {
    return (
      <Link
        to={`/module/${moduleId}/${slug}`}
        dir="rtl"
        className={`${baseClasses} ${activeClasses}`}
      >
        {content}
      </Link>
    );
  }

  // Otherwise use button with onClick
  return (
    <button
      onClick={onClick}
      dir="rtl"
      className={`${baseClasses} text-foreground hover:bg-muted/50`}
    >
      {content}
    </button>
  );
};

export default SidebarSubItem;
