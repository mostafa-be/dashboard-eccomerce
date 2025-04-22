"use client";

import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";
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

type ProductsAnalyticsProps = {
  analyticsProducts: Array<Analytic>;
  period: string; // Added period prop
};

const chartConfig = {
  count: {
    label: "Products Sold",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const ProductsAnalytics = ({
  analyticsProducts,
  period,
}: ProductsAnalyticsProps) => {
  const validAnalytics = Array.isArray(analyticsProducts)
    ? analyticsProducts
    : [];

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
          title="Products Analytics"
          className="text-xl font-semibold text-black dark:text-white"
        />
      </HeaderCard>
      <CardContent className="w-full p-5">
        <ChartContainer config={chartConfig}>
          <LineChart
            data={validAnalytics}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDate}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="hsl(var(--chart-4))"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProductsAnalytics;
