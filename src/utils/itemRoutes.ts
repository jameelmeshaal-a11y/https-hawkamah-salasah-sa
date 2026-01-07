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

// Institutional Excellence - Governance pages
const StandardsAnswersPage = lazy(() => import("@/pages/items/StandardsAnswersPage"));
const GovernanceEvaluationFormPage = lazy(() => import("@/pages/items/GovernanceEvaluationFormPage"));
const GovernanceEvaluationReportPage = lazy(() => import("@/pages/items/GovernanceEvaluationReportPage"));
const FinancialPerformanceIndicatorsPage = lazy(() => import("@/pages/items/FinancialPerformanceIndicatorsPage"));
const GovernanceTasksPage = lazy(() => import("@/pages/items/GovernanceTasksPage"));
const GovernanceTasksStatsPage = lazy(() => import("@/pages/items/GovernanceTasksStatsPage"));

// Institutional Excellence - Strategic Plan pages
const StrategicPlansManagementPage = lazy(() => import("@/pages/items/StrategicPlansManagementPage"));
const StrategicPlanVariablesPage = lazy(() => import("@/pages/items/StrategicPlanVariablesPage"));
const AutomatedVerificationValuesPage = lazy(() => import("@/pages/items/AutomatedVerificationValuesPage"));
const PlanPerspectivesPage = lazy(() => import("@/pages/items/PlanPerspectivesPage"));
const StrategicGoalsManagementPage = lazy(() => import("@/pages/items/StrategicGoalsManagementPage"));
const MainIndicatorsManagementPage = lazy(() => import("@/pages/items/MainIndicatorsManagementPage"));
const SubIndicatorsManagementPage = lazy(() => import("@/pages/items/SubIndicatorsManagementPage"));
const OwnedIndicatorsManagementPage = lazy(() => import("@/pages/items/OwnedIndicatorsManagementPage"));
const ProgramsIndicatorsPage = lazy(() => import("@/pages/items/ProgramsIndicatorsPage"));
const ProjectsIndicatorsPage = lazy(() => import("@/pages/items/ProjectsIndicatorsPage"));
const StrategicPlanTreePage = lazy(() => import("@/pages/items/StrategicPlanTreePage"));
const PlanReportBuilderPage = lazy(() => import("@/pages/items/PlanReportBuilderPage"));
const Vision2030AlignmentPage = lazy(() => import("@/pages/items/Vision2030AlignmentPage"));
const SustainableDevelopmentGoalsPage = lazy(() => import("@/pages/items/SustainableDevelopmentGoalsPage"));
const VerificationAttachmentsPage = lazy(() => import("@/pages/items/VerificationAttachmentsPage"));

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
const CreateGeneralTaskPage = lazy(() => import("@/pages/items/CreateGeneralTaskPage"));
const ManageEmployeeTasksPage = lazy(() => import("@/pages/items/ManageEmployeeTasksPage"));
const TransferStuckTaskPage = lazy(() => import("@/pages/items/TransferStuckTaskPage"));
const TasksDatabasePage = lazy(() => import("@/pages/items/TasksDatabasePage"));
const RestoreDeletedTaskPage = lazy(() => import("@/pages/items/RestoreDeletedTaskPage"));

// New pages
const BeneficiariesDatabasePage = lazy(() => import("@/pages/items/BeneficiariesDatabasePage"));
const OrgChartPage = lazy(() => import("@/pages/items/OrgChartPage"));
const SponsorshipsTablePage = lazy(() => import("@/pages/items/SponsorshipsTablePage"));
const AccountsChartPage = lazy(() => import("@/pages/items/AccountsChartPage"));

// Cybersecurity pages
const LoginLogsPage = lazy(() => import("@/pages/items/LoginLogsPage"));
const UserPermissionsPage = lazy(() => import("@/pages/items/UserPermissionsPage"));
const SystemUsersPage = lazy(() => import("@/pages/items/SystemUsersPage"));

