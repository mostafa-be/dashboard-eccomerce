import { apiSlice } from "../api/apiSlice";

export const storesApi = apiSlice.injectEndpoints({
  // Add to your endpoints
  endpoints: (builder) => ({
    createStore: builder.mutation({
      query: (data) => ({
        url: "/stores/create-store",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getStoreById: builder.query({
      query: ({ id }) => ({
        url: `/stores/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStoreByStoreId: builder.query({
      query: ({ storeId }) => ({
        url: `/stores/storeId/${storeId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    // storeSearch: builder.query({
    //   query: ({ storeId, query, entityType = "products" }) => {
    //     return {
    //       url: `/stores/${storeId}/search`,
    //       method: "GET",
    //       params: {
    //         q: query,
    //         type: entityType,
    //       },
    //       credentials: "include",
    //     };
    //   },
    //   // Cache search results for 5 minutes
    //   keepUnusedDataFor: 300,
    // }),
  }),
});

export const {
  useCreateStoreMutation,
  useGetStoreByIdQuery,
  useGetStoreByStoreIdQuery,
  //useStoreSearchQuery,
} = storesApi;
