"use client";

import { createContext, useContext, useMemo, useState } from "react";

type UIState = {
  isAdmin: boolean;
  toggleAdmin: () => void;

  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const UIStateContext = createContext<UIState | null>(null);

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const value = useMemo<UIState>(
    () => ({
      isAdmin,
      toggleAdmin: () => setIsAdmin((v) => !v),

      isSidebarOpen,
      toggleSidebar: () => setIsSidebarOpen((v) => !v),
      openSidebar: () => setIsSidebarOpen(true),
      closeSidebar: () => setIsSidebarOpen(false),
    }),
    [isAdmin, isSidebarOpen]
  );

  return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>;
}

export function useUIState() {
  const ctx = useContext(UIStateContext);
  if (!ctx) throw new Error("useUIState debe usarse dentro de <UIStateProvider>");
  return ctx;
}
