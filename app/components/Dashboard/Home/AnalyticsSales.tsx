"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import {
  Card,
  CardContent,
  HeaderCard,
  SelectorPeriod,
  TitleCard,
} from "../../ui/card";
import { ChevronDown, TrendingUp } from "lucide-react";
const chartData = [
  { month: "January", order: 189.5, sales: "80" },
  { month: "February", order: 305, sales: 200 },
  { month: "March", order: 237, sales: 120 },
  { month: "April", order: 73, sales: 190 },
  { month: "May", order: 209, sales: 130 },
  { month: "June", order: 214, sales: 140 },
  { month: "January", order: 186, sales: 80 },
  { month: "August", order: 305, sales: 200 },
  { month: "September", order: 237, sales: 120 },
  { month: "October", order: 73, sales: 190 },
  { month: "November", order: 209, sales: 130 },
  { month: "December", order: 214, sales: 140 },
];

const chartConfig = {
  order: {
    label: "Order",
    color: "#0561fc",
  },
  sales: {
    label: "Sales",
    color: "#F5B400",
  },
} satisfies ChartConfig;
type Props = {
  setPeriod(period: string): void;
  period: string;
};
export function AnalyticsSales({ setPeriod, period }: Props) {
  /*
  const dataWekly = [
    { month: "Monday", order: 10, sales: 6 },
    { month: "Tuesday", order: 305, sales: 200 },
    { month: "Wednesday", order: 237, sales: 120 },
    { month: "Thursday", order: 73, sales: 70 },
    { month: "Thursday", order: 29, sales: 28 },
    { month: "Saturday", order: 24, sales: 23 },
    { month: "Sunday", order: 16, sales: 15 },
  ];
  const dataYearly = [
    { month: "January", order: 189.5, sales: "80" },
    { month: "February", order: 305, sales: 200 },
    { month: "March", order: 237, sales: 120 },
    { month: "April", order: 73, sales: 190 },
    { month: "May", order: 209, sales: 130 },
    { month: "June", order: 214, sales: 140 },
    { month: "January", order: 186, sales: 80 },
    { month: "August", order: 305, sales: 200 },
    { month: "September", order: 237, sales: 120 },
    { month: "October", order: 73, sales: 190 },
    { month: "November", order: 209, sales: 130 },
    { month: "December", order: 214, sales: 140 },
  ];
*/

  return (
    <Card className="w-full min-h-[200px]  col-span-1 md:col-span-3 lg:col-span-6 bg-white dark:bg-black-100 shadow rounded-lg">
      <HeaderCard className="w-full px-5 py-5 border-b border-b-gray-300/90 dark:border-b-white-100 border-dashed">
        <div className="w-full flex items-center justify-between">
          <TitleCard title="Order and Sales Overview" />
          <SelectorPeriod setPeriod={setPeriod} period={period} />
        </div>
        <div className="w-full mt-1.5 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-700/90 dark:text-white capitalize ">
                total revenue
              </p>
              <ChevronDown
                size={15}
                className="text-gray-700/90 dark:text-white"
              />
            </div>
            <div className="w-full select-none flex items-center gap-2">
              <h1 className="text-lg font-semibold text-black-100 dark:text-white">
                {" "}
                $182.1k
              </h1>
              <div className="w-max flex items-center gap-1 rounded-full bg-green-400/40 px-1 py-1 ">
                <TrendingUp
                  size={10}
                  className="text-[12px]  proportional-nums text-green-600 "
                />
                <p className="text-[12px]  proportional-nums text-green-600 ">
                  30.5%
                </p>{" "}
              </div>
              <p className="text-[12px] text-gray-700/70 dark:text-white">
                vs last 7 days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="p-1 shadow bg-blue-650 rounded-full" />
              <span className="text-gray-900 dark:text-white text-sm font-[500]">
                Order
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
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ComposedChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            {/*<ChartLegend content={<ChartLegendContent />} />*/}
            <Area
              dataKey="order"
              type="natural"
              fill="#0561fc" //var(--color-desktop)
              fillOpacity={0.4}
              stroke="#0561fc" //var(--color-desktop)
              stackId="fillOrder"
            />
            <Line
              dataKey="sales"
              type="natural"
              stroke="#F5B400" //var(--color-desktop)
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
