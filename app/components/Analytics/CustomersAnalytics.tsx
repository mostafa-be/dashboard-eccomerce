"use client";

import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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

type CustomersAnalyticsProps = {
  analyticsCustomers: Array<Analytic>;
  period: string; // Added period prop
};

const chartConfig = {
  count: {
    label: "Customers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomersAnalytics = ({
  analyticsCustomers,
  period,
}: CustomersAnalyticsProps) => {
  const validAnalytics = Array.isArray(analyticsCustomers)
    ? analyticsCustomers
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
          title="Customers Analytics"
          className="text-xl font-semibold text-black dark:text-white "
        />
      </HeaderCard>
      <CardContent className="w-full p-5">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
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
            <ChartTooltip
              wrapperClassName="dark:bg-black-100"
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <defs>
              <linearGradient id="fillCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0561fc" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0561fc" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="count"
              type="natural"
              fill="#0561fc"
              fillOpacity={0.2}
              stroke="#0561fc"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CustomersAnalytics;
