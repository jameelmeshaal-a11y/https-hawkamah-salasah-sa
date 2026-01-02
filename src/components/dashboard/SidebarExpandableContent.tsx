import { getModuleSections } from "@/data/allModulesData";
import { getModuleId } from "@/utils/itemRoutes";
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
  const moduleId = getModuleId(moduleLabel);

  if (!sections) {
    return null;
  }

  return (
    <div className="border-t border-border/20 overflow-hidden animate-accordion-down transition-all duration-300 ease-in-out">
      {sections.map((section, index) => (
        <SidebarSection
          key={index}
          title={section.title}
          items={section.items}
          moduleId={moduleId}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default SidebarExpandableContent;
