"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "./select";

// Language flag icons
const languageFlags: Record<string, string> = {
  en: "🇺🇸", // English
  fr: "🇫🇷", // French
  ar: "🇸🇦", // Arabic
  de: "🇩🇪", // German
  es: "🇪🇸", // Spanish
  it: "🇮🇹", // Italian
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("language");

  // Handle language change
  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return;

    // Get the current pathname without the locale
    const segments = pathname?.split("/") || [];
    segments[1] = newLocale; // Replace the locale part

    // Navigate to the same page with the new locale
    const newPath = segments.join("/") || `/${newLocale}`;
    router.push(newPath);
  };

  // Available languages grouped by regions
  const languageGroups = {
    European: [
      { code: "en", name: t("en") },
      { code: "fr", name: t("fr") },
      { code: "de", name: t("de") },
      { code: "it", name: t("it") },
      { code: "es", name: t("es") },
    ],
    "Middle East": [{ code: "ar", name: t("ar") }],
  };

  return (
    <Select value={locale} onValueChange={changeLanguage}>
      <SelectTrigger className="w-[130px] flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md border-gray-200 dark:border-gray-700">
        <Globe
          className="h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
        />
        <SelectValue placeholder="Language">
          <span className="flex items-center gap-2 font-medium">
            <span>{languageFlags[locale]}</span>
            <span className="hidden sm:inline-block">
              {t(locale as keyof typeof t)}
            </span>
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="min-w-[160px]">
        {Object.entries(languageGroups).map(([region, languages]) => (
          <SelectGroup key={region}>
            <SelectLabel>{region}</SelectLabel>
            {languages.map((language) => (
              <SelectItem
                key={language.code}
                value={language.code}
                className="flex items-center gap-3"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">
                    {languageFlags[language.code]}
                  </span>
                  <span>{language.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
