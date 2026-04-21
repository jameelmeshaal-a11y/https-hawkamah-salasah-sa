import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const ThemeSwitcher = () => {
  const { themes, themeId, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-header-foreground hover:bg-sidebar-hover"
          aria-label="اختيار المظهر"
          title="اختيار المظهر"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0" sideOffset={8}>
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm">🎨</span>
          <h3 className="text-sm font-bold text-foreground">اختيار المظهر</h3>
        </div>
        <div className="max-h-[420px] overflow-y-auto py-1">
          {themes.map((t) => {
            const isActive = t.id === themeId;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-right hover:bg-muted transition-colors",
                  isActive && "bg-muted/60"
                )}
              >
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <span className="text-sm font-medium text-foreground">
                    {t.name}
                  </span>
                  {t.emoji && <span className="text-base">{t.emoji}</span>}
                </div>
                <div className="flex items-center gap-2">
                  {isActive && (
                    <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                  )}
                  <span
                    className="w-5 h-5 rounded-full border border-border/50 shadow-sm"
                    style={{ backgroundColor: `hsl(${t.swatch[1]})` }}
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-border/50 shadow-sm"
                    style={{ backgroundColor: `hsl(${t.swatch[0]})` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;
