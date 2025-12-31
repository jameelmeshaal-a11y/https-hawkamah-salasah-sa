import { institutionalExcellenceSections } from "@/data/institutionalExcellenceData";
import SubSectionGrid from "./SubSectionGrid";

const InstitutionalExcellenceContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      {institutionalExcellenceSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} />
      ))}
    </div>
  );
};

export default InstitutionalExcellenceContent;
