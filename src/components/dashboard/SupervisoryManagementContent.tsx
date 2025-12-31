import { supervisoryManagementSections } from "@/data/supervisoryManagementData";
import SubSectionGrid from "./SubSectionGrid";

const SupervisoryManagementContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      {supervisoryManagementSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="supervision" />
      ))}
    </div>
  );
};

export default SupervisoryManagementContent;
