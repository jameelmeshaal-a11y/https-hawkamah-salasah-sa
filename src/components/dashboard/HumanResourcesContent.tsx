import { humanResourcesSections } from "@/data/humanResourcesData";
import SubSectionGrid from "./SubSectionGrid";

const HumanResourcesContent = () => {
  return (
    <div className="p-4 bg-muted/10" dir="rtl">
      {humanResourcesSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} />
      ))}
    </div>
  );
};

export default HumanResourcesContent;
