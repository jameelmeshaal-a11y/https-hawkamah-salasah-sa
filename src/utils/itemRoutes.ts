import { lazy } from "react";

// Map of module slugs to their IDs
export const moduleSlugToId: Record<string, string> = {
  "المكتب الإلكتروني": "office",
  "الإدارة الإشرافية و التنفيذية": "supervision",
  "إدارة الأعضاء المشاركين": "members",
  "إدارة التميز المؤسسي": "excellence",
  "إدارة حسابات المستفيدين": "beneficiary-accounts",
  "إدارة خدمات المستفيدين": "beneficiary-services",
  "إدارة التقييم و المتابعة": "evaluation",
  "إدارة المشاريع": "projects",
  "إدارة البرامج و التطوير": "programs",
  "إدارة الشؤون التعليمية": "educational",
  "إدارة إكرام الموتى": "deceased-honor",
  "إدارة الشؤون المالية": "financial",
  "إدارة الموارد المالية": "financial-resources",
  "إدارة الموارد البشرية": "hr",
  "إدارة المخازن و المستودعات": "warehouse",
  "إدارة العلاقات العامة و الإعلام": "public-relations",
  "إدارة الحركة و الصيانة": "maintenance",
  "إدارة التطوع": "volunteering",
  "إدارة التوثيق و المستندات": "documentation",
  "إدارة التقارير و الإحصائيات": "reports",
  "إدارة التمكين التقني": "tech-enablement",
};

// Lazy load page components
const AttendancePage = lazy(() => import("@/pages/items/AttendancePage"));
const PersonalNotesPage = lazy(() => import("@/pages/items/PersonalNotesPage"));
const InquiriesPage = lazy(() => import("@/pages/items/InquiriesPage"));
const ChangePasswordPage = lazy(() => import("@/pages/items/ChangePasswordPage"));

// Admin Office pages
const DepartmentTasksPage = lazy(() => import("@/pages/items/DepartmentTasksPage"));
const CreateTaskPage = lazy(() => import("@/pages/items/CreateTaskPage"));
const ManageTasksPage = lazy(() => import("@/pages/items/ManageTasksPage"));
const CompleteTaskPage = lazy(() => import("@/pages/items/CompleteTaskPage"));
const DeleteTaskPage = lazy(() => import("@/pages/items/DeleteTaskPage"));
const EmployeeReviewsPage = lazy(() => import("@/pages/items/EmployeeReviewsPage"));
const EmployeeNotificationsPage = lazy(() => import("@/pages/items/EmployeeNotificationsPage"));
const OwnedIndicatorsPage = lazy(() => import("@/pages/items/OwnedIndicatorsPage"));
const CurrentAttendancePage = lazy(() => import("@/pages/items/CurrentAttendancePage"));

// Map of item slugs to their page components
export const itemPages: Record<string, React.ComponentType> = {
  // Office Services
  "attendance": AttendancePage,
  "personal-notes": PersonalNotesPage,
  "inquiries": InquiriesPage,
  "change-password": ChangePasswordPage,
  // Admin Office
  "department-tasks": DepartmentTasksPage,
  "create-task": CreateTaskPage,
  "manage-tasks": ManageTasksPage,
  "complete-task": CompleteTaskPage,
  "delete-task": DeleteTaskPage,
  "employee-reviews": EmployeeReviewsPage,
  "employee-notifications": EmployeeNotificationsPage,
  "owned-indicators": OwnedIndicatorsPage,
  "current-attendance": CurrentAttendancePage,
};

// Get page component by slug
export const getItemPage = (slug: string): React.ComponentType | null => {
  return itemPages[slug] || null;
};

// Get module ID from label
export const getModuleId = (label: string): string => {
  return moduleSlugToId[label] || "unknown";
};
