import { Ellipsis, TrendingDown, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../../ui/card";

interface StatisticCardProps {
  statistic: {
    title: string;
    amount: { value: number; current: string };
    percent: number;
    mouvement: string;
  };
  period: string;
}

/**
 * StatisticCard Component
 * Displays a card with statistics and animated counter for a specific period.
 */
const StatisticCard: React.FC<StatisticCardProps> = ({ period, statistic }) => {
  const [count, setCount] = useState(0);
  const { amount: amountCurrency, percent, mouvement, title } = statistic;
  const current = amountCurrency.current;
  const amount = amountCurrency.value;

  // Reset count when amount changes (e.g., when period changes)
  useEffect(() => {
    setCount(0); // Reset to zero when amount changes
  }, [amount]);

  // Animate count from 0 to amount
  useEffect(() => {
    if (amount <= 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const step = Math.max(1, Math.floor(amount / 30)); // Create smooth animation with about 30 steps
    const timer = setInterval(() => {
      start += step;
      if (start > amount) {
        setCount(amount);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [amount]);

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: current.toUpperCase(),
    notation: "compact",
    compactDisplay: "short",
  }).format(count);

  // Always use positive percentage value for display
  const displayPercent = Math.abs(percent);

  // Animation class based on movement direction
  const getAnimationClass = (movementDirection: string) =>
    movementDirection === "up" ? "animate-bounce-up" : "animate-bounce-down";

  return (
    <Card className="bg-white dark:bg-black-100 shadow rounded-lg p-4 flex flex-col gap-2 cursor-pointer hover:shadow-lg transition-shadow">
      <HeaderCard className="w-full flex items-center justify-between">
        <TitleCard
          title={title}
          className="text-[16px] text-gray-700 dark:text-gray-200 capitalize"
        />
        <Ellipsis
          size={15}
          className="text-gray-400 dark:text-gray-500 cursor-no-drop"
        />
      </HeaderCard>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center">
          <h5 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {formatted}
          </h5>
        </div>
        <div className="flex items-center gap-2">
          {mouvement === "up" ? (
            <div
              className={`flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900 px-2 py-1 ${getAnimationClass(
                mouvement
              )}`}
            >
              <TrendingUp
                size={14}
                className="text-green-600 dark:text-green-400"
              />
              <p className="text-sm text-green-600 dark:text-green-400">
                {displayPercent.toFixed(1)}%
              </p>
            </div>
          ) : (
            <div
              className={`flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900 px-2 py-1 ${getAnimationClass(
                mouvement
              )}`}
            >
              <TrendingDown
                size={14}
                className="text-red-600 dark:text-red-400"
              />
              <p className="text-sm text-red-600 dark:text-red-400">
                {displayPercent.toFixed(1)}%
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {period === "7d"
              ? "vs last 7 days"
              : period === "1m"
              ? "vs last month"
              : "vs last year"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
