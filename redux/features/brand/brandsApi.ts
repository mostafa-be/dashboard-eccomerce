import { apiSlice } from "../api/apiSlice";
export const brandsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (data) => ({
        url: "create-brand",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllBrands: builder.query({
      query: () => ({
        url: "get-brands",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `delete-brand/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
