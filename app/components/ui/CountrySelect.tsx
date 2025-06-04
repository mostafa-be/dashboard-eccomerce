"use client";
import { COUNTRIES } from "@/data/COUNTRIES";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// Enhanced Select component for Country selection
export const CountrySelect = ({
  value,
  onChange,
  error,
  touched,
  name,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
  name: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search term
  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get selected country details
  const selectedCountry = COUNTRIES.find((c) => c.code === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          }
        }}
        className={`flex items-center justify-between cursor-pointer p-2 border rounded-md ${
          error && touched
            ? "border-red-500 focus-within:ring-red-500"
            : "border-gray-300 dark:border-gray-600 focus-within:border-blue-500 focus-within:ring-blue-500"
        } dark:bg-gray-900 dark:text-white bg-white text-gray-900`}
      >
        <div className="flex items-center gap-2">
          {selectedCountry ? (
            <>
              <span className="text-xl">{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
            </>
          ) : (
            <span className="text-gray-500">Select a country</span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>

      {/* Hidden native select for form submission */}
      <select
        className="sr-only"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Country"
      >
        <option value="">Select a country</option>
        {COUNTRIES.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                ref={inputRef}
                type="text"
                className="w-full p-2 pl-9 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchTerm("");
                  }}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="py-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    value === country.code
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : ""
                  }`}
                  onClick={() => {
                    onChange(country.code);
                    setIsOpen(false);
                  }}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="flex-1">{country.name}</span>
                  {value === country.code && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}

      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};