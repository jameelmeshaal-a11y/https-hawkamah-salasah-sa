import { deceasedCareSections } from "@/data/deceasedCareData";
import SubSectionGrid from "./SubSectionGrid";

const DeceasedCareContent = () => {
  return (
    <div className="p-4">
      {deceasedCareSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} />
      ))}
    </div>
  );
};

export default DeceasedCareContent;
