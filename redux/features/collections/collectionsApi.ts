import { apiSlice } from "../api/apiSlice";

export const collectionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query({
      query: () => ({
        url: "get-collections",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `delete-collection/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllCollectionsQuery ,useDeleteCollectionMutation } = collectionsApi;
