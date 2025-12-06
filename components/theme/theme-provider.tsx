"use client";

import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { darkMode, lightMode } from "@/theme.config";
import { useThemeStore } from "@/store/theme-store";

export default function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: string;
}) {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    if (initialTheme) {
      setTheme(initialTheme as "light" | "dark");
    }
  }, [initialTheme, setTheme]);

   useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ConfigProvider theme={theme === "light" ? lightMode : darkMode}>
      {children}
    </ConfigProvider>
  );
}
