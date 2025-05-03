import React, { useEffect, useState } from "react";
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

/**
 * CardStatisticsOrder Component
 * Displays statistics for orders with animated counter and proper dark mode support.
 */
const CardStatisticsOrder: React.FC<CardStatisticsOrderProps> = ({
  title,
  value,
  amount,
  percent,
  mouvement,
  bgColor,
  period,
}) => {
  const [countValue, setCountValue] = useState(0);
  const [countAmount, setCountAmount] = useState(0);

  // Reset counts when inputs change (e.g., when period changes)
  useEffect(() => {
    setCountValue(0);
    setCountAmount(0);
  }, [value, amount]);

  // Animate count for value and amount
  useEffect(() => {
    // Animate value
    if (value > 0) {
      let startValue = 0;
      const stepValue = Math.max(1, Math.floor(value / 20));
      const timerValue = setInterval(() => {
        startValue += stepValue;
        if (startValue > value) {
          setCountValue(value);
          clearInterval(timerValue);
        } else {
          setCountValue(startValue);
        }
      }, 50);

      // Animate amount
      let startAmount = 0;
      const stepAmount = Math.max(1, Math.floor(amount / 20));
      const timerAmount = setInterval(() => {
        startAmount += stepAmount;
        if (startAmount > amount) {
          setCountAmount(amount);
          clearInterval(timerAmount);
        } else {
          setCountAmount(startAmount);
        }
      }, 50);

      return () => {
        clearInterval(timerValue);
        clearInterval(timerAmount);
      };
    }
  }, [value, amount]);

  // Always use positive percentage value for display
  const displayPercent = Math.abs(percent);

  return (
    <div
      className={`relative w-full rounded-lg shadow-lg p-6 flex flex-col items-center justify-center ${bgColor} text-white hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="absolute top-2 right-2">
        <Ellipsis size={20} className="text-white opacity-50" />
      </div>
      <div className="text-center">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-4xl font-extrabold mt-2">{countValue}</p>
        <p className="text-sm font-medium mt-1">
          Amount: ${countAmount.toLocaleString()}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span
            className={`text-sm font-semibold ${
              mouvement === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {mouvement === "up" ? "▲" : "▼"} {displayPercent.toFixed(2)}%
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
