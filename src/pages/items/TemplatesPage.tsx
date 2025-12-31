import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";
import { FileText, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

interface Template {
  id: string;
  name: string;
  subject: string;
  createdAt: string;
}

const TemplatesPage = () => {
  const [templates] = useState<Template[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التواصل الداخلي"
      title="إدارة القوالب"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            قوالب البريد
          </h2>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة قالب جديد
          </Button>
        </div>

        {templates.length === 0 ? (
          <EmptyState icon={FileText} message="لا توجد قوالب محفوظة" />
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right">اسم القالب</TableHead>
                  <TableHead className="text-right">الموضوع</TableHead>
                  <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                  <TableHead className="text-center">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="text-right font-medium">{template.name}</TableCell>
                    <TableCell className="text-right">{template.subject}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{template.createdAt}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default TemplatesPage;
