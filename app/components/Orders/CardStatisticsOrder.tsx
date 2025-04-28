import React from "react";
import { Ellipsis } from "lucide-react";

interface CardStatisticsOrderProps {
  title: string;
  value: number;
  amount: number;
  percent: number;
  mouvement: string;
  bgColor: string;
  period: string;
}

const CardStatisticsOrder: React.FC<CardStatisticsOrderProps> = ({
  title,
  value,
  amount,
  percent,
  mouvement,
  bgColor,
  period,
}) => {
  return (
    <div
      className={`relative w-full rounded-lg shadow-lg p-6 flex flex-col items-center justify-center ${bgColor} text-white hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="absolute top-2 right-2">
        <Ellipsis size={20} className="text-white opacity-50" />
      </div>
      <div className="text-center">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-4xl font-extrabold mt-2">{value}</p>
        <p className="text-sm font-medium mt-1">
          Amount: ${amount.toLocaleString()}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span
            className={`text-sm font-semibold ${
              mouvement === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {mouvement === "up" ? "▲" : "▼"} {Math.abs(percent).toFixed(2)}%
          </span>
          <span className="text-sm text-gray-200">
            vs{" "}
            {period === "7d"
              ? "Last 7 Days"
              : period === "1m"
              ? "Last 30 Days"
              : "Last Year"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardStatisticsOrder;
