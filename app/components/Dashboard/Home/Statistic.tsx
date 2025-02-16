import Link from "next/link";
import React from "react";
import StatisticCard from "./StatisticCard";

type Props = {
  period: string;
};
const Statistic = ({ period }: Props) => {
  const statistics = [
    {
      title: "total sales",
      amount: { value: 16738296372, current: "usd" },
      static: {
        wekly: {
          percent: 3.6,
          mouvement: "up",
        },
        monthly: {
          percent: 1.6,
          mouvement: "down",
        },
        yearly: {
          percent: 1.6,
          mouvement: "down",
        },
      },
    },
    {
      title: "total purchase",
      amount: { value: 873892, current: "usd" },
      static: {
        wekly: {
          percent: 36.6,
          mouvement: "up",
        },
        monthly: {
          percent: 11.6,
          mouvement: "down",
        },
        yearly: {
          percent: 18.6,
          mouvement: "up",
        },
      },
    },
    {
      title: "total return",
      amount: { value: 9382753999, current: "usd" },
      static: {
        wekly: {
          percent: 79.6,
          mouvement: "up",
        },
        monthly: {
          percent: 18.6,
          mouvement: "down",
        },
        yearly: {
          percent: 16.6,
          mouvement: "down",
        },
      },
    },
    {
      title: "total marketing",
      amount: { value: 7298267819, current: "usd" },
      static: {
        wekly: {
          percent: 3.6,
          mouvement: "up",
        },
        monthly: {
          percent: 1.6,
          mouvement: "up",
        },
        yearly: {
          percent: 1.6,
          mouvement: "down",
        },
      },
    },
  ];
  return (
    <div className="w-full mt-10">
      <div className="w-full flex items-center justify-between">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Sales Overflow
        </h5>
        <Link
          href={"/en/dashboard/order"}
          className="text-sm text-orange-600 dark:text-orange-400 underline"
        >
          See More Details
        </Link>
      </div>
      <div className="w-full mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statistics &&
          statistics.map(
            (
              statistic: {
                title: string;
                amount: { value: number; current: string };
                static: {
                  wekly: { percent: number; mouvement: string };
                  monthly: { percent: number; mouvement: string };
                  yearly: { percent: number; mouvement: string };
                };
              },
              index
            ) => {
              return (
                <StatisticCard
                  period={period}
                  statistic={statistic}
                  key={index}
                />
              );
            }
          )}
      </div>
    </div>
  );
};

export default Statistic;
