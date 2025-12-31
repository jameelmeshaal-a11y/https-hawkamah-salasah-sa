import { publicRelationsSections } from "@/data/publicRelationsData";
import SubSectionGrid from "./SubSectionGrid";

const PublicRelationsContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      {publicRelationsSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="public-relations" />
      ))}
    </div>
  );
};

export default PublicRelationsContent;
