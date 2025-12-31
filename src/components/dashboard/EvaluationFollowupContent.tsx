import { evaluationFollowupSections } from "@/data/evaluationFollowupData";
import SubSectionGrid from "./SubSectionGrid";

const EvaluationFollowupContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      <div className="space-y-6">
        {evaluationFollowupSections.map((section, index) => (
          <SubSectionGrid
            key={index}
            section={section}
          />
        ))}
      </div>
    </div>
  );
};

export default EvaluationFollowupContent;