// HR pages
const EmployeesListPage = lazy(() => import("@/pages/items/EmployeesListPage"));
const AttendanceLogsPage = lazy(() => import("@/pages/items/AttendanceLogsPage"));
const EmployeeProfilePage = lazy(() => import("@/pages/items/EmployeeProfilePage"));

// Beneficiary pages
const BeneficiaryProfilePage = lazy(() => import("@/pages/items/BeneficiaryProfilePage"));
const AddBeneficiaryFilePage = lazy(() => import("@/pages/items/AddBeneficiaryFilePage"));
const UpdateBeneficiaryFilePage = lazy(() => import("@/pages/items/UpdateBeneficiaryFilePage"));
const DeleteBeneficiaryFilePage = lazy(() => import("@/pages/items/DeleteBeneficiaryFilePage"));
const DependentsDatabasePage = lazy(() => import("@/pages/items/DependentsDatabasePage"));
const UpdateBeneficiaryStatusPage = lazy(() => import("@/pages/items/UpdateBeneficiaryStatusPage"));
const UpdateBeneficiaryCategoryPage = lazy(() => import("@/pages/items/UpdateBeneficiaryCategoryPage"));
const UpdateDependentCategoryPage = lazy(() => import("@/pages/items/UpdateDependentCategoryPage"));
const DeletedFilesLogPage = lazy(() => import("@/pages/items/DeletedFilesLogPage"));
const DeletedDependentsFilesPage = lazy(() => import("@/pages/items/DeletedDependentsFilesPage"));
const ExportBeneficiaryCardsPage = lazy(() => import("@/pages/items/ExportBeneficiaryCardsPage"));
const FilesBarcodeReaderPage = lazy(() => import("@/pages/items/FilesBarcodeReaderPage"));
const WebsiteJoinRequestsPage = lazy(() => import("@/pages/items/WebsiteJoinRequestsPage"));
const AssociationsSearchPage = lazy(() => import("@/pages/items/AssociationsSearchPage"));
const ManageGuardiansAccountsPage = lazy(() => import("@/pages/items/ManageGuardiansAccountsPage"));
const GuardiansDatabasePage = lazy(() => import("@/pages/items/GuardiansDatabasePage"));
const ConvertBeneficiaryToGuardianPage = lazy(() => import("@/pages/items/ConvertBeneficiaryToGuardianPage"));
const ConvertGuardianToBeneficiaryPage = lazy(() => import("@/pages/items/ConvertGuardianToBeneficiaryPage"));
const DeleteGuardianFilePage = lazy(() => import("@/pages/items/DeleteGuardianFilePage"));
const DeletedGuardiansLogPage = lazy(() => import("@/pages/items/DeletedGuardiansLogPage"));
const CreateGroupUpdateTaskPage = lazy(() => import("@/pages/items/CreateGroupUpdateTaskPage"));
const ManageGroupUpdateTasksPage = lazy(() => import("@/pages/items/ManageGroupUpdateTasksPage"));
const GroupUpdateApprovalsPage = lazy(() => import("@/pages/items/GroupUpdateApprovalsPage"));
const GroupUpdateTasksPage = lazy(() => import("@/pages/items/GroupUpdateTasksPage"));
const ManageSelfUpdateRequestsPage = lazy(() => import("@/pages/items/ManageSelfUpdateRequestsPage"));
const ReceivedSelfUpdateRequestsPage = lazy(() => import("@/pages/items/ReceivedSelfUpdateRequestsPage"));
const SelfUpdateApprovalTasksPage = lazy(() => import("@/pages/items/SelfUpdateApprovalTasksPage"));
const UpdateFileForAidRequestPage = lazy(() => import("@/pages/items/UpdateFileForAidRequestPage"));
const UpdateBeneficiaryDataStatusPage = lazy(() => import("@/pages/items/UpdateBeneficiaryDataStatusPage"));
const NotUpdatedFilesPage = lazy(() => import("@/pages/items/NotUpdatedFilesPage"));
const WronglyUpdatedFilesPage = lazy(() => import("@/pages/items/WronglyUpdatedFilesPage"));
const SelfUpdateFilesPage = lazy(() => import("@/pages/items/SelfUpdateFilesPage"));
const FieldUpdateFilesPage = lazy(() => import("@/pages/items/FieldUpdateFilesPage"));
const ManageEntitiesAccountsPage = lazy(() => import("@/pages/items/ManageEntitiesAccountsPage"));
const ManageRepresentativesAccountsPage = lazy(() => import("@/pages/items/ManageRepresentativesAccountsPage"));
const DeleteEntityFilePage = lazy(() => import("@/pages/items/DeleteEntityFilePage"));
const RestoreEntityFilePage = lazy(() => import("@/pages/items/RestoreEntityFilePage"));
const RepresentativesDatabasePage = lazy(() => import("@/pages/items/RepresentativesDatabasePage"));
const EntitiesDatabasePage = lazy(() => import("@/pages/items/EntitiesDatabasePage"));
const EntitiesRegistrationRequestsPage = lazy(() => import("@/pages/items/EntitiesRegistrationRequestsPage"));

