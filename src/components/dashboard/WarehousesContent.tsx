import { warehousesSections } from "@/data/warehousesData";
import SubSectionGrid from "./SubSectionGrid";

const WarehousesContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      {warehousesSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="warehouse" />
      ))}
    </div>
  );
};

export default WarehousesContent;
