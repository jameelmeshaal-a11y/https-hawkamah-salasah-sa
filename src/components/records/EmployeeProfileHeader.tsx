import { User, Calendar, UserCheck, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EmployeeProfileHeaderProps {
  employee: {
    name: string;
    position: string;
    createdAt: string;
    createdBy: string;
    systemManager: string;
    updatedAt: string;
    updatedBy: string;
    accountType: string;
    jobGrade: string;
    jobRank: string;
    employeeNumber: string;
    avatarUrl?: string;
  };
}

const EmployeeProfileHeader = ({ employee }: EmployeeProfileHeaderProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <Avatar className="h-24 w-24 border-4 border-primary/20">
          <AvatarImage src={employee.avatarUrl} alt={employee.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 space-y-4">
          {/* Name and Position */}
          <div>
            <h2 className="text-xl font-bold text-foreground">{employee.name}</h2>
            <p className="text-muted-foreground">{employee.position}</p>
          </div>

          {/* Meta Info Row 1 */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">تاريخ الإنشاء:</span>
              <span className="text-foreground">{employee.createdAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">أنشأ بواسطة:</span>
              <span className="text-foreground">{employee.createdBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">مدير النظام:</span>
              <span className="text-foreground">{employee.systemManager}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">تاريخ التحديث:</span>
              <span className="text-foreground">{employee.updatedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">حدث بواسطة:</span>
              <span className="text-foreground">{employee.updatedBy}</span>
            </div>
          </div>

          {/* Meta Info Row 2 */}
          <div className="flex flex-wrap gap-6 text-sm bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">نوع الحساب:</span>
              <span className="text-foreground font-medium">{employee.accountType}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">الدرجة الوظيفية:</span>
              <span className="text-foreground font-medium">{employee.jobGrade}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">الرتبة الوظيفية:</span>
              <span className="text-foreground font-medium">{employee.jobRank}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">الرقم الوظيفي:</span>
              <span className="text-foreground font-medium">{employee.employeeNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileHeader;
