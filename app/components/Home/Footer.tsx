"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const t = useTranslations("common");

  // Avoid hydration mismatch by only rendering theme controls after mount
  useEffect(() => setMounted(true), []);

  // Update meta theme-color when theme changes
  useEffect(() => {
    if (!mounted) return;

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      // Set theme color based on current theme
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#111827" : "#FFFFFF"
      );
    }
  }, [theme, mounted]);

  // Handle theme change
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsThemeDropdownOpen(false);
  };

  return (
    <footer className="py-4 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Nextora. {t("allRightsReserved")}
          </p>

          {/* Theme and Language controls */}
          <div className="flex items-center gap-3">
            {mounted && (
              <>
                {/* Mode Selector (Light/Dark/System) */}
                <div className="relative">
                  <button
                    onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                    className="flex items-center gap-1 rounded-md bg-gray-100 dark:bg-gray-800 px-2.5 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Change theme"
                  >
                    {theme === "light" && <Sun size={16} />}
                    {theme === "dark" && <Moon size={16} />}
                    {theme === "system" && <Monitor size={16} />}
                    <span className="hidden sm:inline-block ml-1">
                      {theme === "light"
                        ? "Light"
                        : theme === "dark"
                        ? "Dark"
                        : "System"}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        isThemeDropdownOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isThemeDropdownOpen && (
                    <div className="absolute bottom-full mb-2 right-0 w-36 rounded-md bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                      <button
                        onClick={() => handleThemeChange("light")}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center">
                          <Sun size={14} className="mr-2" />
                          Light
                        </div>
                        {theme === "light" && (
                          <Check size={14} className="text-blue-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handleThemeChange("dark")}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center">
                          <Moon size={14} className="mr-2" />
                          Dark
                        </div>
                        {theme === "dark" && (
                          <Check size={14} className="text-blue-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handleThemeChange("system")}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center">
                          <Monitor size={14} className="mr-2" />
                          System
                        </div>
                        {theme === "system" && (
                          <Check size={14} className="text-blue-600" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Language Selector */}
                <LanguageSwitcher />
              </>
            )}
          </div>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              {t("termsOfService")}
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              {t("privacyPolicy")}
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              {t("contactUs")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
