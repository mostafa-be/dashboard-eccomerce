import { apiSlice } from "../api/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "create-category",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "get-categories",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `delete-category/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery, useDeleteCategoryMutation,useCreateCategoryMutation } =
  categoriesApi;
