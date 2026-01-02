import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";
import AdvancedTable from "@/components/shared/AdvancedTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Clock, UserX, Filter, RefreshCw } from "lucide-react";

interface AttendanceLog {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: string;
  ipAddress: string;
  deviceType: string;
  location: string;
  status: string;
}

const mockAttendanceLogs: AttendanceLog[] = [
  {
    id: "1",
    employeeName: "أحمد محمد العلي",
    employeeId: "EMP001",
    department: "تقنية المعلومات",
    date: "2024-01-15",
    checkIn: "08:00",
    checkOut: "16:30",
    workingHours: "8:30",
    ipAddress: "192.168.1.101",
    deviceType: "جهاز مكتبي",
    location: "المبنى الرئيسي",
    status: "حاضر",
  },
  {
    id: "2",
    employeeName: "سارة أحمد الخالد",
    employeeId: "EMP002",
    department: "الموارد البشرية",
    date: "2024-01-15",
    checkIn: "08:45",
    checkOut: "17:00",
    workingHours: "8:15",
    ipAddress: "192.168.1.102",
    deviceType: "جهاز محمول",
    location: "المبنى الرئيسي",
    status: "متأخر",
  },
  {
    id: "3",
    employeeName: "محمد علي السعيد",
    employeeId: "EMP003",
    department: "المالية",
    date: "2024-01-15",
    checkIn: "07:55",
    checkOut: "16:00",
    workingHours: "8:05",
    ipAddress: "192.168.1.103",
    deviceType: "جهاز مكتبي",
    location: "الفرع الثاني",
    status: "حاضر",
  },
  {
    id: "4",
    employeeName: "فاطمة عبدالله النصر",
    employeeId: "EMP004",
    department: "خدمة العملاء",
    date: "2024-01-15",
    checkIn: "-",
    checkOut: "-",
    workingHours: "-",
    ipAddress: "-",
    deviceType: "-",
    location: "-",
    status: "غائب",
  },
  {
    id: "5",
    employeeName: "خالد سعد الدوسري",
    employeeId: "EMP005",
    department: "التسويق",
    date: "2024-01-15",
    checkIn: "-",
    checkOut: "-",
    workingHours: "-",
    ipAddress: "-",
    deviceType: "-",
    location: "-",
    status: "إجازة",
  },
  {
    id: "6",
    employeeName: "نورة فهد العتيبي",
    employeeId: "EMP006",
    department: "تقنية المعلومات",
    date: "2024-01-15",
    checkIn: "08:10",
    checkOut: "16:45",
    workingHours: "8:35",
    ipAddress: "192.168.1.106",
    deviceType: "جهاز مكتبي",
    location: "المبنى الرئيسي",
    status: "حاضر",
  },
];

const departments = [
  "جميع الأقسام",
  "تقنية المعلومات",
  "الموارد البشرية",
  "المالية",
  "خدمة العملاء",
  "التسويق",
];

const statuses = ["جميع الحالات", "حاضر", "متأخر", "غائب", "إجازة"];

const columns = [
  { key: "employeeName", label: "اسم الموظف" },
  { key: "employeeId", label: "رقم الموظف" },
  { key: "department", label: "القسم" },
  { key: "date", label: "التاريخ", type: "date" as const },
  { key: "checkIn", label: "وقت الحضور" },
  { key: "checkOut", label: "وقت الانصراف" },
  { key: "workingHours", label: "ساعات العمل" },
  { key: "ipAddress", label: "عنوان IP" },
  { key: "deviceType", label: "نوع الجهاز" },
  { key: "location", label: "الموقع" },
  { key: "status", label: "الحالة", type: "status" as const },
];

const AttendanceLogsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("جميع الأقسام");
  const [selectedStatus, setSelectedStatus] = useState("جميع الحالات");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredLogs = mockAttendanceLogs.filter((log) => {
    const departmentMatch = selectedDepartment === "جميع الأقسام" || log.department === selectedDepartment;
    const statusMatch = selectedStatus === "جميع الحالات" || log.status === selectedStatus;
    return departmentMatch && statusMatch;
  });

  const stats = {
    total: mockAttendanceLogs.length,
    present: mockAttendanceLogs.filter((l) => l.status === "حاضر").length,
    late: mockAttendanceLogs.filter((l) => l.status === "متأخر").length,
    absent: mockAttendanceLogs.filter((l) => l.status === "غائب").length,
  };

  const handleReset = () => {
    setSelectedDepartment("جميع الأقسام");
    setSelectedStatus("جميع الحالات");
    setStartDate("");
    setEndDate("");
  };

  const actions = [
    {
      icon: "view" as const,
      label: "عرض التفاصيل",
      onClick: (row: Record<string, unknown>) => console.log("View", row),
    },
  ];

  return (
    <InnerPageLayout
      moduleId="human-resources"
      title="سجلات الحضور والانصراف"
      moduleTitle="إدارة الموارد البشرية"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي الموظفين"
            value={stats.total}
            icon={Users}
            variant="info"
          />
          <StatCard
            title="الحاضرون"
            value={stats.present}
            icon={UserCheck}
            variant="success"
          />
          <StatCard
            title="المتأخرون"
            value={stats.late}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="الغائبون"
            value={stats.absent}
            icon={UserX}
            variant="danger"
          />
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              فلاتر البحث
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">من تاريخ</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">إلى تاريخ</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">القسم</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الحالة</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" onClick={handleReset} className="w-full">
                  <RefreshCw className="h-4 w-4 ml-2" />
                  إعادة تعيين
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <AdvancedTable
              columns={columns}
              data={filteredLogs}
              actions={actions}
              searchable
              exportable
            />
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default AttendanceLogsPage;
