"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/app/components/ui/switch";

/**
 * ThemeSwitcher Component
 * Provides a modern, perfectly designed toggle switch with smooth animation for switching between light and dark themes.
 *
 * @returns {JSX.Element} The rendered theme switcher component.
 */
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`transition-colors duration-300 ${
          theme === "light" ? "text-yellow-500" : "text-gray-400"
        }`}
        size={18}
      />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`${
          theme === "light"
            ? "data-[state=checked]:bg-blue-650/20"
            : "data-[state=checked]:bg-blue-650 data-[state=unchecked]:bg-gray-300"
        }`}
      />
      <Moon
        className={`transition-colors duration-300 ${
          theme === "dark" ? "text-blue-500" : "text-gray-400"
        }`}
        size={18}
      />
    </div>
  );
};

export default ThemeSwitcher;
