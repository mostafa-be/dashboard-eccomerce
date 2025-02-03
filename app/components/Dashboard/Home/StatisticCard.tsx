import { Ellipsis, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

interface StatisticCardProps {
  statistic: {
    title: string;
    amount: { value: string; current: string };
    static: {
      wekly: { percent: number; mouvement: string };
      monthly: { percent: number; mouvement: string };
      yearly: { percent: number; mouvement: string };
    };
  };
  period: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ period, statistic }) => {
  const wekly = statistic.static.wekly;
  const mouvementWekly = wekly.mouvement;
  const monthly = statistic.static.monthly;
  const mouvementMonthly = monthly.mouvement;
  const yearly = statistic.static.yearly;
  const mouvementYearly = yearly.mouvement;

  return (
    <div className="bg-white/85 select-none dark:bg-black-100/70 shadow rounded p-4 flex flex-col gap-2 cursor-pointer hover:scale-105 transition-all ">
      <div className="w-full flex items-center justify-between">
        <p className="text-[16px] text-gray-700/70 dark:text-white capitalize">
          {statistic.title}
        </p>
        <Ellipsis
          size={15}
          className="text-sm text-gray-700/70 dark:text-white cursor-no-drop"
        />
      </div>
      <div className="flex flex-col  gap-2">
        {" "}
        <div className="flex items-center ">
          <h5 className="text-2xl font-semibold proportional-nums text-gray-950 dark:text-white">
            {statistic.amount.current}
            {statistic.amount.value}
          </h5>
        </div>
        {period === "wekly" && (
          <div className="flex items-center gap-2">
            {mouvementWekly === "up" ? (
              <div className="w-max flex items-center gap-1 rounded-full bg-green-400/40 px-1 py-1 ">
                <TrendingUp
                  size={10}
                  className="text-[12px]  proportional-nums text-green-600 "
                />
                <p className="text-[12px]  proportional-nums text-green-600 ">
                  {wekly.percent}%
                </p>
              </div>
            ) : (
              <div className="w-max flex items-center gap-1 rounded-full bg-red-400/40 px-1 py-1 ">
                <TrendingDown
                  size={10}
                  className="text-[12px]  proportional-nums text-red-600 "
                />
                <p className="text-[12px]  proportional-nums text-red-600 ">
                  {wekly.percent}%
                </p>
              </div>
            )}
            <p className="text-[12px] text-gray-700/70 dark:text-white">
              vs last 7 days
            </p>
          </div>
        )}
        {period === "monthly" && (
          <div className="flex items-center gap-2">
            {mouvementMonthly === "up" ? (
              <div className="w-max flex items-center gap-1 rounded-full bg-green-600/50 px-1 py-1 ">
                <TrendingUp
                  size={10}
                  className="text-[12px]  proportional-nums text-green-600 "
                />
                <p className="text-[12px]  proportional-nums text-green-600 ">
                  {monthly.percent}%
                </p>
              </div>
            ) : (
              <div className="w-max flex items-center gap-1 rounded-full bg-red-600/50 px-1 py-1 ">
                <TrendingDown
                  size={10}
                  className="text-[12px]  proportional-nums text-red-600 "
                />
                <p className="text-[12px]  proportional-nums text-red-600 ">
                  {wekly.percent}%
                </p>
              </div>
            )}
            <p className="text-[12px] text-gray-700/70 dark:text-white">
              vs last month
            </p>
          </div>
        )}
        {period === "yearly" && (
          <div className="flex items-center gap-2">
            {mouvementYearly === "up" ? (
              <div className="w-max flex items-center gap-1 rounded-full bg-green-600/50 px-1 py-1 ">
                <TrendingUp
                  size={10}
                  className="text-[12px]  proportional-nums text-green-600 "
                />
                <p className="text-[12px]  proportional-nums text-green-600 ">
                  {monthly.percent}%
                </p>
              </div>
            ) : (
              <div className="w-max flex items-center gap-1 rounded-full bg-red-600/50 px-1 py-1 ">
                <TrendingDown
                  size={10}
                  className="text-[12px]  proportional-nums text-red-600 "
                />
                <p className="text-[12px]  proportional-nums text-red-600 ">
                  {wekly.percent}%
                </p>
              </div>
            )}
            <p className="text-[12px] text-gray-700/70 dark:text-white">
              vs last year
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticCard;
