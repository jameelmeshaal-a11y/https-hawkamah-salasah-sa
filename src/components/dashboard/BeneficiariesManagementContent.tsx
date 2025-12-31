import { beneficiariesManagementSections } from "@/data/beneficiariesManagementData";
import SubSectionGrid from "./SubSectionGrid";

const BeneficiariesManagementContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      {beneficiariesManagementSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} />
      ))}
    </div>
  );
};

export default BeneficiariesManagementContent;
