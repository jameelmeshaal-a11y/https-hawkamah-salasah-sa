import { technicalEnablementSections } from "@/data/technicalEnablementData";
import SubSectionGrid from "./SubSectionGrid";

const TechnicalEnablementContent = () => {
  return (
    <div className="p-4 bg-muted/30">
      {technicalEnablementSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="tech-enablement" />
      ))}
    </div>
  );
};

export default TechnicalEnablementContent;
