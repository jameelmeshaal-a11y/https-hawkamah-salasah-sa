import { programsDevelopmentSections } from "@/data/programsDevelopmentData";
import SubSectionGrid from "./SubSectionGrid";

const ProgramsDevelopmentContent = () => {
  return (
    <div className="px-4 pb-4 space-y-4" dir="rtl">
      {programsDevelopmentSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="programs" />
      ))}
    </div>
  );
};

export default ProgramsDevelopmentContent;
