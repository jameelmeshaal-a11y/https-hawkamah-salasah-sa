import { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import MailSidebar from "@/components/mail/MailSidebar";
import MailTable, { MailRecord } from "@/components/mail/MailTable";
import { Button } from "@/components/ui/button";
import { Trash2, Archive, Tag } from "lucide-react";

const MailPage = () => {
  const [activeTab, setActiveTab] = useState<"inbox" | "sent" | "drafts" | "trash" | "archive">("inbox");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mails] = useState<MailRecord[]>([]);

  const handleNewMail = () => {
    // TODO: Open new mail dialog
    console.log("New mail");
  };

  const handleDelete = () => {
    console.log("Delete", selectedIds);
  };

  const handleArchive = () => {
    console.log("Archive", selectedIds);
  };

  const tabLabels = {
    inbox: "صندوق الوارد",
    sent: "صندوق الصادر",
    drafts: "البريد المعدول",
    trash: "سلة المهملات",
    archive: "الأرشيف",
  };

  return (
    <InnerPageLayout
      moduleId="office"
      moduleTitle="المكتب الإلكتروني"
      sectionTitle="التواصل الداخلي"
      title="البريد الداخلي"
    >
      <div className="flex h-[calc(100vh-200px)] min-h-[500px]">
        <MailSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onNewMail={handleNewMail}
        />
        
        <div className="flex-1 flex flex-col p-6 space-y-4">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">{tabLabels[activeTab]}</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={selectedIds.length === 0}
                onClick={handleDelete}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                حذف
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={selectedIds.length === 0}
                onClick={handleArchive}
                className="gap-2"
              >
                <Archive className="h-4 w-4" />
                أرشفة
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Tag className="h-4 w-4" />
                علامات
              </Button>
            </div>
          </div>

          {/* Mail Table */}
          <MailTable 
            mails={mails}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            emptyMessage={`لا توجد رسائل في ${tabLabels[activeTab]}`}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default MailPage;
