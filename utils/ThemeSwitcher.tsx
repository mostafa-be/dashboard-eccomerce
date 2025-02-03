"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <div className=" hidden md:flex select-none items-center justify-center ">
      {theme === "light" ? (
        <Moon
          className="cursor-pointer "
          color="#009ef9"
          size={20}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <Sun
          className="cursor-pointer "
          color="#0561FC"
          size={20}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
