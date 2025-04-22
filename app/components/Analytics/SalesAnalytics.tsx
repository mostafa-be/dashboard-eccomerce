"use client";

import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

type Analytic = {
  count: number;
  date: string;
};

type SalesAnalyticsProps = {
  analyticsSales: Array<Analytic>;
  period: string; // Added period prop
};

const chartConfig = {
  count: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const SalesAnalytics = ({ analyticsSales, period }: SalesAnalyticsProps) => {
  const validAnalytics = Array.isArray(analyticsSales) ? analyticsSales : [];

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (period === "7d") {
      return date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., Mon, Tue
    } else if (period === "1m") {
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
      }); // e.g., 01/12
    } else if (period === "1y") {
      return date.toLocaleDateString("en-US", { month: "short" }); // e.g., Jan, Feb
    }
    return value;
  };

  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg">
      <HeaderCard className="w-full p-5">
        <TitleCard
          title="Sales Analytics"
          className="text-xl font-semibold text-black dark:text-white"
        />
      </HeaderCard>
      <CardContent className="w-full p-5">
        <ChartContainer config={chartConfig}>
          <BarChart
            data={validAnalytics}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDate}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="count"
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesAnalytics;
