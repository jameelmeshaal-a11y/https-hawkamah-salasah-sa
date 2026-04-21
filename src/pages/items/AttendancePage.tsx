import InnerPageLayout from "@/components/layout/InnerPageLayout";
import AttendanceAlert from "@/components/attendance/AttendanceAlert";
import AttendanceButton from "@/components/attendance/AttendanceButton";
import AttendanceTabs from "@/components/attendance/AttendanceTabs";

const AttendancePage = () => {
  return (
    <InnerPageLayout 
      moduleId="office" 
      itemSlug="attendance"
      title="تسجيل الحضور والانصراف"
      sectionTitle="الخدمات المكتبية"
      sectionPath="/module/office"
      moduleTitle="المكتب الإلكتروني"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Alert Message */}
        <AttendanceAlert />

        {/* Attendance Button */}
        <AttendanceButton />

        {/* Tabs with Tables */}
        <AttendanceTabs />
      </div>
    </InnerPageLayout>
  );
};

export default AttendancePage;
