import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeId =
  | "elegant-justice"
  | "royal-purple"
  | "professional-legal"
  | "professional-blue"
  | "ocean-calm"
  | "forest-green"
  | "warm-sunset"
  | "lavender-dream"
  | "midnight-mode"
  | "royal-gold"
  | "crimson-red";

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  emoji?: string;
  swatch: [string, string]; // [primary preview, secondary preview] HSL strings
  // CSS variables (HSL values without hsl())
  vars: {
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    headerBg: string;
    headerForeground: string;
    sidebarBg: string;
    sidebarForeground: string;
    sidebarHover: string;
    sidebarActive: string;
    ring: string;
    foreground: string;
    background: string;
  };
}

export const THEMES: ThemeDefinition[] = [
  {
    id: "elegant-justice",
    name: "العدالة الأنيقة",
    emoji: "🌸",
    swatch: ["0 40% 55%", "0 35% 75%"],
    vars: {
      primary: "0 40% 40%",
      primaryForeground: "0 0% 100%",
      accent: "0 35% 55%",
      accentForeground: "0 0% 100%",
      headerBg: "0 40% 35%",
      headerForeground: "0 0% 100%",
      sidebarBg: "0 40% 35%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "0 40% 42%",
      sidebarActive: "0 40% 48%",
      ring: "0 40% 40%",
      foreground: "0 30% 20%",
      background: "0 0% 100%",
    },
  },
  {
    id: "royal-purple",
    name: "البنفسجي الملكي",
    emoji: "💜",
    swatch: ["270 35% 50%", "280 40% 75%"],
    vars: {
      primary: "270 40% 40%",
      primaryForeground: "0 0% 100%",
      accent: "280 40% 60%",
      accentForeground: "0 0% 100%",
      headerBg: "270 40% 30%",
      headerForeground: "0 0% 100%",
      sidebarBg: "270 40% 30%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "270 40% 38%",
      sidebarActive: "270 40% 44%",
      ring: "270 40% 40%",
      foreground: "270 30% 20%",
      background: "0 0% 100%",
    },
  },
  {
    id: "professional-legal",
    name: "القانوني المهني",
    swatch: ["220 30% 20%", "40 35% 55%"],
    vars: {
      primary: "220 35% 18%",
      primaryForeground: "0 0% 100%",
      accent: "40 40% 50%",
      accentForeground: "0 0% 100%",
      headerBg: "220 35% 14%",
      headerForeground: "0 0% 100%",
      sidebarBg: "220 35% 14%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "220 35% 22%",
      sidebarActive: "220 35% 28%",
      ring: "40 40% 50%",
      foreground: "220 30% 18%",
      background: "0 0% 100%",
    },
  },
  {
    id: "professional-blue",
    name: "الأزرق المهني",
    swatch: ["220 70% 25%", "45 85% 50%"],
    vars: {
      primary: "220 70% 25%",
      primaryForeground: "0 0% 100%",
      accent: "45 85% 50%",
      accentForeground: "220 50% 15%",
      headerBg: "220 70% 20%",
      headerForeground: "0 0% 100%",
      sidebarBg: "220 70% 20%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "220 70% 28%",
      sidebarActive: "220 70% 34%",
      ring: "45 85% 50%",
      foreground: "220 50% 18%",
      background: "0 0% 100%",
    },
  },
  {
    id: "ocean-calm",
    name: "هدوء المحيط",
    swatch: ["190 50% 40%", "165 55% 50%"],
    vars: {
      primary: "190 55% 35%",
      primaryForeground: "0 0% 100%",
      accent: "165 55% 45%",
      accentForeground: "0 0% 100%",
      headerBg: "190 55% 25%",
      headerForeground: "0 0% 100%",
      sidebarBg: "190 55% 25%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "190 55% 32%",
      sidebarActive: "190 55% 38%",
      ring: "190 55% 35%",
      foreground: "190 40% 18%",
      background: "0 0% 100%",
    },
  },
  {
    id: "forest-green",
    name: "أخضر الغابة",
    swatch: ["150 45% 30%", "95 55% 55%"],
    vars: {
      primary: "150 50% 28%",
      primaryForeground: "0 0% 100%",
      accent: "95 55% 50%",
      accentForeground: "150 50% 15%",
      headerBg: "150 50% 22%",
      headerForeground: "0 0% 100%",
      sidebarBg: "150 50% 22%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "150 50% 28%",
      sidebarActive: "150 50% 34%",
      ring: "150 50% 28%",
      foreground: "150 40% 18%",
      background: "0 0% 100%",
    },
  },
  {
    id: "warm-sunset",
    name: "غروب دافئ",
    swatch: ["20 75% 40%", "40 90% 55%"],
    vars: {
      primary: "20 75% 40%",
      primaryForeground: "0 0% 100%",
      accent: "40 90% 55%",
      accentForeground: "20 60% 20%",
      headerBg: "20 75% 32%",
      headerForeground: "0 0% 100%",
      sidebarBg: "20 75% 32%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "20 75% 38%",
      sidebarActive: "20 75% 44%",
      ring: "40 90% 55%",
      foreground: "20 60% 20%",
      background: "0 0% 100%",
    },
  },
  {
    id: "lavender-dream",
    name: "حلم اللافندر",
    swatch: ["280 60% 50%", "300 60% 70%"],
    vars: {
      primary: "280 60% 45%",
      primaryForeground: "0 0% 100%",
      accent: "300 60% 65%",
      accentForeground: "280 40% 18%",
      headerBg: "280 60% 35%",
      headerForeground: "0 0% 100%",
      sidebarBg: "280 60% 35%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "280 60% 42%",
      sidebarActive: "280 60% 48%",
      ring: "280 60% 45%",
      foreground: "280 40% 20%",
      background: "0 0% 100%",
    },
  },
  {
    id: "midnight-mode",
    name: "وضع منتصف الليل",
    swatch: ["230 45% 20%", "215 80% 55%"],
    vars: {
      primary: "230 50% 22%",
      primaryForeground: "0 0% 100%",
      accent: "215 85% 55%",
      accentForeground: "0 0% 100%",
      headerBg: "230 50% 16%",
      headerForeground: "0 0% 100%",
      sidebarBg: "230 50% 16%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "230 50% 24%",
      sidebarActive: "230 50% 30%",
      ring: "215 85% 55%",
      foreground: "230 40% 18%",
      background: "0 0% 100%",
    },
  },
  {
    id: "royal-gold",
    name: "الذهبي الملكي",
    swatch: ["35 80% 45%", "25 85% 55%"],
    vars: {
      primary: "35 80% 42%",
      primaryForeground: "0 0% 100%",
      accent: "25 85% 55%",
      accentForeground: "0 0% 100%",
      headerBg: "35 80% 32%",
      headerForeground: "0 0% 100%",
      sidebarBg: "35 80% 32%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "35 80% 38%",
      sidebarActive: "35 80% 44%",
      ring: "35 80% 42%",
      foreground: "35 60% 20%",
      background: "0 0% 100%",
    },
  },
  {
    id: "crimson-red",
    name: "الأحمر القرمزي",
    swatch: ["350 70% 40%", "0 80% 55%"],
    vars: {
      primary: "350 70% 40%",
      primaryForeground: "0 0% 100%",
      accent: "0 80% 55%",
      accentForeground: "0 0% 100%",
      headerBg: "350 70% 32%",
      headerForeground: "0 0% 100%",
      sidebarBg: "350 70% 32%",
      sidebarForeground: "0 0% 100%",
      sidebarHover: "350 70% 38%",
      sidebarActive: "350 70% 44%",
      ring: "350 70% 40%",
      foreground: "350 50% 20%",
      background: "0 0% 100%",
    },
  },
];

