import { apiSlice } from "../api/apiSlice";

export const sizesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSize: builder.mutation({
      query: (data) => ({
        url: "create-size",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getSize: builder.query({
      query: ({ id }) => ({
        url: `get-size/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editSize: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-size/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllSizes: builder.query({
      query: () => ({
        url: "get-sizes",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteSize: builder.mutation({
      query: (id) => ({
        url: `delete-size/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllSizesQuery,
  useGetSizeQuery,
  useEditSizeMutation,
  useDeleteSizeMutation,
  useCreateSizeMutation,
} = sizesApi;
