"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type UIState = {
  isAdmin: boolean;
  toggleAdmin: () => void;
  setAdmin: (value: boolean) => void;

  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const UIStateContext = createContext<UIState | null>(null);

export const UIStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ui:isAdmin");
      if (saved != null) setIsAdmin(saved === "true");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ui:isAdmin", String(isAdmin));
    } catch {}
  }, [isAdmin]);

  const value = useMemo<UIState>(
    () => ({
      isAdmin,
      toggleAdmin: () => setIsAdmin((v) => !v),
      setAdmin: (v: boolean) => setIsAdmin(v),

      isSidebarOpen,
      toggleSidebar: () => setIsSidebarOpen((v) => !v),
      openSidebar: () => setIsSidebarOpen(true),
      closeSidebar: () => setIsSidebarOpen(false),
    }),
    [isAdmin, isSidebarOpen]
  );

  return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>;
};

export const useUIState = () => {
  const ctx = useContext(UIStateContext);
  if (!ctx) throw new Error("useUIState debe usarse dentro de <UIStateProvider>");
  return ctx;
};
