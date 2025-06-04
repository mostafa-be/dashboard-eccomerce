import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({ storeId, data }) => ({
        url: `stores/${storeId}/products/create`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getProduct: builder.query({
      query: ({ storeId, productId }) => ({
        url: `stores/${storeId}/products/${productId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllProducts: builder.query({
      query: ({ storeId }) => ({
        url: `stores/${storeId}/products`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getBestSellingProducts: builder.query({
      query: ({ storeId }) => ({
        url: `stores/${storeId}/best-selling-products`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ storeId, productId, data }) => ({
        url: `stores/${storeId}/products/${productId}/review`,
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
      query: ({ storeId, productId, data }) => ({
        url: `stores/${storeId}/products/${productId}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ storeId, productId }) => ({
        url: `stores/${storeId}/products/${productId}`,
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
