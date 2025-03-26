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
  month: string;
};

type SalesAnalyticsProps = {
  analyticsSales: Array<Analytic>;
};

const chartConfig = {
  count: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const SalesAnalytics = ({ analyticsSales }: SalesAnalyticsProps) => {
  const validAnalytics = Array.isArray(analyticsSales) ? analyticsSales : [];

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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
