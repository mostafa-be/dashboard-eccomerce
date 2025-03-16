import { apiSlice } from "../api/apiSlice";

export const sizesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetAllSizesQuery,useDeleteSizeMutation } = sizesApi;
