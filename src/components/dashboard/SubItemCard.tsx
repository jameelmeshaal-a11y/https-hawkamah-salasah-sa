import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SubItemCardProps {
  title: string;
  icon: LucideIcon;
  moduleId: string;
  slug?: string;
  onClick?: () => void;
}

const SubItemCard = ({ title, icon: Icon, moduleId, slug, onClick }: SubItemCardProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-card border border-border rounded-lg shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 min-h-[100px] group cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-sm text-foreground text-center leading-tight font-medium">
        {title}
      </span>
    </div>
  );

  // If slug exists, use Link for navigation
  if (slug) {
    return (
      <Link to={`/module/${moduleId}/${slug}`} className="block">
        {content}
      </Link>
    );
  }

  // Otherwise use button with onClick
  return (
    <button onClick={onClick} className="w-full text-right">
      {content}
    </button>
  );
};

export default SubItemCard;
