import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "create-product",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getProduct: builder.query({
      query: ({ id }) => ({
        url: `get-product/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "get-products",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getBestSellingProducts: builder.query({
      query: () => ({
        url: "get-best-selling-products",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `add-review/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    addReplyReview: builder.mutation({
      query: (data) => ({
        url: `add-reply-review`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-product/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `delete-product/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useGetProductQuery,
  useAddReviewMutation,
  useAddReplyReviewMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetBestSellingProductsQuery,
} = productsApi;
