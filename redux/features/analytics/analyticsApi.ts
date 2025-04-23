import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalytics: builder.query({
      query: ({ period }) => ({
        url: `users-analytics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getEnquiriesAnalytics: builder.query({
      query: ({ period }) => ({
        url: `enquiries-analytics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderAnalytics: builder.query({
      query: ({ period }) => ({
        url: `orders-analytics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getProductsAnalytics: builder.query({
      query: ({ period }) => ({
        url: `products-analytics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderStatisticsPeriodically: builder.query({
      query: ({ period }) => ({
        url: `statistics?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderSalesPeriodically: builder.query({
      query: ({ period }) => ({
        url: `analytics-seller?period=${period}`,
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
} = analyticsApi;
