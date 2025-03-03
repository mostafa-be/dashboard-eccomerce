import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "get-products",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editStatusOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `upadte-staus-order/${id}`,
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

export const { useGetAllProductsQuery} = productsApi;
