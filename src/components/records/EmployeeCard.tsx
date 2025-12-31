import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Phone, Mail, Building2, Briefcase, Calendar, Hash } from "lucide-react";

export interface EmployeeInfo {
  id: string;
  name: string;
  arabicName?: string;
  photo?: string;
  employeeNumber: string;
  nationalId?: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  jobTitle: string;
  hireDate: string;
  status: "active" | "inactive" | "on-leave";
  manager?: string;
}

interface EmployeeCardProps {
  employee: EmployeeInfo;
  variant?: "full" | "compact" | "id-card";
}

const statusConfig: Record<EmployeeInfo["status"], { label: string; variant: "default" | "secondary" | "destructive" }> = {
  active: { label: "نشط", variant: "default" },
  inactive: { label: "غير نشط", variant: "destructive" },
  "on-leave": { label: "في إجازة", variant: "secondary" },
};

const EmployeeCard = ({ employee, variant = "full" }: EmployeeCardProps) => {
  const status = statusConfig[employee.status];

  if (variant === "id-card") {
    return (
      <Card className="max-w-md mx-auto overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground text-center py-6">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-24 w-24 border-4 border-primary-foreground/20">
              <AvatarImage src={employee.photo} alt={employee.name} />
              <AvatarFallback className="text-2xl bg-primary-foreground text-primary">
                {employee.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{employee.name}</h2>
              {employee.arabicName && (
                <p className="text-primary-foreground/80">{employee.arabicName}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">الرقم الوظيفي:</span>
            </div>
            <span className="font-medium">{employee.employeeNumber}</span>

            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">القسم:</span>
            </div>
            <span className="font-medium">{employee.department}</span>

            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">المسمى الوظيفي:</span>
            </div>
            <span className="font-medium">{employee.jobTitle}</span>
          </div>
          <Separator />
          <div className="flex justify-center">
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={employee.photo} alt={employee.name} />
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.jobTitle}</p>
            </div>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full variant
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={employee.photo} alt={employee.name} />
            <AvatarFallback className="text-2xl">{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{employee.name}</h2>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
            <p className="text-muted-foreground">{employee.jobTitle}</p>
            <p className="text-sm text-muted-foreground">{employee.department}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">الرقم الوظيفي</p>
              <p className="font-medium">{employee.employeeNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
              <p className="font-medium">{employee.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">رقم الهاتف</p>
              <p className="font-medium">{employee.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">تاريخ التعيين</p>
              <p className="font-medium">{employee.hireDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">القسم</p>
              <p className="font-medium">{employee.department}</p>
            </div>
          </div>

          {employee.manager && (
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">المدير المباشر</p>
                <p className="font-medium">{employee.manager}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
