import { apiSlice } from "../api/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetAllCategoriesQuery,useDeleteCategoryMutation } = categoriesApi;
