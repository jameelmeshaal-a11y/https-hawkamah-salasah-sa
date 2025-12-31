import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

interface SidebarSubItemProps {
  title: string;
  icon: LucideIcon;
  moduleId?: string;
  slug?: string;
  onClick?: () => void;
}

const SidebarSubItem = ({ title, icon: Icon, moduleId, slug, onClick }: SidebarSubItemProps) => {
  const content = (
    <>
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <span className="text-xs text-sidebar-foreground">{title}</span>
    </>
  );

  // If slug and moduleId exist, use Link for navigation
  if (slug && moduleId) {
    return (
      <Link
        to={`/module/${moduleId}/${slug}`}
        dir="rtl"
        className="w-full flex items-center gap-3 px-4 py-2.5 text-right transition-colors hover:bg-sidebar-hover border-b border-sidebar-foreground/5"
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
      className="w-full flex items-center gap-3 px-4 py-2.5 text-right transition-colors hover:bg-sidebar-hover border-b border-sidebar-foreground/5"
    >
      {content}
    </button>
  );
};

export default SidebarSubItem;