const STORAGE_KEY = "salasah-theme-v1";
const DEFAULT_THEME: ThemeId = "professional-blue";

interface ThemeContextValue {
  themeId: ThemeId;
  theme: ThemeDefinition;
  setTheme: (id: ThemeId) => void;
  themes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(theme: ThemeDefinition) {
  const root = document.documentElement;
  const v = theme.vars;
  root.style.setProperty("--primary", v.primary);
  root.style.setProperty("--primary-foreground", v.primaryForeground);
  root.style.setProperty("--accent", v.accent);
  root.style.setProperty("--accent-foreground", v.accentForeground);
  root.style.setProperty("--header-bg", v.headerBg);
  root.style.setProperty("--header-foreground", v.headerForeground);
  root.style.setProperty("--sidebar-bg", v.sidebarBg);
  root.style.setProperty("--sidebar-foreground", v.sidebarForeground);
  root.style.setProperty("--sidebar-hover", v.sidebarHover);
  root.style.setProperty("--sidebar-active", v.sidebarActive);
  root.style.setProperty("--ring", v.ring);
  root.style.setProperty("--foreground", v.foreground);
  root.style.setProperty("--card-foreground", v.foreground);
  root.style.setProperty("--popover-foreground", v.foreground);
  root.style.setProperty("--secondary-foreground", v.foreground);
  root.setAttribute("data-theme", theme.id);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && THEMES.find((t) => t.id === saved)) return saved;
    return DEFAULT_THEME;
  });

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[3];

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme.id);
    } catch {}
  }, [theme]);

  const setTheme = (id: ThemeId) => setThemeIdState(id);

  return (
    <ThemeContext.Provider value={{ themeId, theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
