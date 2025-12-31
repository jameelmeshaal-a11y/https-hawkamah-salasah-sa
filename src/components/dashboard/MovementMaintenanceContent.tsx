import { movementMaintenanceSections } from "@/data/movementMaintenanceData";
import SubSectionGrid from "./SubSectionGrid";

const MovementMaintenanceContent = () => {
  return (
    <div className="p-4 bg-muted/30">
      {movementMaintenanceSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} moduleId="maintenance" />
      ))}
    </div>
  );
};

export default MovementMaintenanceContent;
