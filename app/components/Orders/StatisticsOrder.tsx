import React from "react";
import CardStatisticsOrder from "./CardStatisticsOrder";

interface StatisticsOrderProps {
  period: string;
}

const StatisticsOrder = ({ period }: StatisticsOrderProps) => {
  const statistics = [
    {
      title: "Total Orders",
      value: 1500,
      currency: "USD",
      percent: 3.6,
      mouvement: "up",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      title: "Processing",
      value: 300,
      currency: "USD",
      percent: 2.4,
      mouvement: "up",
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
    },
    {
      title: "Shipped",
      value: 200,
      currency: "USD",
      percent: 1.8,
      mouvement: "up",
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
    },
    {
      title: "Cancelled",
      value: 50,
      currency: "USD",
      percent: 0.5,
      mouvement: "down",
      bgColor: "bg-gradient-to-r from-red-500 to-red-700",
    },
    {
      title: "Delivered",
      value: 950,
      currency: "USD",
      percent: 4.2,
      mouvement: "up",
      bgColor: "bg-gradient-to-r from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-5">
      {statistics.map((stat, index) => (
        <CardStatisticsOrder key={index} {...stat} period={period} />
      ))}
    </div>
  );
};

export default StatisticsOrder;
