import { membersManagementSections } from "@/data/membersManagementData";
import SubSectionGrid from "./SubSectionGrid";

const MembersManagementContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      {membersManagementSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} />
      ))}
    </div>
  );
};

export default MembersManagementContent;
