import { beneficiaryServicesSections } from "@/data/beneficiaryServicesData";
import SubSectionGrid from "./SubSectionGrid";

const BeneficiaryServicesContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      {beneficiaryServicesSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="beneficiary-services" />
      ))}
    </div>
  );
};

export default BeneficiaryServicesContent;
