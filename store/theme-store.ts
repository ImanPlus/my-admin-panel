import { create } from "zustand";
import Cookies from "js-cookie";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  // Initial Value
  theme: (Cookies.get("theme") as Theme) || "light",

  setTheme: (theme: Theme) => {
    Cookies.set("theme", theme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    get().setTheme(newTheme);
  },
}));
