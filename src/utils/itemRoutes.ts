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

// Lazy load page components - Office Services
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

// Internal Communication pages
const MailPage = lazy(() => import("@/pages/items/MailPage"));
const DraftsPage = lazy(() => import("@/pages/items/DraftsPage"));
const TemplatesPage = lazy(() => import("@/pages/items/TemplatesPage"));
const MailPreferencesPage = lazy(() => import("@/pages/items/MailPreferencesPage"));

// Admin Requests pages
const LeaveRequestPage = lazy(() => import("@/pages/items/LeaveRequestPage"));
const PermissionRequestPage = lazy(() => import("@/pages/items/PermissionRequestPage"));
const FinancialRequestPage = lazy(() => import("@/pages/items/FinancialRequestPage"));
const GeneralRequestPage = lazy(() => import("@/pages/items/GeneralRequestPage"));
const VolunteerGroupRequestPage = lazy(() => import("@/pages/items/VolunteerGroupRequestPage"));
const CancelRequestPage = lazy(() => import("@/pages/items/CancelRequestPage"));
const PendingRequestsPage = lazy(() => import("@/pages/items/PendingRequestsPage"));
const PurchaseRequestPage = lazy(() => import("@/pages/items/PurchaseRequestPage"));
const CarRequestPage = lazy(() => import("@/pages/items/CarRequestPage"));
const RejectedWithNotePage = lazy(() => import("@/pages/items/RejectedWithNotePage"));
const ApprovedRequestsPage = lazy(() => import("@/pages/items/ApprovedRequestsPage"));
const RejectedRequestsPage = lazy(() => import("@/pages/items/RejectedRequestsPage"));
const CompletedRequestsPage = lazy(() => import("@/pages/items/CompletedRequestsPage"));
const CancelledRequestsPage = lazy(() => import("@/pages/items/CancelledRequestsPage"));

// Internal Transactions pages
const InternalTransactionPage = lazy(() => import("@/pages/items/InternalTransactionPage"));
const CancelTransactionPage = lazy(() => import("@/pages/items/CancelTransactionPage"));
const PendingFollowUpPage = lazy(() => import("@/pages/items/PendingFollowUpPage"));
const RejectedFollowUpsPage = lazy(() => import("@/pages/items/RejectedFollowUpsPage"));
const FollowedTransactionsPage = lazy(() => import("@/pages/items/FollowedTransactionsPage"));
const OngoingTransactionsPage = lazy(() => import("@/pages/items/OngoingTransactionsPage"));
const RejectedTransactionsPage = lazy(() => import("@/pages/items/RejectedTransactionsPage"));
const CancelledTransactionsPage = lazy(() => import("@/pages/items/CancelledTransactionsPage"));
const CompletedTransactionsPage = lazy(() => import("@/pages/items/CompletedTransactionsPage"));
const ArchivedTransactionsPage = lazy(() => import("@/pages/items/ArchivedTransactionsPage"));

// Reports and Records pages
const IdCardPage = lazy(() => import("@/pages/items/IdCardPage"));
const JobProfilePage = lazy(() => import("@/pages/items/JobProfilePage"));
const JobHistoryPage = lazy(() => import("@/pages/items/JobHistoryPage"));
const SystemTutorialsPage = lazy(() => import("@/pages/items/SystemTutorialsPage"));
const InternalAlertsPage = lazy(() => import("@/pages/items/InternalAlertsPage"));
const DirectedNotificationsPage = lazy(() => import("@/pages/items/DirectedNotificationsPage"));
const NotesAlertsPage = lazy(() => import("@/pages/items/NotesAlertsPage"));
const LeaveBalancesPage = lazy(() => import("@/pages/items/LeaveBalancesPage"));
const AttendanceRecordsPage = lazy(() => import("@/pages/items/AttendanceRecordsPage"));
const RejectedAttendancePage = lazy(() => import("@/pages/items/RejectedAttendancePage"));
const MyTasksPage = lazy(() => import("@/pages/items/MyTasksPage"));
const ProjectTasksPage = lazy(() => import("@/pages/items/ProjectTasksPage"));
const StrategicPlanMapPage = lazy(() => import("@/pages/items/StrategicPlanMapPage"));
const AssignedIndicatorsPage = lazy(() => import("@/pages/items/AssignedIndicatorsPage"));

