import { electronicOfficeSections } from "@/data/electronicOfficeData";
import SubSectionGrid from "./SubSectionGrid";

const ElectronicOfficeContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      {electronicOfficeSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="office" />
      ))}
    </div>
  );
};

export default ElectronicOfficeContent;
