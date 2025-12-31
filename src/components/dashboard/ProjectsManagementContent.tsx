import { projectsManagementSections } from "@/data/projectsManagementData";
import SubSectionGrid from "./SubSectionGrid";

const ProjectsManagementContent = () => {
  return (
    <div className="px-4 pb-4 pt-2" dir="rtl">
      <div className="space-y-6">
        {projectsManagementSections.map((section, index) => (
          <SubSectionGrid key={index} section={section} moduleId="projects" />
        ))}
      </div>
    </div>
  );
};

export default ProjectsManagementContent;
