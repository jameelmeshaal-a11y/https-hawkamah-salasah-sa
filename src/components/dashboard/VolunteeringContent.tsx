import { volunteeringSections } from "@/data/volunteeringData";
import SubSectionGrid from "./SubSectionGrid";

const VolunteeringContent = () => {
  return (
    <div className="p-4 bg-muted/30">
      {volunteeringSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="volunteering" />
      ))}
    </div>
  );
};

export default VolunteeringContent;
