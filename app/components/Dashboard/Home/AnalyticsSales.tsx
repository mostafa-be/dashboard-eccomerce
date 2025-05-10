"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltipContent,
} from "../../ui/chart";
import { Card, CardContent, HeaderCard, TitleCard } from "../../ui/card";
import { ChevronDown, TrendingUp } from "lucide-react";
import PeriodSelector from "../../ui/PeriodSelector";

const chartConfig = {
  orders: {
    label: "Order",
    color: "#0561fc",
  },
  sales: {
    label: "Sales",
    color: "#F5B400",
  },
} satisfies ChartConfig;

type Analytics = {
  date: string;
  amount: number;
}[];

type Props = {
  period: string;
  analyticsSales: Analytics;
  analyticsOrders: Analytics;
  handlePeriodChange: (value: string) => void;
  revenue: {
    current: number;
    previous: number;
    percentageChange: number;
  };
};

export function AnalyticsSales({
  period,
  analyticsSales,
  analyticsOrders,
  revenue,
  handlePeriodChange,
}: Props) {
  // Combine sales and orders data into a single dataset
  const chartData = analyticsSales.map((sale) => {
    const matchingOrder = analyticsOrders.find(
      (order) => order.date === sale.date
    );
    return {
      date: sale.date,
      sales: sale.amount,
      orders: matchingOrder ? matchingOrder.amount : 0,
    };
  });

  // Format date based on the selected period
  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    if (period === "7d") {
      return parsedDate.toLocaleDateString("en-US", { weekday: "short" }); // e.g., Mon, Tue
    } else if (period === "1m") {
      return parsedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      }); // e.g., 01/12
    } else if (period === "1y") {
      return parsedDate.toLocaleDateString("en-US", { month: "long" }); // e.g., April, March
    }
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }); // e.g., Jan 1, 2023
  };
  const { current, percentageChange } = revenue || {};

  return (
    <Card className="w-full min-h-[200px] md:col-span-5 lg:col-span-6 bg-white dark:bg-black-100 shadow rounded-lg">
      <HeaderCard className="w-full px-5 py-5 border-b border-b-gray-300/90 dark:border-b-white-100 border-dashed">
        <div className="w-full flex items-center justify-between">
          <TitleCard title="Order and Sales Overview" />
          <PeriodSelector onChange={handlePeriodChange} period={period} />
        </div>
        <div className="w-full mt-1.5 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-700/90 dark:text-white capitalize">
                Total Revenue
              </p>
              <ChevronDown
                size={15}
                className="text-gray-700/90 dark:text-white"
              />
            </div>
            <div className="w-full select-none flex items-center gap-2">
              <h1 className="text-lg font-semibold text-black-100 dark:text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(current)}
              </h1>
              <div
                className={`w-max flex items-center gap-1 rounded-full ${
                  percentageChange >= 0 ? "bg-green-400/40" : "bg-red-400/40"
                }  px-1 py-1`}
              >
                {percentageChange >= 0 ? (
                  <TrendingUp size={15} className="text-green-600" />
                ) : (
                  <TrendingUp size={15} className="text-red-600 rotate-180" />
                )}

                <p
                  className={`text-[12px] proportional-nums ${
                    percentageChange >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(percentageChange).toFixed(2)}%
                </p>
              </div>
              <p className="text-[12px] text-gray-700/70 dark:text-white">
                {period === "7d"
                  ? "Last 7 days"
                  : period === "1m"
                  ? "Last 30 days"
                  : period === "1y"
                  ? "Last 12 months"
                  : "Last 3 months"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="p-1 shadow bg-blue-650 rounded-full" />
              <span className="text-gray-900 dark:text-white text-sm font-[500]">
                Orders
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="p-1 shadow bg-yellow-650 rounded-full" />
              <span className="text-gray-900 dark:text-white text-sm font-[500]">
                Sales
              </span>
            </div>
          </div>
        </div>
      </HeaderCard>
      <CardContent className="w-full h-[300px]">
        <ChartContainer
          lang="ar"
          config={chartConfig}
          className="w-full h-full"
        >
          <ResponsiveContainer>
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="gradientOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0561fc" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0561fc" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={formatDate}
              />
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1_000_000) {
                    return `$${(value / 1_000_000).toFixed(1)}M`; // e.g., $1.2M
                  } else if (value >= 1_000) {
                    return `$${(value / 1_000).toFixed(1)}K`; // e.g., $1.2K
                  }
                  return new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(value); // e.g., $123
                }}
              />
              <Tooltip
                content={
                  <ChartTooltipContent
                    className="dark:bg-black-100"
                    config={chartConfig}
                    formatter={(value: number, name: string) => (
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            name === "orders" ? "bg-blue-500" : "bg-yellow-500"
                          }`}
                        ></span>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {name === "orders" ? "Orders" : "Sales"}:{" "}
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(value)}
                          </span>
                        </p>
                      </div>
                    )}
                  />
                }
              />
              <Area
                dataKey="orders"
                type="natural"
                fill="url(#gradientOrders)"
                stroke="#0561fc"
                strokeWidth={2}
              />
              <Line
                dataKey="sales"
                type="natural"
                stroke="#F5B400"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
