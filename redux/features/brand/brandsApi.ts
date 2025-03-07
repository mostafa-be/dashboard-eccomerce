import { apiSlice } from "../api/apiSlice";

export const brandsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: "get-brands",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllBrandsQuery } = brandsApi;
