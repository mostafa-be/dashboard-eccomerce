import React from "react";
import { Ellipsis } from "lucide-react";

interface CardStatisticsOrderProps {
  title: string;
  value: number;
  currency: string;
  period: string;
  percent: number;
  mouvement: string;
}

const CardStatisticsOrder: React.FC<CardStatisticsOrderProps> = ({
  title,
  value,
  currency,
  period,
  percent,
  mouvement,
}) => {
  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        notation: "compact",
        compactDisplay: "short",
      }).format(value);
    } else if (value >= 1000) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        notation: "compact",
        compactDisplay: "short",
      }).format(value);
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(value);
    }
  };

  return (
    <div className="bg-white/85 z-0 select-none dark:bg-black-100/70 shadow rounded-lg p-4 flex flex-col gap-2 cursor-pointer hover:scale-105 transition-all">
      <div className="w-full flex items-center justify-between">
        <p className="text-[16px] text-gray-700/70 dark:text-white capitalize">
          {title}
        </p>
        <Ellipsis
          size={15}
          className="text-sm text-gray-700/70 dark:text-white cursor-no-drop"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatNumber(value)}
        </p>
        <div className="flex flex-wrap items-center  gap-2">
          <p
            className={`text-sm font-semibold ${
              mouvement === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {mouvement === "up" ? "▲" : "▼"} {percent}%
          </p>
          <p className="text-sm text-nowrap  text-gray-500 dark:text-gray-400">
            vs{" "}
            {(period === "weekly" && "Last 7 Days") ||
              (period === "monthly" && "Last 30 Days") ||
              (period === "yearly" && "Last 365 Days")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardStatisticsOrder;
