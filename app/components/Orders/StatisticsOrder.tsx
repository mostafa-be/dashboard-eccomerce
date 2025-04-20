import React from "react";
import CardStatisticsOrder from "./CardStatisticsOrder";

type OrderByStatus = {
  status: string;
  currentPeriodCount: number;
  previousPeriodCount: number;
  countPercentageChange: number;
  currentPeriodAmount: number;
  previousPeriodAmount: number;
  amountPercentageChange: number;
};

interface StatisticsOrderProps {
  period: string;
  statistics: {
    period: string;
    totalOrders: {
      currentPeriod: number;
      previousPeriod: number;
      percentageChange: number;
      currentAmount: number;
      previousAmount: number;
      amountPercentageChange: number;
    };
    ordersByStatus: OrderByStatus[];
  };
}

const StatisticsOrder = ({ statistics }: StatisticsOrderProps) => {
  const { period, totalOrders, ordersByStatus } = statistics;

  const statusColors: Record<string, string> = {
    Ordered: "bg-gradient-to-r from-blue-500 to-blue-700",
    Shipped: "bg-gradient-to-r from-yellow-500 to-yellow-700",
    Delivered: "bg-gradient-to-r from-green-500 to-green-700",
    Cancelled: "bg-gradient-to-r from-red-500 to-red-700",
    Processing: "bg-gradient-to-r from-purple-500 to-purple-700",
    Refunded: "bg-gradient-to-r from-gray-500 to-gray-700",
  };

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders?.currentPeriod,
      amount: totalOrders?.currentAmount,
      percent: totalOrders?.percentageChange,
      mouvement: totalOrders?.percentageChange >= 0 ? "up" : "down",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    ...ordersByStatus.map((status) => ({
      title: status?.status,
      value: status?.currentPeriodCount,
      amount: status?.currentPeriodAmount,
      percent: status?.countPercentageChange,
      mouvement: status?.countPercentageChange >= 0 ? "up" : "down",
      bgColor:
        statusColors[status?.status] ||
        "bg-gradient-to-r from-gray-500 to-gray-700",
    })),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
      {cards.map((card, index) => (
        <CardStatisticsOrder key={index} {...card} period={period} />
      ))}
    </div>
  );
};

export default StatisticsOrder;