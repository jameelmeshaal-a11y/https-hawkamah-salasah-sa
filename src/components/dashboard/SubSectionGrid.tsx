import type { SubSection } from "@/data/electronicOfficeData";
import SubItemCard from "./SubItemCard";

interface SubSectionGridProps {
  section: SubSection;
  moduleId: string;
}

const SubSectionGrid = ({ section, moduleId }: SubSectionGridProps) => {
  return (
    <div className="mb-6">
      {/* Section Title Bar */}
      <div className="bg-sidebar-primary text-sidebar-primary-foreground px-4 py-2 rounded-t-lg">
        <h3 className="font-bold text-base">{section.title}</h3>
      </div>
      
      {/* Items Grid */}
      <div className="border border-t-0 border-border rounded-b-lg p-4 bg-muted/20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {section.items.map((item, index) => (
            <SubItemCard
              key={index}
              title={item.title}
              icon={item.icon}
              moduleId={moduleId}
              slug={item.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubSectionGrid;
