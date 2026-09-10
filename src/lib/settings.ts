export type AppTheme = "playful" | "serious";

export interface AppSettings {
  theme: AppTheme;
}

const STORAGE_KEY = "vibekurs.settings";
const DEFAULT_SETTINGS: AppSettings = { theme: "playful" };

type Listener = () => void;
const listeners = new Set<Listener>();

/** undefined = ikke lest fra localStorage i denne sesjonen ennå. */
let cache: AppSettings | undefined;

function readFromLocalStorage(): AppSettings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return {
      theme: parsed.theme === "serious" ? "serious" : "playful",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function applyThemeAttribute(theme: AppTheme): void {
  document.documentElement.setAttribute("data-theme", theme);
}

export function subscribeSettings(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Brukes av useSyncExternalStore på klienten. */
export function getSettingsSnapshot(): AppSettings {
  if (cache === undefined) {
    cache = readFromLocalStorage();
  }
  return cache;
}

/** Brukes av useSyncExternalStore ved server-rendering/hydrering. */
export function getServerSettingsSnapshot(): AppSettings {
  return DEFAULT_SETTINGS;
}

export function writeSettings(settings: AppSettings): void {
  cache = settings;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  applyThemeAttribute(settings.theme);
  notify();
}

/** Inline-skript som settes rått i <head> for å unngå fargeglimt (FOUC) før React har hydrert. */
export const THEME_INIT_SCRIPT = `
try {
  var raw = window.localStorage.getItem("${STORAGE_KEY}");
  var theme = raw ? JSON.parse(raw).theme : "playful";
  document.documentElement.setAttribute("data-theme", theme === "serious" ? "serious" : "playful");
} catch (e) {}
`;
