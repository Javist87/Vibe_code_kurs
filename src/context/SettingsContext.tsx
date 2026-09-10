"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  AppSettings,
  AppTheme,
  getServerSettingsSnapshot,
  getSettingsSnapshot,
  subscribeSettings,
  writeSettings,
} from "@/lib/settings";

interface SettingsContextValue {
  settings: AppSettings;
  setTheme: (theme: AppTheme) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const settings = useSyncExternalStore(
    subscribeSettings,
    getSettingsSnapshot,
    getServerSettingsSnapshot
  );

  const setTheme = useCallback((theme: AppTheme) => {
    writeSettings({ theme });
  }, []);

  const value = useMemo(() => ({ settings, setTheme }), [settings, setTheme]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings må brukes inne i SettingsProvider");
  return ctx;
}
