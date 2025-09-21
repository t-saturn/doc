"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Script from "next/script";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // Carga inicial respetando localStorage o prefers-color-scheme
  useEffect(() => {
    const ls = ((): Theme | null => {
      try {
        return (localStorage.getItem("theme") as Theme) ?? null;
      } catch {
        return null;
      }
    })();

    const initial = ls ?? (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(initial);
  }, []);

  // Sincroniza la clase 'dark' y persiste en localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      isDark: theme === "dark",
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      setTheme,
    }),
    [theme]
  );

  // Script inline que corre antes de hidratar (Next lo coloca en <head>)
  const inline = `
(function() {
  try {
    var ls = localStorage.getItem('theme');
    var theme = ls ? ls : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`.trim();

  return (
    <>
      <Script id="theme-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: inline }} />
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
}
