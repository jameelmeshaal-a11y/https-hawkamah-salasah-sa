import InnerPageLayout from "@/components/layout/InnerPageLayout";
import AttendanceAlert from "@/components/attendance/AttendanceAlert";
import AttendanceButton from "@/components/attendance/AttendanceButton";
import AttendanceTabs from "@/components/attendance/AttendanceTabs";
import ProxyAttendancePanel from "@/components/attendance/ProxyAttendancePanel";

const AttendancePage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="attendance"
      title="تسجيل الحضور والانصراف"
      sectionTitle="الخدمات المكتبية"
      sectionPath="/module/office?section=office-services"
      moduleTitle="المكتب الإلكتروني"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <AttendanceAlert />
        <AttendanceButton />
        <ProxyAttendancePanel />
        <AttendanceTabs />
      </div>
    </InnerPageLayout>
  );
};

export default AttendancePage;
