import { electronicOfficeSections } from "@/data/electronicOfficeData";
import SidebarSection from "./SidebarSection";

interface SidebarElectronicOfficeProps {
  onItemClick?: (title: string) => void;
}

const SidebarElectronicOffice = ({ onItemClick }: SidebarElectronicOfficeProps) => {
  return (
    <div className="border-t border-sidebar-foreground/10">
      {electronicOfficeSections.map((section, index) => (
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

export default SidebarElectronicOffice;
