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

const CreateTaskPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("إدارة المستفيدين");

  const handleFilter = () => {
    console.log("Filtering by department:", selectedDepartment);
  };

  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="create-task"
      title="إنشاء مهمة لموظف"
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
                <TableHead className="text-right">اسم الموظف</TableHead>
                <TableHead className="text-right">الإدارة</TableHead>
                <TableHead className="text-right">المنصب</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <EmptyState colSpan={4} />
            </TableBody>
          </Table>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default CreateTaskPage;
