import { Ellipsis, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../../ui/card";

interface StatisticCardProps {
  statistic: {
    title: string;
    amount: { value: number; current: string };
    static: {
      weekly: { percent: number; mouvement: string };
      monthly: { percent: number; mouvement: string };
      yearly: { percent: number; mouvement: string };
    };
  };
  period: string;
}

/**
 * StatisticCard Component
 * Displays a card with statistics for a specific period.
 */
const StatisticCard: React.FC<StatisticCardProps> = ({ period, statistic }) => {
  const { weekly, monthly, yearly } = statistic.static;
  const current = statistic.amount.current;
  const amount = statistic.amount.value;

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: current.toUpperCase(),
    notation: "compact",
    compactDisplay: "short",
  }).format(amount);

  const getAnimationClass = (mouvement: string) =>
    mouvement === "up" ? "animate-bounce-up" : "animate-bounce-down";

  const getPeriodData = () => {
    if (period === "weekly") return weekly;
    if (period === "monthly") return monthly;
    return yearly;
  };

  const periodData = getPeriodData();

  return (
    <Card className="bg-white shadow rounded-lg p-4 flex flex-col gap-2 cursor-pointer hover:shadow-lg transition-shadow">
      <HeaderCard className="w-full flex items-center justify-between">
        <TitleCard
          title={statistic.title}
          className="text-[16px] text-gray-700 capitalize"
        />
        <Ellipsis size={15} className="text-gray-400 cursor-no-drop" />
      </HeaderCard>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center">
          <h5 className="text-2xl font-semibold text-gray-900">{formatted}</h5>
        </div>
        <div className="flex items-center gap-2">
          {periodData.mouvement === "up" ? (
            <div
              className={`flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 ${getAnimationClass(
                periodData.mouvement
              )}`}
            >
              <TrendingUp size={14} className="text-green-600" />
              <p className="text-sm text-green-600">{periodData.percent}%</p>
            </div>
          ) : (
            <div
              className={`flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 ${getAnimationClass(
                periodData.mouvement
              )}`}
            >
              <TrendingDown size={14} className="text-red-600" />
              <p className="text-sm text-red-600">{period === "monthly" ? monthly.percent : periodData.percent}%</p>
            </div>
          )}
          <p className="text-sm text-gray-500">
            {period === "weekly"
              ? "vs last 7 days"
              : period === "monthly"
              ? "vs last month"
              : "vs last year"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
