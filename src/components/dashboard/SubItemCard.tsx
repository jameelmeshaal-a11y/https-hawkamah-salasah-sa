import type { LucideIcon } from "lucide-react";

interface SubItemCardProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const SubItemCard = ({ title, icon: Icon, onClick }: SubItemCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 bg-card border border-border rounded-lg shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 min-h-[100px] group"
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-sm text-foreground text-center leading-tight font-medium">
        {title}
      </span>
    </button>
  );
};

export default SubItemCard;