// Sponsorship pages
const SponsorsListPage = lazy(() => import("@/pages/items/SponsorsListPage"));
const SponsorshipPaymentsPage = lazy(() => import("@/pages/items/SponsorshipPaymentsPage"));

// Financial pages
const PaymentOrdersPage = lazy(() => import("@/pages/items/PaymentOrdersPage"));
const FinancialReportsPage = lazy(() => import("@/pages/items/FinancialReportsPage"));

// Rehabilitation Projects Management pages
const RehabilitationProjectsReportsPage = lazy(() => import("@/pages/items/RehabilitationProjectsReportsPage"));
const InstallmentsDatabasePage = lazy(() => import("@/pages/items/InstallmentsDatabasePage"));
const RegisterBeneficiaryProjectPage = lazy(() => import("@/pages/items/RegisterBeneficiaryProjectPage"));
const BeneficiariesNeedRehabilitationPage = lazy(() => import("@/pages/items/BeneficiariesNeedRehabilitationPage"));
const RehabilitationManagementOpinionPage = lazy(() => import("@/pages/items/RehabilitationManagementOpinionPage"));
const RehabilitationProjectsDatabasePage = lazy(() => import("@/pages/items/RehabilitationProjectsDatabasePage"));
const LatePayersPage = lazy(() => import("@/pages/items/LatePayersPage"));
const PayersDatabasePage = lazy(() => import("@/pages/items/PayersDatabasePage"));
const QualifiedDatabasePage = lazy(() => import("@/pages/items/QualifiedDatabasePage"));
const RestoreSupplierAccountPage = lazy(() => import("@/pages/items/RestoreSupplierAccountPage"));

// Supplier Management pages
const DeleteSupplierAccountPage = lazy(() => import("@/pages/items/DeleteSupplierAccountPage"));
const SuppliersDatabasePage = lazy(() => import("@/pages/items/SuppliersDatabasePage"));
const ManageSupplierAccountsPage = lazy(() => import("@/pages/items/ManageSupplierAccountsPage"));

// Closing and Evaluation Phase pages
const RestoreDeletedProjectPage = lazy(() => import("@/pages/items/RestoreDeletedProjectPage"));
const DeleteProjectPage = lazy(() => import("@/pages/items/DeleteProjectPage"));
const OpenCompletedProjectPage = lazy(() => import("@/pages/items/OpenCompletedProjectPage"));
const CompleteProjectPage = lazy(() => import("@/pages/items/CompleteProjectPage"));
const TransferProjectBalancePage = lazy(() => import("@/pages/items/TransferProjectBalancePage"));
const ProjectDatabasePage = lazy(() => import("@/pages/items/ProjectDatabasePage"));
const ProjectStatisticsPage = lazy(() => import("@/pages/items/ProjectStatisticsPage"));

