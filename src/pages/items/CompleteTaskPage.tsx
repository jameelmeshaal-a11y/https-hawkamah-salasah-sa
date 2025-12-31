import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import DepartmentFilter from "@/components/shared/DepartmentFilter";
import EmptyState from "@/components/shared/EmptyState";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CompleteTaskPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("إدارة المستفيدين");

  const handleFilter = () => {
    console.log("Filtering by department:", selectedDepartment);
  };

  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="complete-task"
      title="إنجاز مهمة منتهية"
      sectionTitle="المكتب الإداري"
      moduleTitle="المكتب الإلكتروني"
    >
      <div className="max-w-4xl mx-auto">
        <DepartmentFilter
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          onFilter={handleFilter}
        />

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-right">رقم المهمة</TableHead>
                <TableHead className="text-right">عنوان المهمة</TableHead>
                <TableHead className="text-right">الموظف</TableHead>
                <TableHead className="text-right">تاريخ الإنجاز</TableHead>
                <TableHead className="text-right">الملاحظات</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <EmptyState colSpan={6} />
            </TableBody>
          </Table>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default CompleteTaskPage;
