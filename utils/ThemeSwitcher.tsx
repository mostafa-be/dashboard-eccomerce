"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex items-center justify-center  bg-zinc-200 p-2 rounded-full">
      {theme === "light" ? (
        <Moon
          className="cursor-pointer"
          fill="black"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <Sun
          className="cursor-pointer text-[#fcd34d]"
          size={25}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
