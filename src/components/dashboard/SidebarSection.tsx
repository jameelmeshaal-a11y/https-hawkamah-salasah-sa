import { type LucideIcon } from "lucide-react";
import SidebarSubItem from "./SidebarSubItem";

interface SubItem {
  title: string;
  icon: LucideIcon;
  slug?: string;
}

interface SidebarSectionProps {
  title: string;
  items: SubItem[];
  moduleId?: string;
  onItemClick?: (title: string) => void;
}

const SidebarSection = ({ title, items, moduleId, onItemClick }: SidebarSectionProps) => {
  return (
    <div className="mb-0">
      {/* Section Header */}
      <div
        dir="rtl"
        className="bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold text-right border-b border-primary/20"
      >
        {title}
      </div>

      {/* Section Items */}
      <div className="bg-sidebar">
        {items.map((item, index) => (
          <SidebarSubItem
            key={index}
            title={item.title}
            icon={item.icon}
            moduleId={moduleId}
            slug={item.slug}
            onClick={() => onItemClick?.(item.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarSection;
