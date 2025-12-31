import { educationalAffairsSections } from "@/data/educationalAffairsData";
import SubSectionGrid from "./SubSectionGrid";

const EducationalAffairsContent = () => {
  return (
    <div className="space-y-6">
      {educationalAffairsSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="educational" />
      ))}
    </div>
  );
};

export default EducationalAffairsContent;
