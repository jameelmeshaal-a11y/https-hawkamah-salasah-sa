import { type LucideIcon } from "lucide-react";

interface SidebarSubItemProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const SidebarSubItem = ({ title, icon: Icon, onClick }: SidebarSubItemProps) => {
  return (
    <button
      onClick={onClick}
      dir="rtl"
      className="w-full flex items-center gap-3 px-4 py-2.5 text-right transition-colors hover:bg-sidebar-hover border-b border-sidebar-foreground/5"
    >
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <span className="text-xs text-sidebar-foreground">{title}</span>
    </button>
  );
};

export default SidebarSubItem;
