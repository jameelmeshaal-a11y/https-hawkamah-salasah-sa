import InnerPageLayout from "@/components/layout/InnerPageLayout";
import MailTable, { MailRecord } from "@/components/mail/MailTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileEdit, Trash2 } from "lucide-react";

const DraftsPage = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [drafts] = useState<MailRecord[]>([]);

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التواصل الداخلي"
      title="المسودات"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FileEdit className="h-5 w-5 text-primary" />
            المسودات
          </h2>
          <Button 
            variant="destructive" 
            size="sm" 
            disabled={selectedIds.length === 0}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            حذف المحدد
          </Button>
        </div>

        <MailTable 
          mails={drafts}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          emptyMessage="لا توجد مسودات محفوظة"
          emptyIcon={FileEdit}
        />
      </div>
    </InnerPageLayout>
  );
};

export default DraftsPage;
