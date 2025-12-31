import { reportsStatisticsSections } from "@/data/reportsStatisticsData";
import SubSectionGrid from "./SubSectionGrid";

const ReportsStatisticsContent = () => {
  return (
    <div className="p-4 bg-muted/30">
      {reportsStatisticsSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} />
      ))}
    </div>
  );
};

export default ReportsStatisticsContent;
