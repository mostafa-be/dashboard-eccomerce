"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select";

type PeriodSelectorProps = {
  period: string;
  onChange: (value: string) => void;
};

const PeriodSelector = ({ period, onChange }: PeriodSelectorProps) => {
  const timePeriods = [
    { label: "Last 7 Days", value: "7d" },
    { label: "Last 1 Month", value: "1m" },
    { label: "Last 1 Year", value: "1y" },
  ];

  return (
    <div className="w-32">
      <Select value={period} onValueChange={onChange}>
        <SelectTrigger className="h-[40px] bg-white dark:bg-black-100 border">
          <SelectValue placeholder="Select Period" />
        </SelectTrigger>
        <SelectContent className="dark:bg-black-100">
          {timePeriods.map((time) => (
            <SelectItem className="py-2" key={time.value} value={time.value}>
              {time.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PeriodSelector;
