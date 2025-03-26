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
  month: string;
};

type CustomersAnalyticsProps = {
  analyticsCustomers: Array<Analytic>;
};

const chartConfig = {
  count: {
    label: "Customers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomersAnalytics = ({
  analyticsCustomers,
}: CustomersAnalyticsProps) => {
  const validAnalytics = Array.isArray(analyticsCustomers)
    ? analyticsCustomers
    : [];

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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
