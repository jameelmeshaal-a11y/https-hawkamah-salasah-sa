import { financialResourcesSections } from "@/data/financialResourcesData";
import SubSectionGrid from "./SubSectionGrid";

const FinancialResourcesContent = () => {
  return (
    <div className="p-4 bg-muted/10" dir="rtl">
      {financialResourcesSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="financial-resources" />
      ))}
    </div>
  );
};

export default FinancialResourcesContent;