// Supervision Module pages
const AidCommitteeBalancePage = lazy(() => import("@/pages/items/AidCommitteeBalancePage"));
const AidCommitteeDecisionsPage = lazy(() => import("@/pages/items/AidCommitteeDecisionsPage"));
const PaymentOrdersApprovalPage = lazy(() => import("@/pages/items/PaymentOrdersApprovalPage"));
const PurchaseVouchersApprovalPage = lazy(() => import("@/pages/items/PurchaseVouchersApprovalPage"));
const GeneralMaintenanceRequestsPage = lazy(() => import("@/pages/items/GeneralMaintenanceRequestsPage"));
const PaymentConfirmationsManagementPage = lazy(() => import("@/pages/items/PaymentConfirmationsManagementPage"));
const RejectedConfirmationsWithNotePage = lazy(() => import("@/pages/items/RejectedConfirmationsWithNotePage"));
const PaymentConfirmationsRecordsPage = lazy(() => import("@/pages/items/PaymentConfirmationsRecordsPage"));
const NotificationsManagementPage = lazy(() => import("@/pages/items/NotificationsManagementPage"));

// New pages
const BeneficiariesDatabasePage = lazy(() => import("@/pages/items/BeneficiariesDatabasePage"));
const OrgChartPage = lazy(() => import("@/pages/items/OrgChartPage"));
const SponsorshipsTablePage = lazy(() => import("@/pages/items/SponsorshipsTablePage"));
const AccountsChartPage = lazy(() => import("@/pages/items/AccountsChartPage"));

// Generic Page Component for dynamic pages
const GenericModulePage = lazy(() => import("@/pages/items/GenericModulePage"));

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
  // Internal Communication
  "mail": MailPage,
  "drafts": DraftsPage,
  "templates": TemplatesPage,
  "mail-preferences": MailPreferencesPage,
  // Admin Requests
  "leave-request": LeaveRequestPage,
  "permission-request": PermissionRequestPage,
  "financial-request": FinancialRequestPage,
  "general-request": GeneralRequestPage,
  "volunteer-group-request": VolunteerGroupRequestPage,
  "cancel-request": CancelRequestPage,
  "pending-requests": PendingRequestsPage,
  "purchase-request": PurchaseRequestPage,
  "car-request": CarRequestPage,
  "rejected-with-note": RejectedWithNotePage,
  "approved-requests": ApprovedRequestsPage,
  "rejected-requests": RejectedRequestsPage,
  "completed-requests": CompletedRequestsPage,
  "cancelled-requests": CancelledRequestsPage,
  // Internal Transactions
  "internal-transaction": InternalTransactionPage,
  "cancel-transaction": CancelTransactionPage,
  "pending-follow-up": PendingFollowUpPage,
  "rejected-follow-ups": RejectedFollowUpsPage,
  "followed-transactions": FollowedTransactionsPage,
  "ongoing-transactions": OngoingTransactionsPage,
  "rejected-transactions": RejectedTransactionsPage,
  "cancelled-transactions": CancelledTransactionsPage,
  "completed-transactions": CompletedTransactionsPage,
  "archived-transactions": ArchivedTransactionsPage,
  // Reports and Records
  "id-card": IdCardPage,
  "job-profile": JobProfilePage,
  "job-history": JobHistoryPage,
  "system-tutorials": SystemTutorialsPage,
  "internal-alerts": InternalAlertsPage,
  "directed-notifications": DirectedNotificationsPage,
  "notes-alerts": NotesAlertsPage,
  "leave-balances": LeaveBalancesPage,
  "attendance-records": AttendanceRecordsPage,
  "rejected-attendance": RejectedAttendancePage,
  "my-tasks": MyTasksPage,
  "project-tasks": ProjectTasksPage,
  "strategic-plan-map": StrategicPlanMapPage,
  "assigned-indicators": AssignedIndicatorsPage,
  // Supervision Module
  "aid-committee-balance": AidCommitteeBalancePage,
  "aid-committee-decisions": AidCommitteeDecisionsPage,
  "payment-orders-approval": PaymentOrdersApprovalPage,
  "purchase-vouchers-approval": PurchaseVouchersApprovalPage,
  "general-maintenance-requests": GeneralMaintenanceRequestsPage,
  "payment-confirmations-management": PaymentConfirmationsManagementPage,
  "rejected-confirmations-with-note": RejectedConfirmationsWithNotePage,
  "payment-confirmations-records": PaymentConfirmationsRecordsPage,
  "notifications-management": NotificationsManagementPage,
  // New pages
  "beneficiaries-database": BeneficiariesDatabasePage,
  "org-structure": OrgChartPage,
  "manage-org-structure": OrgChartPage,
  "sponsorships-table": SponsorshipsTablePage,
  "accounts-chart": AccountsChartPage,
};

// Get page component by slug - returns generic page if specific page not found
export const getItemPage = (slug: string): React.ComponentType => {
  return itemPages[slug] || GenericModulePage;
};

// Get module ID from label
export const getModuleId = (label: string): string => {
  return moduleSlugToId[label] || "unknown";
};
