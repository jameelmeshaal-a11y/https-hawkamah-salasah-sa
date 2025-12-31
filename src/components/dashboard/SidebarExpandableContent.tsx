import { getModuleSections } from "@/data/allModulesData";
import SidebarSection from "./SidebarSection";

interface SidebarExpandableContentProps {
  moduleLabel: string;
  onItemClick?: (title: string) => void;
}

const SidebarExpandableContent = ({ 
  moduleLabel, 
  onItemClick 
}: SidebarExpandableContentProps) => {
  const sections = getModuleSections(moduleLabel);

  if (!sections) {
    return null;
  }

  return (
    <div className="border-t border-sidebar-foreground/10 animate-accordion-down">
      {sections.map((section, index) => (
        <SidebarSection
          key={index}
          title={section.title}
          items={section.items}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default SidebarExpandableContent;
