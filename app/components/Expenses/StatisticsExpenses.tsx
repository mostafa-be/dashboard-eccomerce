import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

type StatisticsExpensesProps = {
  period: string;
  analytics: {
    byCategory: {
      category: string;
      totalAmount: number;
      count: number;
      amountPercentageChange: number;
    }[];
    byDepartment: {
      department: string;
      totalAmount: number;
      count: number;
    }[];
    byStatus: { status: string; totalAmount: number; count: number }[];
  };
};

/**
 * StatisticsExpenses Component
 * Displays analytics for expenses grouped by category, department, and status.
 *
 * @param {StatisticsExpensesProps} props - The props for the component.
 * @param {object} props.analytics - The analytics data.
 * @param {string} props.period - The selected period for analytics.
 */
const StatisticsExpenses = ({ analytics, period }: StatisticsExpensesProps) => {
  const { byCategory, byDepartment, byStatus } = analytics;

  const bgColors = [
    "bg-gradient-to-r from-blue-500 to-blue-700",
    "bg-gradient-to-r from-green-500 to-green-700",
    "bg-gradient-to-r from-yellow-500 to-yellow-700",
    "bg-gradient-to-r from-red-500 to-red-700",
    "bg-gradient-to-r from-purple-500 to-purple-700",
    "bg-gradient-to-r from-gray-500 to-gray-700",
  ];

  const formatPeriod = (period: string) => {
    switch (period) {
      case "7d":
        return "Last 7 Days";
      case "1m":
        return "Last 30 Days";
      case "1y":
        return "Last Year";
      default:
        return "Custom Period";
    }
  };

  return (
    <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* By Category */}
      {byCategory &&
        byCategory.map((item, index) => (
          <div
            key={index}
            className={`relative w-full rounded-lg shadow-lg p-6 flex flex-col items-center justify-center ${
              bgColors[index % bgColors.length]
            } text-white hover:shadow-xl transition-shadow duration-300 transform hover:scale-105`}
          >
            <h4 className="text-lg font-semibold mb-2">
              Category: {item.category}
            </h4>
            <p className="text-3xl font-extrabold">
              ${item.totalAmount.toFixed(2)}
            </p>
            <p className="text-sm mt-1">Transactions: {item.count}</p>
            <div className="flex items-center gap-2 mt-1">
              {item.amountPercentageChange >= 0 ? (
                <ArrowUp className="text-green-400" size={16} />
              ) : (
                <ArrowDown className="text-red-400" size={16} />
              )}
              <span
                className={`font-semibold ${
                  item.amountPercentageChange >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {item.amountPercentageChange.toFixed(2)}%
              </span>
              <span className="text-xs">
                {item.amountPercentageChange >= 0 ? "▲" : "▼"}
              </span>
            </div>
            <p className="text-xs mt-2 opacity-80">{formatPeriod(period)}</p>
          </div>
        ))}

      {/* By Department */}
      {byDepartment &&
        byDepartment.map((item, index) => (
          <div
            key={index}
            className={`relative w-full rounded-lg shadow-lg p-6 flex flex-col items-center justify-center ${
              bgColors[index % bgColors.length]
            } text-white hover:shadow-xl transition-shadow duration-300 transform hover:scale-105`}
          >
            <h4 className="text-lg font-semibold mb-2">
              Department: {item.department}
            </h4>
            <p className="text-3xl font-extrabold">
              ${item.totalAmount.toFixed(2)}
            </p>
            <p className="text-sm mt-1">Transactions: {item.count}</p>
            <p className="text-xs mt-2 opacity-80">{formatPeriod(period)}</p>
          </div>
        ))}

      {/* By Status */}
      {byStatus &&
        byStatus.map((item, index) => (
          <div
            key={index}
            className={`relative w-full rounded-lg shadow-lg p-6 flex flex-col items-center justify-center ${
              bgColors[index % bgColors.length]
            } text-white hover:shadow-xl transition-shadow duration-300 transform hover:scale-105`}
          >
            <h4 className="text-lg font-semibold mb-2">
              Status: {item.status}
            </h4>
            <p className="text-3xl font-extrabold">
              ${item.totalAmount.toFixed(2)}
            </p>
            <p className="text-sm mt-1">Transactions: {item.count}</p>
            <p className="text-xs mt-2 opacity-80">{formatPeriod(period)}</p>
          </div>
        ))}
    </div>
  );
};

export default StatisticsExpenses;
