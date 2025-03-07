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
  }),
});

export const { useGetAllSizesQuery } = sizesApi;
