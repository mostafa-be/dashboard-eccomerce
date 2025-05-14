import React, { useState } from "react";
import { US, FR, ES, DE, SA } from "country-flag-icons/react/3x2";

/**
 * Languages Component
 * Renders a dropdown for language selection with country flag icons and a modern design.
 *
 * @returns {JSX.Element} The language selector dropdown.
 */
const LANGUAGES = [
  { code: "en", label: "English", Flag: US },
  { code: "fr", label: "Français", Flag: FR },
  { code: "es", label: "Español", Flag: ES },
  { code: "de", label: "Deutsch", Flag: DE },
  { code: "ar", label: "العربية", Flag: SA },
  // Add more languages as needed
];

const Languages = () => {
  const [selected, setSelected] = useState(LANGUAGES[0].code);
  const [open, setOpen] = useState(false);

  const selectedLang = LANGUAGES.find((lang) => lang.code === selected);

  /**
   * Handles language selection.
   * @param {string} code - The selected language code.
   */
  const handleSelect = (code: string) => {
    setSelected(code);
    setOpen(false);
    // Implement your language change logic here (e.g., router push, i18n, etc.)
  };

  return (
    <div className="relative max-md:hidden">
      <button
        type="button"
        className="flex items-center justify-between w-7 h-7 bg-transparent rounded-full transition"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedLang?.Flag && (
          <selectedLang.Flag className=" w-full h-full rounded-full object-cover" />
        )}
      </button>
      {open && (
        <ul
          className="absolute z-10 mt-2 w-40 bg-white dark:bg-black-100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1"
          role="listbox"
          aria-label="Select language"
        >
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition ${
                selected === lang.code
                  ? "bg-blue-100 dark:bg-blue-800 font-semibold"
                  : ""
              }`}
              onClick={() => handleSelect(lang.code)}
              role="option"
              aria-selected={selected === lang.code}
            >
              {lang.Flag && (
                <lang.Flag className="w-6 h-6 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
              )}
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Languages;
