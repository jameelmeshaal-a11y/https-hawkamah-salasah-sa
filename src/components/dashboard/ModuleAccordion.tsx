import { ChevronDown, LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ModuleSubItem {
  label: string;
  href?: string;
}

interface ModuleAccordionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  subItems: ModuleSubItem[];
  value: string;
}

const ModuleAccordion = ({
  icon: Icon,
  title,
  description,
  subItems,
  value,
}: ModuleAccordionProps) => {
  return (
    <AccordionItem value={value} className="border border-accordion-border rounded-lg mb-3 overflow-hidden">
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accordion-header/50 transition-colors">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="text-right flex-1">
            <div className="font-semibold text-foreground text-sm">{title}</div>
            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {description}
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2">
        <div className="flex flex-wrap gap-2">
          {subItems.map((item, index) => (
            <a
              key={index}
              href={item.href || "#"}
              className="text-xs text-primary hover:text-primary/80 hover:underline px-2 py-1 bg-primary/5 rounded-md transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ModuleAccordion;
