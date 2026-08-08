import { create } from "zustand";

interface ThemeStore {
  theme: string | "light" | "dark";
  isDark: boolean;
  loadTheme: () => void;
  themeToggle: () => void;
}

const STORAGE_KEY = {
  THEME: "theme",
  ISDARK: "isDark",
};

const getStoredTheme = (): string => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem(STORAGE_KEY.THEME) || "light";
};

export const useTheme = create<ThemeStore>()((set, get) => ({
  theme: getStoredTheme(),
  isDark: getStoredTheme() === "dark",

  loadTheme: () => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(get().theme);
    localStorage.setItem(STORAGE_KEY.THEME, get().theme);
    localStorage.setItem(STORAGE_KEY.ISDARK, String(get().isDark));
  },

  themeToggle: () => {
    const newTheme = get().theme === "dark" ? "light" : "dark";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
    set({ theme: newTheme, isDark: newTheme === "dark" });
    localStorage.setItem(STORAGE_KEY.THEME, newTheme);
    localStorage.setItem(STORAGE_KEY.ISDARK, String(get().isDark));
  },
}));
