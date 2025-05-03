import Link from "next/link";
import React from "react";
import StatisticCard from "./StatisticCard";

type Props = {
  statistics: {
    period: string;
    totalOrders: {
      current: number;
      currentAmount: number;
      previous: number;
      percentageChange: number;
    };
    totalSales: {
      current: number;
      previous: number;
      percentageChange: number;
    };
    totalExpenses: {
      current: number;
      previous: number;
      percentageChange: number;
    };
    totalProfit: {
      current: number;
      previous: number;
      percentageChange: number;
    };
  };
};

/**
 * Statistic Component
 * Displays a summary of key statistics with cards for each metric.
 *
 * @param {Props} props - The props for the component.
 * @param {object} props.statistics - The statistics data.
 * @returns {JSX.Element} The Statistic component.
 */
const Statistic = ({ statistics }: Props) => {
  const cards = [
    {
      title: "Total Orders",
      amount: { value: statistics.totalOrders.currentAmount, current: "usd" },
      percent: statistics.totalOrders.percentageChange,
      mouvement: statistics.totalOrders.percentageChange >= 0 ? "up" : "down",
    },

    {
      title: "Total Sales",
      amount: { value: statistics.totalSales.current, current: "usd" },
      percent: statistics.totalSales.percentageChange,
      mouvement: statistics.totalSales.percentageChange >= 0 ? "up" : "down",
    },
    {
      title: "Total Expenses",
      amount: { value: statistics.totalExpenses.current, current: "usd" },
      percent: statistics.totalExpenses.percentageChange,
      mouvement: statistics.totalExpenses.percentageChange >= 0 ? "up" : "down",
    },
    {
      title: "Total Revenue",
      amount: { value: statistics.totalProfit.current, current: "usd" },
      percent: statistics.totalProfit.percentageChange,
      mouvement: statistics.totalProfit.percentageChange >= 0 ? "up" : "down",
    },
  ];

  return (
    <div className="w-full mt-10">
      <div className="w-full flex items-center justify-between">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Sales Overview
        </h5>
        <Link
          href="/en/dashboard/orders"
          className="text-sm text-orange-600 dark:text-orange-400 underline"
        >
          See More Details
        </Link>
      </div>
      <div className="w-full mt-5  grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((statistic, index) => (
          <StatisticCard
            key={index}
            period={statistics.period}
            statistic={statistic}
          />
        ))}
      </div>
    </div>
  );
};

export default Statistic;
