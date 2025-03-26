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
  month: string;
  count: number;
};

type ProductsAnalyticsProps = {
  analyticsProducts: Array<Analytic>;
};

const chartConfig = {
  count: {
    label: "Products Sold",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const ProductsAnalytics = ({ analyticsProducts }: ProductsAnalyticsProps) => {
  const validAnalytics = Array.isArray(analyticsProducts)
    ? analyticsProducts
    : [];

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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
