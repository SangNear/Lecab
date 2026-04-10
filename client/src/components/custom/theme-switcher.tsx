"use client";

import { THEMES, useTheme } from "@/components/theme-provider";
import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent-soft"
        title="Giao diện màu"
      >
        <Palette className="h-5 w-5" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 min-w-[200px] rounded-xl border border-border bg-card py-1 shadow-lg"
        >
          {THEMES.map((t) => (
            <li key={t.id} role="option" aria-selected={theme === t.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent-soft"
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
              >
                {t.label}
                {theme === t.id && (
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
