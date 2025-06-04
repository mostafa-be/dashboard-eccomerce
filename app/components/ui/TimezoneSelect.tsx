"use client";
import { TIMEZONES } from "@/data/TIMEZONES";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// Enhanced Select component for Timezone selection
export const TimezoneSelect = ({
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

  // Filter timezones based on search term
  const filteredTimezones = TIMEZONES.filter(
    (tz) =>
      tz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tz.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group timezones by region for better organization
  const groupedTimezones = filteredTimezones.reduce(
    (acc: Record<string, typeof TIMEZONES>, timezone) => {
      // Extract region from timezone ID (e.g., "America/New_York" -> "America")
      const region = timezone.id.split("/")[0] || "Other";
      if (!acc[region]) {
        acc[region] = [];
      }
      acc[region].push(timezone);
      return acc;
    },
    {}
  );

  // Sort regions alphabetically
  const sortedRegions = Object.keys(groupedTimezones).sort();

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

  // Get selected timezone details
  const selectedTimezone = TIMEZONES.find((tz) => tz.id === value);

  // Get current date in the selected timezone
  const getCurrentTime = (timezoneId: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      };
      return new Date().toLocaleTimeString("en-US", {
        ...options,
        timeZone: timezoneId,
      });
    } catch {
      return "";
    }
  };

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
          {selectedTimezone ? (
            <div className="flex flex-col">
              <span className="text-sm">{selectedTimezone.name}</span>
              <span className="text-xs text-gray-500">
                {getCurrentTime(selectedTimezone.id)}
              </span>
            </div>
          ) : (
            <span className="text-gray-500">Select a timezone</span>
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
        aria-label="Timezone"
      >
        {TIMEZONES.map((timezone) => (
          <option key={timezone.id} value={timezone.id}>
            {timezone.name}
          </option>
        ))}
      </select>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Search box */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                ref={inputRef}
                type="text"
                className="w-full p-2 pl-9 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search timezones..."
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

          {/* Results list grouped by region */}
          <div>
            {filteredTimezones.length > 0 ? (
              sortedRegions.map((region) => (
                <div key={region} className="py-1">
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">
                    {region}
                  </div>
                  {groupedTimezones[region].map((timezone) => (
                    <div
                      key={timezone.id}
                      className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        value === timezone.id
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                      onClick={() => {
                        onChange(timezone.id);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{timezone.name}</span>
                        <span className="text-xs text-gray-500">
                          {timezone.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {getCurrentTime(timezone.id)}
                        </span>
                        {value === timezone.id && (
                          <Check className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No timezones found
              </div>
            )}
          </div>
        </div>
      )}

      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
