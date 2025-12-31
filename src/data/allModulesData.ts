import { electronicOfficeSections, type SubSection } from "./electronicOfficeData";
import { supervisoryManagementSections } from "./supervisoryManagementData";
import { membersManagementSections } from "./membersManagementData";
import { institutionalExcellenceSections } from "./institutionalExcellenceData";
import { beneficiariesManagementSections } from "./beneficiariesManagementData";
import { beneficiaryServicesSections } from "./beneficiaryServicesData";
import { evaluationFollowupSections } from "./evaluationFollowupData";
import { projectsManagementSections } from "./projectsManagementData";
import { programsDevelopmentSections } from "./programsDevelopmentData";
import { educationalAffairsSections } from "./educationalAffairsData";
import { deceasedCareSections } from "./deceasedCareData";
import { financialAffairsSections } from "./financialAffairsData";
import { financialResourcesSections } from "./financialResourcesData";
import { humanResourcesSections } from "./humanResourcesData";

// Map module labels to their data sections
export const modulesDataMap: Record<string, SubSection[]> = {
  "المكتب الإلكتروني": electronicOfficeSections,
  "الإدارة الإشرافية و التنفيذية": supervisoryManagementSections,
  "إدارة الأعضاء المشاركين": membersManagementSections,
  "إدارة التميز المؤسسي": institutionalExcellenceSections,
  "إدارة حسابات المستفيدين": beneficiariesManagementSections,
  "إدارة خدمات المستفيدين": beneficiaryServicesSections,
  "إدارة التقييم و المتابعة": evaluationFollowupSections,
  "إدارة المشاريع": projectsManagementSections,
  "إدارة البرامج و التطوير": programsDevelopmentSections,
  "إدارة الشؤون التعليمية": educationalAffairsSections,
  "إدارة إكرام الموتى": deceasedCareSections,
  "إدارة الشؤون المالية": financialAffairsSections,
  "إدارة الموارد المالية": financialResourcesSections,
  "إدارة الموارد البشرية": humanResourcesSections,
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
