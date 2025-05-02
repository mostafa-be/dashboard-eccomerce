import { apiSlice } from "../api/apiSlice";

/**
 * Analytics API
 * Provides endpoints for fetching analytics data for users, enquiries, orders, products, and expenses.
 */
export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Fetches user analytics data for a given period.
     *
     * @param {Object} params - Query parameters.
     * @param {string} params.period - The period for which to fetch analytics (e.g., "7d", "1m", "1y").
     */
    getUserAnalytics: builder.query({
      query: ({ period }) => ({
        url: `users-analytics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    /**
     * Fetches enquiries analytics data for a given period.
     *
     * @param {Object} params - Query parameters.
     * @param {string} params.period - The period for which to fetch analytics (e.g., "7d", "1m", "1y").
     */
    getEnquiriesAnalytics: builder.query({
      query: ({ period }) => ({
        url: `enquiries-analytics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    /**
     * Fetches order analytics data for a given period.
     *
     * @param {Object} params - Query parameters.
     * @param {string} params.period - The period for which to fetch analytics (e.g., "7d", "1m", "1y").
     */
    getOrderAnalytics: builder.query({
      query: ({ period }) => ({
        url: `orders-analytics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    /**
     * Fetches product analytics data for a given period.
     *
     * @param {Object} params - Query parameters.
     * @param {string} params.period - The period for which to fetch analytics (e.g., "7d", "1m", "1y").
     */
    getProductsAnalytics: builder.query({
      query: ({ period }) => ({
        url: `products-analytics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    /**
     * Fetches periodic order statistics for a given period.
     *
     * @param {Object} params - Query parameters.
     * @param {string} params.period - The period for which to fetch statistics (e.g., "7d", "1m", "1y").
     */
    getOrderStatisticsPeriodically: builder.query({
      query: ({ period }) => ({
        url: `statistics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    /**
     * Fetches periodic order sales data for a given period.
     *
     * @param {Object} params - Query parameters.
     * @param {string} params.period - The period for which to fetch sales data (e.g., "7d", "1m", "1y").
     */
    getOrderSalesPeriodically: builder.query({
      query: ({ period }) => ({
        url: `analytics-seller?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    /**
     * Fetches expense analytics data for a given period.
     *
     * @param {Object} params - Query parameters.
     * @param {string} params.period - The period for which to fetch analytics (e.g., "7d", "1m", "1y").
     */
    getAnalyticsExpenses: builder.query({
      query: ({ period }) => ({
        url: `expenses-analytics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetUserAnalyticsQuery,
  useGetEnquiriesAnalyticsQuery,
  useGetOrderAnalyticsQuery,
  useGetProductsAnalyticsQuery,
  useGetOrderStatisticsPeriodicallyQuery,
  useGetOrderSalesPeriodicallyQuery,
  useGetAnalyticsExpensesQuery,
} = analyticsApi;
