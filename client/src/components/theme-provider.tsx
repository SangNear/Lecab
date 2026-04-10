"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const THEMES = [
  { id: "violet-light", label: "Tím · Sáng" },
  { id: "violet-dark", label: "Tím · Tối" },
  { id: "pink-light", label: "Hồng · Sáng" },
  { id: "pink-dark", label: "Hồng · Tối" },
  { id: "blue-light", label: "Xanh · Sáng" },
  { id: "blue-dark", label: "Xanh · Tối" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "vocab-ui-theme";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("violet-light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const next = isThemeId(stored) ? stored : "violet-light";
    document.documentElement.setAttribute("data-theme", next);
    setThemeState(next);
  }, []);

  const setTheme = (id: ThemeId) => {
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem(STORAGE_KEY, id);
    setThemeState(id);
  };

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
