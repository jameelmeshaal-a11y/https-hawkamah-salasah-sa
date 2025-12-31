import { financialAffairsSections } from "@/data/financialAffairsData";
import SubSectionGrid from "./SubSectionGrid";

const FinancialAffairsContent = () => {
  return (
    <div className="p-4">
      {financialAffairsSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="financial" />
      ))}
    </div>
  );
};

export default FinancialAffairsContent;
