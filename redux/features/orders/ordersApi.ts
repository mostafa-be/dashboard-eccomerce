import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "create-order-by-member",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrdersByStatus: builder.query({
      query: ({ status }) => ({
        url: `get-orders-by-status/${status}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editStatusOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-status-order/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getOrder: builder.query({
      query: ({ id }) => ({
        url: `get-order/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useEditStatusOrderMutation,
  useGetOrdersByStatusQuery,
} = ordersApi;

