import { apiSlice } from "../api/apiSlice";

export const collectionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCollection: builder.mutation({
      query: (data) => ({
        url: "create-collection",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getCollection: builder.query({
      query: ({ id }) => ({
        url: `get-collection/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editCollection: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-collection/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
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

export const { useCreateCollectionMutation,useEditCollectionMutation,useGetCollectionQuery,useGetAllCollectionsQuery ,useDeleteCollectionMutation } = collectionsApi;
