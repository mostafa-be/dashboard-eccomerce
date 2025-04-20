import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalytics: builder.query({
      query: () => ({
        url: "users-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getEnquiriesAnalytics: builder.query({
      query: () => ({
        url: "enquiries-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderAnalytics: builder.query({
      query: () => ({
        url: "orders-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getProductsAnalytics: builder.query({
      query: () => ({
        url: "products-analytics",
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
  }),
});

export const {
  useGetUserAnalyticsQuery,
  useGetEnquiriesAnalyticsQuery,
  useGetOrderAnalyticsQuery,
  useGetProductsAnalyticsQuery,
  useGetOrderStatisticsPeriodicallyQuery,
} = analyticsApi;
