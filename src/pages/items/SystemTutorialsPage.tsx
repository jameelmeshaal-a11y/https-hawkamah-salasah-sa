import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Play, FileText } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

const SystemTutorialsPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="system-tutorials"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التقارير والسجلات"
      title="شروحات النظام"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            شروحات النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState 
            message="لا توجد شروحات متوفرة حالياً" 
            icon={BookOpen} 
          />
        </CardContent>
      </Card>
    </InnerPageLayout>
  );
};

export default SystemTutorialsPage;
