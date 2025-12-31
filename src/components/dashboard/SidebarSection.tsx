import { type LucideIcon } from "lucide-react";
import SidebarSubItem from "./SidebarSubItem";

interface SubItem {
  title: string;
  icon: LucideIcon;
}

interface SidebarSectionProps {
  title: string;
  items: SubItem[];
  onItemClick?: (title: string) => void;
}

const SidebarSection = ({ title, items, onItemClick }: SidebarSectionProps) => {
  return (
    <div className="mb-1">
      {/* Section Header */}
      <div
        dir="rtl"
        className="bg-primary/90 text-primary-foreground px-4 py-2 text-xs font-semibold text-right"
      >
        {title}
      </div>

      {/* Section Items */}
      <div className="bg-sidebar-hover/30">
        {items.map((item, index) => (
          <SidebarSubItem
            key={index}
            title={item.title}
            icon={item.icon}
            onClick={() => onItemClick?.(item.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarSection;
