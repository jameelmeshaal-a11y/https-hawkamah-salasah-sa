import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Check, X, Edit, Shield } from "lucide-react";
import { toast } from "sonner";

interface UserPermission {
  id: number;
  username: string;
  employeeName: string;
  department: string;
  jobTitle: string;
  role: string;
  permissions: {
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
    export: boolean;
  };
  lastLogin: string;
  status: string;
}

const UserPermissionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [users] = useState<UserPermission[]>([
    {
      id: 1,
      username: "ahmed.alghamdi",
      employeeName: "أحمد محمد الغامدي",
      department: "تقنية المعلومات",
      jobTitle: "مطور برمجيات",
      role: "مدير النظام",
      permissions: { view: true, add: true, edit: true, delete: true, approve: true, export: true },
      lastLogin: "2024-06-15",
      status: "نشط",
    },
    {
      id: 2,
      username: "mohammed.alharbi",
      employeeName: "محمد عبدالله الحربي",
      department: "الموارد البشرية",
      jobTitle: "أخصائي موارد بشرية",
      role: "مستخدم",
      permissions: { view: true, add: true, edit: true, delete: false, approve: false, export: true },
      lastLogin: "2024-06-14",
      status: "نشط",
    },
    {
      id: 3,
      username: "sara.aldosari",
      employeeName: "سارة خالد الدوسري",
      department: "المالية",
      jobTitle: "محاسب",
      role: "مستخدم",
      permissions: { view: true, add: false, edit: false, delete: false, approve: false, export: true },
      lastLogin: "2024-06-10",
      status: "غير نشط",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.employeeName.includes(searchQuery) ||
      user.username.includes(searchQuery) ||
      user.department.includes(searchQuery)
  );

  const PermissionIcon = ({ allowed }: { allowed: boolean }) => (
    allowed ? (
      <Check className="h-4 w-4 text-emerald-600" />
    ) : (
      <X className="h-4 w-4 text-red-500" />
    )
  );

  return (
    <InnerPageLayout
      moduleId="technical"
      title="صلاحيات المستخدمين"
      sectionTitle="الأمن السيبراني"
      moduleTitle="التمكين التقني"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                إدارة صلاحيات المستخدمين
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث بالاسم أو القسم..."
                    className="pr-9 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">المستخدم</TableHead>
                    <TableHead className="text-right">الموظف</TableHead>
                    <TableHead className="text-right">القسم</TableHead>
                    <TableHead className="text-right">الوظيفة</TableHead>
                    <TableHead className="text-right">الدور</TableHead>
                    <TableHead className="text-center">عرض</TableHead>
                    <TableHead className="text-center">إضافة</TableHead>
                    <TableHead className="text-center">تعديل</TableHead>
                    <TableHead className="text-center">حذف</TableHead>
                    <TableHead className="text-center">اعتماد</TableHead>
                    <TableHead className="text-center">تصدير</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.employeeName}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.jobTitle}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "مدير النظام" ? "default" : "secondary"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center"><PermissionIcon allowed={user.permissions.view} /></TableCell>
                      <TableCell className="text-center"><PermissionIcon allowed={user.permissions.add} /></TableCell>
                      <TableCell className="text-center"><PermissionIcon allowed={user.permissions.edit} /></TableCell>
                      <TableCell className="text-center"><PermissionIcon allowed={user.permissions.delete} /></TableCell>
                      <TableCell className="text-center"><PermissionIcon allowed={user.permissions.approve} /></TableCell>
                      <TableCell className="text-center"><PermissionIcon allowed={user.permissions.export} /></TableCell>
                      <TableCell>
                        <Badge variant={user.status === "نشط" ? "default" : "secondary"} className={user.status === "نشط" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.info(`تعديل صلاحيات: ${user.employeeName}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default UserPermissionsPage;