// Projects Management - Execution Phase pages
const RegisterProjectRevenuePage = lazy(() => import("@/pages/items/RegisterProjectRevenuePage"));
const RegisterProjectExpensePage = lazy(() => import("@/pages/items/RegisterProjectExpensePage"));
const AssignBeneficiariesProjectPage = lazy(() => import("@/pages/items/AssignBeneficiariesProjectPage"));
const ManageProjectReportsPage = lazy(() => import("@/pages/items/ManageProjectReportsPage"));

// Projects Management - Monitoring Phase pages
const ProjectManagersDashboardPage = lazy(() => import("@/pages/items/ProjectManagersDashboardPage"));
const ProjectMonitoringBoardPage = lazy(() => import("@/pages/items/ProjectMonitoringBoardPage"));
const ManageProjectPlanPage = lazy(() => import("@/pages/items/ManageProjectPlanPage"));
const ProjectKanbanBoardPage = lazy(() => import("@/pages/items/ProjectKanbanBoardPage"));
const ProjectKpisReportPage = lazy(() => import("@/pages/items/ProjectKpisReportPage"));

// Projects Management - Preparation Phase pages
const ManageContractsPaymentsPage = lazy(() => import("@/pages/items/ManageContractsPaymentsPage"));
const ManageProjectActivitiesPage = lazy(() => import("@/pages/items/ManageProjectActivitiesPage"));
const ManageProjectTasksPage = lazy(() => import("@/pages/items/ManageProjectTasksPage"));
const ProjectsDatabaseWithFilterPage = lazy(() => import("@/pages/items/ProjectsDatabaseWithFilterPage"));
const UpdateProjectDataPage = lazy(() => import("@/pages/items/UpdateProjectDataPage"));
const AddNewProjectPage = lazy(() => import("@/pages/items/AddNewProjectPage"));

// Evaluation and Followup - Activity Management pages
const AddSupportActivityPage = lazy(() => import("@/pages/items/AddSupportActivityPage"));
const AddSponsorshipActivityPage = lazy(() => import("@/pages/items/AddSponsorshipActivityPage"));
const AddSponsorActivityPage = lazy(() => import("@/pages/items/AddSponsorActivityPage"));
const AddAssistanceRequestActivityPage = lazy(() => import("@/pages/items/AddAssistanceRequestActivityPage"));
const AddDependentActivityPage = lazy(() => import("@/pages/items/AddDependentActivityPage"));

// Members Management - Board Members pages
const AddBoardMemberPage = lazy(() => import("@/pages/items/AddBoardMemberPage"));
const UpdateBoardMemberPage = lazy(() => import("@/pages/items/UpdateBoardMemberPage"));
const BoardMembersDatabasePage = lazy(() => import("@/pages/items/BoardMembersDatabasePage"));

// Members Management - General Assembly Members pages
const ManageMembersAccountsPage = lazy(() => import("@/pages/items/ManageMembersAccountsPage"));
const AssemblyMembersDatabasePage = lazy(() => import("@/pages/items/AssemblyMembersDatabasePage"));
const CancelMemberSubscriptionPage = lazy(() => import("@/pages/items/CancelMemberSubscriptionPage"));
const LateMembersPaymentPage = lazy(() => import("@/pages/items/LateMembersPaymentPage"));
const ShareReportWithMembersPage = lazy(() => import("@/pages/items/ShareReportWithMembersPage"));
const IssueMembersCardsPage = lazy(() => import("@/pages/items/IssueMembersCardsPage"));
const ManageMembershipCategoriesPage = lazy(() => import("@/pages/items/ManageMembershipCategoriesPage"));
const ExternalSubscriptionsPaymentPage = lazy(() => import("@/pages/items/ExternalSubscriptionsPaymentPage"));
const CancelledMembersPage = lazy(() => import("@/pages/items/CancelledMembersPage"));
const SubscriptionsPaymentRecordPage = lazy(() => import("@/pages/items/SubscriptionsPaymentRecordPage"));

