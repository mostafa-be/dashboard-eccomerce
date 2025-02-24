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
    },
    {
      title: "Processing",
      value: 300,
      currency: "USD",
      percent: 2.4,
      mouvement: "up",
    },
    {
      title: "Shipped",
      value: 200,
      currency: "USD",
      percent: 1.8,
      mouvement: "up",
    },
    {
      title: "Cancelled",
      value: 50,
      currency: "USD",
      percent: 0.5,
      mouvement: "down",
    },
    {
      title: "Delivered",
      value: 950,
      currency: "USD",
      percent: 4.2,
      mouvement: "up",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  mt-4">
      {statistics.map((stat, index) => (
        <CardStatisticsOrder
          key={index}
          title={stat.title}
          value={stat.value}
          currency={stat.currency}
          period={period}
          percent={stat.percent}
          mouvement={stat.mouvement}
        />
      ))}
    </div>
  );
};

export default StatisticsOrder;
