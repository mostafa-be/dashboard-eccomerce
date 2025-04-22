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

type EnquiriesAnalyticsProps = {
  analyticsEnquiries: Array<Analytic>;
  period: string; // Added period prop
};

const chartConfig = {
  count: {
    label: "Enquiries",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const EnquiriesAnalytics = ({
  analyticsEnquiries,
  period,
}: EnquiriesAnalyticsProps) => {
  const validAnalytics = Array.isArray(analyticsEnquiries)
    ? analyticsEnquiries
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
          title="Enquiries Analytics"
          className="text-xl font-semibold text-black dark:text-white"
        />
      </HeaderCard>
      <CardContent className="w-full p-5">
        <ChartContainer config={chartConfig}>
          <LineChart
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
            <Line
              type="monotone"
              dataKey="count"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EnquiriesAnalytics;