// Members Management - Shareholders Management pages
const ShareholdersSettingsPage = lazy(() => import("@/pages/items/ShareholdersSettingsPage"));
const ManageShareholdersAccountsPage = lazy(() => import("@/pages/items/ManageShareholdersAccountsPage"));
const ManageShareholdersStocksPage = lazy(() => import("@/pages/items/ManageShareholdersStocksPage"));
const ManageShareholdersTransactionsPage = lazy(() => import("@/pages/items/ManageShareholdersTransactionsPage"));
const CancelShareholderAccountPage = lazy(() => import("@/pages/items/CancelShareholderAccountPage"));
const RestoreShareholderAccountPage = lazy(() => import("@/pages/items/RestoreShareholderAccountPage"));
const ShareholdersExceededOwnershipPage = lazy(() => import("@/pages/items/ShareholdersExceededOwnershipPage"));
const ProfitsDistributionReportPage = lazy(() => import("@/pages/items/ProfitsDistributionReportPage"));
const ShareholdersManagementStatisticsPage = lazy(() => import("@/pages/items/ShareholdersManagementStatisticsPage"));

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
  "create-general-task": CreateGeneralTaskPage,
  "manage-employee-tasks": ManageEmployeeTasksPage,
  "transfer-stuck-task": TransferStuckTaskPage,
  "tasks-database": TasksDatabasePage,
  "restore-deleted-task": RestoreDeletedTaskPage,
  // Members Management - Board Members
  "add-board-member": AddBoardMemberPage,
  "update-board-member": UpdateBoardMemberPage,
  "board-members-database": BoardMembersDatabasePage,
  // Members Management - General Assembly Members
  "manage-members-accounts": ManageMembersAccountsPage,
  "assembly-members-database": AssemblyMembersDatabasePage,
  "cancel-member-subscription": CancelMemberSubscriptionPage,
  "late-members-payment": LateMembersPaymentPage,
  "share-report-with-members": ShareReportWithMembersPage,
  "issue-members-cards": IssueMembersCardsPage,
  "manage-membership-categories": ManageMembershipCategoriesPage,
  "external-subscriptions-payment": ExternalSubscriptionsPaymentPage,
  "cancelled-members": CancelledMembersPage,
  "subscriptions-payment-record": SubscriptionsPaymentRecordPage,
  // Members Management - Shareholders Management
  "shareholders-settings": ShareholdersSettingsPage,
  "manage-shareholders-accounts": ManageShareholdersAccountsPage,
  "manage-shareholders-stocks": ManageShareholdersStocksPage,
  "manage-shareholders-transactions": ManageShareholdersTransactionsPage,
  "cancel-shareholder-account": CancelShareholderAccountPage,
  "restore-shareholder-account": RestoreShareholderAccountPage,
  "shareholders-exceeded-ownership": ShareholdersExceededOwnershipPage,
  "profits-distribution-report": ProfitsDistributionReportPage,
  "shareholders-management-statistics": ShareholdersManagementStatisticsPage,
  // New pages
  "beneficiaries-database": BeneficiariesDatabasePage,
  "org-structure": OrgChartPage,
  "manage-org-structure": OrgChartPage,
  "sponsorships-table": SponsorshipsTablePage,
  "accounts-chart": AccountsChartPage,
  // Cybersecurity pages
  "login-logs": LoginLogsPage,
  "user-permissions": UserPermissionsPage,
  "system-users": SystemUsersPage,
  // HR pages
  "employees-list": EmployeesListPage,
  "employees-database": EmployeesListPage,
  "attendance-logs": AttendanceLogsPage,
  "current-attendance-record": AttendanceLogsPage,
  "employee-profile": EmployeeProfilePage,
  "view-employee": EmployeeProfilePage,
  // Beneficiary pages
  "beneficiary-profile": BeneficiaryProfilePage,
  "view-beneficiary": BeneficiaryProfilePage,
  // Beneficiary Files Management
  "add-beneficiary-file": AddBeneficiaryFilePage,
  "update-beneficiary-file": UpdateBeneficiaryFilePage,
  "delete-beneficiary-file": DeleteBeneficiaryFilePage,
  "dependents-database": DependentsDatabasePage,
  "update-beneficiary-status": UpdateBeneficiaryStatusPage,
  "update-beneficiary-category": UpdateBeneficiaryCategoryPage,
  "update-dependent-category": UpdateDependentCategoryPage,
  "deleted-files-log": DeletedFilesLogPage,
  "deleted-dependents-files": DeletedDependentsFilesPage,
  "export-beneficiary-cards": ExportBeneficiaryCardsPage,
  "files-barcode-reader": FilesBarcodeReaderPage,
  "website-join-requests": WebsiteJoinRequestsPage,
  "associations-search": AssociationsSearchPage,
  // Guardian Files Management
  "manage-guardians-accounts": ManageGuardiansAccountsPage,
  "guardians-database": GuardiansDatabasePage,
  "convert-beneficiary-to-guardian": ConvertBeneficiaryToGuardianPage,
  "convert-guardian-to-beneficiary": ConvertGuardianToBeneficiaryPage,
  "delete-guardian-file": DeleteGuardianFilePage,
  "deleted-guardians-log": DeletedGuardiansLogPage,
  // Data Update Management
  "create-group-update-task": CreateGroupUpdateTaskPage,
  "manage-group-update-tasks": ManageGroupUpdateTasksPage,
  "group-update-approvals": GroupUpdateApprovalsPage,
  "group-update-tasks": GroupUpdateTasksPage,
  "manage-self-update-requests": ManageSelfUpdateRequestsPage,
  "received-self-update-requests": ReceivedSelfUpdateRequestsPage,
  "self-update-approval-tasks": SelfUpdateApprovalTasksPage,
  "update-file-for-aid-request": UpdateFileForAidRequestPage,
  "update-beneficiary-data-status": UpdateBeneficiaryDataStatusPage,
  "not-updated-files": NotUpdatedFilesPage,
  "wrongly-updated-files": WronglyUpdatedFilesPage,
  "self-update-files": SelfUpdateFilesPage,
  "field-update-files": FieldUpdateFilesPage,
  // Beneficiary Entities Management
  "manage-entities-accounts": ManageEntitiesAccountsPage,
  "entities-database": EntitiesDatabasePage,
  "manage-representatives-accounts": ManageRepresentativesAccountsPage,
  "representatives-database": RepresentativesDatabasePage,
  "delete-entity-file": DeleteEntityFilePage,
  "restore-entity-file": RestoreEntityFilePage,
  "entities-registration-requests": EntitiesRegistrationRequestsPage,
  // Sponsorship pages
  "sponsors-list": SponsorsListPage,
  "sponsors-database": SponsorsListPage,
  "sponsorship-payments": SponsorshipPaymentsPage,
  // Financial pages
  "payment-orders": PaymentOrdersPage,
  "financial-reports": FinancialReportsPage,
  // Rehabilitation Projects Management
  "rehabilitation-projects-reports": RehabilitationProjectsReportsPage,
  "installments-database": InstallmentsDatabasePage,
  "register-beneficiary-project": RegisterBeneficiaryProjectPage,
  "beneficiaries-need-rehabilitation": BeneficiariesNeedRehabilitationPage,
  "rehabilitation-management-opinion": RehabilitationManagementOpinionPage,
  "rehabilitation-projects-database": RehabilitationProjectsDatabasePage,
  "late-payers": LatePayersPage,
  "payers-database": PayersDatabasePage,
  "qualified-database": QualifiedDatabasePage,
  "restore-supplier-account": RestoreSupplierAccountPage,
  // Supplier Management
  "delete-supplier-account": DeleteSupplierAccountPage,
  "suppliers-database": SuppliersDatabasePage,
  "manage-supplier-accounts": ManageSupplierAccountsPage,
  // Closing and Evaluation Phase
  "restore-deleted-project": RestoreDeletedProjectPage,
  "delete-project": DeleteProjectPage,
  "open-completed-project": OpenCompletedProjectPage,
  "complete-project": CompleteProjectPage,
  "transfer-project-balance": TransferProjectBalancePage,
  "project-database": ProjectDatabasePage,
  "project-statistics": ProjectStatisticsPage,
  // Projects Management - Execution Phase
  "register-project-revenue": RegisterProjectRevenuePage,
  "register-project-expense": RegisterProjectExpensePage,
  "assign-beneficiaries-project": AssignBeneficiariesProjectPage,
  "manage-project-reports": ManageProjectReportsPage,
  // Projects Management - Monitoring Phase
  "project-managers-dashboard": ProjectManagersDashboardPage,
  "project-monitoring-board": ProjectMonitoringBoardPage,
  "manage-project-plan": ManageProjectPlanPage,
  "project-kanban-board": ProjectKanbanBoardPage,
  "project-kpis-report": ProjectKpisReportPage,
  // Projects Management - Preparation Phase
  "manage-contracts-payments": ManageContractsPaymentsPage,
  "manage-project-activities": ManageProjectActivitiesPage,
  "manage-project-tasks": ManageProjectTasksPage,
  "projects-database": ProjectsDatabaseWithFilterPage,
  "update-project-data": UpdateProjectDataPage,
  "add-new-project": AddNewProjectPage,
  // Evaluation and Followup - Activity Management
  "add-support-activity": AddSupportActivityPage,
  "add-sponsorship-activity": AddSponsorshipActivityPage,
  "add-sponsor-activity": AddSponsorActivityPage,
  "add-assistance-request-activity": AddAssistanceRequestActivityPage,
  "add-dependent-activity": AddDependentActivityPage,
  // Institutional Excellence - Governance
  "standards-answers": StandardsAnswersPage,
  "governance-evaluation-form": GovernanceEvaluationFormPage,
  "governance-evaluation-report": GovernanceEvaluationReportPage,
  "financial-performance-indicators": FinancialPerformanceIndicatorsPage,
  "governance-tasks": GovernanceTasksPage,
  "governance-tasks-stats": GovernanceTasksStatsPage,
  // Institutional Excellence - Strategic Plan
  "strategic-plans-management": StrategicPlansManagementPage,
  "strategic-plan-variables": StrategicPlanVariablesPage,
  "automated-verification-values": AutomatedVerificationValuesPage,
  "plan-perspectives": PlanPerspectivesPage,
  "strategic-goals-management": StrategicGoalsManagementPage,
  "main-indicators-management": MainIndicatorsManagementPage,
  "sub-indicators-management": SubIndicatorsManagementPage,
  "owned-indicators-management": OwnedIndicatorsManagementPage,
  "programs-indicators": ProgramsIndicatorsPage,
  "projects-indicators": ProjectsIndicatorsPage,
  "strategic-plan-tree": StrategicPlanTreePage,
  "plan-report-builder": PlanReportBuilderPage,
  "vision-2030-alignment": Vision2030AlignmentPage,
  "sustainable-development-goals": SustainableDevelopmentGoalsPage,
  // Institutional Excellence - Governance (Additional)
  "verification-attachments": VerificationAttachmentsPage,
};

// Get page component by slug - returns generic page if specific page not found
export const getItemPage = (slug: string): React.ComponentType => {
  return itemPages[slug] || GenericModulePage;
};

// Get module ID from label
export const getModuleId = (label: string): string => {
  return moduleSlugToId[label] || "unknown";
};
