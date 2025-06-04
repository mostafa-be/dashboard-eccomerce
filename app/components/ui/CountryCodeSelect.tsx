"use client";

import React, { useState, useEffect } from "react";
import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { COUNTRY_CODES } from "../../../data/COUNTRY_CODES";

// Type definitions
interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  id?: string;
  label?: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

interface CountryData {
  code: string;
  country: string;
  name: string;
  FlagComponent: React.ComponentType<{ className?: string }>;
}

/**
 * CountryCodeSelect Component
 *
 * A dropdown component for selecting country calling codes with flag icons
 */
const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  value,
  onChange,
  name = "countryCode",
  id,
  label = "Country Code",
  error,
  touched,
  disabled = false,
  className = "",
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<CountryData | undefined>(
    COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(COUNTRY_CODES);
  const uniqueId = useId();
  const selectId = id || `country-select-${uniqueId}`;

  // Update current country when value changes externally
  useEffect(() => {
    const country = COUNTRY_CODES.find((c) => c.code === value);
    if (country) {
      setCurrentCountry(country);
    }
  }, [value]);

  // Filter countries based on search term
  useEffect(() => {
    const filtered = COUNTRY_CODES.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.includes(searchTerm) ||
        country.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm]);

  // Handle country selection
  const handleSelectCountry = (country: CountryData) => {
    setCurrentCountry(country);
    onChange(country.code);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`#${selectId}-container`)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, selectId]);

  // Get flag component
  const Flag = currentCountry?.FlagComponent;

  return (
    <div className={`relative ${className}`} id={`${selectId}-container`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <button
        type="button"
      id={selectId}
        aria-haspopup="listbox"
        aria-expanded={isOpen ? "true" : "false"}
        aria-labelledby={`${selectId}-label`}
        className={`flex items-center h-[45px] w-full appearance-none rounded-lg pl-3 pr-8 py-2 border transition-colors ${
          error && touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer relative focus:outline-none focus:ring-2`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {Flag && <Flag className="h-4 w-6 object-cover rounded-sm" />}
          <span className="truncate">{currentCountry?.code}</span>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              placeholder="Search by country or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-56 overflow-auto py-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const CountryFlag = country.FlagComponent;
                return (
                  <div
                    key={`${country.country}-${country.code}`}
                    className={`px-3 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                      currentCountry?.code === country.code
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                    onClick={() => handleSelectCountry(country)}
                    role="option"
                    aria-selected={currentCountry?.code === country.code}
                  >
                    <CountryFlag className="h-4 w-6 mr-2" />
                    <span className="font-medium mr-2">{country.code}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm truncate">
                      {country.name}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}

      {error && touched && (
        <div className="text-sm text-red-500 mt-1">{error}</div>
      )}

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={currentCountry?.code || ""}
        aria-hidden="true"
      />
    </div>
  );
};

export default CountryCodeSelect;
