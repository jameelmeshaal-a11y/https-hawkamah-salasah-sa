import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DepartmentFilterProps {
  onFilter?: () => void;
  selectedDepartment?: string;
  onDepartmentChange?: (value: string) => void;
}

const departments = [
  "إدارة المستفيدين",
  "الإدارة الإشرافية والتنفيذية",
  "إدارة الأعضاء المشاركين",
  "إدارة التميز المؤسسي",
  "إدارة خدمات المستفيدين",
  "إدارة التقييم والمتابعة",
  "إدارة المشاريع",
  "إدارة البرامج والتطوير",
  "إدارة الشؤون التعليمية",
  "إدارة إكرام الموتى",
  "إدارة الشؤون المالية",
  "إدارة الموارد المالية",
  "إدارة الموارد البشرية",
  "إدارة المخازن والمستودعات",
  "إدارة العلاقات العامة والإعلام",
  "إدارة الحركة والصيانة",
  "إدارة التطوع",
  "إدارة التوثيق والمستندات",
  "إدارة التقارير والإحصائيات",
  "إدارة التمكين التقني",
];

const DepartmentFilter = ({
  onFilter,
  selectedDepartment = "إدارة المستفيدين",
  onDepartmentChange,
}: DepartmentFilterProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Label className="text-foreground font-medium whitespace-nowrap">
            الإدارة: <span className="text-destructive">*</span>
          </Label>
          <Select
            value={selectedDepartment}
            onValueChange={onDepartmentChange}
          >
            <SelectTrigger className="w-64 bg-background">
              <SelectValue placeholder="اختر الإدارة" />
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
        
        <div className="flex justify-center">
          <Button
            onClick={onFilter}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
          >
            عرض
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentFilter;
