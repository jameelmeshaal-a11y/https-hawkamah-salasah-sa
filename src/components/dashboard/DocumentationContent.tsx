import { documentationSections } from "@/data/documentationData";
import SubSectionGrid from "./SubSectionGrid";

const DocumentationContent = () => {
  return (
    <div className="p-4 bg-muted/30">
      {documentationSections.map((section, index) => (
        <SubSectionGrid key={index} section={section} />
      ))}
    </div>
  );
};

export default DocumentationContent;
