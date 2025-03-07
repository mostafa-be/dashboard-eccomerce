import { ChevronDown } from "lucide-react";
import React from "react";
import Select, { components } from "react-select";

type MultiSelectProps = {
  values: string[];
  onChange: (values: string[]) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  values,
  onChange,
  options,
  placeholder,
}) => {
  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    onChange(selectedValues);
  };

  const selectedOptions = options.filter((option) =>
    values.includes(option.value)
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      borderRadius: "0.375rem",
      backgroundColor: "transparent",
      "&:hover": {
        borderColor: "#3b82f6",
      },
      ".dark &": {
        backgroundColor: "transparent",
        borderColor: state.isFocused ? "#3b82f6" : "#374151",
        "&:hover": {
          borderColor: "#3b82f6",
        },
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff",
      ".dark &": {
        backgroundColor: "#1f2937",
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: "#e5e7eb",
      borderRadius: "0.375rem",
      ".dark &": {
        backgroundColor: "#374151",
      },
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: "#374151",
      ".dark &": {
        color: "#d1d5db",
      },
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: "#6b7280",
      "&:hover": {
        backgroundColor: "#d1d5db",
        color: "#374151",
      },
      ".dark &": {
        color: "#9ca3af",
        "&:hover": {
          backgroundColor: "#4b5563",
          color: "#d1d5db",
        },
      },
    }),
  };

  const customComponents = {
    DropdownIndicator: (props) => (
      <components.DropdownIndicator {...props}>
        <ChevronDown size={15} className="text-gray-500 dark:text-gray-300" />
      </components.DropdownIndicator>
    ),
    ClearIndicator: (props) => (
      <components.ClearIndicator {...props}>
        <span className="text-gray-500 dark:text-gray-300">✖</span>
      </components.ClearIndicator>
    ),
  };

  return (
    <Select
      isMulti
      value={selectedOptions}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      className="w-full"
      styles={customStyles}
      components={customComponents}
      classNamePrefix="react-select"
    />
  );
};

export default MultiSelect;
