import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Inbox, 
  Send, 
  FileEdit, 
  Trash2, 
  Archive,
  Plus
} from "lucide-react";

type MailTab = "inbox" | "sent" | "drafts" | "trash" | "archive";

interface MailSidebarProps {
  activeTab: MailTab;
  onTabChange: (tab: MailTab) => void;
  onNewMail?: () => void;
}

const tabs = [
  { id: "inbox" as const, label: "صندوق الوارد", icon: Inbox },
  { id: "sent" as const, label: "صندوق الصادر", icon: Send },
  { id: "drafts" as const, label: "البريد المعدول", icon: FileEdit },
  { id: "trash" as const, label: "سلة المهملات", icon: Trash2 },
  { id: "archive" as const, label: "الأرشيف", icon: Archive },
];

const MailSidebar = ({ activeTab, onTabChange, onNewMail }: MailSidebarProps) => {
  return (
    <div className="w-48 bg-card border-l border-border p-4 space-y-4">
      <Button 
        onClick={onNewMail} 
        className="w-full gap-2 bg-primary hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" />
        رسالة جديدة
      </Button>

      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-right",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <tab.icon className="h-4 w-4 shrink-0" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MailSidebar;
