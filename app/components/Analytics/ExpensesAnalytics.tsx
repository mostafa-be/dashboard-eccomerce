import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { CartesianGrid, XAxis } from "recharts";
import { 
  ChartConfig,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "../ui/chart";
import { Area, AreaChart } from "recharts";

/**
 * Interface for the expenses analytics data.
 */
type ExpenseAnalytic = {
  date: string;
  amount: number;
};

/**
 * Props for the ExpensesAnalytics component.
 */
type ExpensesAnalyticsProps = {
  period: string;
  analyticsExpenses: ExpenseAnalytic[];
};

/**
 * Chart configuration for expenses.
 */
const chartConfig = {
  amount: {
    label: "Expenses",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

/**
 * ExpensesAnalytics Component
 * Displays expenses analytics data in an area chart with a red gradient.
 * 
 * @param {ExpensesAnalyticsProps} props - The component props
 * @param {string} props.period - The time period for the analytics (7d, 1m, 1y)
 * @param {ExpenseAnalytic[]} props.analyticsExpenses - The expenses analytics data
 */
const ExpensesAnalytics = ({ period, analyticsExpenses }: ExpensesAnalyticsProps) => {
  const validAnalytics = Array.isArray(analyticsExpenses)
    ? analyticsExpenses
    : [];

  /**
   * Formats the date based on the selected period.
   * 
   * @param {string} value - The date string to format
   * @returns {string} - The formatted date
   */
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
          title="Expenses Analytics"
          className="text-xl font-semibold text-black dark:text-white"
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
              content={<ChartTooltipContent />}
            />
            <defs>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e53e3e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e53e3e" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="amount"
              type="monotone"
              fill="url(#fillExpenses)"
              fillOpacity={0.6}
              stroke="#e53e3e"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensesAnalytics;
