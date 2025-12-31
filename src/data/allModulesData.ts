import { electronicOfficeSections, type SubSection } from "./electronicOfficeData";
import { supervisoryManagementSections } from "./supervisoryManagementData";
import { membersManagementSections } from "./membersManagementData";
import { institutionalExcellenceSections } from "./institutionalExcellenceData";

// Map module labels to their data sections
export const modulesDataMap: Record<string, SubSection[]> = {
  "المكتب الإلكتروني": electronicOfficeSections,
  "الإدارة الإشرافية و التنفيذية": supervisoryManagementSections,
  "إدارة الأعضاء المشاركين": membersManagementSections,
  "إدارة التميز المؤسسي": institutionalExcellenceSections,
};

// List of expandable module labels
export const expandableModules = Object.keys(modulesDataMap);

// Helper function to check if a module is expandable
export const isModuleExpandable = (label: string): boolean => {
  return label in modulesDataMap;
};

// Helper function to get module sections
export const getModuleSections = (label: string): SubSection[] | null => {
  return modulesDataMap[label] || null;
};
